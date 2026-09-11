# Pokémon Stat Guesser — Project Documentation

## 1. Overview

A "Higher or Lower" style browser game. Two random Pokémon are shown side by
side; the player guesses which one has the higher value for a given stat
(e.g. Attack). Correct guesses extend a streak; a wrong guess ends the round.

**Goal:** demonstrate React + TypeScript fundamentals — component design,
custom hooks, async data fetching, and clean typing of external API data —
in a small, polished, deployable project.

**Status:** MVP shipped (see checklist in §3). Building the static UI with the
mockup, wiring real data, and game logic are done; the reveal already animates
via CSS (`.card.revealed`). Remaining work is stretch goals + deployment.

**Live demo:** _(add link once deployed)**
**Repo:** _(add link once pushed)_
**UI mockup (design reference):** [`docs/ui-mockup.html`](./ui-mockup.html) —
open directly in a browser; a clickable preview of every game state. Replicate
its layout/theme when building the static UI.

---

## 2. Tech Stack

| Layer      | Choice                         | Notes                                   |
| ---------- | ------------------------------ | --------------------------------------- |
| Build tool | Vite                           | `react-ts` template                     |
| Language   | TypeScript                     | strict mode on                          |
| UI         | React 19 (function components) | hooks only, no class components         |
| Styling    | Plain CSS (`src/index.css`)    | swap for Tailwind if preferred          |
| Data       | [PokeAPI](https://pokeapi.co/) | free, no auth, no rate-limit key needed |
| Storage    | `localStorage`                 | high score persistence (stretch goal)   |
| Hosting    | Vercel or Netlify              | free static hosting                     |

---

## 3. Features

### MVP (must ship) — ✅ done

- [x] Fetch two random Pokémon on load
- [x] Display each Pokémon's sprite, name, and (initially hidden) stat
- [x] Player clicks a card to guess "higher"
- [x] Reveal both stat values and correctness on click
- [x] Track and display current streak
- [x] Game-over state on wrong guess, with a restart button

### Stretch goals (pick 2–3 after MVP works)

- [ ] Persist high score in `localStorage`
- [x] Randomize which stat is compared each round
- [x] Reveal animation / transition (framer-motion or CSS)
- [ ] Difficulty modes (narrow vs. wide Pokémon ID range)
- [ ] Sound effects on correct/incorrect guess
- [ ] Shareable result ("I got a streak of 12!")

### Explicitly out of scope (for now)

- User accounts / login
- Multiplayer
- Backend server of any kind

---

## 4. API Reference

**Base URL:** `https://pokeapi.co/api/v2/`

**Endpoint used:** `GET /pokemon/{id}` where `id` is 1–1025 (check current max
on PokeAPI docs — the dataset grows over time).

Relevant fields from the raw response:

```json
{
  "id": 6,
  "name": "charizard",
  "sprites": { "front_default": "https://..." },
  "stats": [
    { "base_stat": 78, "stat": { "name": "hp" } },
    { "base_stat": 84, "stat": { "name": "attack" } }
  ]
}
```

**App-level type** (what the raw response gets mapped into — keeps
components decoupled from PokeAPI's shape):

```typescript
interface Pokemon {
  id: number
  name: string
  sprite: string
  stats: Record<string, number> // e.g. { hp: 78, attack: 84 }
}
```

**Rate limits:** PokeAPI has no official hard limit but asks for reasonable
use — no auth required, cache responses client-side if hammering it during
dev.

---

## 5. File Structure

```
src/
  api/
    pokeapi.ts          // fetchPokemon(id), mapToPokemon(raw)
  components/
    PokemonCard.tsx      // sprite, name, stat (hidden or revealed)
    GameBoard.tsx         // renders two cards, owns guess logic
    StreakCounter.tsx
    GameOverModal.tsx
  hooks/
    usePokemonRound.ts   // returns { pokemonA, pokemonB, loading, error, nextRound }
    useCountUp.ts        // animates a stat value from 0 when revealed
  types/
    pokemon.ts            // Pokemon interface
  App.tsx
  main.tsx
```

---

## 6. Setup Instructions

```bash
npm create vite@latest pokemon-guesser -- --template react-ts
cd pokemon-guesser
npm install
npm run dev
```

No environment variables or API keys needed — PokeAPI is fully public.

---

## 7. Build Order

1. ✅ Scaffold project (Vite + React + TS)
2. ✅ Build API layer (`fetchPokemon(id)`, response mapper)
3. ✅ Build static UI with hardcoded fake data
4. ✅ Wire up real data fetching via `usePokemonRound`
5. ✅ Add game logic (compare stats, update streak, end game)
6. ✅ Polish the reveal (animation/delay)
7. [ ] Add 2–3 stretch features
8. [ ] Deploy + write README (README done — deploy pending)

---

## 8. Open Questions / Decisions to Revisit

- Which stat(s) to include by default — all six, or a curated subset?
  → **Decided:** compare a random stat each round from HP, Attack, Defense, and
  Speed; re-roll until both Pokémon and their chosen stat value differ.
- Should sprite be static front-facing image or animated (if available)?
  → **Decided:** static `front_default` sprite.
- Exact ID range to pull from (avoid Pokémon with missing sprites/data)?
  → **Decided:** IDs 1–1025 (matches PokeAPI's current dataset); random picks
  are re-rolled until the two Pokémon and their Attack values differ.
