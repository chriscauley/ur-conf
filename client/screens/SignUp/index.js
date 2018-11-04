import React from 'react'
import Form from 'react-jsonschema-form'

import formSchema from './schema'
import _ from '../../lib/translate'
import { post } from '../../lib/ajax'
import { withAuth } from '../../graphql'
import navigate from '../../lib/navigate'

class SignUp extends React.Component {
  createAccount = ({formData={}}) => {
    post("/api/nopass/change_email/",formData)
      .then(r => r.json())
      .then(data => {
        console.log(data)
      })
    })
  }
  render() {
    const { auth } = this.props
    if (auth.user) {
      navigate("/vote/")
    }
    if (auth.loading || auth.user ) { return null }
    return (
<div className="container">
  <h2 className="red-text lighten-2">Sign Up</h2>
  <Form
     onSubmit={this.createAccount}
     {...formSchema}>
    <p className="center"><button className="btn btn-blue">
        {_('Create Account')}
    </button></p>
  </Form>
  <p className="center">
    <button className="btn btn-blue" onClick={this.createAccount}>
      {_`Continue as Guest`}
    </button>
  </p>
</div>
)
  }
}

export default withAuth(SignUp)