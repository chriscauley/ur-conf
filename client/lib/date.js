import { format } from 'date-fns'

const date = {
  SPEED: 0, // seconds per tick
  now: () => new Date(date.value),
  tick: () => {
    date.value = date.now().valueOf() + (date.SPEED * 60 * 1000)
    date.visible && date.visible.forceUpdate()
  },
  value: new Date('2017-10-14 9:30').valueOf(),
  reset: () => (date.value = new Date('2017-10-14 9:30'.valueOf())),
  print: () => format(date.now(), 'h:mm'),
  isNow: timeslot => {
    return timeslot.DATE < date.value && timeslot.END_DATE > date.value
  },
  isPast: timeslot => {
    return timeslot.END_DATE < date.value
  }
}

export default date
