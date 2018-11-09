import React from 'react'
import { Link } from '@reach/router'
import { format } from 'date-fns'
import { reverse } from 'lodash'
import { compose } from 'react-apollo'

import { withTalks, withAuth } from '../graphql'
import { prepTalkVotes, setAttendance, vote_list } from '../lib/vote'
import date from '../lib/date'
import { post } from '../lib/ajax'
import _ from '../lib/translate'

const hasVotes = timeslot => {
  if (timeslot.voteList.length) {
    return true
  }
  return null
}

const TalkRow = ({ talk, timeslot, attend }) => {
  const isNow = date.isNow(timeslot)
  let icon = talk.vote && talk.vote.icon
  talk.attend = isNow ? () => attend(talk, timeslot) : undefined
  if (talk.attendance) {
    icon = 'ec ec-star2'
  } else if (isNow) {
    icon = 'ec ec-star2 grayscale'
  }
  icon += ' trigger'
  return (
    <li className="collection-item" onClick={talk.attend}>
      <i className={icon} />
      { talk.sortable?
        <Link to={`/talk/${talk.id}/`}>{talk.title}</Link>:
        <div>{talk.title}</div>
      }
    </li>
  )
}

const TimeslotRow = ({ timeslot, attend }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-title">
          {format(timeslot.datetime, 'h:mm A')}
          {date.isNow(timeslot) && <span className="right">Now!</span>}
        </div>
        <ul className="collection">
          {timeslot.visibleTalks.map(talk => (
            <TalkRow
              talk={talk}
              timeslot={timeslot}
              attend={attend}
              key={talk.id}
            />
          ))}
          {hasVotes(timeslot) && (
            <li className="collection-item card-action">
              {timeslot.voteList.map(vote => (
                <Link to={vote.link} key={vote.icon}>
                  <i className={vote.icon} /> x {vote.count}
                </Link>
              ))}
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

class Schedule extends React.Component {
  componentDidMount() {
    const el = document.querySelector('[role="group"]')
    el && el.scrollTo(0, 0)
    date.visible = this
    window.ALERT.set('schedule')
  }
  componentWillUnmount() {
    window.ALERT.dismiss('schedule')
  }
  attend = (talk, timeslot) => {
    post('/api/attendance/', {
      talk_id: talk.attendance ? '' : talk.id,
      timeslot_id: timeslot.id,
    })
    setAttendance(talk, timeslot)
    this.props.auth.refetch()
    this.forceUpdate()
  }
  render() {
    prepTalkVotes(this)
    this.props.talkGQL.startPolling(120000)
    if (!this.timeslots) {
      // set by prepTalkVotes
      return <div>{_`Loading`}</div>
    }

    let tsFilter = ts => !date.isPast(ts)
    let _CN = 'past-link'
    let _to = '/schedule/past/'
    let _text = 'Show past talks'
    if (this.props.showPast) {
      _text = 'Show upcoming talks'
      tsFilter = ts => date.isPast(ts)
      _to = '/schedule/'
      _CN = 'now-link'
    }

    const timeslots = this.timeslots.filter(tsFilter)
    const TimeLink =
      timeslots.length !== this.timeslots.length ? (
        <Link to={_to} className={_CN}>
          {_text}
        </Link>
      ) : null

    timeslots.forEach(ts => {
      const talkSet = ts.talkSet
      const voteTalks = ts.sortableTalks.filter(t => t.vote)
      ts.visibleTalks = talkSet.filter(t => {
        if (!t.sortable) { return true }
        return t.vote && t.vote.value === 1
      })

      ts.voteList = reverse(
        vote_list.map(({ icon, value }) => ({
          icon,
          count: voteTalks.filter(t => t.vote.value === value).length,
          link: `/vote/${ts.id}/${value}/`,
        })),
      )
      ts.voteList.push({
        icon: 'ec ec-question',
        count: ts.sortableTalks.filter(t => !t.vote).length,
        link: `/vote/${ts.id}/`,
      })

      if (date.isPast(ts)) {
        ts.visibleTalks = ts.visibleTalks.filter(t => t.attendance)
      } else {
        ts.voteList.shift() // pops first entry, the upvoted talks
      }
      ts.voteList = ts.voteList.filter(({ count }) => count)
    })
    return (
      <div className="container" id="schedule">
        {TimeLink}
        {timeslots.map(timeslot => (
          <TimeslotRow
            attend={this.attend}
            timeslot={timeslot}
            key={timeslot.id}
          />
        ))}
      </div>
    )
  }
}

export default compose(
  withTalks,
  withAuth,
)(Schedule)
