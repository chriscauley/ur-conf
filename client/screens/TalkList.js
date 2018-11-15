import React from 'react'
import { compose } from 'react-apollo'
import { format } from 'date-fns'

import _ from '../lib/translate'
import navigate from '../lib/navigate'
import { post } from '../lib/ajax'
import { setVote, prepTalkVotes } from '../lib/vote'
import { withTalks, withAuth } from '../graphql'
import TalkCard from '../components/TalkCard'

class TalkList extends React.Component {
  state = {
    isLoading: false,
    activeIndex: undefined,
  }
  componentWillUnmount() {
    this.timeslots = undefined
  }
  getVisibleTimeslot() {
    if (this.props.talkId) {
      return this.timeslots.find(ts =>
        ts.sortableTalks.find(t => t.id === this.props.talkId),
      )
    }
    // timeslot from url
    const { timeslotId } = this.props
    return this.timeslots.find(ts => ts.id === timeslotId)
  }
  vote(vote, talk) {
    window.ALERT.dismiss('pre-vote')
    window.ALERT.set('post-vote')
    post('/api/vote/', {
      talk_id: talk.id,
      vote,
    })
    setVote(talk, vote)
    this.setState({ activeIndex: this.getActiveIndex() + 1 })
    this.props.auth.refetch()
  }
  onClick = index => {
    this.setState({ activeIndex: index })
  }
  setTimeslot = event => {
    navigate(`/vote/${event.target.value}/`)
  }
  getActiveIndex() {
    if (this.state.activeIndex !== undefined) {
      return this.state.activeIndex
    }
    const timeslot = this.getVisibleTimeslot()
    if (this.props.talkId !== undefined) {
      const index = timeslot.talkSet.findIndex(t => t.id === this.props.talkId)
      this.scrollTo(index)
      return index
    }
    if (this.props.voteSort !== undefined) {
      const voteSort = parseInt(this.props.voteSort)
      const index = timeslot.talkSet.findIndex(
        ({ vote }) => vote && vote.value === voteSort,
      )
      if (index !== -1) {
        this.scrollTo(index)
        return index
      }
    }
    return 0
  }
  scrollTo(index) {
    setTimeout(() => {
      const el = document.getElementById('vote')
      el.scrollTo(0, index * 30)
    }, 0)
  }
  render() {
    window.ALERT.set('pre-vote')
    const { auth, talkGQL } = this.props
    if (talkGQL.loading || auth.loading) {
      return <div>{`Loading`}</div>
    }
    if (!auth.user) {
      navigate('/')
      return null
    }
    prepTalkVotes(this, true)
    if (!this.timeslots) {
      talkGQL.refetch()
      return <div>{`Loading`}</div>
    }
    const timeslots = this.timeslots
    const timeslot = this.getVisibleTimeslot()
    if (!timeslot) {
      navigate('/schedule/')
      return null
    }
    const selectableTimeslots = timeslots.filter(
      ts => ts && ts.sortableTalks.length,
    )
    const toNext = () => navigate(`/vote/${timeslot.nextSlotId}/`)
    if (!timeslot.talkSet.find(t => t.sortable)) {
      if (timeslot.nextSlotId) {
        toNext()
      } else {
        navigate('/schedule/')
      }
      return null
    }
    const activeIndex = this.getActiveIndex()
    if (timeslot.sortableTalks.length <= activeIndex) {
      if (timeslot.nextSlotId) {
        window.ALERT.set('slot-complete', {
          click: toNext,
          force: true,
          color: 'grey',
        })
      } else {
        // #! TODO this doesn't actually appear because of closing remarks
        window.ALERT.set('last-slot-complete', {
          click: () => navigate(`/schedule/`),
          force: true,
          color: 'grey',
        })
      }
    }
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
            activeIndex={activeIndex}
            index={index}
            onClick={this.onClick}
          />
        ))}
      </div>
    )
  }
}

export default compose(
  withAuth,
  withTalks,
)(TalkList)
