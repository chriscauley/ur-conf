import React from 'react'
import { Link } from '@reach/router'
import { sortBy } from 'lodash'
import { withTalks } from '../graphql'
import _ from '../lib/translate'

class Schedule extends React.Component {
  render() {
    const { loading, timeslots } = this.props.talkQuery
    if (loading) {
      return <div>{_`Loading`}</div>
    }
    timeslots.forEach(ts => {
      ts.visibleTalks = ts.talk_list.filter(t => t.vote && t.vote.value >= 0)
      ts.visibleTalks = sortBy(ts.visibleTalks, t => t.vote && -t.vote.value)

      ts.nullVotes = ts.talk_list.filter(t => !t.vote).length
      ts.noVotes = ts.talk_list.filter(
        t => t.vote && t.vote.value === -1,
      ).length
    })
    return (
      <div className="w400 container">
        {timeslots.map(timeslot => (
          <div className="card" key={timeslot.id}>
            <div className="card-content">
              <div className="card-title">{timeslot.time_display}</div>
              <ul className="collection">
                {timeslot.visibleTalks.map(talk => (
                  <li className="collection-item" key={talk.id}>
                    {talk.vote && <span className={talk.vote.icon} />}
                    {talk.title}
                  </li>
                ))}
                {(timeslot.noVotes || timeslot.nullVotes || '') && (
                  <li className="collection-item card-action">
                    <Link to="/">
                      <i className="em em--1" /> x {timeslot.noVotes}
                    </Link>
                    <Link to="/">
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

export default withTalks(Schedule)
