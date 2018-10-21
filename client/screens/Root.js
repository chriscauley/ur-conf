import React from 'react';
import Nav from './Nav';
import TalkList from "./TalkList";
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
    const MainTag = TalkList;
    return (
<div id="wrapper">
  <Nav></Nav>
  <main>
    <MainTag parent={this}></MainTag>
  </main>
</div>
)
  }
}