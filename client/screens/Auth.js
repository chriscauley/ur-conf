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
<div className="container">
  <div className="card">
    <div className="card-content">
      <div className="card-title">
        <h2 className="red-text lighten-2">Account Info</h2>
      </div>
      <button className="btn btn-blue" onClick={logout}>
        logout
      </button>
    </div>
  </div>
</div>
    )
  }
}

export default withAuth(Auth)
