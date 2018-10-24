import React from 'react';
import { LoginRequired } from "../gql";

export default class Nav extends React.Component {
  render() {
    const styles = { transform: "translateX(0%)" };
    const no_auth = <li><a>Login or Sign Up</a></li>;
    return (
<nav>
  <div className="nav-wrapper">
    <a href="#" className="brand-logo left">BarCamp 2017</a>
    <ul id="nav-mobile" className="right">
      <LoginRequired no_auth={no_auth}>
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">JavaScript</a></li>
      </LoginRequired>
    </ul>
  </div>
</nav>
)
  }
}