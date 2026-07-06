# ROTI Hero Reference Audit

Date: 2026-07-04
Surface: Main hero at http://127.0.0.1:3001/
Reference: references/03_dark_red_hero_concept_v1.png

## Evidence

- 01-current-hero-1792x1024.png: first desktop capture. Cards were not yet visible.
- 03-current-hero-after-wait-1792x1024.png: desktop capture after waiting about 2.5 seconds. Cards visible.
- 04-side-by-side-reference-vs-current.png: reference and current hero comparison.
- 05-after-left-card-click.png: click interaction state after selecting the left card.
- 06-mobile-390x844.png: mobile hero capture.
- 02-browser-state.json and 07-mobile-state.json: DOM, CSS, canvas, button, and log evidence.

## Similarity Estimate

Ignoring card interior background images and the red decorative line, the current hero is directionally similar but not yet production-equivalent.

- Overall visual similarity: about 58-65%.
- Layout similarity: about 70%.
- Card material/depth similarity: about 55%.
- Brand portal mood similarity: about 65%.
- Production polish similarity: about 45%.

## Major Findings

1. The reference feels like a composed premium campaign frame. The current implementation feels like a technically assembled 3D demo with the right ingredients.
2. The current hero has a much stronger top-heavy composition. The title is larger and lower visual density around the cards makes the scene feel less balanced.
3. The reference cards feel physically grounded through reflection, floor contact, and light direction. Current cards float more, with softer and less believable contact.
4. The card glass is close in concept but weaker in finish. Edges are visible, but surface lighting and inner depth do not yet match the reference.
5. First desktop capture showed smoke and stage before cards appeared. This creates perceived loading instability.
6. Mobile is usable, but the title wraps awkwardly and the card stage dominates too much vertical space.
7. The implementation runs two WebGL render loops: smoke and glass stage. This is a serious performance consideration for mobile.
8. Browser logs include Three.js warnings for deprecated Clock and undefined material blending. Not fatal, but not clean enough for final release confidence.
9. The production build previously included /card-shadow-test. That route should not ship in the main merge target.

## Priority Recommendations

1. Stabilize first paint: render a static or CSS fallback card state immediately, then enhance to WebGL after hydration.
2. Reduce the hero canvas stack: either make smoke CSS/image based or merge rendering responsibility so two independent animation loops are not always running.
3. Tune desktop composition to the reference: smaller title, lower card stage, wider card spread, stronger floor contact, and more negative space discipline.
4. Improve card physicality: stronger face reflections, more directional edge highlights, more believable bottom contact shadow, less uniform black fill.
5. Mobile-specific art direction: avoid awkward title wrapping, reduce side-card intrusion, and simplify motion/renderer cost.
6. Remove or gate /card-shadow-test before any production merge.
7. Fix console warnings and replace deprecated Three.Clock usage.
