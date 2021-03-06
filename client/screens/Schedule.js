import React from 'react'
import { Link } from '@reach/router'
import { format } from 'date-fns'
import { reverse } from 'lodash'
import { compose } from 'recompose'

import { withTalks, withAuth } from '../graphql'
import { prepTalkVotes, setAttendance, vote_list } from '../lib/vote'
import alert from '../lib/alert'
import { post } from '../lib/ajax'
import date from '../lib/date'
import _ from '../lib/translate'

const hasVotes = timeslot => {
  if (timeslot.voteList.length) {
    return true
  }
  return null
}

export const TalkRow = ({ talk, timeslot, attend }) => {
  const isNow = date.isNow(timeslot)
  let icon = talk.vote && talk.vote.icon
  talk.attend = isNow ? () => attend(talk, timeslot) : undefined
  if (talk.attendance) {
    icon = 'ec ec-star2'
  } else if (isNow) {
    icon = 'ec ec-star2 grayscale'
  }
  icon += ' trigger'
  const Tag = talk.sortable ? Link : 'div'
  return (
    <li className="collection-item" onClick={talk.attend}>
      <i className={icon} />
      <Tag to={`/talk/${talk.id}/`}>
        {talk.room &&
          talk.room.name && (
            <span className="grey-text">[{talk.room.name}] </span>
          )}
        {talk.title}
      </Tag>
    </li>
  )
}

class Noop extends React.Component {
  render() {
    return this.props.children
  }
}

const TimeslotRow = ({ timeslot, attend }) => {
  const TimeTag = timeslot.sortableTalks.length ? Link : Noop
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-title">
          <TimeTag to={`/vote/${timeslot.id}/`}>
            {format(timeslot.datetime, 'h:mm A')}
            {date.isNow(timeslot) && <span className="right">Now!</span>}
          </TimeTag>
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
          {!timeslot.visibleTalks.length &&
            !hasVotes(timeslot) && (
              <li className="collection-item">
                <Link to={`/vote/${timeslot.id}/1`}>
                  {`0/${
                    timeslot.talkSet.length
                  } talks selected. Click to get started.`}
                </Link>
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
    alert.set('schedule')
  }
  componentWillUnmount() {
    alert.dismiss('schedule')
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
    if (!this.timeslots) {
      // set by prepTalkVotes
      return <div>{_`Loading`}</div>
    }

    // this.props.auth.user.userachievementSet.forEach(({ achievement }) =>
    //   alert.set(achievement.slug, achievement),
    // )
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
      const voteTalks = ts.sortableTalks.filter(t => t.vote)
      ts.visibleTalks = ts.talkSet.filter(t => {
        if (!t.sortable) {
          return true
        }
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
      if (!ts.visibleTalks.length) {
        ts.voteList = []
      }
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
