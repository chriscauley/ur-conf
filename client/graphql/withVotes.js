import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const voteQuery = gql`
  {
    talkvotes {
      vote
      talkId
    }
    talkattendances {
      talkId
    }
  }
`

export const withVotes = graphql(voteQuery, {
  props: ({ data }) => {
    return {
      voteGQL: data,
    }
  },
})
