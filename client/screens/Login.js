import React from 'react'
import Form from 'react-jsonschema-form'

import navigate from '../lib/navigate'
import { authSchema } from '../schema'
import { withAuth } from '../graphql'
import _ from '../lib/translate'
import { post } from '../lib/ajax'

class Login extends React.Component {
  state = {
    error: null,
    success: null,
    formData: undefined,
  }
  login = ({ formData = {} }) => {
    post('/api/nopass/send/', formData)
      .then(r => r.json())
      .then(data => {
        this.setState({
          error: null,
          success: null,
          ...data,
        })
      })
  }
  onChange = ({ formData }) => this.setState({ formData })
  render() {
    const { auth } = this.props
    const { error, success } = this.state
    if (auth.user) {
      navigate('/')
      return null
    }
    return (
      <div className="container">
        <h3 className="red-text lighten-2 mt">Login</h3>
        <div className="card">
          <div className="card-content">
            <p className="flow-text mb">
              This app uses password-less login. Enter your email below and you
              will be sent a link to login.
            </p>
            <Form
              formData={this.state.formData}
              onSubmit={this.login}
              onChange={this.onChange}
              {...authSchema}
            >
              {error && (
                <div className="red lighten-4 card-content mb error">
                  {error}
                </div>
              )}
              {success && (
                <div className="green lighten-4 card-content mb success">
                  {success}
                </div>
              )}
              <p className="center">
                <button className="btn btn-blue">{_('Send Link')}</button>
              </p>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(Login)
