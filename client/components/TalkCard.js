import React from 'react'
import _ from '../lib/translate'
import { vote_list, getTalkIcon } from '../lib/vote'

export default class TalkCard extends React.Component {
  render() {
    const { talk } = this.props
    return (
      <div className="card-wrapper">
        <div className="card">
          <div className="card-content">
            <div className="card-title">
              <h5>{talk.title}</h5>
            </div>
            <p>
              {_`with`} {talk.authors[0].name}
            </p>
            <small>
              {_`Room:`} {talk.room.name} {_`@`} {talk.timeslot.time_display}
            </small>
            <hr />
            <p className="description">{talk.description}</p>
          </div>
          <div className="card-action">
            {vote_list.map(vote => (
              <a key={vote.value} onClick={this.props.vote(vote.value, talk)}>
                <span className={getTalkIcon(talk, vote)} /> {vote.verbose}
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
