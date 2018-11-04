import React from 'react'

import _ from '../lib/translate'
import { post } from '../lib/ajax'
import { withAuth } from '../graphql'
import navigate from '../lib/navigate'

class Start extends React.Component {
  createAccount = ({ formData = {} }) => {
    post('/api/nopass/create/', formData).then(() => {
      this.props.auth.refetch().then(() => navigate('/help/'))
    })
  }
  render() {
    const { auth } = this.props
    if (auth.user) {
      navigate('/vote/')
    }
    if (auth.loading || auth.user) {
      return null
    }
    return (
      <div className="container" id="signup">
        <h3 className="red-text lighten-2 center">Welcome</h3>
        <p className="flow-text">
          This is an app I made to help me decide which talks to attend at
          BarCamp. I hope you find it useful.
        </p>
        <p className="flow-text">
          This app is currently in demo mode using data from Bar Camp 2017.
        </p>
        <p className="flow-text">
          Using cheat codes, this should take about 5 minutes to complete.
        </p>
        <div className="flow-text center">- Chris Cauley</div>
        <p className="center">
          <button className="btn btn-blue" onClick={this.createAccount}>
            {_('Get Started')}
          </button>
        </p>
      </div>
    )
  }
}

export default withAuth(Start)
