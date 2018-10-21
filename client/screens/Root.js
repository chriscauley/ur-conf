import React from 'react';
import Nav from './Nav';
import TalkList from "./TalkList";
import Schedule from "./Schedule";
import { loadData } from "../utils/ajax";
import prepData from "../utils/prepData";

export default class Root extends React.PureComponent {
  state = {
    talks: [],
    authors: [],
  }
  componentDidMount() {
    loadData().then(json => {
      this.setState(prepData(json.data));
    })
    window.ROOT = this;
  }
  render () {
    let MainTag = TalkList;
    if (window.location.pathname == "/schedule/") {
      MainTag = Schedule;
    }
    return (
<div id="wrapper">
  <Nav></Nav>
  <main>
    <MainTag root={this}></MainTag>
  </main>
</div>
)
  }
}