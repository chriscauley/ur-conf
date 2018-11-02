export const vote_list = [
  { verbose: 'no', value: -1, icon: 'em em-x', className: 'red' },
  {
    verbose: 'maybe',
    value: 0,
    icon: 'em em-thinking_face',
    className: 'yellow',
  },
  {
    verbose: 'yes',
    value: 1,
    icon: 'fa fa-check green-text fa-em',
    className: 'green',
  },
]

export const vote_map = {}

vote_list.forEach(vote => (vote_map[vote.value] = vote))

export const setVote = (talk, vote) => {
  talk.vote = vote_map[vote]?{ ...vote_map[vote] }:undefined;
}

export const getTalkIcon = (talk, vote) => {
  if (talk.vote && vote.value === talk.vote.value) {
    return vote.icon + ' selected'
  }
  return vote.icon
}

export const prepTalkVotes = component => {
  // fold existing votes into the talk data
  // this needs to be called everytime a component is mounted
  const { talkGQL, voteGQL } = component.props
  if (talkGQL.prepped || talkGQL.loading || voteGQL.loading) {
    return
  }
  const voteMap = {}
  voteGQL.talkvotes.map(({ talkId, vote }) => (voteMap[talkId] = vote))
  talkGQL.timeslots.map(timeslot => {
    timeslot.talkSet.map(talk => {
      setVote(talk, voteMap[talk.id])
    })
  })
  talkGQL.prepped = true
}
