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
