# ReBop Hot – TypeScript Learning Project

A multi-page band website built with **vanilla TypeScript + Vite**, modeled after
[www.rebophot.de](https://www.rebophot.de/) (a swing & jump-blues band from Karlsruhe).

No framework, no jQuery — just TypeScript, the DOM, and a CSS file. That is the
best way to learn the language itself before reaching for React & friends later.

## Getting started

```bash
npm install     # once, to fetch the dev tools (Vite + TypeScript)
npm run dev     # starts a dev server, usually at http://localhost:5173
```

Other scripts:

```bash
npm run build   # type-checks with tsc, then bundles everything into dist/
npm run preview # serves the production build from dist/
```

## Tailwind CSS

The project uses **Tailwind CSS v4** via the official Vite plugin
(`@tailwindcss/vite` in `vite.config.ts`). Tailwind v4 needs no config file —
the design tokens (colors, fonts, animations) live directly in `src/tailwind.css`
under `@theme`, e.g. `--color-gold` becomes the utility class `text-gold`.

**All pages use Tailwind.** Utility classes live directly in the HTML and in the
TypeScript templates; only what utilities cannot express (`.starburst`,
`.ticket` notches, `.btn-retro`) is plain CSS in `src/tailwind.css`. The shared
header/footer markup is rendered by `src/components.ts`.

## Project structure

```
├── index.html            Home page
├── band.html             The band + its 9 members
├── termine.html          Events (upcoming + past)
├── kontakt.html          Contact details + booking form (validated in TS)
├── galerie.html          Picture gallery with a lightbox
├── impressum.html        Legal notice
├── vite.config.ts        Tells Vite about the 6 HTML entry points
├── tsconfig.json         Strict TypeScript compiler settings
└── src/
    ├── types.ts          All shared interfaces (BandMember, BandEvent, ...)
    ├── data.ts           The "content database": members, events, contact info
    ├── components.ts     Shared navigation + footer (rendered with Tailwind)
    ├── tailwind.css      Tailwind v4 entry: @theme tokens + vintage components
    └── pages/            One entry script per page
        ├── home.ts       Date logic: find the next upcoming gig
        ├── band.ts       Render member cards from typed data
        ├── termine.ts    Split & sort events into upcoming / past
        ├── kontakt.ts    Form handling + validation (unions, type guards)
        ├── galerie.ts    Event delegation, lightbox, KeyboardEvent
        └── impressum.ts  Minimal page, just wires up header/footer
```

## TypeScript concepts used (and where to look)

| Concept | Where |
| --- | --- |
| Interfaces | `src/types.ts` |
| Union types (`BandEvent \| null`) | `src/pages/home.ts` |
| Optional fields (`event.time?`) | `src/pages/termine.ts` |
| Type guards | `hasError()` in `src/pages/kontakt.ts` |
| Type casting (`as HTMLFormElement`) | `src/pages/kontakt.ts` |
| Array methods (`filter`, `map`, `sort`) | `src/pages/termine.ts`, `src/pages/band.ts` |
| `Record` / indexed access | `results` object in `src/pages/kontakt.ts` |
| Event delegation | `src/pages/galerie.ts` |
| `Date` + `toLocaleDateString('de-DE')` | `src/pages/home.ts`, `src/pages/termine.ts` |

## Exercises to learn more

1. **Events:** add a `venueUrl?: string` field to `BandEvent` in `types.ts`,
   fill it for a few events in `data.ts`, and render it as a link in `termine.ts`.
2. **Search:** add a text input on the Termine page that filters events by
   location/title as you type (hint: `input` event + `String.includes`).
3. **Form:** make the date field reject dates in the past and show an error.
4. **Gallery:** add left/right arrow buttons in the lightbox to flip through
   all pictures (hint: keep the current index in a `let` variable).
5. **Strict mode:** open `tsconfig.json` and add `"noUncheckedIndexedAccess": true`
   — then fix every compiler error that appears. You will learn a lot.

## Note

This is a private learning project. All names, contact data and texts are taken
from the public website of the band; the "photos" are CSS placeholders. It is
not the real band website.
