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
    text: 'Click the clock to move time at 0, 5, or 15 minutes/second.',
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

export default {
  key: 'DISMISSED_ALERTS',
  dismissed: {},
  reset() {
    config.setItem(this.key, (this.dismissed = {}))
  },
  _update() {
    setTimeout(() => this.component && this.component.forceUpdate(), 0)
  },
  set(slug, options = {}) {
    if (this.dismissed[slug] && !options.force) {
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
    slug && !options.force && this.queueDismiss(slug)
    this._update()
  },
  dismiss(slug) {
    if (!slug && this.current) {
      slug = this.current.slug
    }
    delete this.current
    if (slug) {
      this.dismissed[slug] = true
      config.setItem('DISMISSED_ALERTS', this.dimissed)
    }
    this._update()
  },
  queueDismiss(slug) {
    setTimeout(() => this.dismiss(slug), 10000)
  },
}
