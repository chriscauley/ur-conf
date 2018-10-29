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
    <Router>
      <SignUp path="/" />
      <Help path="/help/" />
      <TalkList path="/vote/" />
      <Schedule path="/schedule/" />
    </Router>
  </div>
</ApolloProvider>
    )
  }
}
