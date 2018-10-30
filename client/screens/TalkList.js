import React from 'react'
import { navigate } from '@reach/router'
import Swipeable from 'react-swipeable'

import _ from '../lib/translate'
import { post } from '../lib/ajax'
import { setVote } from '../lib/vote'
import { withTalks, withAuth } from '../graphql'
import TalkCard from '../components/TalkCard'

class TalkList extends React.Component {
  state = {
    timeslotId: undefined,
    isLoading: false,
  }
  setTimeSlot = event => {
    this._visibleTalk = undefined
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
  preVote = () => this.setState({ isLoading: true })
  postVote = () => this.setState({ isLoading: false })
  vote(vote, talk) {
    return () => {
      this.setState({ isLoading: true })
      post('/api/vote/', {
        talk_id: talk.id,
        vote,
      }).then(() => {
        setVote(talk, vote)
        this._visibleTalk = undefined
        this.setState({ isLoading: false })
        this.card.style.left = 0
        this.card.style.top = 0
      })
    }
  }
  swiped = (_e, _deltaX, _deltaY, isFlick, _velocity) => {
    if (!isFlick) {
      this.card.style.left = 0
      this.card.style.top = 0
    }
  }
  swiping = (_e, deltaX, _deltaY, _absX, _absY, _velocity) => {
    this.card = this.card || document.querySelector('.actual-card')
    this.card.style.left = -deltaX + 'px'
  }
  swipedLeft = talk => () => {
    this.vote(-1, talk)()
  }
  swipedRight = talk => () => {
    this.vote(1, talk)()
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
    window.TL = this
    const timeslot = this.getVisibleTimeslot()
    /*if (!talk) {
      return <div>{_`Timeslot cleared!`}</div>
    }*/
    const selectableTimeslots = timeslots.filter(
      ts => ts && ts.talk_list.length,
    )
    return (
      <Swipeable
        onSwiping={this.swiping}
        onSwipedLeft={this.swipedLeft}
        onSwipedRight={this.swipedRight}
        onSwiped={this.swiped}
        id="vote"
      >
        <select
          onChange={this.setTimeSlot}
          className="browser-default"
          defaultValue={timeslot.id}
        >
          {selectableTimeslots.map(ts => (
            <option key={ts.id} value={ts.id} onClick={this.SetVote}>
              {ts.time_display}
            </option>
          ))}
        </select>
        {timeslot.talk_list.map(talk => (
          <TalkCard talk={talk} vote={this.vote} key={talk.id} />
        ))}
      </Swipeable>
    )
  }
}

export default withAuth(withTalks(TalkList))
