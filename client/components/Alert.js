import React from 'react'
import { Link } from '@reach/router'

class Alert extends React.PureComponent {
  render() {
    let className = 'root-width open'
    className += ' green lighten-4'
    const iconClass = 'fa fa-question-circle-o fa-3x'
    const message = 'doot'
    const messageClass = 'message'
    return (
      <Link to="/help/" id="alert" className={className}>
        <i className={iconClass} />
        <div className={messageClass}>{message}</div>
      </Link>
    )
  }
}

export default Alert
