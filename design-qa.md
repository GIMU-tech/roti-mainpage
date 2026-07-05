# ROTI Brand Index Emphasis QA

Date: 2026-07-05

## Source Visual Truth

- Reference: `C:/Users/kkh53/AppData/Local/Temp/codex-clipboard-c764a9f1-ee6b-4e1f-8eab-d988734df5e1.png`
- Target area: Brand slide index inside the fullscreen brand scene stack.

## Implementation Evidence

- Desktop active LEEL state: `qa-screenshots/roti-brand-index-2026-07-05/brand-index-leel-clicked-final.png`
- Local verification URL: `http://localhost:3015`

## Requested Changes Checked

- Active index item does not grow or shift position.
- Active item is emphasized through font weight, white color, and the red rule.
- Inactive items use a lighter font weight and lower-contrast text.
- Active red rule is thicker than the inactive visual rule.
- Existing brand-index click behavior is preserved.

## Measured State

- Inactive label weight: `520`
- Active label weight: `760`
- Inactive number weight: `520`
- Active number weight: `720`
- Active rule height: `2px`
- Active transform: `none`

## Findings

- P0: None.
- P1: None.
- P2: None for the requested index-emphasis pass.
- P3: The Next.js development overlay can show a bottom-left issue badge in dev mode. This is not part of the app UI and does not appear in production build output.

## Final Result

final result: passed

---

# Hakjisa Business Replica Section QA

Date: 2026-07-05

## Source Request

- Reference site: `https://branding.hakjisa.kr/`
- Clone the captured `Business Divisions` section structure without the Hakjisa header.
- Keep a white background.
- Preserve the captured wording exactly.
- Use the previously generated image asset.

## Source Structure Observed

- Source block: `services-section`
- Main layout: `services-container`
- Top layout: `services-top`, `services-header`, `service-tabs`
- Bottom layout: `services-bottom`, `service-content-wrapper`, `service-images`
- Core visual behavior: white full-viewport section, left title block, right tab list, lower left copy, lower right rounded image.

## Implementation Evidence

- Desktop capture: `qa-screenshots/hakjisa-business-replica-2026-07-05/desktop-business-replica.png`
- Mobile capture: `qa-screenshots/hakjisa-business-replica-2026-07-05/mobile-business-replica.png`
- Measurement data: `qa-screenshots/hakjisa-business-replica-2026-07-05/qa-state.json`
- Local verification URL: `http://localhost:3015`

## Measured State

- Desktop section top: `0`
- Desktop section height: `900`
- Desktop background: `rgb(255, 255, 255)`
- Active tab: `Platform business division`
- Tab count: `4`
- Content title: `플랫폼사업 부문`
- Mobile tab display: `none`
- Mobile image height: `306`

## Findings

- P0: None.
- P1: None.
- P2: The global ROTI header remains above the section because the request was to exclude the Hakjisa header, not remove the site header. Header theme switches to dark text on the white section.
- P2: The inserted copy is third-party reference copy by explicit user request and should be replaced with ROTI-owned wording before production use.

## Final Result

final result: passed

---

# ROTI Standard Pinned Scene QA

Date: 2026-07-05

## Source Request

- Keep the Hakjisa-like pinned slide storytelling structure.
- Remove the weak text/shape-only composition.
- Keep the left ROTI Standard message fixed while the right visual scene changes.
- Use image-backed examples so the section reads as professional and verifiable.
- Keep large typography line-height at `1.25` or higher.
- Use slide 3 copy as `믿을 수 있는 품질`.

## Implementation Evidence

- Desktop scene 1: `qa-screenshots/roti-standard-pinned-scene-2026-07-05/desktop-standard-scene-1.png`
- Desktop scene 2: `qa-screenshots/roti-standard-pinned-scene-2026-07-05/desktop-standard-scene-2.png`
- Desktop scene 3: `qa-screenshots/roti-standard-pinned-scene-2026-07-05/desktop-standard-scene-3.png`
- Mobile scene: `qa-screenshots/roti-standard-pinned-scene-2026-07-05/mobile-standard-scene.png`
- Measurement data: `qa-screenshots/roti-standard-pinned-scene-2026-07-05/qa-state.json`
- Local verification URL: `http://localhost:3015`

## Measured State

- Desktop active titles: `실용성`, `정돈된 설계`, `믿을 수 있는 품질`
- Desktop visible panels per scene: `1`
- Desktop visible visual scenes per scene: `1`
- Desktop title line-height ratio: `1.25`
- Desktop title line counts: `1`, `1`, `2`
- Desktop mobile image blocks hidden: `display: none`
- Mobile panels visible: `3`
- Mobile image blocks visible: `3`
- Mobile scene stack hidden: `display: none`
- Mobile first title line-height ratio: `1.25`

## Findings

- P0: None.
- P1: None.
- P2: Next.js development overlay can appear at the bottom-left in dev screenshots. This is not app UI and is removed from the production build.

## Final Result

final result: passed

---

# ROTI Standard Image Slide QA

Date: 2026-07-05

## Source Request

- Keep the existing scroll-slide structure in the ROTI Standard section.
- Replace the weak text/shape-only visual with image-backed expertise scenes.
- Keep the left standard message fixed and let the right-side visual slide on desktop.
- Change slide 3 from `확인 가능한 품질` to `믿을 수 있는 품질`.
- Keep large typography line-height at 1.25 or higher.

## Generated Image Assets

- `public/images/standards/standard-practicality.png`
- `public/images/standards/standard-ordered-design.png`
- `public/images/standards/standard-trusted-quality.png`

## Implementation Evidence

- Desktop final state: `qa-screenshots/roti-standard-redesign-2026-07-05/standard-desktop-post-restart.png`
- Mobile final state: `qa-screenshots/roti-standard-redesign-2026-07-05/standard-mobile-post-restart.png`
- Local verification URL: `http://localhost:3015`

## Measured State

- Desktop active slide 3 title: `믿을 수 있는 품질`
- Desktop active slide 3 caption: `마감과 구조의 디테일`
- Desktop visible standard captions: `1`
- Desktop standard title line-height ratio: `1.25`
- Desktop active slide heading line-height ratio: `1.25`
- Mobile standard stage display: `none`
- Mobile paired image blocks visible: `3`
- Mobile first image caption: `사용 장면에서 출발`
- Mobile standard title line-height ratio: `1.25`
- Mobile active slide heading line-height ratio: `1.25`

## Findings

- P0: None.
- P1: None.
- P2: `/favicon.ico` returns 404 in dev console. This is outside the requested standard-section scope and does not affect the verified section behavior.

## Final Result

final result: passed
