import React from 'react'
import { Router } from '@reach/router'
import { ApolloProvider } from 'react-apollo'

import Nav from "./components/Nav"
import { TalkList, Schedule, Login, Home, SignUp } from "./screens"
import { client } from './graphql'

console.log(TalkList)

export default class Root extends React.PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="wrapper" className="container">
          <Nav />
          <main>
            <Router>
              <SignUp path="/" />
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
