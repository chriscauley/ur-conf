import React from 'react'
import { withAuth } from '../graphql'
import { navigate } from '@reach/router'
import { debounce } from 'lodash'

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
}

class Alert extends React.PureComponent {
  constructor(props) {
    super(props)
    this.queueDismiss = debounce(this.dismiss,10000)
    window.ALERT = this
    this.dismissed = JSON.parse(localStorage.getItem('DISMISSED') || '{}')
  }
  reset = () => {
    localStorage.setItem('DISMISSED', '{}')
    this.dismissed = {}
  }
  _update = () => setTimeout(() => this.forceUpdate(),0)
  cheat = () => window.localStorage.setItem("DEBUG_DATE",1)
  set = slug => {
    if (this.dismissed[slug]) { return }
    if (alerts[slug]) {
      this.current = {
        color: 'green',
        iconClass: 'fa fa-times-circle-o fa-3x',
        click: _e => this.dismiss(),
        slug,
        ... alerts[slug]
      }
    }
    slug && this.queueDismiss(slug)
    this._update()
  }
  dismiss = slug => {
    if (this.current) {
      slug = slug || this.current.slug
    }
    console.warn('d',slug,this.current)
    this.current = undefined
    if (slug) {
      this.dismissed[slug] = true
      localStorage.setItem('DISMISSED', JSON.stringify(this.dismissed))
    }
    this._update()
  }
  getAchievement = () => {
    if (true) { return }
    const user = this.props.auth.user
    if (!user || ! user.userachievementSet) { return }
    const achievement = user.userachievementSet
          .map(ua=> ua.achievement)
          .find(a => !this.dismissed[a.slug])
    if (achievement) {
      return {
        ...achievement,
        iconClass: `ec ec-${achievement.className} circle grey lighten-2`,
        color: 'grey',
        click: () => navigate("/auth/#achievements"),
      }
    }
  }

  render() {
    const defaultAlert = {
      iconClass: 'fa fa-question-circle-o fa-3x',
      click: () => navigate('/help/'),
    }
    this.current = this.current || this.getAchievement()
    this.current && this.queueDismiss()

    const current = this.current || defaultAlert

    let className = "flex lighten-4 "
    if (current.text) {
      className += 'open full'
    }
    const messageClass = 'message'
    return (
      <div id="alert" className={`${className} ${current.color || 'grey'}`}>
        <a onClick={current.click}>
          <i className={current.iconClass} />
        </a>
        <div>
          <div className={messageClass}>
            <div><b>{current.title}</b></div>
           {current.text}
          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(Alert)
