interface Props {
  open: boolean
  loserName?: string
  statLabel?: string
  streak: number
  best: number
  onPlayAgain: () => void
}

function GameOverModal({
  open,
  loserName = 'that Pokémon',
  statLabel = 'Attack',
  streak,
  best,
  onPlayAgain,
}: Props) {
  if (!open) return null

  return (
    <div className="overlay">
      <div className="modal">
        <div className="big-ball">💥</div>
        <h2>Game over!</h2>
        <p className="sub">
          <span className="loser-name">{loserName}</span> doesn't have the higher {statLabel}.
        </p>
        <div className="scores">
          <div className="score-box">
            <div className="n">{streak}</div>
            <div className="l">Streak</div>
          </div>
          <div className="score-box highlight">
            <div className="n">{best}</div>
            <div className="l">Best</div>
          </div>
        </div>
        <button className="btn" type="button" onClick={onPlayAgain}>
          Play again
        </button>
      </div>
    </div>
  )
}

export default GameOverModal
