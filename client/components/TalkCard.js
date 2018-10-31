import React from 'react'
import _ from '../lib/translate'
import { vote_list, getTalkIcon } from '../lib/vote'
import Swipeable from 'react-swipeable'

export default class TalkCard extends React.Component {
  state = {
    cardStyle: { left: 0 },
  }
  swiped = (_e, deltaX, _deltaY, _isFlick, _velocity) => {
    if (!this.active) {
      return
    }
    if (deltaX > 200) {
      this.vote(-1)
    }
    if (deltaX < -200) {
      this.vote(1)
    }
    this.setState({ cardStyle: { left: 0 } })
  }
  swiping = (_e, deltaX, _deltaY, _absX, _absY, _velocity) => {
    if (!this.active) {
      return
    }
    this.setState({ cardStyle: { left: -deltaX + 'px' } })
  }
  vote = value => {
    this.props.parent.vote(value, this.props.talk)
  }
  _vote(value) {
    return () => this.vote(value)
  }
  render() {
    const { talk, activeIndex, index } = this.props
    const active = (this.active = activeIndex === index && 'active')
    const zIndex = Math.abs(index - activeIndex)
    const { vote } = talk
    let color = (vote && vote.className) || 'grey'
    color += ' lighten-4'
    const className = `talk ${active} index-${zIndex}`
    const cardClass = `card ${color}`
    const actionClass = `${color} card-action`
    return (
      <Swipeable
        onSwiping={this.swiping}
        onSwiped={this.swiped}
        id={'talk-' + talk.id}
        className={className}
        onClick={this.props.onClick}
        style={{ zIndex: 100 - zIndex }}
      >
        <div className="card-wrapper">
          <div className={cardClass} style={this.state.cardStyle}>
            <div className="card-content">
              <div className="card-title">
                <h5>{talk.title}</h5>
              </div>
              <div className="card-details">
                <p>
                  {_`with`} {talk.authors[0].name}
                </p>
                <small>
                  {_`Room:`} {talk.room.name} {_`@`}{' '}
                  {talk.timeslot.time_display}
                </small>
                <hr />
                <p className="description">{talk.description}</p>
              </div>
            </div>
            <div className={actionClass}>
              {vote_list.map(vote => (
                <a key={vote.value} onClick={this._vote(vote.value)}>
                  <span className={getTalkIcon(talk, vote)} /> {vote.verbose}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Swipeable>
    )
  }
}
