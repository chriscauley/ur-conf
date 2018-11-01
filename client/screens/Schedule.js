import React from 'react'
import { Link } from '@reach/router'
import { sortBy } from 'lodash'
import { withTalks, withVotes } from '../graphql'

import { prepTalkVotes } from '../lib/vote'
import _ from '../lib/translate'

class Schedule extends React.Component {
  render() {
    const { loading, timeslots } = this.props.talkGQL
    if (loading) {
      return <div>{_`Loading`}</div>
    }
    prepTalkVotes(this)
    timeslots.forEach(ts => {
      ts.visibleTalks = ts.talkSet.filter(t => t.vote && t.vote.value >= 0)
      ts.visibleTalks = sortBy(ts.visibleTalks, t => t.vote && -t.vote.value)

      ts.nullVotes = ts.talkSet.filter(t => !t.vote).length
      ts.noVotes = ts.talkSet.filter(t => t.vote && t.vote.value === -1).length
    })
    return (
      <div className="container" id="schedule">
        {timeslots.map(timeslot => (
          <div className="card" key={timeslot.id}>
            <div className="card-content">
              <div className="card-title">{timeslot.time}</div>
              <ul className="collection">
                {timeslot.visibleTalks.map(talk => (
                  <li className="collection-item" key={talk.id}>
                    {talk.vote && <span className={talk.vote.icon} />}
                    {talk.title}
                  </li>
                ))}
                {(timeslot.noVotes || timeslot.nullVotes || '') && (
                  <li className="collection-item card-action">
                    <Link to="/vote/">
                      <i className="em em--1" /> x {timeslot.noVotes}
                    </Link>
                    <Link to="/vote/">
                      <i className="em em-question" /> x {timeslot.nullVotes}
                    </Link>
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
