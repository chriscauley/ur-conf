import React from 'react'
import { navigate } from '@reach/router'
import { cloneDeep } from 'lodash'
import { compose } from 'recompose'

import { prepTalkVotes } from '../lib/vote'
import { withTalks, withAuth } from '../graphql'
import SelectTimeSlot from '../components/SelectTimeSlot'

const rotate = geo => {
  geo = cloneDeep(geo)
  if (geo.width && geo.height) {
    const { width, height } = geo
    geo.width = height
    geo.height = width
  }
  if (geo.center) {
    geo.center.reverse()
  }
  if (geo.points) {
    geo.points.forEach(p => p.reverse())
  }
  return geo
}

const flipHorizontal = (geometry, W, _H) => {
  const _flip = p => [W - p[0], p[1]]
  if (geometry.center) {
    geometry.center = _flip(geometry.center)
  }
  if (geometry.points) {
    geometry.points = geometry.points.map(_flip)
  }
}

const prepGeometry = location => {
  const geometry = rotate(location.geometry)
  const W = geometry.width
  const H = geometry.height
  geometry.width -= 2
  const nh = v => `${(100 * v) / H}%`
  const nw = v => `${(100 * v) / W}%`
  location.style = {
    paddingTop: nw(H),
  }
  location.roomSet.forEach(room => {
    room.alt = room.name
    const geo = rotate(room.geometry)
    flipHorizontal(geo, W, H)
    room.className = `room ${room.name.replace(/ /g, '').toLowerCase()}`
    const style = (room.style = {})
    if (geo.shape === 'polygon') {
      const xs = geo.points.map(p => p[0])
      const ys = geo.points.map(p => p[1])
      const [x0, x1] = [Math.min(...xs), Math.max(...xs)]

      // y-axis is inverted because it's html
      const [y0, y1] = [Math.min(...ys), Math.max(...ys)]
      style.left = nw(x0)
      style.right = nw(W - x1)
      style.top = nh(y0)
      style.bottom = nh(H - y1)
    }
    if (geo.shape === 'circle') {
      style.borderRadius = '100%'
      style.top = nh(geo.center[1] - geo.radius)
      style.left = nw(geo.center[0] - geo.radius)
      style.width = nw(geo.radius * 2)
      style.height = nh(geo.radius * 2)
    }
  })
  return location
}

class Map extends React.Component {
  cached = null
  render() {
    const { loading, error, conference } = this.props.talkGQL
    prepTalkVotes(this)
    if (!this.timeslots || !conference) {
      return this.cached
    }

    const location = prepGeometry(conference.locations[0])
    const { timeslotId } = this.props
    const timeslot = this.timeslots.find(ts => ts.id === timeslotId)
    const roomTalkMap = {}
    const visibleTalks = timeslot.talkSet.filter(
      talk => talk.vote && talk.vote.value === 1,
    )
    const roomSet = location.roomSet.filter(
      r => r.conference.id === conference.id,
    )
    timeslot.talkSet.forEach(talk => {
      roomTalkMap[talk.roomId] = talk
    })

    this.cached = (
      <div className="MapScreen">
        <SelectTimeSlot
          timeslots={this.timeslots}
          defaultValue={timeslotId}
          onChange={e => navigate(`/map/${e.target.value}/`)}
        />
        <div style={location.style} className="map">
          {roomSet.map(room => (
            <Room room={room} talk={roomTalkMap[room.id]} key={room.id} />
          ))}
        </div>
        <ul className="collection">
          {visibleTalks.map(talk => (
            <li className="collection-item" key={talk.id}>
              <i className={talk.vote.icon} />
              <span className="grey-text">
                [{talk.room.name.replace(/ /g, '')}]
              </span>
              {talk.title}
              {talk.authors.filter(a => a).map((author, i) => (
                <b key={author.id}>
                  {i ? ', ' : ' with '}
                  {author.name}
                </b>
              ))}
            </li>
          ))}
        </ul>
      </div>
    )
    return this.cached
  }
}

const Room = ({ room, talk }) => {
  const voteValue = talk && talk.vote && talk.vote.value
  if (talk) {
    room.className += ' has-talk'
    if (voteValue === 1) {
      room.className += ' yes-vote'
    }
  }
  return (
    <div {...room} key={room.id}>
      <div className="name">{room.name.replace(/ /g, '')}</div>
      {[0, 1].includes(voteValue) && <i className={talk.vote.icon} />}
    </div>
  )
}

export default compose(
  withTalks,
  withAuth,
)(Map)
