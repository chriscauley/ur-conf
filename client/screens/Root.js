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
      const data = json.data;

      data.author_map = {};
      data.authors.forEach(author => {
        data.author_map[author.id] = author;
      });

      data.room_map = {};
      data.rooms.forEach(room => {
        data.room_map[room.id] = room;
      })

      data.talk_map = {};
      data.talks.forEach(talk => {
        talk.authors = talk.authors.map(a => data.author_map[a.id]);
        console.log(data.room_map,talk.roomId);
        talk.room = data.room_map[talk.roomId];
        data.talk_map[talk.id] = talk
      });

      data.talkvotes.forEach(vote => {
        data.talk_map[vote.talkId].vote = vote.vote
      })
      this.setState(data);
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