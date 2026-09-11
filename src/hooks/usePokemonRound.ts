import { useState, useCallback, useEffect } from 'react'
import { fetchPokemon } from '../api/pokeapi'
import type { Pokemon } from '../types/pokemon'

const MAX_ID = 1025

const STATS = [
  { key: 'hp', label: 'HP' },
  { key: 'attack', label: 'Attack' },
  { key: 'defense', label: 'Defense' },
  { key: 'speed', label: 'Speed' },
] as const

type Stat = (typeof STATS)[number]

type Round = { a: Pokemon; b: Pokemon; stat: Stat }

const randId = () => Math.floor(Math.random() * MAX_ID) + 1
const randStat = (): Stat => STATS[Math.floor(Math.random() * STATS.length)]

async function fetchRound(): Promise<Round> {
  const stat = randStat()

  // keep re-rolling until two different Pokémon with different values
  let a: Pokemon
  let b: Pokemon
  do {
    a = await fetchPokemon(randId())
    b = await fetchPokemon(randId())
  } while (a.id === b.id || a.stats[stat.key] === b.stats[stat.key])

  return { a, b, stat }
}

export function usePokemonRound() {
  const [pokemonA, setPokemonA] = useState<Pokemon | null>(null)
  const [pokemonB, setPokemonB] = useState<Pokemon | null>(null)
  const [stat, setStat] = useState<Stat>(randStat)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const applyRound = useCallback(({ a, b, stat }: Round) => {
    setPokemonA(a)
    setPokemonB(b)
    setStat(stat)
    setLoading(false)
    setError(null)
  }, [])

  const failRound = useCallback((e: unknown) => {
    setError(e instanceof Error ? e.message : 'Failed to load Pokémon')
    setLoading(false)
  }, [])

  const nextRound = useCallback(() => {
    setLoading(true)
    setError(null)
    fetchRound().then(applyRound).catch(failRound)
  }, [applyRound, failRound])

  // fetch the first round on mount
  useEffect(() => {
    let ignore = false
    fetchRound()
      .then((round) => {
        if (!ignore) applyRound(round)
      })
      .catch((e) => {
        if (!ignore) failRound(e)
      })
    return () => {
      ignore = true
    }
  }, [applyRound, failRound])

  return {
    pokemonA,
    pokemonB,
    statKey: stat.key,
    statLabel: stat.label,
    loading,
    error,
    nextRound,
  }
}
