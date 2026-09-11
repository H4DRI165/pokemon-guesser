import type { Pokemon } from '../types/pokemon';
import { useCountUp } from '../hooks/useCountUp';

const MAX_STAT = 255

interface Props {
    pokemon: Pokemon
    statLabel: string
    statKey: string
    revealed: boolean
    correct: boolean
    picked: boolean
    onGuess?: () => void
    onContinue?: () => void
}

function PokemonCard({ pokemon, statLabel, statKey, revealed, correct, picked, onGuess, onContinue }: Props) {
    const value = pokemon.stats[statKey]
    const shown = useCountUp(value, revealed)

    const actionable = !revealed ? onGuess : onContinue

    const cls = [
        'card',
        revealed && 'revealed',
        revealed && onContinue && 'locked',
        revealed && correct && 'correct-card',
        revealed && picked && !correct && 'wrong-card',
    ].filter(Boolean).join(' ')

    return (
        <div className={cls} onClick={actionable}>
            <div className="sprite-wrap">
                {pokemon.sprite ? (
                    <img src={pokemon.sprite} alt={pokemon.name} draggable="false" />
                ) : (
                    <div className="sprite-fallback">🎮</div>
                )}
            </div>
            <div className="name">{pokemon.name}</div>
            <div className="id-tag">#{String(pokemon.id).padStart(3, '0')}</div>
            <div className="stat-row">
                <span className="label">{statLabel}</span>
                <span className={`value ${revealed ? 'counted' : 'unknown'}`}>{revealed ? shown : '???'}</span>
            </div>
            <div className="bar">
                <div className="fill" style={{ width: revealed ? `${(value / MAX_STAT) * 100}%` : '0%' }} />
            </div>
            {revealed && correct && (
                <div className="verdict correct">{picked ? 'Correct!' : 'Higher!'}</div>
            )}
            {revealed && picked && !correct && (
                <div className="verdict wrong">Your pick</div>
            )}
        </div>
    )
}

export default PokemonCard;
