import React from 'react'
import { navigate } from '@reach/router'

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
}

let DISMISSED = JSON.parse(localStorage.getItem('DISMISSED') || '{}')
const ALERT = (window.ALERT = {
  reset: () => {
    localStorage.setItem('DISMISSED', '{}')
    DISMISSED = {}
  },
})

class Alert extends React.PureComponent {
  state = {
    color: '',
    text: '',
  }
  constructor(props) {
    super(props)
    ALERT.dismiss = slug => {
      if (!slug || ALERT.current === slug) {
        ALERT.set('')
      }
    }
    ALERT.set = slug => {
      if (DISMISSED[slug]) {
        return
      }
      setTimeout(() => {
        clearTimeout(ALERT.timeout)
        ALERT.current = slug
        this.setState({ color: 'green', ...alerts[slug] })
        DISMISSED[slug] = true
        localStorage.setItem('DISMISSED', JSON.stringify(DISMISSED))
        ALERT.timeout = setTimeout(ALERT.dismiss, 10000)
      }, 0)
    }
  }
  render() {
    const { color, text, _award } = this.state
    const className = `${text ? 'full' : ''} open ${color || 'white'} lighten-3`
    let iconClass = 'fa fa-question-circle-o fa-3x'
    let click = () => navigate('/help/')
    if (text) {
      iconClass = 'fa fa-times-circle-o fa-3x'
      click = () => this.setState({ text: '', color: '' })
    }
    const messageClass = 'message'
    return (
      <div id="alert" className={className}>
        <a onClick={click}>
          <i className={iconClass} />
        </a>
        <div>
          <div className={messageClass}>{text}</div>
        </div>
      </div>
    )
  }
}

export default Alert
