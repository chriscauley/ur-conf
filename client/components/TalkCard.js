import React from 'react'
import _ from '../lib/translate'
import { vote_list, getTalkIcon } from '../lib/vote'
import Swipeable from 'react-swipeable'

export default class TalkCard extends React.Component {
  state = {
    cardStyle: { left: 0 },
  }
  swiped = (_e, _deltaX, _deltaY, _isFlick, _velocity) => {
    if (!this.props.active) {
      return
    }
    this.setState({ cardStyle: { left: 0 } })
  }
  swiping = (_e, deltaX, _deltaY, _absX, _absY, _velocity) => {
    if (!this.props.active) {
      return
    }
    this.setState({ cardStyle: { left: -deltaX + 'px' } })
  }
  swipedLeft = () => {
    if (!this.props.active) {
      return
    }
    this.vote(-1)
  }
  swipedRight = () => {
    if (!this.props.active) {
      return
    }
    this.vote(1)
  }
  vote = value => {
    throw 'NotImplemented' + value
  }
  _vote = value =>
    function vote() {
      this.vote(value)
    }
  render() {
    const { talk, active, index } = this.props
    const className = `talk ${active ? 'active' : ''} index-${Math.abs(index)}`
    return (
      <Swipeable
        onSwiping={this.swiping}
        onSwipedLeft={this.swipedLeft}
        onSwipedRight={this.swipedRight}
        onSwiped={this.swiped}
        id={'talk-' + talk.id}
        className={className}
        onClick={this.props.onClick}
        style={{ zIndex: 100 - Math.abs(index) }}
      >
        <div className="card-wrapper">
          <div className="card" style={this.state.cardStyle}>
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
            <div className="card-action">
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
