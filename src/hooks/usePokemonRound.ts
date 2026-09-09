import { useState, useCallback, useEffect } from 'react'
import { fetchPokemon } from '../api/pokeapi'
import type { Pokemon } from '../types/pokemon'

const MAX_ID = 1025

const randId = () => Math.floor(Math.random() * MAX_ID) + 1

export function usePokemonRound() {
    const [pokemonA, setPokemonA] = useState<Pokemon | null>(null)
    const [pokemonB, setPokemonB] = useState<Pokemon | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const loadRound = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            // keep re-rolling until two different Pokémon
            let a: Pokemon
            let b: Pokemon
            do {
                a = await fetchPokemon(randId())
                b = await fetchPokemon(randId())
            } while (a.id === b.id || a.stats['attack'] === b.stats['attack'])

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

    return { pokemonA, pokemonB, loading, error, nextRound: loadRound }
}