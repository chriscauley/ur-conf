import React from "react";
import { filter, sortBy, reverse } from "lodash";

export default class Schedule extends React.Component {
  render() {
    const timeslots = this.props.root.state.timeslots;
    if (!timeslots) { return <div>Loading</div> }
    return (
<div className="row">
  <div className="col s12 m8 l6">
    { timeslots.map(timeslot => (
    <div className="card" key={ timeslot.id }>
      <div className="card-content">
        <div className="card-title">
          { timeslot.time_display }
        </div>
        <ul className="collection">
          { sortBy(timeslot.talk_list,['vote','title']).map(talk => (
          <li className="collection-item" key={ talk.id }>
            { talk.vote && <span className={ talk.vote.icon }></span> }
            { talk.title }
          </li>
          ) ) }
        </ul>
      </div>
    </div>
    ) ) }
  </div>
</div>
)
  }
}