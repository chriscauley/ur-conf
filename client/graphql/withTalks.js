import React from 'react'
import { Query } from '@apollo/react-components'
import gql from 'graphql-tag'

import { Client } from './client' // eslint-disable-line

const talkQuery = gql`
  query Conference($id: Int!) {
    conference(id: $id) {
      name
      id
      locations {
        id
        geometry
        name
        roomSet {
          id
          name
          geometry
        }
      }
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

export const withTalks = Component =>
  function withTalks(props) {
    const client = Client('/cached/talks2017.json')
    return (
      <Query query={talkQuery} variables={{ id: 1 }} client={client}>
        {({ loading, error, data = {}, startPolling }) => {
          data.loading = loading
          data.error = error
          startPolling(1000 * 120)
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
