import React from 'react'

import date from '../lib/date'

export default class Clock extends React.Component {
  render() {
    return (
      <a onClick={() => date.click()} className="Clock">
        {date.print()}
      </a>
    )
  }
}
