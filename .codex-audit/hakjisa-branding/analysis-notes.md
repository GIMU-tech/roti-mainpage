# Hakjisa Branding Site Analysis Notes

Source: https://branding.hakjisa.kr/

## Evidence Captured

- Browser title: HCG 학지사 콘텐츠 그룹
- Page class includes `lenis lenis-smooth`
- Approximate desktop viewport captured at 1280x720
- Approximate page scroll height observed: 28093px
- Local screenshots captured in this folder:
  - `01-hero.png`
  - `02-values-trust.png`
  - `03-values-transition.png`
  - `04-business-overview.png`
  - `05-services-cards.png`
  - `06-ai-vision.png`
  - `07-news-partners.png`

## Loaded Frontend Assets

- CSS:
  - `https://branding.hakjisa.kr/assets/css/layout.css`
  - `https://branding.hakjisa.kr/assets/css/styles.css`
- JavaScript:
  - `https://branding.hakjisa.kr/assets/js/libs/gsap.min.js`
  - `https://branding.hakjisa.kr/assets/js/libs/ScrollTrigger.min.js`
  - `https://branding.hakjisa.kr/assets/js/libs/MotionPathPlugin.min.js`
  - `https://branding.hakjisa.kr/assets/js/libs/lenis.min.js`
  - `https://branding.hakjisa.kr/assets/js/libs/three.min.js`
  - `https://branding.hakjisa.kr/assets/js/common.js`
  - `https://branding.hakjisa.kr/assets/js/main.js`
  - `https://branding.hakjisa.kr/assets/js/curl-noise.js`

## Technical Structure Observed

- Static/custom HTML, CSS, and JavaScript structure rather than a React/Next bundle.
- Lenis handles smooth scrolling with duration around 1.4, smooth wheel enabled, and ScrollTrigger updated on Lenis scroll.
- GSAP ScrollTrigger is used heavily for pinned, scrubbed sections.
- MotionPathPlugin is used for decorative path animation.
- Three.js is used for a curl-noise particle effect when the relevant container exists.
- Major sections are not simple scroll blocks. They pin the screen and change internal content as scroll progress advances.

## Motion Patterns Observed

- Hero pins for a long scroll range and swaps/reveals text and imagery through opacity and clip-path wipes.
- Values section pins and changes layered value screens with text wipes, masked images, and path animation.
- Business overview uses pinned card/logo reveal stages.
- Services uses a pinned background image plus changing tab/card content.
- About uses a pinned split layout with text and video/image panels synchronized to scroll.
- News/partners use more conventional reveal, stagger, and track-style animations.

## ROTI Application Direction

- Keep ROTI's dark/charcoal premium base and Ember Red accent.
- Do not import HCG's green/nature identity as a primary ROTI language.
- Apply HCG-like pinned editorial pacing to one or two ROTI sections only, because ROTI already has hero and brand fullscreen scenes.
- Best candidates:
  - ROTI Standard as a pinned three-step values section.
  - About ROTI as a split text/visual section.
  - Brand scene stack with side index/progress behavior.
- Avoid adding a separate brand portfolio section, commerce grid, price/review/shop patterns, or unverified claims.
