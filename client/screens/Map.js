import React from 'react'
import { withTalks, withAuth } from '../graphql'
import { cloneDeep } from 'lodash'

import { compose } from 'recompose'

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
    room.className = `room ${geo.className || ''}`
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

const Map = props => {
  const { loading, error, conference } = props.talkGQL
  if (loading || error) {
    return null
  }

  const location = prepGeometry(conference.locations[0])
  return (
    <div className="MapScreen">
      <div style={location.style} className="map">
        {location.roomSet.map(room => (
          <div {...room} key={room.id}>
            {room.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default compose(
  withTalks,
  withAuth,
)(Map)
