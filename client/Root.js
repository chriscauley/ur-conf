import React from 'react'
import { Router } from '@reach/router'
import { ApolloProvider } from 'react-apollo'

import Nav from "./components/Nav"
import { NextTime, TalkList, Schedule, Start, Help, Auth, Login } from "./screens"
import { client } from './graphql'
import date from './lib/date'

export default class Root extends React.PureComponent {
  render() {
    date.root = this
    return (
<ApolloProvider client={client}>
  <div id="wrapper" className="container">
    <Nav />
    <Router id="router">
      <Start path="/" />
      <Help path="/help/" />
      <TalkList path="/vote/:timeslotId/" />
      <TalkList path="/vote/:timeslotId/:voteSort/" />
      <TalkList path="/talk/:talkId/" />
      <NextTime path="/vote/" />
      <Schedule path="/schedule/" />
      <Schedule path="/schedule/:showPast/" />
      <Auth path="/auth/" />
      <Login path="/login/" />
    </Router>
  </div>
</ApolloProvider>
    )
  }
}
