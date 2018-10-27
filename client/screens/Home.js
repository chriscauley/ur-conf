import React from 'react'
import { navigate, Link } from '@reach/router'
import { withAuth } from '../graphql'
import _ from '../lib/translate'

class Home extends React.Component {
  signUp = () => {}
  render() {
    if (this.props.auth.user) {
      navigate('/schedule/')
      return <div />
    }
    return (
      <div>
        <Link to="/login/">{_`Login`}</Link>
        <button onClick={this.signUp}>{_`Sign Up`}</button>
      </div>
    )
  }
}

export default withAuth(Home)
