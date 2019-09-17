import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import { Client } from './client' // eslint-disable-line

const talkQuery = gql`
  query Conference($id: Int!) {
    conference(id: $id) {
      timeslotSet {
        id
        datetime
        talkSet {
          id
          title
          roomId
          timeslotId
          description
          sortable
          authors {
            id
            name
            contactInfo
          }
          room {
            id
            name
          }
        }
      }
    }
  }
`

export const withTalks = graphql(talkQuery, {
  options: {
    // client: Client('/cached/talks2018.json'),
  },
  props: ({ data }) => {
    if (data.conference && data.conference.timeslotSet) {
      data.conference.timeslotSet.forEach(ts => {
        ts.sortableTalks = ts.talkSet.filter(t => t.sortable)
      })
    }
    return {
      talkGQL: data,
    }
  },
})
