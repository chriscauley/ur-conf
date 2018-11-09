import React from 'react'
import { Link } from '@reach/router'
import { withAuth } from '../graphql'
import { vote_list } from '../lib/vote'
import _ from '../lib/translate'

const randTexts = [
  'On one hand, the stars are worthless. On the other hand... shiny!',
  'Each star is worth one point. Points are great, right?',
  'Whovever has the most stars wins a prize. \nThe prize is an even bigger star.',
  "That's all. That's all this app does. What did you expect?",
  'Step 4: ...\nStep 5: ...\n...\n Profit?',
].map(_)

class Help extends React.Component {
  updoot = () => this.forceUpdate()
  render() {
    const { loading } = this.props.auth
    if (loading) {
      return <div>{_`Loading`}</div>
    }
    const randText = randTexts[Math.floor(Math.random() * randTexts.length)]
    return (
      <div className="mx" id="help">
        <h3 className="red-text lighten-2 center">Halp! How to app?</h3>
        <h4 className="red-text lighten-2">Step 1: Choose Talks</h4>
        <p className="flow-text">
          Swipe or tap talks to sort them into the following lists.
        </p>
        <ul className="browser-default">
          {vote_list
            .slice()
            .reverse()
            .map(vote => (
              <li className="mb" key={vote.value}>
                <span className={vote.icon} />
                {vote.verbose}
              </li>
            ))}
          {/*<li className="mb">
            <span className="ec ec-question" />
            No vote cast
          </li>*/}
        </ul>
        <div className="hr" />
        <h4 className="red-text lighten-2">Step 2: View Schedule</h4>
        <p className="flow-text">
          Your schedule will only show
          <span className={vote_list[2].icon} />
          votes for each time slot.
        </p>
        <div className="hr" />
        <h4 className="red-text lighten-2">Step 3: Attend Talks</h4>
        <p className="flow-text">
          When you attend a talk, mark your attendance in the schedule to get a
          <span className="ec ec-star" />
        </p>

        <div className="hr" />
        <h4 className="red-text lighten-2">Step &infin;: Control TIME!!!</h4>
        <p className="flow-text">
          Click the clock to speed up time to 0, 5, or 15 minutes per second.
          Double click to reset. Use this power wisely, or you will break time.
        </p>
        {null && (
          <p
            className="flow-text"
            style={{ whiteSpace: 'pre-line' }}
            onClick={this.updoot}
          >
            {randText}
          </p>
        )}
        <div className="hr" />
        <p className="center flow-text">What are you waiting for?</p>
        <div className="center mb">
          <Link to="/vote/">
            <button className="btn btn-blue">Start Voting</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default withAuth(Help)
