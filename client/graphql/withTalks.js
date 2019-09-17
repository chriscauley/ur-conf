import React from 'react'
import { Query } from '@apollo/react-components'
import gql from 'graphql-tag'

import { Client } from './client' // eslint-disable-line

const talkQuery = gql`
  query Conference($id: Int!) {
    conference(id: $id) {
      name
      id
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

const client = Client()
export const withTalks = Component =>
  function withTalks(props) {
    return (
      <Query query={talkQuery} variables={{ id: 1 }} client={client}>
        {({ loading, error, data = {}, startPolling }) => {
          data.loading = loading
          data.error = error
          data.startPolling = startPolling
          if (data && data.conference && data.conference.timeslotSet) {
            data.conference.timeslotSet.forEach(ts => {
              ts.sortableTalks = ts.talkSet.filter(t => t.sortable)
            })
          }
          return <Component talkGQL={data} {...props} />
        }}
      </Query>
    )
  }
