# ROTI Hero Reflection QA

Date: 2026-07-05

## Source Visual Truth

- Reference: `references/03_dark_red_hero_concept_v1.png`
- Target area: Hero 3D brand cards, card-to-floor contact, short floor reflection, dark wet floor depth

## Implementation Evidence

- Desktop 1440x900 after dev restart: `qa-screenshots/roti-hero-shadow-match-2026-07-05/05-desktop-after-dev-restart.png`
- Mobile-width 500x844: `qa-screenshots/roti-hero-shadow-match-2026-07-05/04-mobile-reference-like-contact-reflection.png`
- State: initial active center card, dark Hero, click-to-rotate card structure preserved

## Full-view Comparison Evidence

- The reference uses a sharp card contact line, a restrained short card-shaped reflection, and a red center-card floor glow to make the cards feel planted on a wet reflective floor.
- The implementation now uses a tighter contact shadow, a sharper card-owned mirrored reflection, and a restrained center red contact glow.
- Focused region comparison was limited to the card/floor contact region because the user specifically asked to adjust the shadow/reflection feel, not the whole Hero layout or image content.

## Findings

- No P0/P1/P2 issues remain for the requested shadow/reflection pass.
- P3: The reference still has a more cinematic floor texture and water-like diffusion than the CSS-only implementation. This is accepted for now because the implementation avoids a heavier real-time water/refraction renderer.
- P3: The source card imagery differs from the reference. This was already outside the current shadow/reflection pass and should be handled as a separate asset-fidelity task.

## Patches Made Since Previous QA Pass

- Increased card contact-line sharpness.
- Reduced reflection blur so the bottom card shape remains visible.
- Expanded reflection width to sit closer to the actual card width.
- Added a restrained center-card red contact glow to match the reference's grounded stage feel.
- Increased side-card contact visibility without adding carousel arrows or commerce UI.
- Kept transition behavior where reflections/contact shadows hide while cards are switching and return after settling.

## Required Fidelity Surfaces

- Fonts and typography: not changed in this pass.
- Spacing and layout rhythm: Hero card placement preserved; only contact/reflection depth adjusted.
- Colors and visual tokens: dark premium tone preserved; ROTI Ember Red used as a restrained center-card grounding accent.
- Image quality and asset fidelity: existing brand images preserved; no new generated or placeholder assets added.
- Copy and content: no copy changed.

## Final Result

final result: passed
