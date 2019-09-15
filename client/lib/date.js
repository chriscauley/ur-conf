import { format, isAfter } from 'date-fns'

let DEBUG
try {
  DEBUG = window.localStorage.getItem('DEBUG_DATE')
} catch {
  DEBUG = false
}

const _trigger_time = new Date('2018-11-10 10:15').valueOf()
const date = {
  DEBUG: DEBUG,
  SPEED: 0, // seconds per tick
  RATE: DEBUG ? 1000 : 30000, // refresh rate
  start: new Date('2018-11-10 9:30'.valueOf()),
  end: new Date('2018-11-10 18:00'.valueOf()),
  now: () => (date.DEBUG ? new Date(date.value) : new Date()),
  tick: () => {
    if (date.DEBUG) {
      date.value = date.now().valueOf() + date.SPEED * 60 * 1000
      if (date.value > date.end) {
        date.value = date.start
      }
    } else {
      date.value = new Date().valueOf()
    }
    if (date.value >= _trigger_time) {
      window.ALERT.set('first-star')
    }
    date.visible && date.visible.forceUpdate()
  },
  reset: () => (date.value = date.start),
  set: (start, end) => {
    date.start = start
    date.end = end
  },
  print: () => format(date.now(), 'h:mm'),
  isNow: timeslot => {
    return timeslot.DATE < date.value && timeslot.END_DATE > date.value
  },
  isPast: timeslot => isAfter(timeslot.END_DATE, date.value),
}

date.reset()
export default date
