# Brainall vs ROTI design and interaction audit

Date: 2026-07-14

## Scope and evidence

- Live reference: https://brainall.kr/
- Current ROTI build: http://127.0.0.1:3001/
- Desktop viewport: 1440 x 900
- Mobile viewport: 390 x 844
- Evidence screenshots are stored in this directory.
- This audit compares the live, visible experience and current ROTI source. It does not claim access to Brainall's private design files or source code.

## Executive conclusion

Brainall's strongest reusable pattern is the synchronized `section title -> tab rail -> large centered media -> adjacent previews -> detail copy` interaction. ROTI already applies this pattern in the Connect section, with better keyboard, reduced-motion, pause, and semantic tab handling. The next step should be refinement, not another structural clone.

Brainall's white medical palette, product-lineup carousel, fixed quick-action rail, scrolling ticker, dense mega navigation, and long scroll-led opening should not be imported. They conflict with ROTI's dark premium brand-portal direction, brief automatic intro, one-click brand-card Hero, and explicit non-commerce scope.

## Brainall interaction map

1. Full-viewport opening
   - Oversized split typography and one central 3D brain object.
   - The composition is pinned and transformed by scroll before normal content begins.
   - Desktop and mobile are recomposed rather than simply scaled.

2. Header and navigation
   - Desktop header is 80px high.
   - It changes between transparent/dark and filled/light states and hides on downward scroll.
   - The DOM contains deep second-level navigation and full-screen search/site-map layers.

3. Promotional highlight carousel
   - Four synchronized text/image slides with segmented bullets.
   - In live observation, the active slide advanced by one step during a 5.2 second interval.
   - A full-width blue ticker follows the carousel.

4. One Stop Solution
   - Centered title and short explanatory copy.
   - Four equal-width tabs on a 1200px rail.
   - Large active card, partial neighboring cards, arrows, tags, and synchronized detail copy.
   - In live observation, the active tab/card advanced by one step during a 5.2 second interval.

5. Product lineup
   - Wide horizontal card carousel with repeated product categories and dark image cards.
   - Strong for a medical-product catalog; not appropriate for ROTI's current portal-only scope.

6. Fixed utilities
   - Desktop uses a 65px right-side quick-action rail.
   - Mobile moves the same actions to a fixed bottom bar.
   - It increases conversion visibility but obscures content and adds a strong service-site feel.

## Measured desktop comparison

| Item | Brainall | Current ROTI | Reading |
| --- | --- | --- | --- |
| Base font | Pretendard Variable, 15px / 25.5px | Inter + Pretendard, 16px | ROTI is slightly larger and more editorial. |
| Header | 80px | 108px measured in Connect | ROTI gives more breathing room; Brainall is denser. |
| Comparable section title | 45px / 67.5px | 35.34px / 38.17px | ROTI intentionally keeps Connect quieter than Brainall. |
| Tab rail | 1200 x 55px, 4 tabs | 684 x 55px, 3 tabs | ROTI aligns the selector to its active image grid, matching prior design direction. |
| Active media | approx. 738px-wide card in Brainall carousel | 684 x 484px | ROTI is slightly more compact and taller in proportion. |
| Section height | approx. 1230px | 900px | Brainall allows free vertical continuation; ROTI is designed as a one-screen snap section. |

## What to reuse

### High value

1. Time-aware tab progress in ROTI Connect
   - Keep ROTI's existing three-tab structure and 3-second interval.
   - Animate the active underline as a 3-second progress fill.
   - Reset the fill after manual tab/arrow/card selection.
   - Pause it together with the existing hover, focus, hidden-tab, and reduced-motion logic.

2. Strong media-copy synchronization
   - Keep image, title, description, keyword chips, and CTA moving as one state.
   - ROTI already has this architecture; improve transition continuity rather than add another carousel.

3. Mobile recomposition principle
   - Brainall's mobile Hero proves that key elements should be repositioned and rebalanced, not proportionally shrunk.
   - ROTI already centers one active card on mobile. Apply the same principle to Standard and About text density.

### Medium value

4. Clear section-entry hierarchy
   - Brainall uses a large title, one short explanation, then the control rail.
   - ROTI should keep its deliberately shorter Connect title but can reuse the strict vertical rhythm in future new sections.

5. State-linked progress language
   - Brainall consistently repeats active blue lines and segmented states.
   - ROTI can use the same grammar with Ember Red only: active line, restrained inactive line, no extra decorative color.

6. Optional header hide/reveal
   - Useful only on long, free-scrolling content.
   - Do not add it to pinned/snap scenes until wheel ownership has been proven stable.

## What not to reuse

1. Do not replace the ROTI Hero with Brainall's split text/object Hero.
   - ROTI's three brand cards are the primary brand-portal interaction and must retain one-click entry.

2. Do not extend the ROTI intro into a long pinned scroll narrative.
   - ROTI's intro is required to remain automatic, brief, and skippable.

3. Do not add the product lineup carousel.
   - It would pull the page toward a catalog/shop and conflict with the current scope.

4. Do not add the fixed quick-action rail or mobile bottom utility bar.
   - ROTI has fewer verified destinations, and fixed rails would weaken the premium editorial composition.

5. Do not add a blue ticker, promotional marquee, or dense mega menu.
   - These patterns are effective for a large medical service site but visually noisy for ROTI.

6. Do not copy Brainall's accessibility gaps.
   - The observed Brainall solution tab buttons used visual `active` classes without `aria-selected`; carousel bullets had no accessible labels.
   - ROTI's current semantic tablist, arrow-key movement, focus pause, and reduced-motion handling are stronger and should be preserved.

## Recommended priority

1. Refine existing Connect active-line timing and transition continuity.
2. Preserve ROTI Hero, Intro, About, and Standard structures.
3. Use Brainall only as a spacing/state reference for future content sections.
4. Resolve real inquiry URLs before adding stronger conversion UI.

## Current risks found during comparison

- P1: All three Connect CTAs currently have no verified destination and render as disabled inquiry-status text.
- P2: In one live desktop run, the intro remained visible at 4.2 seconds; this exceeds the 2-3 second project target and needs a focused timing check outside this comparison.
- P2: Brainall-style autoplay should never replace user control. ROTI's current pause and reduced-motion rules must stay authoritative.

## Evidence files

- `00-brainall-opening-desktop.png`
- `01-brainall-hero-desktop.png` (promotional carousel state)
- `03-brainall-one-stop-desktop.png`
- `04-brainall-opening-mobile.png`
- `05-brainall-one-stop-mobile.png`
- `06-brainall-product-lineup-desktop.png`
- `10-roti-hero-desktop.png`
- `11-roti-about-desktop.png`
- `12-roti-connect-desktop.png`
- `13-roti-hero-mobile.png`
- `14-roti-connect-mobile.png`
