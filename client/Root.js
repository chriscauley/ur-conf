import React from 'react'
import { Router } from '@reach/router'
import { ApolloProvider } from 'react-apollo'

import Nav from "./components/Nav"
import { TalkList, Schedule, SignUp, Help } from "./screens"
import { client } from './graphql'

export default class Root extends React.PureComponent {
  render() {
    return (
<ApolloProvider client={client}>
  <div id="wrapper" className="container">
    <Nav />
    <main>
      <Router>
        <SignUp path="/" />
        <Help path="/help/" />
        <TalkList path="/talks/" />
        <Schedule path="/schedule/" />
      </Router>
    </main>
  </div>
</ApolloProvider>
    )
  }
}
