# Pokémon Stat Guesser

A "Higher or Lower" style browser game. Two random Pokémon appear side by side;
you pick which one has the higher stat (Attack). Correct guesses grow your
streak; a wrong guess ends the run and shows your final score.

Built with React + TypeScript to practise component design, custom hooks, async
data fetching, and clean typing of external API data.

## Features

- Two random Pokémon fetched from [PokeAPI](https://pokeapi.co/) each round
- Sprite, name, and Pokédex number shown; the stat stays hidden until you guess
- One click to guess — both values are revealed with a correct/wrong verdict
- Live streak + best counter
- Game-over modal with your run's score and a **Play again** button
- Responsive layout

## Tech Stack

| Layer    | Choice                             |
|----------|------------------------------------|
| Build    | Vite (`react-ts` template)         |
| Language | TypeScript (strict)                |
| UI       | React (function components + hooks)|
| Styling  | Plain CSS (`src/index.css`)        |
| Data     | PokeAPI (no auth / API key needed) |

## Getting Started

```bash
npm install
npm run dev
```

No environment variables or API keys are required — PokeAPI is fully public.

## Scripts

| Command            | Description                     |
|--------------------|---------------------------------|
| `npm run dev`      | Start the Vite dev server       |
| `npm run build`    | Type-check and build for prod   |
| `npm run preview`  | Preview the production build    |
| `npm run lint`     | Run ESLint                      |

## Project Structure

```
src/
  api/
    pokeapi.ts            // fetchPokemon(id), mapToPokemon(raw)
  components/
    PokemonCard.tsx       // sprite, name, stat (hidden or revealed)
    GameBoard.tsx         // renders two cards, owns guess logic
    StreakCounter.tsx
    GameOverModal.tsx
  hooks/
    usePokemonRound.ts    // returns { pokemonA, pokemonB, loading, error, nextRound }
  types/
    pokemon.ts            // Pokemon interface
  App.tsx                 // orchestrates data + score + modal
  main.tsx
```

## Roadmap

Stretch ideas tracked in [`docs/PROJECT_SPEC.md`](./docs/PROJECT_SPEC.md):
high-score persistence via `localStorage`, randomizing the compared stat each
round, reveal animations, difficulty modes, and sound effects.
