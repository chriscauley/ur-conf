import React from 'react'

import navigate from '../lib/navigate'
import { withAuth } from '../graphql'
import _ from '../lib/translate'

class Auth extends React.Component {
  render() {
    if (!this.props.auth.user) {
      navigate('/')
      return null
    }
    function logout() {
      fetch('/api/logout/').then(() => window.location.reload())
    }
    return (
      <div>
        <div>{_('Not implemented ... yet o.O')}</div>
        <button className="btn btn-blue" onClick={logout}>
          logout
        </button>
      </div>
    )
  }
}

export default withAuth(Auth)
