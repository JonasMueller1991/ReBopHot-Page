# ReBop Hot – TypeScript Project

A multi-page band website built with **vanilla TypeScript, Tailwind CSS v4 and Vite**,
modeled after [www.rebophot.de](https://www.rebophot.de/) (a swing & jump-blues band
from Karlsruhe). No framework — TypeScript, the DOM, and utility classes.

> Private learning project. All photos, names and texts belong to the band
> (shootings credited to Dominik Frank); do not publish without their permission.

## Scripts

```bash
npm run dev        # dev server at http://localhost:5173
npm run build      # type-check (tsc) + production build into dist/
npm run preview    # serve the production build

npm run lint       # ESLint (typescript-eslint, flat config)
npm run lint:fix   # ESLint with --fix
npm run format     # Prettier, incl. Tailwind class sorting
npm run format:check
npm test           # Vitest, single run
npm run test:watch # Vitest in watch mode
```

## Project structure

```
├── index.html … impressum.html   One HTML file per page
├── vite.config.ts                Vite 7: multi-page inputs + "@" path alias
├── vitest.config.ts              Unit test setup (node environment)
├── eslint.config.js              ESLint flat config (typescript-eslint)
├── tsconfig.json                 Strict; incl. noUncheckedIndexedAccess
└── src/
    ├── types.ts                  All shared interfaces
    ├── data.ts                   Content "database": members, events, pictures
    ├── components.ts             Shared chrome: fonts, nav, footer, skip link,
    │                             typed DOM helpers qs()/qsa(), initChrome()
    ├── tailwind.css              Tailwind v4: @theme tokens + vintage components
    ├── lib/                      Pure logic — no DOM, fully unit-tested
    │   ├── escape.ts             escapeHtml
    │   ├── dates.ts              daysUntil, daysUntilLabel, formatEventDate
    │   ├── events.ts             findNextEvent, splitByDate
    │   ├── validation.ts         form validators + hasError type guard
    │   └── *.test.ts             Vitest unit tests for all of the above
    └── pages/                    One entry script per page (thin DOM wiring)
```

## Design decisions (the "why")

- **Vite + vanilla TS, no framework** — the goal is learning the language and
  the DOM; everything transfers to React/Vue later.
- **lib/ vs pages/ split** — pure logic is separated from DOM wiring so it can
  be unit-tested without a browser. The "today" date is always passed as a
  parameter, which makes date logic deterministic and testable.
- **Tailwind CSS v4** via `@tailwindcss/vite`, no config file: design tokens
  live in the `@theme` block of `src/tailwind.css` (`--color-gold` → `text-gold`).
  The palette (charcoal + cream + brass) was measured from the 2026 band banner,
  which is a black & white photo.
- **Self-hosted fonts** (`@fontsource/*`, imported once in `components.ts`) —
  no request to Google's CDN, GDPR-friendly, identical rendering everywhere.
- **Strict TypeScript** — `strict`, `noUncheckedIndexedAccess` (array access
  returns `T | undefined`), `verbatimModuleSyntax` (type-only imports must use
  `import type`).
- **Typed DOM helpers** — `qs<T>()` throws a descriptive error instead of the
  silent `if (!el) return`; a missing element is a bug you want to see.
- **ESLint + Prettier** — flat config, `typescript-eslint` recommended rules,
  `prettier-plugin-tailwindcss` keeps utility classes sorted automatically.

## TypeScript concepts used (and where to look)

| Concept                                       | Where                                   |
| --------------------------------------------- | --------------------------------------- |
| Interfaces                                    | `src/types.ts`                          |
| Union types (`BandEvent \| null`)             | `src/lib/events.ts`                     |
| Optional fields (`event.time?`)               | `src/pages/termine.ts`                  |
| Type guards                                   | `hasError()` in `src/lib/validation.ts` |
| Discriminated unions                          | `Validation` in `src/lib/validation.ts` |
| Generic constraints (`qs<T extends Element>`) | `src/components.ts`                     |
| Array methods (`filter`, `map`, `sort`)       | `src/lib/events.ts`                     |
| `Record` / indexed access                     | `src/pages/kontakt.ts`                  |
| Event delegation                              | `src/pages/galerie.ts`                  |
| `Date` + `toLocaleDateString('de-DE')`        | `src/lib/dates.ts`                      |

## Exercises to learn more

1. **Tests first:** write a test for a new lib function before implementing it
   (TDD light). Example: `isFreeAdmission(event)` that checks if the admission
   text contains "frei".
2. **Events:** add a `venueUrl?: string` field to `BandEvent`, fill it in
   `data.ts`, render it as a link in `termine.ts`.
3. **Search:** add a text input on the Termine page that filters events by
   location/title as you type — put the pure filter function in `src/lib/`
   and test it.
4. **Form:** make `validateDate` reject dates in the past; add the test.
5. **Gallery:** add left/right arrow buttons to the lightbox to flip through
   all pictures (keep the current index in a `let` variable).

## Note

This is a private learning project. The "2026 banner" and photos come from the
band's public website; the site itself is not the real band website.
