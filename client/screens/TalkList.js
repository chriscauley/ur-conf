import React from 'react'
import { post } from '../lib/ajax'
import { vote_list, setVote, getTalkIcon, prepVote } from '../lib/vote'
import { withTalks } from '../graphql'
import { shuffle } from 'lodash'

class TalkList extends React.Component {
  state = {
    timeslotId: undefined,
    filter_key: undefined,
  }
  setTimeSlot = event => {
    this.setState({ timeslotId: event.target.value })
  }
  getVisible() {
    // find the current talk being voted on and it's timeslot
    const { timeslotId, filter_key } = this.state
    let { timeslots } = this.props.talkQuery
    if (timeslotId) {
      timeslots = timeslots.filter(ts => ts.id === timeslotId)
    }
    let talk, timeslot
    const filter = t => !t.vote
    for (timeslot of timeslots) {
      talk = shuffle(timeslot.talk_list).filter(filter)[0]
      if (talk) {
        break
      }
    }
    return {
      talk,
      timeslot,
    }
  }
  vote(vote, talk) {
    return () => {
      post('/api/vote/', {
        talk_id: talk.id,
        vote,
      }).then(() => {
        setVote(talk, vote)
        this.forceUpdate()
      })
    }
  }
  render() {
    const { loading, timeslots } = this.props.talkQuery
    if (loading) {
      return <div>Loading</div>
    }
    const { talk, timeslot } = this.getVisible()
    if (!talk) {
      return <div>Timeslot cleared!</div>
    }
    const selectableTimeslots = timeslots.filter(
      ts => ts && ts.talk_list.length,
    )
    return (
      <div className="w400">
        <div className="row">
          <div className="col s6">
            <select
              onChange={this.setTimeSlot}
              className="browser-default"
              defaultValue={talk.timeslot.id}
            >
              {selectableTimeslots.map(ts => (
                <option key={ts.id} value={ts.id}>
                  {ts.time_display}
                </option>
              ))}
            </select>
          </div>
          <div className="col s6">
            <select
              onChange={this.setFilter}
              className="browser-default"
              defaultValue=""
            >
              <option value="">No Vote</option>
            </select>
          </div>
        </div>
        <div className="card" key={talk.id}>
          <div className="card-content">
            <div className="card-title">{talk.title}</div>
            <p>with {talk.authors[0].name}</p>
            <small>
              Room: {talk.room.name} @ {talk.timeslot.time_display}
            </small>
            {talk.vote}
          </div>
          <div className="card-action">
            {vote_list.map(vote => (
              <a key={vote.value} onClick={this.vote(vote.value, talk)}>
                <span className={getTalkIcon(talk, vote)} /> {vote.verbose}
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default withTalks(TalkList)
