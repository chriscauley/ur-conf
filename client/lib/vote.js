import { cloneDeep, shuffle, sortBy } from 'lodash'

export const vote_list = [
  {
    text: 'no',
    verbose: 'No Thanks',
    value: -1,
    icon: 'ec ec-x',
    className: 'red',
  },
  {
    verbose: 'Maybe',
    text: 'maybe',
    value: 0,
    icon: 'ec ec-thinking',
    className: 'yellow',
  },
  {
    verbose: "Yes, I'm interested",
    text: 'yes',
    value: 1,
    icon: 'fa fa-check-square-o green-text fa-ec',
    className: 'green',
  },
]

export const vote_map = {}

vote_list.forEach(vote => (vote_map[vote.value] = vote))

export const setVote = (talk, vote) => {
  talk.vote = vote_map[vote] ? { ...vote_map[vote] } : undefined
}

export const setAttendance = (talk, timeslot) => {
  const _attendance = talk.attendance
  timeslot.talkSet.forEach(t => (t.attendance = false))
  talk.attendance = !_attendance
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

  const attendances = {}
  voteGQL.talkattendances.forEach(({ talkId }) => (attendances[talkId] = true))

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
      talk.timeslot = timeslot
      talk.attendance = attendances[talk.id]
    })
    if (resort) {
      timeslot.talkSet = sortBy(shuffle(timeslot.talkSet), sorter)
    }
  })
  lastslot.END_DATE = lastslot.DATE + 45 * 60 * 1000
  component.timeslots = timeslots
}
