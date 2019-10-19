import React from 'react'
import { isBefore, addMinutes } from 'date-fns'

import navigate from '../lib/navigate'
import { withTalks } from '../graphql'

class NextTime extends React.Component {
  render() {
    if (this.props.talkGQL.loading) {
      return null
    }

    const talkSlots = this.props.talkGQL.conference.timeslotSet.filter(
      ts => ts.sortableTalks.length > 0
    )
    const nextSlot = talkSlots.find(ts => {
      const date = addMinutes(ts.datetime, 30)
      return isBefore(new Date(), date)
    })
    if (nextSlot) {
      navigate(`${this.props.path}${nextSlot.id}/`)
    } else {
      navigate(`${this.props.path}${talkSlots[0].id}/`)
    }
    return null
  }
}

export default withTalks(NextTime)
