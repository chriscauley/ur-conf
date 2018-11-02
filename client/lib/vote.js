import { cloneDeep, shuffle, sortBy } from 'lodash'

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
  talk.vote = vote_map[vote] ? { ...vote_map[vote] } : undefined
}

export const getTalkIcon = (talk, vote) => {
  if (talk.vote && vote.value === talk.vote.value) {
    return vote.icon + ' selected'
  }
  return vote.icon
}

export const prepTalkVotes = (component, resort) => {
  // fold existing votes into the talk data
  // this needs to be called everytime a component is mounted
  // the cloned component.timeslots prevents the TalkList from re-prepping every render
  const { talkGQL, voteGQL } = component.props
  if (component.timeslots || talkGQL.loading || voteGQL.loading) {
    return
  }
  const voteMap = {}
  const sorter = talk => {
    if (!talk.vote) {
      return -5
    }
    return -talk.vote.value
  }
  voteGQL.talkvotes.map(({ talkId, vote }) => (voteMap[talkId] = vote))
  const timeslots = cloneDeep(talkGQL.timeslots)
  let lastslot
  timeslots.forEach(timeslot => {
    timeslot.DATE = new Date(timeslot.datetime).valueOf()
    if (lastslot) {
      lastslot.END_DATE = timeslot.DATE - 15 * 60 * 1000
    }
    lastslot = timeslot
    timeslot.talkSet.map(talk => {
      setVote(talk, voteMap[talk.id])
    })
    if (resort) {
      timeslot.talkSet = sortBy(shuffle(timeslot.talkSet), sorter)
    }
  })
  lastslot.END_DATE = lastslot.DATE + 45 * 60 * 1000
  component.timeslots = timeslots
}
