export const vote_list = [
  { verbose: 'no', value: -1, icon: 'em em-x', className: 'box red' },
  {
    verbose: 'maybe',
    value: 0,
    icon: 'em em-thinking_face',
    className: 'box yellow',
  },
  {
    verbose: 'yes',
    value: 1,
    icon: 'fa fa-check green-text',
    className: 'box green',
  },
]

export const vote_map = {}

vote_list.forEach(vote => (vote_map[vote.value] = vote))

export const setVote = (talk, vote) => {
  talk.vote = { ...vote_map[vote] }
}

export const getTalkIcon = (talk, vote) => {
  if (talk.vote && vote.value === talk.vote.value) {
    return vote.icon + ' selected'
  }
  return vote.icon
}
