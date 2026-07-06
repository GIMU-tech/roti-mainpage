# ROTI Mainpage Release Review Notes

Date: 2026-07-06
Scope: Current localhost mainpage, desktop 1280x720, mobile 390x844, current code in `codex/test2`.

## Captured Steps

1. `01-intro-word-alway.png` - intro first word.
2. `02-intro-logo.png` - intro logo scene.
3. `03-hero-cards-spread.png` - desktop hero after intro.
4. `04-brand-camp-scene.png` - first scroll into brand stack, transitional state.
5. `05-brand-homesys-scene.png` - ROTI CAMP full scene.
6. `06-brand-leel-scene.png` - ROTI HOMESYS full scene.
7. `07-standard-or-footer.png` - bright ROTI Standard section.
8. `08-mobile-hero.png` - mobile hero after intro.
9. `09-mobile-brand-scene.png` - mobile brand scene.
10. `10-footer-contact.png` - footer/contact area.

## Release Review Summary

The intro and hero direction are visually close to the requested premium ROTI portal direction, and the build/lint/typecheck gates pass when the bundled Node path is available. The current page is not release-ready as a final brand portal because the final IA is incomplete, inactive card click behavior does not go directly to the matching section, brand-scene CTAs route to an external shopping mall URL, and the ROTI Standard section breaks the dark premium visual continuity with a bright white section and a reference/replica component name.

## Main Risks

- Final IA is incomplete in `src/app/page.tsx`: `AboutRotiSection`, `RotiGroupSection`, `FinalCTA`, and explicit Contact / Partnership CTA are not rendered.
- Brand scene CTA uses `brand.shopUrl ?? brand.brandUrl`, and every brand currently has the same external Lotteon shop URL.
- Inactive hero card click selects/rotates the card instead of immediately scrolling to the matching brand scene.
- `HakjisaBusinessReplicaSection` is rendered in production flow and styled as `hcg-business-replica`, which reads as a reference implementation artifact.
- The bright white Standard section visually disconnects from the dark premium ROTI flow.
- No automated interaction/e2e tests exist for intro completion, card click, arrow rotation, brand section snapping, reduced motion, or mobile layout.

## Checks

- `pnpm lint`: pass after prepending bundled Node to PATH.
- `pnpm typecheck`: pass after prepending bundled Node to PATH.
- `pnpm build`: pass after prepending bundled Node to PATH.
- Build output routes: `/`, `/_not-found`.

