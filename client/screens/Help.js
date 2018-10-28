import React from 'react'
import { Link } from "@reach/router"
import { withAuth } from '../graphql'
import { prepData } from '../lib/prepData'
import { vote_list } from '../lib/vote'
import _ from '../lib/translate'

const randTexts = [
  "If not, that's cool.",
  "On one hand, the points are worthless. On the other hand... points!",
  "At the end of the conference whovever has the most points wins a prize... the prize is more points.",
  "The rules are made up, and the points don't matter.",
  "That's all. That's all this app does. What did you expect?",
  "Step 4: ...\nStep 5: ...\n...\n Profit?"
]

class Help extends React.Component {
  render() {
    const { loading } = this.props.auth;
    if (loading) {
      return <div>{_`Loading`}</div>
    }
    const randText = randTexts[Math.floor(Math.random()*randTexts.length)];
    return (
<div className="w400">
  <h2 className="red-text lighten-2">Help!</h2>
  <hr />
  <h4 className="red-text lighten-2">Step 1: Vote on Talks</h4>
  <p className="flow-text">
    First vote on each talk in each time slot. Votes can take one of four values:
    <ul className="browser-default">
      { vote_list.map(vote =>
      <li className="mb">
        <span className={vote.icon}></span>
        {vote.verbose}
      </li>
      )}
      <li className="mb">
        <span className="em em-no_entry_sign"></span>
        No vote cast
      </li>
    </ul>
  </p>
  <div className="center mb">
    <Link to="/vote/">
      <button className="btn btn-blue">Vote Now</button>
    </Link>
  </div>
  <hr />
  <h4 className="red-text lighten-2">Step 2: View Schedule</h4>
  <p className="flow-text">
    After voting, your schedule will only show
    <span class="em em---1"></span> and
    <span class="em em-thinking_face"></span>
    votes for each time slot.
  </p>
  <div className="center mb">
    <Link to="/schedule/">
      <button className="btn btn-blue">View Schedule</button>
    </Link>
  </div>
  <hr />
  <h4 className="red-text lighten-2">Step 3: Attend Talks</h4>
  <p className="flow-text">
    While at a talk, click the talk you attend and mark yourself as present.
    You can get a point for attending one talk in each slot.
  </p>
  <hr />
  <p className="flow-text" style={{whiteSpace:"pre-line"}} onClick={() => this.forceUpdate()}>{randText}</p>
</div>
    )
  }
}

export default withAuth(Help)
