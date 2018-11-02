import React from 'react'

import navigate from '../lib/navigate'
import { withAuth } from '../graphql'
import _ from '../lib/translate'

class Auth extends React.Component {
  render() {
    const { auth } = this.props
    if (!auth.user) {
      navigate('/')
      return null
    }
    function logout() {
      fetch('/api/logout/')
        .then(auth.refetch)
        .then(() => navigate('/'))
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
