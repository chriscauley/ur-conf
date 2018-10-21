import React from "react";
import { post } from "../utils/ajax"


export default class TalkList extends React.Component {
  vote(vote,talk) {
    return () => {
      post("/api/vote/",{
        talk_id: talk.id,
        vote,
      }).then(() => {
        talk.vote = vote;
        this.forceUpdate();
      });
    }
  }
  getVotes(talk) {
    const votes = [
      { verbose: "no", value: -1, icon: "em em--1" },
      { verbose: "maybe", value: 0, icon: "em em-thinking_face" },
      { verbose: "yes", value: 1, icon: "em em---1" },
    ]
    return votes
  }
  render() {
    const visible_talks = this.props.parent.state.talks.filter(t => t.vote == undefined)
    return (
<div className="row">
  { visible_talks.map( talk => (
  <div className="col s12" key={talk.id}>
    <div className="card">
      <div className="card-content">
        <div className="card-title">{ talk.title }</div>
        <p>with { talk.authors[0].name }</p>
      </div>
      <div className="card-action">
        { this.getVotes(talk).map( v=> (
          <a key={v.value} onClick={this.vote(v.value,talk)}>
            <span className={v.icon}></span> {v.verbose}
          </a>
        ) ) }
      </div>
    </div>
  </div>
  ) ) }
</div>
) }
}