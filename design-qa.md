# ROTI Connect Arrow Design QA

- source visual truth: `artifacts/design-qa/arrow-position-reference.png`
- desktop implementation: `artifacts/design-qa/arrow-position-desktop.png`
- mobile implementation: `artifacts/design-qa/arrow-position-mobile.png`
- comparison: `artifacts/design-qa/arrow-position-comparison.jpg`
- desktop viewport: `1590 × 659`
- mobile viewport: `390 × 844`

## Requested change

The previous and next controls were moved off the side-preview images and into the gaps between each side image and the active center image. Text labels were replaced with Phosphor caret icons while the existing restrained circular control styling was retained.

## Desktop evidence

- Previous image right edge: `298.0px`
- Previous control bounds: `325.6–386.4px`
- Active image left edge: `427.6px`
- Active image right edge: `1147.6px`
- Next control bounds: `1188.8–1249.6px`
- Next image left edge: `1277.2px`

Both controls sit fully inside their corresponding image gaps with no image overlap.

## Mobile evidence

At `390px`, each image gap is approximately `18.3px`, so a desktop-sized circle cannot fit without covering one image. The mobile control diameter was reduced to `28px`, and each control center was aligned to the midpoint of its image gap. The page reports no horizontal content overflow (`scrollWidth: 375px` for the 375px layout viewport).

## Interaction and accessibility checks

- The icon buttons retain Korean accessible names: `이전 문의 유형`, `다음 문의 유형`.
- Clicking the next icon changed the selected tab from `PRODUCT` to `BUSINESS`.
- No browser console errors were found.
- Existing keyboard focus, reduced-motion, autoplay pause, and 5-second rotation behavior remain unchanged.

## Findings

- No actionable P0, P1, or P2 differences remain for this request.
- The control position follows the image geometry instead of the outer viewport columns.
- The previous textual-control P3 follow-up is resolved through `@phosphor-icons/react`.

final result: passed

---

# ABOUT ROTI Main Integration Design QA

- source visual truth: `public/prototypes/about-roti-scroll/index.html`
- source desktop reference: `public/prototypes/about-roti-scroll/qa-prototype-desktop.png`
- source mobile reference: `public/prototypes/about-roti-scroll/qa-prototype-mobile.png`
- production implementation: `src/components/sections/AboutRotiSection.tsx`
- desktop browser viewport: `1874 x 900`
- mobile browser viewport: `390 x 844`

## Implemented relationship

The former two-column ABOUT section was replaced by the approved four-scene sticky scroll composition. The group statement is followed by ROTI CAMP, ROTI HOMESYS, and LeEL scenes. Existing brand data remains the source for logos, scene imagery, copy, and destinations.

## Desktop browser evidence

- ABOUT top aligned to the viewport: `0px`
- prototype content width: `1858px`; production content width: `1859px`
- prototype central frame width: `1034px`; production central frame width: `1035px`
- prototype main grid width: `1262px`; production main grid width: `1262px`
- the production-only `1520px` content cap was removed and the prototype gutter formula was restored
- all four production scene strings match the prototype after DOM whitespace normalization
- active progress segment: `2px`, ROTI Ember Red
- inactive progress segments: `1px`
- no content-width overflow

## Mobile browser evidence

- viewport: `390 x 844`
- ABOUT top aligned to the viewport: `0px`
- central frame bounds: `20–355px` (`335px` width)
- progress bounds: `326–351px` (`26px` width)
- no text/progress overlap or content-width overflow
- one wheel gesture advanced from the group scene to ROTI CAMP and updated the pressed state

## Interaction and accessibility checks

- The four progress segments remain keyboard-accessible buttons with Korean accessible names and `aria-pressed` state.
- Clicking a progress segment moved to the corresponding internal snap point.
- A desktop wheel gesture from the LeEL scene moved directly to the next `STANDARD` section.
- Reduced-motion keeps all content and destinations while shortening scene transitions.
- Direct screenshot export from the in-app browser timed out; rendered geometry, copy, active imagery, button state, desktop wheel flow, and mobile wheel flow were checked in the live page.

## Findings

- No actionable P0, P1, or P2 implementation differences were found.
- P3: Save fresh production screenshots if a permanent visual archive is needed; browser runtime verification itself passed.

final result: passed

---

# Hero Copy Vertical Alignment Design QA

- source visual truth: `C:/Users/Design/AppData/Local/Temp/codex-clipboard-1709aa78-9c3f-49bb-a1db-11556f7491f3.png`
- desktop implementation: `.audit/hero-copy-alignment-desktop-full.png`
- desktop focused region: `.audit/hero-copy-alignment-desktop-top.png`
- mobile implementation: `.audit/hero-copy-alignment-mobile.png`
- desktop viewport: `1873 x 900`
- focused comparison viewport: `1873 x 305`
- mobile viewport: `390 x 844`
- compared state: intro complete, Hero settled, center brand card active

## Requested relationship

The main and supporting Hero copy were evaluated as a single vertical block. The target is the midpoint between the bottom edge of the header ROTI logo and the top edge of the active center card. The source screenshot documents the previous ambiguous placement; the user's stated midpoint relationship is the final visual authority for this change.

## Comparison history

1. The source/current comparison showed the copy block sitting too close to the header region.
2. The shared desktop offset was increased using the existing responsive transform rule.
3. A mobile-specific offset was added because the mobile header and card geometry use a different interval.
4. Post-fix screenshots were captured and remeasured in the settled Hero state.

## Geometry evidence

### Desktop

- ROTI logo bottom: `58.2675px`
- center card top: `262.0551px`
- target midpoint: `160.1613px`
- copy block center: `160.0813px`
- center delta: `-0.0801px`

### Mobile

- ROTI logo bottom: `43.8875px`
- center card top: `297.4023px`
- target midpoint: `170.6449px`
- copy block center: `170.9250px`
- center delta: `+0.2801px`

## Fidelity checks

- Typography, font weights, copy, colors, card geometry, and imagery were unchanged.
- Desktop and mobile retain the existing responsive title sizing and line wrapping.
- The change only adjusts the vertical position of the existing copy block.
- No actionable P0, P1, or P2 visual differences remain for the requested alignment.

final result: passed
