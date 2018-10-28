import React from 'react'
import _ from '../lib/translate'
import { post } from '../lib/ajax'
import { vote_list, setVote, getTalkIcon } from '../lib/vote'
import { withTalks } from '../graphql'
import { orderBy, shuffle } from 'lodash'

class TalkList extends React.Component {
  state = {
    timeslotId: undefined,
    filter_key: undefined,
    isLoading: false,
  }
  setTimeSlot = event => {
    this._visibleTalk = undefined;
    this.setState({ timeslotId: event.target.value })
  }
  getVisible() {
    // find the current talk being voted on and it's timeslot
    if (this._visibleTalk) { return this._visibleTalk }
    const { timeslotId, filter_key } = this.state
    let { timeslots } = this.props.talkQuery
    if (timeslotId) {
      timeslots = timeslots.filter(ts => ts.id === timeslotId)
    }
    let talk, timeslot
    const filter = t =>
      filter_key === undefined ? !t.vote : t.vote && t.vote.value === filter_key
    for (timeslot of timeslots) {
      talk = shuffle(timeslot.talk_list).filter(filter)[0]
      if (talk) { break }
    }
    this._visibleTalk = talk
    return talk
  }
  vote(vote, talk) {
    return () => {
      this.setState({isLoading: true})
      post('/api/vote/', {
        talk_id: talk.id,
        vote,
      }).then(() => {
        setVote(talk, vote)
        this._visibleTalk = undefined;
        this.setState({isLoading: false})
      })
    }
  }
  render() {
    const { loading, timeslots } = this.props.talkQuery
    if (loading) {
      return <div>{`Loading`}</div>
    }
    const talk = this.getVisible()
    if (!talk) {
      return <div>{_`Timeslot cleared!`}</div>
    }
    const selectableTimeslots = timeslots.filter(
      ts => ts && ts.talk_list.length,
    )
    const nullvote = { value: 5, className: 'box grey' }
    let _votes = talk.timeslot.talk_list.map(({ id, vote = nullvote }) => ({
      ...vote,
      key: id,
    }))
    _votes = orderBy(_votes, ['value', 'asc'])
    let actionClassName = "card-action " + (this.state.isLoading?"is-loading":"ready")
    return (
      <div id="vote">
        <select
          onChange={this.setTimeSlot}
          className="browser-default"
          defaultValue={talk.timeslot.id}
        >
          {selectableTimeslots.map(ts => (
            <option key={ts.id} value={ts.id} onClick={this.SetVote}>
              {ts.time_display}
            </option>
          ))}
        </select>
        <div className="talkbreakdown">
          {_votes.map(vote => (
            <div {...vote} key={vote.key} />
          ))}
        </div>
        <div className="card" key={talk.id}>
          <div className="card-content">
            <div className="card-title">{talk.title}</div>
            <p>
              {_`with`} {talk.authors[0].name}
            </p>
            <small>
              {_`Room:`} {talk.room.name} {_`@`} {talk.timeslot.time_display}
            </small>
            {talk.vote}
          </div>
          <div className={actionClassName}>
            {vote_list.map(vote => (
              <a key={vote.value} onClick={this.vote(vote.value, talk)}>
                <span className={getTalkIcon(talk, vote)} /> {vote.verbose}
              </a>
            ))}
            <div class="progress">
              <div class="indeterminate"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withTalks(TalkList)
