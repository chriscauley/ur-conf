import React from 'react'

import navigate from '../lib/navigate'
import { withTalks } from '../graphql'

class NextTime extends React.Component {
  render() {
    if (this.props.talkGQL.loading) {
      return null
    }
    const slot = this.props.talkGQL.conference.timeslotSet.find(ts => {
      return ts.sortableTalks.length > 0
    })
    navigate(`${this.props.path}${slot.id}/`)
    return null
  }
}

export default withTalks(NextTime)
