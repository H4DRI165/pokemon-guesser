import { useState } from 'react'
import GameBoard from './components/GameBoard'
import StreakCounter from './components/StreakCounter'
import GameOverModal from './components/GameOverModal'
import { usePokemonRound } from './hooks/usePokemonRound'

const STAT_LABEL = 'Attack'
const STAT_KEY = 'attack'

function App() {
  const { pokemonA, pokemonB, loading, error, nextRound } = usePokemonRound()
  const [score, setScore] = useState({ streak: 0, best: 0 })
  const [gameOver, setGameOver] = useState(false)
  const [loserName, setLoserName] = useState<string>()

  function handleCorrect() {
    setScore((s) => {
      const streak = s.streak + 1
      return { streak, best: Math.max(s.best, streak) }
    })
  }

  function handleWrong(loser: string) {
    setLoserName(loser)
    setGameOver(true)
  }

  function playAgain() {
    setScore((s) => ({ streak: 0, best: s.best }))
    setGameOver(false)
    setLoserName(undefined)
    nextRound()
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="logo">
          <div className="ball" aria-hidden="true"></div>
          <div>
            <h1>Pokémon Stat Guesser</h1>
            <p>Higher or Lower</p>
          </div>
        </div>
        <StreakCounter streak={score.streak} best={score.best} />
      </header>

      <div className="prompt">
        <span className="text">Who has the higher</span>
        <span className="stat-pill">{STAT_LABEL}</span>
        <span className="text">?</span>
      </div>

      {loading ? (
        <div className="status-line">Loading Pokémon…</div>
      ) : error ? (
        <div className="status-line">Error: {error}</div>
      ) : pokemonA && pokemonB ? (
        <GameBoard
          pokemonA={pokemonA}
          pokemonB={pokemonB}
          statLabel={STAT_LABEL}
          statKey={STAT_KEY}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
          onNextRound={nextRound}
        />
      ) : null}

      <GameOverModal
        open={gameOver}
        loserName={loserName}
        statLabel={STAT_LABEL}
        streak={score.streak}
        best={score.best}
        onPlayAgain={playAgain}
      />
    </div>
  )
}

export default App
