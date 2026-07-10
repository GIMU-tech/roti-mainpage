# ROTI Mainpage Current Implementation Handoff

Last updated: 2026-07-10

This memo is the single restart point for the next session. It reflects the
current checked-out code, not an earlier planning-only state.

## 1. Project Goal And Scope

ROTI is a one-page integrated brand portal for three brands:

- ROTI CAMP: outdoor, movement, camping
- ROTI HOMESYS: organized home, storage, daily flow
- LEEL: calm kitchen and living

The page must remain a brand portal, not a shopping mall. Do not add prices,
products lists, carts, checkout, login, Cafe24 API integration, unverified
claims, or third-party brand claims.

Authoritative design rules: `Design.md` and `AGENTS.md`.

## 2. Current Git And Runtime State

- Repository: `C:\Users\Design\Desktop\작업물\개발\roti-mainpage`
- Checked-out branch: `test3`
- Current commit: `dd0dabe` (`07.09 17:44 수정`)
- Worktree at handoff: clean (`git status --short` produced no output)
- Stack: Next.js 15 App Router, React 19, TypeScript, pnpm
- Motion libraries: GSAP + ScrollTrigger and Lenis
- No dev server is intentionally left running.

Useful commands on this Windows workspace:

```powershell
pnpm run dev
pnpm lint
pnpm typecheck
pnpm build
```

Stop a foreground development server with `Ctrl+C` in the terminal that
started it. Do not stop unrelated Node processes.

## 3. Current Page Composition

`src/app/page.tsx` renders the page in this exact order:

1. `SmoothScrollProvider`
2. `IntroSequence`
3. fixed `Header`
4. `HeroPortal`
5. `BrandSlideStack`
6. `AboutRotiSection`
7. `RotiBusinessReplicaSection`
8. `Footer`

The navigation and section IDs are data-driven in `src/data/sections.ts`:

| Nav label | Target | Current implementation |
| --- | --- | --- |
| BRAND | `#brand` | `BrandSlideStack` containing CAMP, HOMESYS, LEEL fullscreen scenes |
| ABOUT | `#about` | `AboutRotiSection` |
| STANDARD | `#standard` | `RotiBusinessReplicaSection` |
| CONTACT | `#roti-footer` | `Footer` |

The Hero has its own `#top` target and is intentionally not shown in the nav.

The planned IA calls for separate "ROTI Group + Final CTA" and "Contact /
Partnership" stages. The current code combines the closing group/contact
information into `Footer`; treat this as a functional current state, not a
final IA sign-off.

## 4. Component Ownership

### Application and shared layout

- `src/app/page.tsx`: top-level composition only.
- `src/components/layout/Header.tsx`: fixed logo, desktop nav, hamburger,
  scroll state, and the dark/light header theme switch.
- `src/components/layout/Footer.tsx`: closing statement, links, brand logos,
  office addresses, and top action.
- `src/components/layout/SectionShell.tsx`: shared semantic section wrapper.
- `src/components/layout/SectionGrid.tsx`: shared body-grid wrapper.
- `src/data/sections.ts`: section IDs, hrefs, nav visibility, snap selectors.
- `src/data/navigation.ts`: derives header navigation from section data. Do not
  duplicate nav labels inside `Header.tsx`.
- `src/data/footer.ts`: footer content data.

### Intro and hero

- `src/components/intro/IntroSequence.tsx` + `src/styles/intro.css`:
  ALWAYS -> ALERT -> FOR CHANGES -> ROTI intro, skip action, first-screen
  scroll cue, and split ROTI-letter reveal.
- The ROTI intro reveal direction requested by the user is: O then R enter
  from the left; T then I enter from the right; the tagline drops in from
  above before the final lockup. Keep it restrained and do not reintroduce a
  separate one-line slogan scene.
- `src/components/hero/HeroPortal.tsx`, `BrandCarousel.tsx`, `BrandCard.tsx`,
  `HeroScrollCue.tsx`, and `src/hooks/useBrandCarousel.ts`: Hero card stage,
  card selection, arrow rotation, card click/tap to brand scene, and cue.
- `src/lib/animations/heroAnimations.ts`: Hero animation helpers.

### Brand scenes and Standard

- `src/components/sections/BrandSlideStack.tsx` +
  `src/styles/sections/brand-stack.css`: the full-bleed CAMP/HOMESYS/LEEL
  stack. Desktop uses the raised-card transition. Mobile uses a dedicated
  fullscreen stack that visually follows the desktop direction while avoiding
  excessive 3D cost.
- `src/components/sections/RotiBusinessReplicaSection.tsx` +
  `src/styles/sections/standard.css`: the currently mounted Standard section.
  It has three standards and a GSAP image rail. This is the source of truth
  for `#standard`.
- `src/components/sections/RotiStandardSection.tsx` is present but not mounted
  in `page.tsx`. Before a main merge, decide whether to remove it or reuse it;
  do not leave unused experimental components without an explicit decision.
- `src/components/sections/AboutRotiSection.tsx` +
  `src/styles/sections/about.css`: brand-group philosophy and the three-brand
  list.

### Scrolling and responsive CSS

- `src/components/scroll/SmoothScrollProvider.tsx`: Lenis setup, global
  full-section snap, anchor scrolling, reduced-motion fallback, and mobile
  idle snap.
- `BrandSlideStack.tsx` owns its desktop in-stack wheel snap. The global snap
  intentionally bypasses that desktop stack to avoid two snap systems fighting.
- `src/styles/tokens.css`: shared colors, typography, spacing, content-grid
  values, and Hero motion tokens.
- `src/styles/responsive.css`: breakpoint overrides. Start here when a mobile
  layout differs from desktop.
- `src/app/globals.css`: imports the split CSS files. Do not consolidate the
  styles back into one large file.

## 5. Important Design Decisions

### Visual and layout rules

- Header is an independent fixed interface layer. Body content must align to
  the body grid, not to the header logo position.
- Shared body grid: `--section-content-max: 95rem` and responsive
  `--section-gutter` from `src/styles/tokens.css`.
- Grouped body content should be vertically centered using grid/flex/min-height
  and balanced padding, not manual `translateY` or one-off spacer offsets.
- Full-bleed Hero and brand scenes may occupy the entire viewport, but readable
  copy and controls should retain the body rhythm where practical.
- Dark premium is the baseline. Ember Red `#B41307` is a thin/active accent
  only. No green main accent, broad red floor glow, red card strip, or red top
  tint.
- Header is dark/white over Hero and scene imagery. On the white Standard
  section, `Header.tsx` sets `data-theme="light"`, removing the dark gradient
  and switching logo/nav/menu to dark. Do not hardcode a Standard-only header
  inside that section.

### Interaction rules

- Hero arrows rotate the three-card stage; they are not commerce carousel UI.
- Clicking a Hero card scrolls to that card's matching fullscreen brand scene;
  clicking must not merely rotate the card.
- Major sections should land as one screen per deliberate scroll action.
- Desktop brand scenes have their own card-stack/wheel motion. Mobile retains
  the same scene sequence with lighter transforms and section snapping.
- Scroll cue uses the Hero's single floating treatment and should disappear
  after scrolling. Avoid duplicate "SCROLL"/"SWIPE" cues.
- Respect `prefers-reduced-motion`; no heavy motion should be required to read
  or reach content.

## 6. Current Brand Assets

Brand data is centralized in `src/data/brands.ts`. Do not hardcode brand
content into markup.

The latest supplied full-bleed scene images are mapped as `sectionImage`:

| Brand | Asset | Size | Note |
| --- | --- | ---: | --- |
| ROTI CAMP | `public/images/sections/roti-camp-brand-section.jpg` | 3,969,335 bytes | 3840 x 1580, user-supplied camping image |
| ROTI HOMESYS | `public/images/sections/roti-homesys-brand-section.jpg` | 1,934,758 bytes | 3840 x 1580, user-supplied tumbler image |
| LEEL | `public/images/sections/leel-brand-section.jpg` | 3,507,224 bytes | 3840 x 1580, user-supplied chair image |

All three source images are very wide (roughly 2.43:1). The scene CSS currently
uses `background-size: cover` and centered positioning. This preserves scene
height but causes strong side cropping on narrow mobile viewports; tune
per-brand `background-position` only after visual confirmation of the desired
subject placement.

Hero card assets are separate and remain in `public/images/brands/`.

## 7. Standard Section Current Behavior

The Standard section has three steps:

1. Practicality
2. Ordered design
3. Verifiable quality

The desktop rail shows two images: an active large image and a smaller next
preview, with a deliberate gap between them. The third image stays outside the
visible rail until it becomes next. On progress, the sequence is 1/2 -> 2/3 ->
3/1. The rail should reach the right viewport edge without an outer right
gutter, but the two visible images must not overlap.

This is implemented in `RotiBusinessReplicaSection.tsx` using GSAP `x`,
`width`, opacity, brightness, and z-index values. Relevant rules:

- Desktop gap: 20px; preview width: 24% of the stage.
- Mobile gap: 16px; preview width: 28% of the stage.
- The section itself remains a white information surface; the Header switches
  to light mode there.

## 8. Recent Work Included In HEAD

The latest committed work includes the following substantial areas:

- CSS split into base, layout, Header, Footer, Intro, motion, and section CSS
  files.
- Data-driven section/nav/footer ownership.
- Fullscreen brand stack plus separate desktop/mobile motion paths.
- Global and in-stack scroll snapping refinements.
- Header alignment/theme handling.
- Footer responsive layout and logo alignment.
- Body-grid rules added to `Design.md`.
- Standard rail changed from an attached/overlapping preview to two visible,
  spaced, right-edge image panels.
- User-supplied CAMP/HOMESYS/LEEL scene images added and mapped into the brand
  stack.
- Audit artifacts committed under `.codex-audits/2026-07-09-copy-ui-audit/`.

The most recent commit changed 110 files. The detailed file list is available
through `git show --stat dd0dabe`; use it before assuming a file was untouched.

## 9. Verification Already Performed

The following checks were re-run successfully while writing this handoff on
2026-07-10:

- `pnpm lint`: passed
- `pnpm typecheck`: passed
- `pnpm build`: passed
- `git diff --check`: passed

The latest implementation session also recorded these successful checks after
the brand image and header/rail changes:

- `pnpm lint`: passed
- `pnpm typecheck`: passed
- `pnpm build`: passed
- Local Next server checks: `/` and all three new JPG paths returned HTTP 200
  with `image/jpeg`.
- Browser checks at desktop and mobile validated that the Standard rail shows
  only active + next-preview panels with 20px desktop / 16px mobile gaps and
  no horizontal overflow at those checkpoints.
- Browser check validated Header dark mode over dark imagery and light mode
  over `#standard` (transparent header, dark logo/nav/menu).
- The latest audit screenshots and JSON reports are in
  `.codex-audits/2026-07-09-copy-ui-audit/`.

These are prior-session results. Re-run the three pnpm checks and fresh visual
QA after changing any motion, layout, asset, or responsive CSS.

## 10. Known Risks And Remaining Work

### P1 blockers

No known build/type/lint blocker at handoff. This is not a substitute for a
fresh manual browser check after the next visual change.

### P2 issues to resolve before release

1. **Brand-scene crop and tone QA**: the three newly supplied wide images need
   desktop/tablet/mobile focal-point review. Their bright product/lifestyle
   source tone may need a restrained dark overlay adjustment in
   `brand-stack.css` to preserve the portal's premium continuity.
2. **Image payload**: the new JPGs total about 9.4 MB. Create optimized WebP or
   AVIF derivatives after crop/focal direction is approved, then update the
   data paths without changing the scene model.
3. **Unused Standard implementation**: `RotiStandardSection.tsx` is not
   mounted. Confirm deletion or consolidation before main merge.
4. **Final IA clarity**: review whether Footer sufficiently covers the planned
   separate ROTI Group + Final CTA and Contact/Partnership intent. If it does
   not, add a focused closing section rather than adding commerce UI.
5. **End-to-end visual QA**: recheck 360, 390, 430, 768, and 1440+ widths;
   check no text clipping, no horizontal scroll, each snap landing, Intro skip,
   Hero card click, desktop Header theme transition, and reduced motion.
6. **Automated E2E coverage**: package scripts currently include lint,
   typecheck, build, and dev only. Playwright was used through the app/browser
   workflow, not a repository `pnpm test:e2e` script. Add project-owned E2E
   coverage only if the team wants it maintained.

## 11. Recommended Next Session Order

1. Read, in order: `Design.md`, this file,
   `handoff/ROTI_MAINTENANCE_RESPONSIVE_REFACTOR_PLAN.md`,
   `handoff/ROTI_MOBILE_BRAND_SCENE_IMPACT_NOTE.md`, then the mandatory
   harness documents listed in `AGENTS.md`.
2. Run `git status --short` and confirm the branch before editing. Preserve any
   user changes in a dirty worktree.
3. Start `pnpm run dev` and visually inspect the new three scene images at 1440
   desktop, 768 tablet, 430 mobile, 390 mobile, and 360 mobile.
4. Fix focal position/overlay only if evidence shows the subject or copy is
   compromised. Prefer brand-specific CSS selectors over global media hacks.
5. Review the footer/closing IA and decide whether the explicit final CTA stage
   is needed.
6. Remove or consolidate unused code only after confirming that no desired
   screen still depends on it.
7. Run `pnpm lint`, `pnpm typecheck`, and `pnpm build` after each completed
   implementation phase. Capture desktop/mobile visual evidence for motion
   changes.

## 12. Mandatory Report Template For Future Changes

Every implementation response should include:

1. Summary
2. Changed Files
3. Implementation Notes
4. Tests / Checks Run
5. Design.md Compliance Check
6. Risks / Follow-ups

Use this Design.md checklist verbatim:

```md
- [ ] Brand portal, not shop
- [ ] Dark premium tone maintained
- [ ] Red accent used with restraint
- [ ] No green primary hero accent
- [ ] Restrained arrow card-rotation controls preserved
- [ ] Card-click-to-brand-section scroll preserved
- [ ] One-brand-per-screen scroll structure preserved
- [ ] ROTI CAMP / HOMESYS / LEEL all represented
- [ ] No unverified marketing claims added
- [ ] Mobile/accessibility/performance risks noted
```

## 13. Do Not Regress

- Do not convert the Hero into a product grid or conventional commerce carousel.
- Do not remove Hero arrow rotation or card-click-to-brand-scene behavior.
- Do not collapse the three brand scenes into a generic card list.
- Do not bring back duplicate Intro scroll indicators.
- Do not use manual vertical translate adjustments as the default centering
  strategy.
- Do not reintroduce horizontal page overflow. Any intentional right-edge rail
  overflow must be contained inside its visual stage.
- Do not commit, push, or merge without explicit user approval.
