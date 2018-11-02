import React from 'react'

import date from '../lib/date'

export default class Clock extends React.Component {
  click = () => {
    const now = new Date()
    if (now - this.lastClick < 500) {
      clearInterval(this.interval)
      date.reset()
      this.forceUpdate()
      return
    }

    this.lastClick = now

    if (this.interval) {
      if (date.SPEED === 60) {
        date.SPEED = 15 * 60
      } else {
        date.SPEED = 60
        clearInterval(this.interval)
        this.interval = undefined
      }
    } else {
      this.interval = setInterval(() => {
        date.tick()
        this.forceUpdate()
      }, 1000)
    }
  }
  render() {
    return (
      <a onClick={this.click} className="Clock">
        {date.print()}
      </a>
    )
  }
}
