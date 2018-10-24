import React from 'react';
import Nav from './Nav';
import TalkList from "./TalkList";
import Schedule from "./Schedule";
import Derp from "./Derp";
import { loadData } from "../utils/ajax";
import { client, talk_query, LoginRequired } from "../gql";
import { ApolloProvider } from "react-apollo";
import prepData from "../utils/prepData";

export default class Root extends React.PureComponent {
  render () {
    let MainTag = TalkList;
    MainTag = Derp;
    if (window.location.pathname == "/schedule/") {
      MainTag = Schedule;
    }
    return (
<ApolloProvider client={client}>
  <div id="wrapper" class="container">
    <Nav></Nav>
    <main>
      <LoginRequired>
        <MainTag root={this}></MainTag>
      </LoginRequired>
    </main>
  </div>
</ApolloProvider>
    )
  }
}