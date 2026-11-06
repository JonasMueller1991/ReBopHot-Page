# Ticket: Mobile Optimization — rebophot-website

**Status:** open
**Priority:** High (performance) / Medium (UX)
**Created:** 2026-11-06
**Scope:** Static homepage (Vite + TypeScript + Tailwind v4), 6 pages

## Summary

Mobile audit findings for the ReBop Hot website. The site is structurally
sound (viewport meta on all pages, `loading="lazy"` on gallery/video images,
explicit `width`/`height` to prevent layout shift, self-hosted fonts). The
weak spots are image weight (86 MB, no `srcset` anywhere), the sticky header
navigation on narrow screens, and touch ergonomics.

---

## 🔴 High impact: Performance

- [ ] **1. Responsive image pipeline** — generate WebP/AVIF variants
      (480/768/1024/1536px) for `public/images`, either via a `sharp`
      build script or a Vite plugin
  - Affects: `public/images/` (86 MB total, 34 files > 500 KB)
- [ ] **2. Serve responsive variants** — add `srcset`/`sizes` to all
      `<img>` tags
  - Affects: `index.html:71` (hero), `src/pages/band.ts:21` (member
    photos), `src/pages/galerie.ts:37` (gallery grid),
    `src/pages/termine.ts` (event lightbox)
- [ ] **3. Optimize hero image** — convert `2026_banner.png` (1.5 MB PNG)
      to JPEG/WebP; re-encode as part of task 1
- [ ] **4. Prioritize hero loading** — add `fetchpriority="high"` (or
      `<link rel="preload">`) to the hero image in `index.html`
- [ ] **5. Tame the starburst animation** — reduce size or disable below
      the `sm` breakpoint; respect `prefers-reduced-motion` for starburst
      and marquee ticker
  - Affects: `src/tailwind.css:177` (`.starburst`), `index.html:52`,
    `--animate-marquee` in `src/tailwind.css:57`

## 🟠 Medium impact: Layout & touch UX

- [ ] **6. Mobile navigation menu** — replace the `flex-wrap` nav (wraps
      to 3–4 sticky rows on phones) with a hamburger drawer or
      horizontal-scroll nav
  - Affects: `src/components.ts:96–163` (`renderHeader`)
- [ ] **7. Touch target sizes** — enlarge the theme toggle from 36×36px
      (`h-9 w-9`) and nav links to ≥ 44×44px
  - Affects: `src/components.ts:129–132`, `src/components.ts:106`

## 🟡 Low impact: Polish

- [ ] **8. Font loading** — preload or inline the critical font face
      (Oswald/condensed) in the `index.html` head to avoid a
      fallback-font flash on slow connections
  - Affects: `src/components.ts:18–25`
- [ ] **9. Mobile meta & PWA niceties** — add
      `<meta name="theme-color">` (dark stage color), apple-touch-icon;
      optionally make lightbox images pinch-zoomable
- [ ] **10. Verification** — run Lighthouse (mobile preset) in Chrome
       DevTools device mode before and after to confirm improvements

---

## Suggested order

1 → 3 → 2 → 4 (image pipeline, biggest win), then 5 and 6 (quick UX
fixes), the rest as polish.

## Acceptance criteria

- [ ] Lighthouse mobile performance score improved vs. baseline
- [ ] Hero image < 300 KB on mobile viewport widths
- [ ] Navigation fits a single row (or drawer) on 360px-wide screens
- [ ] All touch targets ≥ 44×44px
- [ ] Animations respect `prefers-reduced-motion`
