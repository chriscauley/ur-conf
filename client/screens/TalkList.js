import React from 'react'
import { navigate } from '@reach/router'

import _ from '../lib/translate'
import { post } from '../lib/ajax'
import { setVote } from '../lib/vote'
import { withTalks, withAuth } from '../graphql'
import TalkCard from '../components/TalkCard'

class TalkList extends React.Component {
  state = {
    timeslotId: undefined,
    isLoading: false,
    activeIndex: 0,
  }
  constructor(props) {
    super(props)
  }
  setTimeslot = event => {
    this.setState({ timeslotId: event.target.value })
  }
  getVisibleTimeslot() {
    // find the current talk being voted on and it's timeslot
    const { timeslotId } = this.state
    let { timeslots } = this.props.talkQuery
    if (timeslotId) {
      timeslots = timeslots.filter(ts => ts.id === timeslotId)
    }
    return timeslots.filter(ts => ts.talk_list.length)[0]
  }
  vote(vote, talk) {
    post('/api/vote/', {
      talk_id: talk.id,
      vote,
    })
    setVote(talk, vote)
    this.setState({ activeIndex: this.state.activeIndex + 1 })
  }
  render() {
    const { auth } = this.props
    const { loading, timeslots } = this.props.talkQuery
    if (loading || auth.loading) {
      return <div>{`Loading`}</div>
    }
    if (!auth.user) {
      navigate('/')
      return null
    }
    const timeslot = this.getVisibleTimeslot()
    const selectableTimeslots = timeslots.filter(
      ts => ts && ts.talk_list.length,
    )
    return (
      <div id="vote">
        <select
          onChange={this.setTimeslot}
          className="browser-default"
          defaultValue={timeslot.id}
        >
          {selectableTimeslots.map(ts => (
            <option key={ts.id} value={ts.id} onClick={this.SetVote}>
              {ts.time_display}
            </option>
          ))}
        </select>
        {timeslot.talk_list.map((talk, index) => (
          <TalkCard
            talk={talk}
            vote={this.vote}
            key={talk.id}
            parent={this}
            activeIndex={this.state.activeIndex}
            index={index}
          />
        ))}
      </div>
    )
  }
}

export default withAuth(withTalks(TalkList))
