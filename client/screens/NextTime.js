import React from 'react'

import navigate from '../lib/navigate'
import { withTalks } from '../graphql'

class NextTime extends React.Component {
  render() {
    if (!this.props.talkGQL.loading) {
      const slot = this.props.talkGQL.timeslots.find(ts => {
        return ts.sortableTalks.length > 0
      })
      navigate(`/vote/${slot.id}/`)
    }
    return null
  }
}

export default withTalks(NextTime)
