import React from 'react'
import { Link, Match } from '@reach/router'
import { withAuth } from '../graphql'
import Alert from './Alert'
import _ from '../lib/translate'
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
      <Link to="/vote/">{_`Vote`}</Link>
    </li>
    <li className="auth">
      <Link to="/auth/">
        <i className="fa fa-user" />
        {auth.user.username}
      </Link>
    </li>
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
              <li>
                <Match path="/login/">
                  {props =>
                    props.match ? (
                      <Link to="/">{_('New Account')}</Link>
                    ) : (
                      <Link to="/login/">{_('Login')}</Link>
                    )
                  }
                </Match>
              </li>
            </ul>
          )}
        </div>
        <Alert />
      </nav>
    )
  }
}

export default withAuth(Nav)
