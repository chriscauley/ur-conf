import React from 'react'
import { navigate } from '@reach/router'

import { withTalks } from '../graphql'

class NextTime extends React.Component {
  render() {
    if (!this.props.talkGQL.loading) {
      const slot = this.props.talkGQL.timeslots.find(ts => {
        return ts.talkSet.length > 0
      })
      navigate(`/vote/${slot.id}/`)
    }
    return null
  }
}

export default withTalks(NextTime)
