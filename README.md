# ReBop Hot – Website

The website of **ReBop Hot**, a swing & jump-blues combo from Karlsruhe.
Built with **vanilla TypeScript, Tailwind CSS v4 and Vite** — no framework,
just TypeScript, the DOM, and utility classes.

> All photos, names and texts belong to the band (shootings credited to
> Dominik Frank); do not reuse without their permission.

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
├── index.html                    Home page (/)
├── band/ … impressum/            One directory per page: <page>/index.html,
│                                 served as clean URLs like /termine/
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

- **Vite + vanilla TS, no framework** — fast, dependency-light and easy to
  host anywhere as static files; the DOM and utility classes are all this
  site needs.
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

## Content credits

The "2026 banner" and band photos are credited to their photographers
(Dominik Frank, Thomas Harlfinger / EGO photos, venues) and remain the
property of the band.
