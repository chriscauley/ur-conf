import React from 'react';

export default class Nav extends React.Component {
  render() {
    const styles = { transform: "translateX(0%)" };
    return (
<nav>
  <div class="nav-wrapper">
    <a href="#" class="brand-logo left">BarCamp 2017</a>
    <ul id="nav-mobile" class="right">
      <li><a href="sass.html">Sass</a></li>
      <li><a href="badges.html">Components</a></li>
      <li><a href="collapsible.html">JavaScript</a></li>
    </ul>
  </div>
</nav>
)
  }
}