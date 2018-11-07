import React from 'react'

import date from '../lib/date'

export default class Clock extends React.Component {
  componentWillUnmount() {
    clearInterval(window.CLOCK_INTERVAL)
  }
  constructor(props) {
    super(props)
    // #! TODO
    setTimeout(() => {
      if (!this.clicked) {
        window.ALERT.set('clock')
      }
    }, 90000)
  }
  click = () => {
    this.clicked = true
    clearInterval(window.CLOCK_INTERVAL)
    window.CLOCK_INTERVAL = setInterval(() => {
      date.tick()
      this.forceUpdate()
    }, 1000)
    const now = new Date()
    if (now - this.lastClick < 500) {
      date.reset()
      date.SPEED = 0
      this.forceUpdate()
      return
    }
    this.lastClick = now
    if (!date.SPEED) {
      date.SPEED = 5
    } else if (date.SPEED === 5) {
      date.SPEED = 15
    } else {
      date.SPEED = 0
    }
    this.forceUpdate()
  }
  render() {
    const s = date.SPEED ? `+${date.SPEED}/s` : null
    return (
      <a onClick={this.click} className="Clock">
        {date.print()}
        <b className="small">{s}</b>
      </a>
    )
  }
}
