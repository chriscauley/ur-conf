import React from 'react'
import { post } from '../lib/ajax'
import { vote_list, setVote, getTalkIcon } from '../lib/vote'

export default class TalkList extends React.Component {
  vote(vote, talk) {
    return () => {
      post('/api/vote/', {
        talk_id: talk.id,
        vote,
      }).then(() => {
        talk.vote = vote
        this.forceUpdate()
      })
    }
  }
  render() {
    const visible_talks = this.props.root.state.talks.filter(
      t => t.vote == undefined,
    )
    return (
      <div className="row">
        <div className="col s12 m6">
          {visible_talks.map(talk => (
            <div className="card" key={talk.id}>
              <div className="card-content">
                <div className="card-title">{talk.title}</div>
                <p>with {talk.authors[0].name}</p>
                <small>Room: {talk.room.name}</small>
              </div>
              <div className="card-action">
                {vote_list.map(vote => (
                  <a key={vote.value} onClick={this.vote(vote.value, talk)}>
                    <span className={getTalkIcon(talk, vote)} /> {vote.verbose}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
