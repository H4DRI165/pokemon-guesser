import { useState, useCallback, useEffect } from 'react'
import { fetchPokemon } from '../api/pokeapi'
import type { Pokemon } from '../types/pokemon'

const MAX_ID = 1025

const STATS = [
    { key: 'hp', label: 'HP' },
    { key: 'attack', label: 'Attack' },
    { key: 'defense', label: 'Defense' },
    { key: 'speed', label: 'Speed' },
] as const;

type Stat = (typeof STATS)[number]

const randId = () => Math.floor(Math.random() * MAX_ID) + 1
const randStat = (): Stat => STATS[Math.floor(Math.random() * STATS.length)]

export function usePokemonRound() {
    const [pokemonA, setPokemonA] = useState<Pokemon | null>(null)
    const [pokemonB, setPokemonB] = useState<Pokemon | null>(null)
    const [stat, setStat] = useState<Stat>(randStat)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const loadRound = useCallback(async () => {
        setLoading(true)
        setError(null)

        const newStat = randStat()
        setStat(newStat)

        try {
            // keep re-rolling until two different Pokémon
            let a: Pokemon
            let b: Pokemon
            do {
                a = await fetchPokemon(randId())
                b = await fetchPokemon(randId())
            } while (a.id === b.id || a.stats[newStat.key] === b.stats[newStat.key])

            setPokemonA(a)
            setPokemonB(b)
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Failed to load Pokémon')
        } finally {
            setLoading(false)
        }
    }, [])

    // fetch the first round on mount
    useEffect(() => {
        loadRound()
    }, [loadRound])

    return { pokemonA, pokemonB, statKey: stat.key, statLabel: stat.label, loading, error, nextRound: loadRound }
}