# ROTI Copy / UI Text Audit - 2026-07-09

## Scope

- Desktop viewport: 1440 x 900
- Mobile viewport: 390 x 844
- Focus: appeal copy, visible text clipping, horizontal overflow, UI text readability
- Source URL: http://localhost:3000

## Overall

- P1 blocker: none found.
- Horizontal overflow: not detected on the checked desktop and mobile viewports.
- Main visual text clipping: mostly stable.
- The only measurable text overflow risk found in the checked screens is in the About ROTI right-side visual line items, on both desktop and mobile.

## P2 Findings

1. About ROTI visual-line items have small hidden overflow.
   - Desktop: `.about-roti__visual-line` exceeded its box by a few pixels.
   - Mobile: the same item pattern also exceeded its box slightly.
   - Suggested fix: increase line item height/padding or remove strict hidden clipping where possible.

2. Hero card inner copy is visually small and dim.
   - It is not clipped, but the side-card copy and internal labels are difficult to read.
   - Suggested fix: slightly raise contrast or reduce dependence on small text inside dark card imagery.

3. Intro SKIP affordance is weak.
   - The actual button hit area is small and positioned at the far bottom-right.
   - Suggested fix: keep the visual minimal but make the click/tap target and focus state clearer.

4. Several visually separated text fragments concatenate in DOM text.
   - Examples: Standard copy line breaks, footer title/address, brand index labels.
   - Visual rendering is mostly okay, but screen readers or copy extraction can read phrases without spaces.
   - Suggested fix: add semantic spaces, aria labels, or separate accessible labels while preserving the visual layout.

5. Standard image rail can look like content is leaking off-screen.
   - The narrow next-image slice is likely intentional, but it can read as uncontrolled overflow.
   - Suggested fix: define it as an intentional preview state with consistent width and masking.

6. Section wording has minor terminology drift.
   - Hero uses "세 가지 방식" while Standard uses "세 가지 기준".
   - Suggested fix: keep both only if the intent differs; otherwise unify terminology.

## Checked Screenshots

- `28-desktop-hero-final.png`
- `29-desktop-brand-camp-final.png`
- `30-desktop-brand-homesys-final.png`
- `31-desktop-brand-leel-final.png`
- `32-desktop-about-final.png`
- `33-desktop-standard-01-final.png`
- `34-desktop-standard-02-final.png`
- `35-desktop-standard-03-final.png`
- `37-desktop-footer-final-2.png`
- `39-mobile-hero-final.png`
- `40-mobile-brand-camp-final.png`
- `41-mobile-brand-homesys-final.png`
- `42-mobile-brand-leel-final.png`
- `43-mobile-about-final.png`
- `44-mobile-standard-final.png`

## After-fix Verification

- Updated on: 2026-07-09
- Playwright engine: `playwright-core` with local Chrome executable
- Desktop viewport: 1440 x 900
- Mobile viewport: 390 x 844
- Result: no horizontal overflow detected on checked views.
- Result: About ROTI visual line items now report `overflowW: 0` and `overflowH: 0` on desktop and mobile.
- Remaining automated candidates are decorative or structural, not user-facing text clipping:
  - `.brand-card` outer 3D card button reports about 3px overflow from card depth/glass edge.
  - `.about-roti__wordmark` reports vertical overflow because it is a decorative background wordmark.

## After-fix Artifacts

- `after-fix-v2-desktop-hero.png`
- `after-fix-v2-desktop-about.png`
- `after-fix-v2-desktop-standard.png`
- `after-fix-v2-desktop-footer.png`
- `after-fix-v2-mobile-hero.png`
- `after-fix-v2-mobile-about.png`
- `after-fix-v2-mobile-standard.png`
- `after-fix-v2-playwright-report.json`
