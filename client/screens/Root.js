import React from 'react';
import Nav from './Nav';
import TalkList from "./TalkList";
import { loadData } from "../utils/ajax";

export default class Root extends React.PureComponent {
  state = {
    talks: [],
    authors: [],
  }
  componentDidMount() {
    loadData().then(json => {
      const author_map = {};
      const talk_map = {};
      json.data.authors.forEach(author => {
        author_map[author.id] = author;
      });
      json.data.talks.forEach(talk => {
        talk.authors = talk.authors.map(a => author_map[a.id]);
        talk_map[talk.id] = talk
      });
      json.data.talkvotes.forEach(vote => talk_map[vote.talkId].vote = vote.vote )
      this.setState(json.data);
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