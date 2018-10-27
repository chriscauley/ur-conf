import React from 'react'
import { navigate } from '@reach/router'
import Form from 'react-jsonschema-form'
import formSchema from '../schema/login'
import { withAuth } from '../graphql'
import _ from '../lib/translate'

class Login extends React.Component {
  render() {
    const { login, user } = this.props.auth
    if (user) {
      navigate('/')
    }
    return (
      <div>
        <h3 className="center red-text text-lighten-1">{_`Login to Continue`}</h3>
        <Form {...formSchema} onSubmit={login} />
      </div>
    )
  }
}

export default withAuth(Login)
