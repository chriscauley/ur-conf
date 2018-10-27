import React from 'react'
import { sortBy } from 'lodash'
import { withTalks } from '../graphql'
import { prepData } from '../lib/prepData'
import _ from '../lib/translate'

class Schedule extends React.Component {
  render() {
    const { loading } = this.props.talkQuery
    if (loading) {
      return <div>{_`Loading`}</div>
    }
    const { timeslots } = prepData(this.props.talkQuery)
    return (
      <div className="row">
        <div className="col s12 m8 l6">
          {timeslots.map(timeslot => (
            <div className="card" key={timeslot.id}>
              <div className="card-content">
                <div className="card-title">{timeslot.time_display}</div>
                <ul className="collection">
                  {sortBy(timeslot.talk_list, ['vote', 'title']).map(talk => (
                    <li className="collection-item" key={talk.id}>
                      {talk.vote && <span className={talk.vote.icon} />}
                      {talk.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default withTalks(Schedule)
