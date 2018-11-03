import React from 'react'

import _ from '../lib/translate'
import { post } from '../lib/ajax'
import { withAuth } from '../graphql'
import navigate from '../lib/navigate'

class SignUp extends React.Component {
  createAccount = ({formData={}}) => {
    post("/api/nopass/create/",formData).then(() => {
      this.props.auth.refetch().then(() => navigate("/help/"))
    })
  }
  render() {
    const { auth } = this.props
    if (auth.user) {
      navigate("/vote/")
    }
    if (auth.loading || auth.user ) { return null }
    return (
<div className="container" id="signup">
  <h3 className="red-text lighten-2 center">Welcome</h3>
  <p className="flow-text">
    This is an app I made to help me decide which talks to attend at BarCamp.
    I hope you find it useful.
  </p>
  <p className="flow-text">
    If you're reading this now, it is because I invited you to preview the app
    using the Bar Camp 2017 talks.
  </p>
  <p className="flow-text">
    The help screen tells you how to warp through time.
    Using cheat codes, it should take about 5 minutes to complete this app.
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

export default withAuth(SignUp)