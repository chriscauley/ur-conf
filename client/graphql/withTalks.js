import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Client } from './client'

const talkQuery = gql`
  {
    timeslots {
      id
      datetime
      talkSet {
        id
        title
        roomId
        timeslotId
        description
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
`

export const withTalks = graphql(talkQuery, {
  options: {
    client: Client('/cached/talks2017.json'),
  },
  props: ({ data }) => {
    return {
      talkGQL: data,
    }
  },
})
