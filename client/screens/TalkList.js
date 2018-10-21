import React from "react";
export default class TalkList extends React.Component {
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
    </div>
  </div>
  ) ) }
</div>
) }
}