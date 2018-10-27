import React from 'react'
import { extend } from 'lodash'

export default class Dropdown extends React.Component {
  state = { open: false }
  trigger = () => this.setState({ open: !this.state.open })
  render() {
    const triggerClass = `dropdown-trigger ${this.props.triggerClass || ''}`
    const styles = { transition: '0.25s' }
    if (this.state.open) {
      extend(styles, {
        display: 'block',
        width: '100px',
        left: '82.8281px',
        top: '256px',
        height: '295px',
        transformOrigin: '0px 0px 0px',
        opacity: '1',
        transform: 'scaleX(1) scaleY(1)',
      })
    }
    return (
      <li className="dropdown-wrapper">
        <a onClick={this.trigger} className={triggerClass} href="#">
          {this.props.icon && <i className={this.props.icon} />}
          {this.props.triggerContent}
        </a>
        <ul id="dropdown1" className="dropdown-content" style={styles}>
          {this.props.children}
        </ul>
      </li>
    )
  }
}
