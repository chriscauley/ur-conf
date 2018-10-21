import React from 'react';

export default class Nav extends React.Component {
  render() {
    const styles = { transform: "translateX(0%)" };
    return <ul className="sidenav sidenav-fixed">
      <li className="logo">
        <a href="/" className="logo-container">BarCamp 2018</a>
      </li>
    </ul>
  }
}