import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

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
  props: ({data}) => {
    return {
      talkQuery: data,
    }
  }
})