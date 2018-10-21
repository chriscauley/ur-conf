import React from "react";
export default class TalkList extends React.Component {
  vote(v) {
    return () => {
      console.log(v)
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
    return (
<div className="row">
  { this.props.parent.state.talks.map( talk => (
  <div className="col s12" key={talk.id}>
    <div className="card">
      <div className="card-content">
        <div className="card-title">{ talk.title }</div>
        <p>with { talk.authors[0].name }</p>
      </div>
      <div className="card-action">
        { this.getVotes(talk).map( v=> (
          <a onClick={this.vote(v.value)}>
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