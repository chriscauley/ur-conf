import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const voteQuery = gql`
  {
    talkvotes {
      vote
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
