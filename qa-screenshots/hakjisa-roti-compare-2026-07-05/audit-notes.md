# Hakjisa vs ROTI Structure Audit

Date: 2026-07-05

## Evidence

- Source reference: https://branding.hakjisa.kr/
- ROTI local preview: http://localhost:3015/
- Captures: `qa-screenshots/hakjisa-roti-compare-2026-07-05/`
- Captured desktop viewport: 1440 x 900

## Hakjisa Observations

1. Hero
   - Dark, cinematic full-bleed library/data environment.
   - Large brand narrative and CTA are placed on top of a single unified scene.
   - The hero is pinned by GSAP ScrollTrigger and transitions into the next section.

2. Values
   - One viewport is stretched into a long pinned scroll scene.
   - The section uses object-first storytelling: tree, flowers, book, birds, butterflies.
   - Text is revealed after the object stage is established.
   - Typography and object scale are spacious, with very few competing UI elements.

3. Overview
   - A forest background supports four translucent business cards.
   - The cards are not generic decoration; each card contains real grouped brand/logo information.
   - The scroll motion reveals cards and logos in sequence.

4. Business Divisions / About
   - The layout alternates between information systems and large visual storytelling.
   - Several sections are pinned with scrubbed timelines rather than normal scrolling.
   - The page uses long dwell time to make each section feel important.

## Technical Observations

- Scripts observed on the page:
  - GSAP
  - ScrollTrigger
  - MotionPathPlugin
  - Lenis
  - Three.js
  - `common.js`
  - `main.js`
- `common.js` registers GSAP plugins and syncs Lenis with ScrollTrigger.
- `main.js` uses per-section timelines with `pin: true` and `scrub`.
- Values section evidence:
  - `.values-section` is pinned.
  - Pin spacer captured at about 9000px for a 900px viewport.
  - Text starts clipped and is revealed with `clip-path`.
  - Visual objects animate with scale, y movement, and motion path behavior.

## ROTI Current Comparison

1. ROTI Standard is too information-dense.
   - Left title, lead copy, active title, tags, right image, caption, and index all compete in one viewport.
   - Hakjisa gives one dominant visual scene room to breathe before adding explanatory text.

2. ROTI Standard image cards feel like sample cards, not a brand standard scene.
   - The images help, but the card border, index, tags, and caption make the section read like a dashboard/detail card.
   - Hakjisa uses a scene as the background or central object, then overlays minimal supporting text.

3. ROTI Standard lacks scroll dwell.
   - ROTI uses a shorter sticky section and state changes.
   - Hakjisa stretches one concept over a much longer pinned range, so each message feels intentional.

4. ROTI Standard has weaker hierarchy.
   - The main title remains dominant while the active standard title and image are also dominant.
   - Hakjisa usually has one dominant layer per moment: hero copy, object, value text, business cards, or about image.

5. ROTI Standard mobile is structurally safer but still reads as stacked content.
   - The paired mobile images are clearer than the previous text-only stack.
   - Hakjisa mobile strategy should be checked separately before copying because its desktop motion is heavy.

## Recommended Direction

- Redesign ROTI Standard as a pinned three-act scene, not a two-column card panel.
- For each act, use:
  - one large full-bleed or near-full-bleed scene image,
  - one restrained Korean headline,
  - one short explanatory sentence,
  - one small progress marker.
- Remove tag pills and heavy framed card styling from this section.
- Let the right visual become the stage, not a card.
- Use longer pin spacing and a timeline per act:
  - image scale/parallax enters first,
  - title wipes or fades in second,
  - short copy and progress marker follow,
  - next scene crossfades or slides in.

## Current Verdict

The current ROTI Standard implementation is functionally working, but it does not match the sophistication of the Hakjisa reference. The main mismatch is not color or image quality alone. It is scene composition, pacing, and hierarchy.
