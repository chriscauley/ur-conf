import React from 'react'
import Form from 'react-jsonschema-form'

import formSchema from './schema'
import _ from '../../lib/translate'
import { withAuth } from '../../graphql'

class SignUp extends React.Component {
  createAccount = () => {

  }
  render() {
    const { auth } = this.props
    return (
<div className="row">
  <div className="col m6 offset-m3 s12">
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
      <button className="btn btn-blue" onclick={this.createAccount}>
        {_`Continue as Guest`}
      </button>
    </p>
  </div>
</div>
)
  }
}

export default withAuth(SignUp)