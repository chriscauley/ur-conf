import React from 'react'
import withQuery from '../graphql/withQuery'
import config from '../lib/config'

const query = `{
  conferences {
    id
    name
    date
  }
}`

const selectConference = id => {
  config.setItem('CURRENT_CONFERENCE', id)
}

class ConferencePicker extends React.Component {
  render() {
    const { conferences } = this.props.data
    return (
      <ul>
        {conferences.map(({ id, name }) => (
          <li key={id} onClick={() => selectConference(id)}>
            {name}
          </li>
        ))}
      </ul>
    )
  }
}

export default withQuery(query, ConferencePicker)
