import { format } from 'date-fns'

const date = {
  SPEED: 0, // seconds per tick
  start: new Date('2017-10-14 9:30'.valueOf()),
  end: new Date('2017-10-14 17:30'.valueOf()),
  now: () => new Date(date.value),
  tick: () => {
    date.value = date.now().valueOf() + date.SPEED * 60 * 1000
    if (date.value > date.end) {
      date.value = date.start
    }
    date.visible && date.visible.forceUpdate()
  },
  reset: () => (date.value = date.start),
  print: () => format(date.now(), 'h:mm'),
  isNow: timeslot => {
    return timeslot.DATE < date.value && timeslot.END_DATE > date.value
  },
  isPast: timeslot => {
    return timeslot.END_DATE < date.value
  },
}

date.reset()
export default date
