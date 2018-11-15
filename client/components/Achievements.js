import React from 'react'

const AchievementRow = ({ achievement }) => {
  return (
    <li className="collection-item avatar">
      <i className={`ec ec-${achievement.className} circle lighten-2 grey`} />
      <div>
        <b>{achievement.title}</b>
      </div>
      <p>{achievement.text}</p>
    </li>
  )
}

export default class Achievements extends React.Component {
  render() {
    const { user } = this.props.data
    const achievements = user.userachievementSet.map(a => a.achievement)
    if (!achievements) {
      return null
    }
    return (
      <ul className="collection with-header" id="achievements">
        <li className="collection-header pink-text">
          <h4>Achievements</h4>
        </li>
        {achievements.map(a => (
          <AchievementRow achievement={a} key={a.id} />
        ))}
      </ul>
    )
  }
}
