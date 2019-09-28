import React from 'react'
import { format } from 'date-fns'

export default ({ onChange, defaultValue, timeslots }) => {
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
