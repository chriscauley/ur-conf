import React from 'react'
import { Link } from '@reach/router'
import { withAuth } from '../graphql'
import _ from '../lib/translate'
import Dropdown from '../components/Dropdown'
import Clock from './Clock'

const links = auth => (
  <ul id="nav-mobile">
    <li>
      <Clock />
    </li>
    <li>
      <Link to="/schedule/">{_`Schedule`}</Link>
    </li>
    <li>
      <Link to="/vote/">{_`Talks`}</Link>
    </li>
    <Dropdown
      triggerContent={auth.user.username}
      icon="mr fa fa-user"
      className="auth"
    >
      <a onClick={auth.logout}>{_`Logout`}</a>
    </Dropdown>
  </ul>
)
class Nav extends React.Component {
  render() {
    const auth = this.props.auth
    return (
      <nav>
        <div className="nav-wrapper">
          {auth.user ? (
            links(auth)
          ) : (
            <ul id="nav-mobile">
              <li>
                <Clock />
              </li>
            </ul>
          )}
        </div>
      </nav>
    )
  }
}

export default withAuth(Nav)
