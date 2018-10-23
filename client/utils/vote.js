
export const vote_list = [
  { verbose: "no", value: -1, icon: "em em--1" },
  { verbose: "maybe", value: 0, icon: "em em-thinking_face" },
  { verbose: "yes", value: 1, icon: "em em---1" },
];

export const vote_map = {};

vote_list.forEach(vote => vote_map[vote.value] = vote)

export const setVote = (talk,vote) => {
  talk.vote = { ... vote_map[vote] }
}

export const getTalkIcon = (talk,vote) => {
  if (talk.vote && vote.value == talk.vote.value) {
    return vote.icon + " selected"
  }
  return vote.icon
}