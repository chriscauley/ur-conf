import React from 'react'
import { Router } from '@reach/router'
import { ApolloProvider } from 'react-apollo'

import config from "./lib/config"
import Nav from "./components/Nav"
import { NextTime, TalkList, Schedule, Start, Help, Auth, Login } from "./screens"
import { client } from './graphql'

export default class Root extends React.PureComponent {
  render() {
    const id = config.getItem("CURRENT_CONFERENCE") || 1
    return (
<ApolloProvider client={client}>
  <div id="wrapper" className="container">
    <Nav />
    <Router id="router">
      <Start path="/" />
      <Help path="/help/" />
      <TalkList path="/vote/:timeslotId/" id={id} />
      <TalkList path="/vote/:timeslotId/:voteSort/" id={id} />
      <TalkList path="/talk/:talkId/" id={id} />
      <NextTime path="/vote/" id={id} />
      <Schedule path="/schedule/" id={id} />
      <Schedule path="/schedule/:showPast/" id={id} />
      <Auth path="/auth/" />
      <Login path="/login/" />
    </Router>
  </div>
</ApolloProvider>
    )
  }
}
