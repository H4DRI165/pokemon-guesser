import { useState } from 'react'
import PokemonCard from './PokemonCard'
import type { Pokemon } from '../types/pokemon'

interface Props {
    pokemonA: Pokemon
    pokemonB: Pokemon
    statLabel: string
    statKey: string
    onCorrect: () => void
    onWrong: (loserName: string) => void
    onNextRound: () => void
}

function GameBoard({ pokemonA, pokemonB, statLabel, statKey, onCorrect, onWrong, onNextRound }: Props) {
    const [picked, setPicked] = useState<'A' | 'B' | null>(null)
    const [revealed, setRevealed] = useState(false)
    const [won, setWon] = useState(false)

    function guess(side: 'A' | 'B') {
        if (revealed) return

        const aVal = pokemonA.stats[statKey]
        const bVal = pokemonB.stats[statKey]
        const correct = (side === 'A' ? aVal : bVal) > (side === 'A' ? bVal : aVal)

        setPicked(side)
        setRevealed(true)
        setWon(correct)

        if (correct) onCorrect()
        else onWrong((side === 'A' ? pokemonA : pokemonB).name)
    }

    const correctSide: 'A' | 'B' | null =
        pokemonA.stats[statKey] > pokemonB.stats[statKey] ? 'A' : 'B'

    const continueAfterWin = won ? onNextRound : undefined

    return (
        <>
            <main className="matchup">
                <PokemonCard
                    pokemon={pokemonA}
                    statLabel={statLabel}
                    statKey={statKey}
                    revealed={revealed}
                    correct={correctSide === 'A'}
                    picked={picked === 'A'}
                    onGuess={() => guess('A')}
                    onContinue={continueAfterWin}
                />
                <div className="vs">VS</div>
                <PokemonCard
                    pokemon={pokemonB}
                    statLabel={statLabel}
                    statKey={statKey}
                    revealed={revealed}
                    correct={correctSide === 'B'}
                    picked={picked === 'B'}
                    onGuess={() => guess('B')}
                    onContinue={continueAfterWin}
                />
            </main>

            {revealed && won && (
                <div className="status-line">
                    <span className="tag mode">Correct! Click a card to continue</span>
                </div>
            )}
        </>
    )
}

export default GameBoard;
