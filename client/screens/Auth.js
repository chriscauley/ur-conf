import React from 'react'
import Form from 'react-jsonschema-form'

import navigate from '../lib/navigate'
import { authSchema } from '../schema'
import { withAuth } from '../graphql'
import _ from '../lib/translate'
import { post } from '../lib/ajax'
import Achievements from '../components/Achievements'
import ConferencePicker from '../components/ConferencePicker'

class Auth extends React.Component {
  state = {
    error: null,
    success: null,
    formData: undefined,
  }
  changeEmail = ({ formData = {} }) => {
    post('/api/nopass/change_email/', formData)
      .then(r => r.json())
      .then(data => {
        this.setState({
          error: null,
          success: null,
          ...data,
        })
        this.props.auth.refetch()
      })
  }
  logout = () => {
    try {
      localStorage.setItem('DISMISSED', '{}')
    } catch {} // eslint-disable-line
    fetch('/api/logout/')
      .then(this.props.auth.refetch)
      .then(() => navigate('/'))
  }
  onChange = ({ formData }) => this.setState({ formData })
  render() {
    const { auth } = this.props
    const { error, success } = this.state
    if (!auth.user) {
      return null
    }
    const initial = auth.user.email.match(/guest-.+@example.com/)
      ? {}
      : auth.user
    return (
      <div className="container" id="auth">
        <Achievements data={auth} />
        <div className="card">
          <div className="card-content">
            <div className="card-title">
              <h4 className="red-text lighten-2">Account Info</h4>
            </div>
            <p className="flow-text mb">
              Email will only be used for account recovery purposes. This app is
              password less. You can only login using a magic link sent by
              email.
            </p>
            <Form
              formData={this.state.formData || initial}
              onSubmit={this.changeEmail}
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
                <button className="btn btn-blue">{_('Update Email')}</button>
              </p>
            </Form>
          </div>
        </div>
        <div className="card">
          <div className="card-content center">
            <button className="btn btn-blue" onClick={this.logout}>
              logout
            </button>
          </div>
        </div>
        <div className="card">
          <div className="card-content center">
            <ConferencePicker user={auth.user} />
          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(Auth)
