import type { Pokemon } from '../types/pokemon';

interface RawPokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
    stats: {
        base_stat: number;
        stat: { name: string };
    }[];
}

async function fetchPokemon(id: number): Promise<Pokemon> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch Pokémon with ID ${id}`);
    }

    const data = (await response.json()) as RawPokemon;

    return mapToPokemon(data);
}

function mapToPokemon(raw: RawPokemon): Pokemon {
    const stats: Record<string, number> = {};
    for (const s of raw.stats) {
        stats[s.stat.name] = s.base_stat;
    }

    return {
        id: raw.id,
        name: raw.name,
        sprite: raw.sprites.front_default,
        stats,
    }
}

export { fetchPokemon, mapToPokemon };