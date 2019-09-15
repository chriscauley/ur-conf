import React from 'react'

import alert from '../lib/alert'
import date from '../lib/date'

export default class Clock extends React.Component {
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  constructor(props) {
    super(props)

    date.inDebugMode() &&
      setTimeout(() => {
        // if debug is on, alert them that they can control the clock
        if (!this.clicked) {
          alert.set('clock')
        }
      }, 90000)

    this.interval = setInterval(() => {
      date.tick()
      this.forceUpdate()
    }, date.getRate())
  }

  click = () => {
    if (!date.DEBUG) {
      return
    }
    if (!this.interval) {
      console.log('clock not on yet') // eslint-disable-line
      return
    }
    this.clicked = true
    const now = new Date()

    if (now - this.lastClick < 400) {
      // double clicked. reset the clock
      date.reset()
      date.SPEED = 0
      this.forceUpdate()
      return
    }
    this.lastClick = now

    // cycle through speeds
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
