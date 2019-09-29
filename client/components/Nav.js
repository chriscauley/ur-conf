import React from 'react'
import { Link, Match } from '@reach/router'
import { withAuth } from '../graphql'
import Alert from './Alert'
import _ from '../lib/translate'
import Clock from './Clock'

const AuthLinks = ({ _user }) => (
  <>
    <li>
      <Link to="/schedule/">{_`Schedule`}</Link>
    </li>
    <li>
      <Link to="/vote/">{_`Vote`}</Link>
    </li>
    <li>
      <Link to="/map/" className="fa fa-map" />
    </li>
    <li className="auth">
      <Link to="/auth/" className="fa fa-user fa-lg" />
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
