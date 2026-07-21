# ROTI UI/UX Pro Max Design-System Candidate

> Status: review candidate, not a new source of truth
>
> Generated: 2026-07-20 with project-local UI/UX Pro Max v2.11.0
>
> Authority: `Design.md` > `AGENTS.md` > this document

This document translates useful UI/UX Pro Max recommendations into the existing ROTI design language. It must not override `Design.md`, existing brand assets, verified business information, or the current brand-data source of truth.

Generation record:

- Primary query: `dark premium brand portal black charcoal ember red cinematic editorial storytelling`
- Design dials: variance `5/10`, motion `3/10`, density `2/10`
- Supplemental searches: style, typography, landing structure, UX, GSAP motion, and Next.js guidance
- Automatic outputs were filtered through `Design.md` and the checked-in tokens before inclusion

## 1. Design intent

ROTI is a premium multi-brand portal that helps visitors understand and enter three connected areas of everyday life:

- `ROTI CAMP`: outdoor life, movement, camping, and rest
- `ROTI HOMESYS`: organization, storage, movement, and daily flow
- `LeEL`: kitchen, material, calm, and negative space

The page should feel cinematic and immersive, but controlled. It is not a product catalog, shopping mall, portfolio-template clone, or effects showcase.

## 2. Selected direction

### Accepted from UI/UX Pro Max

- Storytelling-driven vertical flow with fullscreen chapters
- Dark cinematic base with restrained atmospheric depth
- Dimensional layering for the three-card Hero stage
- Spacious density with strong hierarchy and short copy
- Subtle background-only parallax and restrained scroll reveal
- Visible focus, keyboard operation, reduced-motion fallback, and mobile simplification
- Existing Next.js App Router structure, optimized images, and client components kept close to interactive leaves

### Rejected from the automatic result

- White or warm-white global background
- Gold, indigo, rainbow, or iridescent primary accents
- Horizontal-scroll journey as the main information architecture
- Native-app-only haptics and `BlurView` recommendations
- Decorative liquid-glass morphing, chromatic aberration, or heavy glow
- Generic conversion claims, engagement percentages, testimonial patterns, pricing, or sales-oriented CTA structures
- Automatic font replacement with Noto Sans KR, Satoshi, General Sans, or Playfair Display

## 3. Visual system

### Color authority

Use the existing tokens in `src/styles/tokens.css`.

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Primary background | `--color-background-primary` | `#050505` | Hero and primary dark sections |
| Secondary background | `--color-background-secondary` | `#0B0B0B` | Section continuity and depth |
| Dark surface | `--color-surface-dark` | `#111111` | Elevated controls and panels |
| Glass surface | `--color-surface-glass` | `rgba(255,255,255,0.08)` | Hero card material only where legible |
| Subtle border | `--color-border-subtle` | `rgba(255,255,255,0.16)` | Card edges and quiet separators |
| Primary text | `--color-text-primary` | `#FFFFFF` | Main headings and active labels |
| Secondary text | `--color-text-secondary` | `rgba(255,255,255,0.72)` | Body copy |
| Tertiary text | `--color-text-tertiary` | `rgba(255,255,255,0.48)` | Supporting metadata after contrast verification |
| ROTI accent | `--color-accent-red` | `#B41307` | Thin lines, active markers, focus, restrained hover |
| Warm information surface | `--color-surface-warm` | `#F4F2EE` | Approved information and inquiry sections only |

Color ratio target:

- 80% black and charcoal
- 15% white and gray
- 5% or less Ember Red

Do not use Ember Red as a floor glow, broad reflection, card-bottom strip, card-top tint, or large background field. Green is not a primary mainpage accent.

### Typography

- Use the existing `--font-sans`: `Inter, Pretendard, SUIT, system-ui, sans-serif`.
- Korean-first copy uses Pretendard or SUIT when available.
- English brand names and compact UI labels may use Inter.
- Keep one sans-serif family system rather than adding a decorative luxury serif.
- Prefer weight, scale, spacing, and line length for hierarchy.
- Mobile body text should remain at least `16px`; long copy should wrap rather than truncate.

Recommended hierarchy remains aligned with `Design.md`:

- Hero title: `56-72px` desktop, fluidly reduced on mobile
- Section title: `48-64px` desktop
- Hero subtitle: `18-24px`
- Body: `16-20px`
- Navigation and labels: `14-16px`

### Spacing and grid

- Preserve `--section-content-max: 95rem` and responsive `--section-gutter`.
- Use the existing 4/8-based spacing tokens before adding one-off values.
- Full-bleed Hero and brand scenes may escape the content grid for imagery, while readable content returns to the shared grid.
- Information sections should share left edges for titles, primary copy, CTAs, and Footer content.
- Prefer structural centering with grid, flex, padding balance, and content bands; avoid arbitrary `translateY` corrections.

## 4. Page rhythm

1. Automatic, skippable Intro
2. Three-card Hero portal
3. ROTI CAMP fullscreen scene
4. ROTI HOMESYS fullscreen scene
5. LeEL fullscreen scene
6. About ROTI
7. ROTI Standard and supporting information
8. ROTI Connect / Contact
9. Footer

The three brand scenes form one vertical story. They may use a restrained pinned card-stack transition, but the page must retain a native vertical reading direction and a stable mobile fallback.

## 5. Hero behavior

- Show exactly three brand cards on a dark, grounded stage.
- The center card is largest and sharpest; side cards recede through scale, depth, brightness, and rotation.
- Restrained left/right arrows change the active center card only.
- Clicking a side card runs the same controlled turntable motion and centers that card at `rotateY(0deg)`.
- Clicking the current center card does not navigate or change the scroll position.
- Card selection ends in the Hero.
- Do not start fullscreen expansion, a fixed transition overlay, scroll synchronization, or brand-section navigation from a Hero card click.
- Use natural neutral contact shadows. Do not use red floor glow or red reflections.
- Smoke, mist, and spotlight layers remain slow, low-contrast, and primarily CSS-driven.

This behavior follows `Design.md`. Older handoff and harness documents that describe card-click navigation or fullscreen expansion are superseded for this candidate.

## 6. Motion system

### Candidate timing

| Motion | Range | Guidance |
| --- | --- | --- |
| Hover / press feedback | `150-220ms` | Opacity, brightness, or small transform only |
| Arrow and label state | `180-280ms` | Clear and responsive |
| Content reveal | `300-400ms` | `opacity` plus `8-16px` movement |
| Section continuity | `500-650ms` | Use only for meaningful spatial transitions |
| Intro | `2-3s` normal playback | One session, skippable, idempotent completion |

Preferred easing family:

- Enter and settle: `cubic-bezier(0.16, 1, 0.3, 1)` or an equivalent existing GSAP ease
- Exit: shorter than entry
- Scroll-linked motion: linear only when directly tied to scroll position

Rules:

- Animate `transform` and `opacity`; avoid layout-changing animation.
- Parallax is limited to decorative backgrounds, approximately `5-10%` movement, with no more than three meaningful layers.
- Do not parallax body copy or interactive controls.
- Do not add bounce, elastic, shake, aggressive overshoot, magnetic cursors, or decorative-only motion.
- Use the existing GSAP/ScrollTrigger and Lenis stack; add no animation framework.
- Scope animation ownership and cleanup. Do not introduce a second global scroll controller.

### Reduced motion

- Replace 3D card movement with an immediate state update or brief crossfade.
- Disable smoke/mist drift and parallax.
- Stop autoplaying carousels and nonessential looping motion.
- Keep the same information, active state, destination options, and keyboard behavior.

## 7. Components and interaction

- Arrow, menu, Skip, and CTA controls require visible labels or accessible names.
- Touch targets should be at least `44 x 44px` with at least `8px` separation where controls cluster.
- The active Hero card exposes a semantic selected state such as `aria-current` or an equivalent.
- Inactive or visually hidden slides must not leave actionable children in the tab order.
- Focus indicators use a restrained Ember Red outline with sufficient contrast and must never be removed without replacement.
- Hover is enhancement only; every primary action works by keyboard and touch.
- Use the existing Phosphor icon family consistently. Do not mix icon families or use emoji as interface icons.

## 8. Mobile and performance

- Prioritize the active card, readable copy, frame stability, and safe touch interaction over desktop depth.
- Use `svh` or `dvh`-aware viewport sizing where mobile browser chrome affects fullscreen sections.
- Reduce blur count, backdrop filtering, side-card depth, and continuous motion on small screens.
- Avoid horizontal page scrolling and nested scroll regions.
- Reserve image aspect ratios to prevent layout shift.
- Use `next/image` and appropriate `sizes` for responsive brand imagery.
- Lazy-load below-the-fold media; preload only the current Hero and immediately upcoming critical visual where justified.
- Keep client-only animation modules near their interactive components and use dynamic imports only for genuinely heavy code.
- Apply temporary `will-change` only during active animation and remove it afterward.

Required review viewports:

- `390 x 844`
- `768 x 1024`
- `1440 x 900`
- Mobile landscape sanity check

## 9. Content and trust

- User-facing copy is Korean-first.
- Keep `ROTI CAMP`, `ROTI HOMESYS`, and `LeEL` exactly as verified display names.
- Do not invent prices, rankings, certifications, awards, partner names, supply claims, delivery claims, or performance numbers.
- Each section adds new meaning instead of repeating the same three-brand introduction.
- Use only verified destinations from the brand-data source of truth.

## 10. Acceptance gate for future visual work

Before implementation, a selected screenshot, Figma frame, generated visual option, or live reference must define the visible target. This candidate supplies constraints and evaluation criteria; it is not a substitute for a visual target.

Any future design pass must verify:

- The result reads as one ROTI brand portal, not a collection of unrelated templates.
- The Hero remains a restrained three-card stage, not a commerce carousel.
- The red accent stays small and deliberate.
- Brand scenes remain individually recognizable while sharing one visual system.
- Mobile interaction does not depend on hover, deep 3D, or scroll-jacking.
- Keyboard, focus, reduced-motion, contrast, and cleanup behavior are preserved.
- The implementation is visually compared against the selected target at matching viewports.
