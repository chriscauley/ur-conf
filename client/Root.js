import React from 'react'
import { Router } from '@reach/router'
import { ApolloProvider } from 'react-apollo'

import Nav from "./components/Nav"
import { NextTime, TalkList, Schedule, Start, Help, Auth, Login } from "./screens"
import { client } from './graphql'
import date from './lib/date'
import config from './lib/config'

(() => {
  let index = 0
  const keys = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ]
  document.addEventListener("keyup", e => {
    if (e.key === keys[index]) {
      index ++
      if (index === keys.length) {
        date.DEBUG = !date.DEBUG
        date.update()
        index = 0
      }
    } else {
      index = 0
    }
  })
})()

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
