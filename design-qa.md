# ROTI Stats Design QA

## Comparison setup

- Source visual: `C:\Users\Design\AppData\Local\Temp\roti-stats-qa\prototype.png`
- Main implementation: `C:\Users\Design\AppData\Local\Temp\roti-stats-qa\main.png`
- Side-by-side comparison: `C:\Users\Design\AppData\Local\Temp\roti-stats-qa\comparison.png`
- Viewport: 1710 x 840
- State: `#stats` section fully entered and counters completed

## Fidelity review

- Typography, spacing, grid proportions, warm-white background, separators, copy, and cutout graphic placement match the approved prototype direction.
- The main-page capture intentionally includes the global ROTI header/navigation and floating page control; the standalone prototype does not.
- No focused comparison was required because all typography and graphic assets were legible at the full-section viewport.

## Interaction evidence

- Before section entry: `2000`, `0+`, `0+`, `0`, `0`
- After section entry: `2010`, `400+`, `40+`, `3`, `5`
- The counter starts once when the section reaches the observer threshold and does not replay.
- Reduced-motion users receive the final values on section entry without the counting animation.

## Findings

- P0: none
- P1: none
- P2: none
- Comparison passes: 1

## Final result

Passed.

---

# About Opening Scroll Typography QA

## Comparison setup

- Source visual truth: `C:\Users\Design\.codex\visualizations\2026\07\20\019f7df5-7158-7060-b09e-2bb7d7feaa04\roti-motion-typography\source-brainall-1865x924.png`
- Rendered implementation, gray state: `C:\Users\Design\.codex\visualizations\2026\07\20\019f7df5-7158-7060-b09e-2bb7d7feaa04\roti-motion-typography\implementation-gray-1865x924.png`
- Rendered implementation, fill state: `C:\Users\Design\.codex\visualizations\2026\07\20\019f7df5-7158-7060-b09e-2bb7d7feaa04\roti-motion-typography\implementation-fill-1865x924.png`
- Desktop viewport: 1865 x 924
- Mobile viewport: 390 x 844
- Route and state: `/motion-study`, opening typography at 0% and approximately 50% white-fill progress

## Full-view comparison evidence

- The source and implementation were emitted together in one comparison input at the same 1865 x 924 viewport.
- The implementation preserves the source interaction principle: a faint gray base appears first, followed by a continuous left-to-right white fill while the copy remains fixed in the viewport.
- Intentional ROTI adaptations are the black/charcoal palette, left alignment, exact two-line About title, existing fixed study navigation, and restrained ROTI labeling.

## Focused region comparison evidence

- A separate crop was not needed because the typography occupies the central majority of both 1865 x 924 captures and the gray/white boundary, line wrapping, letter spacing, and scroll cue are readable at full resolution.

## Required fidelity surfaces

- Fonts and typography: the existing ROTI Korean type system is retained; desktop copy stays on the requested two lines with a 1.28 line height and restrained negative tracking.
- Spacing and layout rhythm: the text remains vertically centered inside a sticky 100svh stage with generous negative space; the 250svh track separates gray reveal from white fill.
- Colors and visual tokens: near-black background, 18% white base text, full-white fill, and a restrained Ember Red navigation state remain consistent with the ROTI direction.
- Image quality and asset fidelity: this scene uses no raster illustration; the existing ROTI logo asset is preserved and no visual asset was approximated.
- Copy and content: the exact approved title from `siteContent.about.title` is reused; no business claim or explanatory prototype copy was added.

## Interaction and accessibility evidence

- Desktop gray, partial-fill, full-fill, and transition into About states were exercised in the in-app browser.
- Mobile 390 x 844 was checked with no horizontal overflow; the title reflows to three lines for readability.
- A fresh browser tab showed no console errors or warnings; only the React DevTools development notice was present.
- `prefers-reduced-motion` collapses the long track to 100svh, presents the final white title immediately, and hides the animated scroll cue.

## Comparison history

- Initial P2 finding: the first implementation made the gray base invisible because `-webkit-text-fill-color: transparent` suppressed the fallback text, and the desktop title wrapped to three lines at 1280px.
- Fix: removed transparent text fill and reduced the fluid type scale while widening its content measure.
- Post-fix evidence: the gray state is visibly legible, the white fill advances independently across the same glyphs, and desktop title height confirms two lines at both 1280px and 1865px.

## Findings

- P0: none
- P1: none
- P2: none
- P3: final scroll pacing can be tuned after the user judges it on the primary display.

## Final result

passed

---

# About / Vision Motion Study QA

## Comparison setup

- Source visual truth: `C:\Users\Design\.codex\visualizations\2026\07\20\019f7df5-7158-7060-b09e-2bb7d7feaa04\motion-study-qa\about-before.png`, `vision-before.png`
- Rendered implementation: `C:\Users\Design\.codex\visualizations\2026\07\20\019f7df5-7158-7060-b09e-2bb7d7feaa04\motion-study-qa\about-after.png`, `vision-after.png`
- Focused motion evidence: `about-motion-mid.png`, `vision-motion-mid.png`
- Mobile evidence: `mobile-about-after.png`, `mobile-vision-after.png`
- Desktop viewport: 1714 x 900
- Mobile viewport: 390 x 844
- Route and state: `/motion-study`, opening / About / Vision entry and completed states

## Full-view comparison

- Final section composition, type scale, copy, grid proportions, dark-to-light palette, imagery, and red accent remain aligned with the prior motion-study visual target.
- The enhancement changes only reveal strength and sequencing; it does not alter the approved content hierarchy or create a new visual language.

## Focused motion comparison

- About now reveals the two title lines independently with a 54px desktop travel distance, then brings in story copy and draws the red signature block from left to right.
- The background begins darker and closer, then resolves with a restrained push-back rather than remaining visually static.
- Vision now opens as a deeper light-surface transition, reveals the two title lines separately, then exposes the list boundary before staggering the four values.
- Motion uses transform, opacity, and clip-path without pinning, scroll locking, or layout-shifting dimensions.

## Required fidelity surfaces

- Fonts and typography: existing families, weights, sizes, line heights, wrapping, and Korean-first copy are unchanged; the requested two-line Vision title is preserved.
- Spacing and layout rhythm: existing section paddings, 12-column desktop grid, mobile stack, borders, and radii return to their original completed state.
- Colors and visual tokens: black/charcoal, warm-white, muted text, and Ember Red remain token-driven and unchanged.
- Image quality and asset fidelity: the existing LeEL section asset and focal point are reused; no placeholder or generated substitute was introduced.
- Copy and content: no wording or business claim was changed.

## Interaction and accessibility evidence

- Navigation links, replay control, About entry, Vision entry, and completed states were exercised in the in-app browser.
- Browser console contained no error or warning entries; only React DevTools and Fast Refresh development logs were present.
- Desktop and 390px mobile showed no horizontal overflow.
- `prefers-reduced-motion` bypasses the GSAP sequence and disables opening keyframes while preserving all final content.

## Comparison history

- Initial finding: the original whole-block fades and short travel distances were too subtle to make the reading sequence apparent.
- Fix: introduced line-by-line title reveals, stronger but restrained image depth/exposure, a distinct signature draw, a deeper Vision surface reveal, and line-before-items sequencing.
- Post-fix evidence: focused motion captures show separate title-line states and delayed value-item entry; completed captures preserve the original layout and content.

## Findings

- P0: none
- P1: none
- P2: none
- P3: motion timing should be judged once more on the user's primary display before connecting the wrapper to the main page.

## Final result

passed

---

# ROTI Channels Integration QA

## Comparison setup

- Source prototype: `C:\Users\Design\AppData\Local\Temp\roti-channels-qa\prototype.png`
- Main implementation: `C:\Users\Design\AppData\Local\Temp\roti-channels-qa\main.png`
- Side-by-side comparison: `C:\Users\Design\AppData\Local\Temp\roti-channels-qa\comparison.png`
- Desktop viewport: 1710 x 840
- Mobile viewport: 390 x 844

## Fidelity and behavior

- Warm-white palette, centered title hierarchy, two counter-moving channel rows, reduced channel type size, and closing copy match the approved prototype.
- The main implementation intentionally uses a shorter section height and reduced vertical padding so it connects continuously to Stats and Standard.
- Stats and Channels are grouped inside `data-native-scroll-region`; neither section remains in the section snap-point list.
- Channel tracks repeat four times, pause off-screen and on hover/focus, and fall back to a static wrapped list for reduced-motion users.
- Desktop and mobile showed no horizontal overflow.

## Findings

- P0: none
- P1: none
- P2: none
- P3: marketplace availability and wording should be fact-checked before public release.

## Final result

Passed.
