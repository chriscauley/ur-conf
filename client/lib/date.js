import { format } from 'date-fns'

const date = {
  SPEED: 60, // seconds per tick
  now: () => new Date(date.value),
  tick: () => {
    date.value = date.now().valueOf() + date.SPEED * 1000
    date.visible && date.visible.forceUpdate()
  },
  value: new Date('2017-10-14 9:30'.valueOf()),
  reset: () => (date.value = new Date('2017-10-14 9:30'.valueOf())),
  print: () => format(date.now(), 'h:mm'),
  isNow: timeslot => {
    const now = date.now().valueOf()
    return timeslot.DATE < now && timeslot.END_DATE > now
  },
}

export default date
