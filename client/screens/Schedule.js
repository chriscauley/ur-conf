import React from 'react'
import { Link } from '@reach/router'
import { format } from 'date-fns'

import { withTalks, withVotes } from '../graphql'
import { prepTalkVotes } from '../lib/vote'
import date from '../lib/date'
import _ from '../lib/translate'

const hasVotes = timeslot => {
  if (timeslot.voteList.length) {
    return true
  }
  return null
}

window.ATTENDS = JSON.parse(window.localStorage.getItem('attends') || '{}')

const TalkRow = ({ talk, timeslot }) => {
  const isNow = date.isNow(timeslot)
  let icon = talk.vote.icon
  let click = () => {}
  if (window.ATTENDS[timeslot.id] === talk.id) {
    icon = 'em em-star2'
  } else if (isNow) {
    icon = 'fa fa-square-o grey-text lighten-2 fa-em'
  }
  icon += ' trigger'
  if (isNow) {
    click = () => {
      window.ATTENDS[timeslot.id] = talk.id
      window.localStorage.setItem('attends', JSON.stringify(window.ATTENDS))
      setTimeout(date.tick, 0)
    }
  }
  return (
    <li className="collection-item" onClick={click}>
      <i className={icon} />
      <span>{talk.title}</span>
    </li>
  )
}

class Schedule extends React.Component {
  componentDidMount() {
    const el = document.querySelector('[role="group"]')
    el && el.scrollTo(0, 0)
    date.visible = this
  }
  render() {
    const { loading } = this.props.talkGQL
    if (loading) {
      return <div>{_`Loading`}</div>
    }
    prepTalkVotes(this)
    const { timeslots } = this
    timeslots.forEach(ts => {
      const talkSet = ts.talkSet
      const voteTalks = talkSet.filter(t => t.vote)
      ts.visibleTalks = voteTalks.filter(t => t.vote.value === 1)

      const maybeVotes = voteTalks.filter(t => t.vote.value === 0).length
      const noVotes = voteTalks.filter(t => t.vote.value === -1).length
      const nullVotes = talkSet.filter(t => !t.vote).length

      ts.voteList = []
      if (noVotes) {
        ts.voteList.push({
          icon: 'em em-x',
          count: noVotes,
          link: `/vote/${ts.id}/-1/`,
        })
      }
      if (maybeVotes) {
        ts.voteList.push({
          icon: 'em em-thinking_face',
          count: maybeVotes,
          link: `/vote/${ts.id}/0/`,
        })
      }
      if (nullVotes) {
        ts.voteList.push({
          icon: 'em em-question',
          count: nullVotes,
          link: `/vote/${ts.id}/`,
        })
      }
    })
    return (
      <div className="container" id="schedule">
        {timeslots.map(timeslot => (
          <div className="card" key={timeslot.id}>
            <div className="card-content">
              <div className="card-title">
                {format(timeslot.datetime, 'h:mm A')}
                {date.isNow(timeslot) && <span className="right">Now!</span>}
              </div>
              <ul className="collection">
                {timeslot.visibleTalks.map(talk => (
                  <TalkRow talk={talk} timeslot={timeslot} key={talk.id} />
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
        ))}
      </div>
    )
  }
}

export default withTalks(withVotes(Schedule))
