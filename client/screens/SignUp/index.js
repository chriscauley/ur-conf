import React from 'react'
import { navigate } from '@reach/router'
import Form from 'react-jsonschema-form'

import formSchema from './schema'
import _ from '../../lib/translate'
import { post } from '../../lib/ajax'
import { withAuth } from '../../graphql'

class SignUp extends React.Component {
  createAccount = ({formData={}}) => {
    post("/api/nopass/create/",formData).then(
      ()=> navigate("/help/")
    )
  }
  render() {
    const { auth } = this.props
    return (
<div className="container">
  <h2 className="red-text lighten-2">Sign Up</h2>
  <Form
     onSubmit={this.createAccount}
     {...formSchema}>
    <p className="center"><button className="btn btn-blue">
        { auth.user?
        _`Set Email`:
        _`Create Account`
        }
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