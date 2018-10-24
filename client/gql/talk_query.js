import gql from 'graphql-tag';

export const talk_query = gql`{
  talks {
    id,
    title,
    authors { id },
    roomId,
    timeslotId,
  },
  authors {
    id,
    name,
    contactInfo,
  },
  talkvotes {
    vote,
    talkId,
  },
  rooms {
    id,
    name,
  },
  timeslots {
    id,
    datetime,
  }
}`