import React from 'react'
import { navigate } from '@reach/router'

import alert from '../lib/alert'
import { withAuth } from '../graphql'

class Alert extends React.PureComponent {
  constructor(props) {
    super(props)
    alert.component = this
  }
  cheat = () => {
    throw 'TODO' //window.localStorage.setItem('DEBUG_DATE', 1)
  }

  render() {
    const defaultAlert = {
      iconClass: 'fa fa-question-circle-o fa-3x',
      click: () => navigate('/help/'),
    }
    alert.current && alert.queueDismiss()

    const current = alert.current || defaultAlert

    let className = 'flex lighten-4 '
    if (current.text) {
      className += 'open full'
    }
    const messageClass = 'message'
    const onClick = () => {
      const { click } = current
      alert.dismiss()
      setTimeout(() => click && click(), 0)
    }
    return (
      <div
        id="alert"
        className={`${className} ${current.color || 'grey'}`}
        onClick={onClick}
      >
        <i className={current.iconClass} />
        <div>
          <div className={messageClass}>
            <div>
              <b>{current.title}</b>
            </div>
            {current.text}
          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(Alert)
