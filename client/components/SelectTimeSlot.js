import React from 'react'
import { format } from 'date-fns'

export default class SelectTimeSlot extends React.Component {
  render() {
    const { onChange, defaultValue, timeslots } = this.props
    return (
      <select
        defaultValue={defaultValue}
        onChange={onChange}
        className="browser-default"
      >
        {timeslots.map(ts => (
          <option key={ts.id} value={ts.id}>
            {format(ts.datetime, 'h:mm A')}
          </option>
        ))}
      </select>
    )
  }
}
