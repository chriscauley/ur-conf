import { format } from 'date-fns'

const date = {
  SPEED: 60, // seconds per tick
  now: () => new Date(date.value),
  tick: () => (date.value = date.now().valueOf() + date.SPEED * 1000),
  value: new Date('2017-10-14 8:00'.valueOf()),
  print: () => format(date.now(), 'h:mm'),
}

export default date
