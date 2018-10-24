import React from "react";

export default class Derp extends React.Component {
  render() {
    return (
      <div>Derp {this.props.auth.data.user.id}</div>
    )
  }
}