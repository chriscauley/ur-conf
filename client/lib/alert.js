import config from './config'

const alerts = {
  '': { color: '', text: '' },
  'pre-vote': {
    text: 'Swipe or click each card to move it to the yes, maybe, or no lists.',
  },
  'post-vote': {
    text: 'Keep it up!',
  },
  schedule: {
    text:
      'View your "Yes" talks here. When you attend a talk, come back for a star.',
  },
  'first-star': {
    text:
      'The first talk is starting. Be sure to mark your attendance in the schedule.',
  },
  clock: {
    text: 'Time warp enabled, click the clock to move into the future!',
  },
  'slot-complete': {
    text: 'That is all for this timeslot.\n Click here to go to the next.',
    iconClass: 'ec ec-clock1',
  },
  'last-slot-complete': {
    text:
      'That the last time. Go back to the schedule and see if you missed something?',
    iconClass: 'ec ec-100',
  },
}

const KEY = 'DISMISSED_ALERTS'

export default {
  dismissed: config.getItem(KEY, {}),
  reset() {
    config.setItem(KEY, (this.dismissed = {}))
  },
  _update() {
    setTimeout(() => this.component && this.component.forceUpdate(), 0)
  },
  set(slug, options = {}) {
    if (this.dismissed[slug] && !options.force) {
      return
    }
    if (this.current) {
      // only show one alert at a time
      return
    }
    if (alerts[slug]) {
      this.current = {
        color: 'green',
        iconClass: 'fa fa-times-circle-o fa-3x',
        click: _e => this.dismiss(),
        slug,
        ...alerts[slug],
        ...options,
      }
    }
    if (options.className) {
      // this is an achievment
      this.current = {
        ...options,
        color: 'amber lighten-3',
        click: _e => this.dismiss(),
        iconClass: 'ec ec-' + options.className,
        title: 'Achievement Unlocked: ' + options.title,
      }
    }
    //slug && !options.force && this.queueDismiss(slug)
    this._update()
  },
  dismiss(slug) {
    if (!slug && this.current) {
      slug = this.current.slug
    }
    delete this.current
    if (slug) {
      this.dismissed[slug] = true
      config.setItem(KEY, this.dismissed || {})
    }
    this._update()
  },
  queueDismiss(slug) {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => this.dismiss(slug), 10000)
  },
}
