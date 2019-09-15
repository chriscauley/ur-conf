import React from 'react'
import { Link, Match } from '@reach/router'
import { withAuth } from '../graphql'
import Alert from './Alert'
import _ from '../lib/translate'
import Clock from './Clock'

const AuthLinks = ({ user }) => (
  <>
    <li>
      <Link to="/schedule/">{_`Schedule`}</Link>
    </li>
    <li>
      <Link to="/vote/">{_`Vote`}</Link>
    </li>
    <li className="auth">
      <Link to="/auth/">
        <i className="fa fa-user" />
        {user.username}
      </Link>
    </li>
  </>
)

const AnonymousLinks = () => (
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
)

class Nav extends React.Component {
  render() {
    const { auth } = this.props
    const Links = auth.user ? AuthLinks : AnonymousLinks
    return (
      <nav>
        <div className="nav-wrapper">
          <ul id="nav-mobile">
            <li>
              <Clock />
            </li>
            <Links {...auth} />
          </ul>
        </div>
        <Alert />
      </nav>
    )
  }
}

export default withAuth(Nav)
