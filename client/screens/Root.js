import React from 'react'
import { Router } from '@reach/router'
import { ApolloProvider } from 'react-apollo'

import Nav from './Nav'
import TalkList from './TalkList'
import Schedule from './Schedule'
import Login from './Login'
import Home from './Home'
import { client } from '../graphql'

export default class Root extends React.PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="wrapper" className="container">
          <Nav />
          <main>
            <Router>
              <Home path="/" />
              <TalkList path="/talklist/" />
              <Schedule path="/schedule/" />
              <Login path="/login/" />
            </Router>
          </main>
        </div>
      </ApolloProvider>
    )
  }
}
