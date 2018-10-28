import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { prepData } from '../lib/prepData'
const talkQuery = gql`
  {
    talks {
      id
      title
      authors {
        id
      }
      roomId
      timeslotId
    }
    authors {
      id
      name
      contactInfo
    }
    talkvotes {
      vote
      talkId
    }
    rooms {
      id
      name
    }
    timeslots {
      id
      datetime
    }
  }
`

export const withTalks = graphql(talkQuery, {
  props: ({ data }) => {
    prepData(data)
    return {
      talkQuery: data,
    }
  },
})
