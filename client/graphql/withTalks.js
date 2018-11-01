import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const talkQuery = gql`
  {
    timeslots {
      id
      datetime
      time
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
  props: ({ data }) => {
    return {
      talkGQL: data,
    }
  },
})
