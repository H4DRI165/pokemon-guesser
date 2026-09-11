interface Props {
  streak: number
  best: number
}

function StreakCounter({ streak, best }: Props) {
  return (
    <div className="streak">
      <span className="flame">🔥</span>
      <span>
        <span className="value">{streak}</span>
        <span className="best"> (Best: {best})</span>
      </span>
    </div>
  )
}

export default StreakCounter
