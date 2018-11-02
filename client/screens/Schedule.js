import React from 'react'
import { Link } from '@reach/router'
import { sortBy } from 'lodash'
import { format } from 'date-fns'

import { withTalks, withVotes } from '../graphql'
import { prepTalkVotes } from '../lib/vote'
import _ from '../lib/translate'

const hasTalks = (timeslot) => {
  if (timeslot.talkSet.length) { return true }
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

      ts.maybeVotes = ts.talkSet.filter(t => t.vote && t.vote.value === 0).length
      ts.nullVotes = ts.talkSet.filter(t => !t.vote).length
      ts.noVotes = ts.talkSet.filter(t => t.vote && t.vote.value === -1).length
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
                {hasTalks(timeslot) &&
                <li className="collection-item card-action">
                  <Link to={`/vote/${timeslot.id}/`}>
                    <i className="em em-thinking_face" /> x {timeslot.maybeVotes}
                  </Link>
                  <Link to={`/vote/${timeslot.id}/`}>
                    <i className="em em--1" /> x {timeslot.noVotes}
                  </Link>
                  <Link to={`/vote/${timeslot.id}/`}>
                    <i className="em em-question" /> x {timeslot.nullVotes}
                  </Link>
                </li>
                }
              </ul>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default withTalks(withVotes(Schedule))
