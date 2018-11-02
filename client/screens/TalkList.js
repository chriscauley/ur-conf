import React from 'react'
import { navigate } from '@reach/router'
import { format } from 'date-fns'

import _ from '../lib/translate'
import { post } from '../lib/ajax'
import { setVote, prepTalkVotes } from '../lib/vote'
import { withTalks, withVotes, withAuth } from '../graphql'
import TalkCard from '../components/TalkCard'

class TalkList extends React.Component {
  state = {
    isLoading: false,
    activeIndex: 0,
  }
  componentWillUnmount() {
    this.prepped = undefined
  }
  getVisibleTimeslot() {
    // find the current talk being voted on and it's timeslot
    const { timeslotId } = this.props
    const { timeslots } = this.props.talkGQL
    return timeslots.find(ts => ts.id === timeslotId)
  }
  vote(vote, talk) {
    post('/api/vote/', {
      talk_id: talk.id,
      vote,
    })
    setVote(talk, vote)
    this.setState({ activeIndex: this.state.activeIndex + 1 })
    this.props.voteGQL.refetch()
  }
  onClick = index => {
    this.setState({ activeIndex: index })
  }
  render() {
    const { auth } = this.props
    const { loading, timeslots } = this.props.talkGQL
    if (loading || auth.loading) {
      return <div>{`Loading`}</div>
    }
    prepTalkVotes(this)
    if (!auth.user) {
      navigate('/')
      return null
    }
    const timeslot = this.getVisibleTimeslot()
    const selectableTimeslots = timeslots.filter(ts => ts && ts.talkSet.length)
    return (
      <div id="vote">
        <select
          onChange={this.setTimeslot}
          className="browser-default"
          defaultValue={timeslot.id}
        >
          {selectableTimeslots.map(ts => (
            <option key={ts.id} value={ts.id} onClick={this.SetVote}>
              {format(ts.datetime, 'h:mm A')}
            </option>
          ))}
        </select>
        {timeslot.talkSet.map((talk, index) => (
          <TalkCard
            talk={talk}
            vote={this.vote}
            key={talk.id}
            parent={this}
            activeIndex={this.state.activeIndex}
            index={index}
            onClick={this.onClick}
          />
        ))}
      </div>
    )
  }
}

export default withAuth(withTalks(withVotes(TalkList)))
