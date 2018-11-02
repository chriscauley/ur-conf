import React from 'react'
import { Link } from '@reach/router'
import { format } from 'date-fns'

import { withTalks, withVotes } from '../graphql'
import { prepTalkVotes } from '../lib/vote'
import _ from '../lib/translate'

const hasVotes = timeslot => {
  if (timeslot.voteList.length) {
    return true
  }
  return null
}

class Schedule extends React.Component {
  render() {
    const { loading, timeslots } = this.props.talkGQL
    if (loading) {
      return <div>{_`Loading`}</div>
    }
    prepTalkVotes(this)
    timeslots.forEach(ts => {
      ts.visibleTalks = ts.talkSet.filter(t => t.vote && t.vote.value === 1)

      const maybeVotes = ts.talkSet.filter(t => t.vote && t.vote.value === 0)
        .length
      const nullVotes = ts.talkSet.filter(t => !t.vote).length
      const noVotes = ts.talkSet.filter(t => t.vote && t.vote.value === -1)
        .length
      ts.voteList = []
      if (noVotes) {
        ts.voteList.push({
          icon: 'em em--1',
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
              </div>
              <ul className="collection">
                {timeslot.visibleTalks.map(talk => (
                  <li className="collection-item" key={talk.id}>
                    {talk.vote && <span className={talk.vote.icon} />}
                    {talk.title}
                  </li>
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
