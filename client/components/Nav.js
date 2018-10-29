import React from 'react'
import { Link } from '@reach/router'
import { withAuth } from '../graphql'
import _ from '../lib/translate'
import Dropdown from '../components/Dropdown'

const links = auth => (
  <ul id="nav-mobile">
    <li>
      <Link to="/help/">
        <i className="fa fa-question fa-2x" />
      </Link>
    </li>
    <li>
      <Link to="/schedule/">{_`Schedule`}</Link>
    </li>
    <li>
      <Link to="/talks/">{_`Talks`}</Link>
    </li>
    <Dropdown triggerContent={auth.user.username} icon="mr fa fa-user">
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
          {/*<Link to="/" className="brand-logo left ml">{_`uR.conf`}</Link>*/}
          {auth.user && links(auth)}
        </div>
      </nav>
    )
  }
}

export default withAuth(Nav)
