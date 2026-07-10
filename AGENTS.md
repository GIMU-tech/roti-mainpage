# ROTI Mainpage Codex Agent Rules

## Project Mission
Build the ROTI integrated brand portal mainpage.

ROTI must look like a professional brand group that operates:

- ROTI CAMP
- ROTI HOMESYS
- LeEL

This is not a product-listing shopping mall homepage.

## Source of Truth

Use the following authority order when instructions conflict:

1. The user's latest explicit request
2. The currently assigned `/goal`
3. `Design.md`
4. `AGENTS.md`
5. Current handoff and harness documents
6. Archived or earlier planning documents

Earlier documents that describe no Hero arrows, two-click card entry, manual intro stepping, or direct card-to-anchor scrolling are superseded by the current rules in `Design.md` and this file.

## ROTI Mainpage Canonical Direction v3

This repository's goal is to build a premium brand portal mainpage for ROTI's three brands, not a shopping mall.

### Core Brands

- ROTI CAMP
- ROTI HOMESYS
- LeEL

### Final IA

Do not create a separate Brand Portfolio section.

The final mainpage should follow this order:

1. Intro
   - Automatic and skippable
   - Approximately 2-3 seconds on first playback
   - Connects directly into the Hero card-spread state
   - Full sequence plays once per browser session unless product requirements change

2. Hero
   - ROTI brand portal
   - Three ways for everyday life
   - 3D brand cards / glass card stage for the three brands
   - Restrained arrow controls change only the active card
   - Any card enters the matching brand scene with one click
   - A side card centers before fullscreen expansion
   - A center card expands directly

3. ROTI CAMP Scene
   - Outdoor life
   - Camping / movement / storage
   - Dark outdoor mood, mountain ridge, movement, and camping gear atmosphere

4. ROTI HOMESYS Scene
   - An organized home
   - Storage / movement / daily flow
   - Organized interior, storage structure, warm lighting, and home system mood

5. LeEL Scene
   - Calm kitchen and living
   - Kitchen / material / negative space
   - Steel, stone, kitchen lighting, and restrained living-object mood

6. About ROTI
   - Briefly explain what kind of brand group ROTI is.
   - Explain how the three brands divide everyday-life areas.
   - Do not merely repeat the same Hero brand list without new information.

7. ROTI Standard
   - Practicality
   - Ordered design
   - Verifiable quality
   - Do not use unverified claims such as No. 1, best, certified, supplied to, or awarded.

8. ROTI Connect
   - Distinguish customer/product, bulk/corporate, and distribution/partnership inquiries.
   - Route users to verified contact information without creating a new inquiry form.

9. Contact / Partnership
   - Can expand to inquiry, partnership, bulk purchase, and distribution inquiries.
   - Do not implement checkout, cart, order, or signup features yet.

### Additional Forbidden Scope

- Do not create a product-listing shopping mall UI.
- Do not implement price, buy, cart, order, or signup flows.
- Do not implement Cafe24 API in this phase.
- Do not create a separate Brand Portfolio section.
- Do not use green as a primary accent color.
- Do not use third-party brand names, logos, delivery claims, or supply claims without explicit approval.
- Do not leave test routes, experiment components, debug logs, or unused model files in a main merge target.
- Do not add missing Final CTA, Contact, content-expansion sections, or unrelated global CSS refactors during a Hero-transition `/goal` unless that `/goal` explicitly requests them.

### Additional Design Criteria

- Base tone: black / charcoal / dark premium
- Accent color: ROTI Ember Red `#B41307`
- User-facing copy should be Korean-first.
- Brand names `ROTI CAMP`, `ROTI HOMESYS`, and `LeEL` may remain in English.
- Motion should use restrained reveal, fade, slide, depth, and connected-object transitions.
- On mobile, prioritize active content, readability, frame stability, and safe interaction over heavy 3D effects.
- Avoid abrupt visual-language changes between sections.

### Required Work Report Items

Every task must report:

1. Changed files
2. Scope violations, if any
3. `pnpm lint` result
4. `pnpm typecheck` result
5. `pnpm build` result
6. Mobile considerations
7. Accessibility and reduced-motion considerations
8. P1 Blockers
9. P2 Issues
10. Remaining cleanup or follow-up work

Do not run `git commit`, `git push`, or PR merge before user approval.

## Mandatory Read Order Before Any Work

Before planning or editing code, read these files in this order:

1. `Design.md`
2. `AGENTS.md`
3. The current user request and assigned `/goal`
4. `handoff/PROJECT_CONTEXT_FOR_AI.md`
5. `handoff/CODEX_SETUP_BRIEF.md`
6. `handoff/AGENT_TEAM_AND_HARNESS_PLAN_V2.md`
7. `handoff/VISUAL_TARGET_SPEC_FROM_REFERENCES.md`
8. `handoff/REFERENCE_MANIFEST.md`
9. `handoff/phase-4-section-enhancement.md`
10. `01_File-Generation-Plan.md`
11. `02_Project-Structure.md`
12. `prompts/00_Global-Rules.md`
13. `harness/DESIGN_COMPLIANCE_GATE.md`
14. `harness/QA_CHECKPOINT_MATRIX.md`
15. `harness/phase-4-section-gates.md`

If an earlier handoff or planning file conflicts with the current Hero interaction, intro, navigation, or brand naming rules, follow `Design.md` and this file and report the conflict.

## Non-Negotiable Design Rules

- The mainpage is a brand portal, not a shop page.
- Hero must use a dark premium black/charcoal tone.
- The main accent is ROTI Ember Red `#B41307`.
- Green must not be used as the main Hero accent.
- Hero must contain three brand cards.
- Brand switching must be done by restrained left/right arrow controls.
- Arrow controls change only the active Hero card and do not enter a brand section.
- Clicking any Hero brand card starts a one-click transition into that brand section.
- If the clicked card is on the left or right, it first moves to the center and rotates to `0deg`.
- The centered card then expands to cover the viewport.
- If the clicked card is already centered, skip the centering phase and begin expansion directly.
- A second click must never be required.
- Do not immediately scroll to the brand anchor when a card is clicked.
- Scroll position may be synchronized only after the transition overlay fully covers the viewport.
- After Hero, each brand section must appear as a fullscreen one-brand-per-screen experience.
- ROTI CAMP, ROTI HOMESYS, and LeEL must each have their own section.
- The final part must include ROTI group positioning and three brand CTA routes when that phase is assigned.
- Any design or interaction change must be checked against `Design.md`.

## Intro Rules

- Intro must autoplay.
- Total normal playback should remain approximately 2-3 seconds.
- Keep `SKIP`.
- Wheel, click, Enter, Space, or Escape may fast-complete the intro.
- Automatic completion and manual fast-completion must use one idempotent completion function.
- Full intro should play once per browser session using a client-safe storage check.
- React Strict Mode must not produce duplicate timers or duplicate completion.
- `prefers-reduced-motion` must shorten or bypass the intro.
- Intro cleanup must always restore main interaction and scrolling.

## Hero Transition Architecture

### Responsibility Boundaries

- `BrandCard` reports which card was selected, its source element, and its current slot.
- `BrandCard` must not own fullscreen transition timing, scroll synchronization, or global locking.
- `BrandCarousel` preserves card rotation, active-card state, and Hero control behavior.
- `BrandCarousel` must not contain the entire fullscreen transition timeline.
- Transition state, overlay rendering, animation timeline, scroll synchronization, and failure recovery must be separated into dedicated modules or hooks.
- Brand section components must not directly own Hero transition state.
- New transition styles should use a dedicated CSS Module where practical.
- Do not place the entire transition implementation into `globals.css`.

### Recommended Structure

Use an equivalent structure if the repository requires it:

```text
src/
  components/
    transitions/
      BrandTransitionProvider.tsx
      BrandTransitionOverlay.tsx
      BrandTransitionOverlay.module.css

  hooks/
    useBrandTransition.ts
    useBrandTransitionTimeline.ts

  lib/
    animations/
      brandTransitionConfig.ts

  types/
    brandTransition.ts
```

Do not create files mechanically if fewer modules provide clearer ownership, but preserve the responsibility boundaries.

### Transition State Rule

Use an explicit phase-based state machine.

Recommended phases:

```ts
type BrandTransitionPhase =
  | "idle"
  | "preparing"
  | "centering"
  | "expanding"
  | "syncing"
  | "revealing"
  | "complete";
```

Do not manage the transition through unrelated booleans spread across multiple components.

Store enough information to safely recover:

- target brand ID
- source slot
- source card geometry
- center-card geometry when needed
- current phase
- lock state
- selected images and focal points
- cleanup ownership

### Visual Transition Rule

- Prefer a fixed transition overlay that visually clones the selected card.
- Do not move the real BrandCard DOM node outside its normal React structure.
- Non-selected Hero cards and controls may recede while the transition starts.
- A side card centers and resolves `rotateY` before expansion.
- Expansion removes card radius, border, shadow, side depth, glass edge, and sheen.
- Hero and section images must not produce a black frame, blank frame, or obvious crop jump.
- If Hero and section images differ, crossfade only after the card substantially covers the viewport.
- Do not add bounce, elastic, shake, or aggressive overshoot.
- Recommended total desktop duration is approximately 1.2-1.6 seconds.
- Mobile may use a shorter 2D-heavy fallback.

## Scroll Ownership Rule

- Global wheel and scroll locking must be coordinated through one central controller.
- `IntroSequence`, `SmoothScrollProvider`, `BrandSlideStack`, and the brand transition must not independently compete for the same wheel event.
- Section components must not add global wheel interception unless the assigned `/goal` explicitly requires it and the ownership is documented.
- A brand transition may temporarily pause section snapping and user scrolling.
- Programmatic zero-duration synchronization to the target brand is allowed while the transition overlay covers the viewport.
- On completion or failure, restore the previous Lenis, ScrollTrigger, wheel, touch, keyboard, and body/html state.
- Scroll locking must never remain active after unmount, error, image failure, resize, orientation change, interrupted transition, or React Strict Mode cleanup.
- Prefer `ScrollTrigger.update()` after position synchronization; use `refresh()` only when layout geometry has actually changed.

## Transition Recovery Rule

On any transition failure:

1. Kill or revert the active GSAP timeline.
2. Remove the transition overlay.
3. Restore scrolling and section snapping.
4. Remove transition-related `body` and `html` data attributes.
5. Re-enable Hero controls.
6. Clear timers, animation frames, listeners, and pending image handlers.
7. Move to the target section using the safe native or shared scroll fallback when possible.
8. Return transition state to `idle`.

The page must never remain locked.

## Accessibility Rules

- Keep all Hero controls keyboard accessible.
- Announce transition intent with a restrained `aria-live="polite"` message such as `ROTI CAMP 브랜드 섹션으로 이동합니다.`
- During transition, focus must not enter visually hidden Hero controls or inactive brand slides.
- Inactive brand slides must use an appropriate combination of `inert`, `aria-hidden`, or `tabIndex={-1}`; `pointer-events: none` is not sufficient.
- After transition, focus the target brand heading or landmark with `preventScroll: true`.
- Escape during a committed transition should fast-complete safely rather than abandon the page in a half-transition state.
- `prefers-reduced-motion` users must reach the same destination through a brief fade or direct move without heavy 3D animation.

## Mobile and Performance Rules

- Use `100svh` for transition viewport height where appropriate.
- Reduce side depth, blur, backdrop-filter, and transition duration on mobile.
- If mobile frame stability is poor, remove 3D centering and use restrained 2D movement plus expansion.
- Preload the selected section image before or at transition start.
- Do not add Framer Motion, Three.js, WebGL, or another animation library for this feature.
- Avoid permanent `will-change` on full-screen layers.
- Handle orientation change and resize without leaving a stale overlay or lock.
- Preserve the existing static mobile brand-section fallback unless the assigned goal explicitly changes it.

## Brand Data Rule

- `src/data/brands.ts` is the primary source of truth for brand names, logos, descriptions, images, focal points, and destinations.
- Do not duplicate brand metadata inside Hero, About, Footer, or transition components when the same value can come from `brands.ts`.
- Use the official display name `LeEL`.
- Separate anchor destinations from external brand, shop, and inquiry URLs.
- Do not create a CTA that links to the same section the user is already viewing unless that behavior is explicitly intended.
- Do not invent missing URLs or business claims.

## Explicitly Forbidden

- Do not use commerce-style carousel controls; restrained Hero arrow controls are allowed for card rotation.
- Do not turn the Hero into a normal product grid.
- Do not require two clicks to enter a brand section.
- Do not immediately jump to the target anchor before the transition covers the viewport.
- Do not move the real BrandCard DOM node outside its React component tree.
- Do not add product prices, discounts, reviews, or commerce-heavy elements to the main Hero.
- Do not use green as the primary highlight color.
- Do not change the overall design to a bright white shop style.
- Do not invent product specs, sales numbers, certifications, delivery claims, partner names, awards, or rankings.
- Do not implement Cafe24 API, cart, checkout, member, order, or payment functions in the mainpage phase.
- Do not make broad unrelated refactors.
- Do not add a new animation dependency.
- Do not implement the transition as a chain of unmanaged `setTimeout` calls.
- Do not allow multiple components to own separate copies of transition state.
- Do not reintroduce a manual multi-step intro requiring repeated wheel or swipe input.
- Do not edit `Design.md` unless the task explicitly requests a design-rule update.
- Do not commit, push, open, or merge a PR without user approval.

## Technical Direction

- Use Next.js App Router + TypeScript.
- Prefer component/data separation.
- Keep brand data in `src/data/brands.ts`.
- Keep animation logic separated from UI markup as much as practical.
- CSS 3D transform is preferred for Hero card depth.
- Use the existing GSAP/ScrollTrigger and Lenis dependencies.
- Do not add Framer Motion, Three.js, WebGL, or another animation package.
- Use dynamic imports consistently when existing client-only animation modules already follow that pattern.
- Effects, listeners, timers, animation frames, GSAP contexts, Lenis handlers, and document attributes must have explicit cleanup.
- If a new dependency is ever proposed for another task, explain why it is necessary and wait for approval.

## `/goal` Work Mode

- Implement only the currently requested `/goal`.
- Do not implement later goals in advance.
- Do not add missing homepage sections during Hero-transition work unless the current `/goal` explicitly requests them.
- Do not combine content expansion, Final CTA, Contact, global CSS migration, and Hero transition into one change.
- Keep each goal reviewable and reversible.
- After each goal, run the available checks and stop.
- Report any dependency on a future goal instead of implementing it early.

## Required Completion Checks

Before marking a task complete, run the available checks. If the project has not yet defined these scripts, create or document them only when the assigned goal permits foundation work.

Preferred checks:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`

Recommended after Playwright setup:

- `pnpm test`
- `pnpm test:e2e`

Hero-transition E2E coverage should eventually include:

- automatic intro completion
- Skip and fast-complete input
- center-card entry
- left-card entry
- right-card entry
- rapid repeated click protection
- wheel input during transition
- reduced-motion path
- mobile menu conflict
- inactive-slide focus blocking
- transition recovery fallback

## Required Response Format

Every task response must include:

1. Summary
2. Changed Files
3. Implementation Notes
4. Tests / Checks Run
5. Design.md Compliance Check
6. Accessibility / Reduced Motion
7. Mobile / Performance
8. Risks / Follow-ups

## Design.md Compliance Check Format

Use this checklist:

- [ ] Brand portal, not shop
- [ ] Dark premium tone maintained
- [ ] Red accent used with restraint
- [ ] No green primary Hero accent
- [ ] Intro remains automatic, brief, and skippable
- [ ] Restrained arrow card-rotation controls preserved
- [ ] One-click card-to-brand transition preserved
- [ ] Side card centers before fullscreen expansion
- [ ] No immediate anchor jump before viewport coverage
- [ ] One-brand-per-screen scroll structure preserved
- [ ] ROTI CAMP / ROTI HOMESYS / LeEL all represented
- [ ] No unverified marketing claims added
- [ ] Scroll recovery and cleanup verified
- [ ] Mobile/accessibility/reduced-motion/performance risks noted

## Work Mode

Work in small phases. Do not attempt to implement the whole page in one large change.

Recommended order:

1. Harness and repository audit
2. Foundation and source-of-truth cleanup
3. Automatic intro
4. Static Header/Hero stability
5. 3D card interaction
6. Card-to-brand transition foundation
7. Centering and fullscreen expansion
8. Scroll synchronization and brand-scene reveal
9. Fullscreen brand scroll sections
10. ROTI group / final CTA
11. Responsive, accessibility, performance, and QA
12. Future commerce extension planning only
