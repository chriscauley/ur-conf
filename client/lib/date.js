import { addMinutes, format, isAfter } from 'date-fns'
import config from './config'
import alert from './alert'

const _trigger_time = new Date('2018-11-10 10:15').valueOf()
const date = {
  SPEED: 0, // seconds per tick
  get DEBUG() {
    return config.getItem('TIMELESS')
  },
  set DEBUG(value) {
    config.setItem('TIMELESS', value)
  },
  start: new Date('2018-11-10 9:30'.valueOf()),
  end: new Date('2018-11-10 18:00'.valueOf()),
  now: () => (date.DEBUG ? new Date(date.value) : new Date()),
  click() {
    if (!this.DEBUG) return
    this.clicked = true
    this.value = addMinutes(this.value, 10)
    this.update()
  },
  update() {
    this.root && this.root.forceUpdate()
  },
  alertClick() {
    // if debug is on, alert them that they can control the clock
    this.DEBUG && !this.clicked && alert.set('clock')
  },
  reset() {
    date.value = date.start
    this.tick()
    clearInterval(this.interval)
    this.interval = setInterval(this.tick, 30000)
    setTimeout(this.alertClick, 90000)
  },
  tick: () => {
    if (!date.DEBUG) {
      date.value = new Date().valueOf()
    }
    if (date.value >= _trigger_time) {
      alert.set('first-star')
    }
    date.update()
  },
  set: (start, end) => {
    date.start = start
    date.end = end
  },
  print: () => format(date.now(), 'h:mm'),
  isNow: timeslot => {
    return timeslot.DATE < date.value && timeslot.END_DATE > date.value
  },
  isPast: timeslot => isAfter(date.value, timeslot.END_DATE),
}

date.reset()
export default date
