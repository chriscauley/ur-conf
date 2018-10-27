import React from 'react'
import Form from 'react-jsonschema-form'

import formSchema from './schema'

class SignUp extends React.Component {
  createAccount = () => {

  }
  render() {
    return (
<div>
  <Form
     onSubmit={this.createAccount}
     {...formSchema}>
    <div><button></button></div>
  </Form>
  <div>
    <button className="btn btn-blue" onclick={this.createAccount}>
      Continue with Anonymous Account
    </button>
  </div>
</div>
)
  }
}

export default SignUp