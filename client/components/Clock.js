import React from 'react'

import date from '../lib/date'

export default class Clock extends React.Component {
  click = () => {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = undefined
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
