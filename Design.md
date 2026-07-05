# Design.md

## 1. Project Identity

### Project Name
ROTI Brand Portal Mainpage

### Core Positioning
ROTI mainpage must present ROTI as a professional brand group operating three connected brands:

- ROTI CAMP
- ROTI HOMESYS
- LEEL

This is a brand portal, not a product-listing shopping mall homepage.

### Primary User Goal
Users should understand quickly:

1. ROTI operates three brands.
2. Each brand represents a different everyday-life scene.
3. Users can move naturally to the brand they want.

---

## 2. Experience Principles

1. **Portal, not shop**
   - The mainpage presents brand identity and direction, not product grids.
2. **Premium but restrained**
   - The page should feel premium without excessive effects.
3. **Motion with meaning**
   - Motion should support exploration, transition, and depth.
4. **One-screen focus**
   - Each major scroll section should focus on one brand or one message.
5. **Consistency first**
   - Design changes must keep the established dark premium ROTI language.

---

## 3. Visual Direction

### Overall Tone
- Dark premium
- Black / charcoal base
- Minimal interface
- Soft cinematic lighting
- Glass / acrylic card feel
- Subtle 3D depth
- Dynamic smoke / mist atmosphere
- Grounded stage with natural contact shadow

### Mood Keywords
- professional
- curated
- controlled
- elegant
- immersive
- modern

### Avoid
- Product-listing shopping mall UI
- Price, discount, review, cart, checkout, member, order, or payment UI
- Excessive neon effects
- Game-like particles
- Fire effects
- Overly strong red glow
- Hero card bottom red glow / red strip / red floor reflection
- Hero card top red tint
- Green as the primary Hero accent
- Commerce-style carousel controls or product slider UI
- Unverified claims such as No. 1, certified, supplied to, awarded, or sales numbers

---

## 4. Color System

### Core Brand Colors
- Ember Red: `#B41307`
- Muted Black: `#272727`
- Soft Gray: `#D8D8D8`
- Lime Green: `#82D275`

### Usage Rule
- The primary accent for the mainpage is Ember Red.
- Red must be used with restraint: small lines, focus states, hover states, and active indicators only.
- Do not use red as a wide floor glow, card bottom strip, red reflection, or top card tint.
- Green must not be used as the primary Hero accent.
- Green may only appear as a limited secondary/supporting concept if explicitly approved.

### UI Tokens
- Background Primary: `#050505`
- Background Secondary: `#0B0B0B`
- Surface Dark: `#111111`
- Surface Glass: `rgba(255,255,255,0.08)`
- Border Subtle: `rgba(255,255,255,0.16)`
- Text Primary: `#FFFFFF`
- Text Secondary: `rgba(255,255,255,0.72)`
- Text Tertiary: `rgba(255,255,255,0.48)`
- Accent Red: `#B41307`
- Accent Red Glow: `rgba(180,19,7,0.45)`
  - Use only for focus rings, small hover states, and thin accent lines.
  - Do not use for Hero floor glow, card bottom red strip, or card top red tint.

### Color Ratio
- 80% dark neutrals
- 15% whites / grays
- 5% restrained accent red

---

## 5. Typography

### Recommended Fonts
- Korean: Pretendard or SUIT
- English/UI: Inter

### Typographic Tone
- Clean geometric sans feeling
- Short, confident wording
- Avoid long explanatory paragraphs in Hero and brand cards

### Type Scale Guide
- Hero Title: 56-72px desktop
- Hero Subtitle: 18-24px desktop
- Card Title: 24-40px
- Section Title: 48-64px
- Body: 16-20px
- Nav: 14-16px

### Text Rules
- User-facing copy should be Korean-first.
- Brand names `ROTI CAMP`, `ROTI HOMESYS`, and `LEEL` may remain in English.
- Do not add unverified marketing claims.
- Do not overload a section with text.

---

## 6. Layout Principles

### Global Layout
- Use full viewport sections as the main rhythm.
- Maintain clear visual flow.
- Header structure remains consistent.
- ROTI logo always stays at the top-left.
- Menu icon always stays at the top-right.
- Desktop Hero initial state may place the nav link group at the bottom-right.
- When scrolling starts or Hero is exited, the nav link group should move naturally into the top header area.

### Header / Navigation
- Top-left: ROTI logo
- Top-right: menu icon
- Desktop Hero initial state:
  - `BRAND / NEWS / CAREERS / CONTACT` nav link group may be placed at the bottom-right.
  - Bottom nav should have low contrast and a small size so it does not disturb the Hero stage.
- Desktop after scroll:
  - The nav link group moves to the top-right header area.
  - The transition should be smooth, not abrupt.
- Mobile:
  - Do not force the nav link group into the bottom area.
  - Hide the nav link group or simplify around the menu icon.

### Hero
- Three brand cards are arranged like a central stage.
- The center card is the largest and sharpest.
- Left and right cards move backward and appear slightly darker.
- Use restrained left/right arrow controls to rotate the hero cards, matching the approved visual mockup direction.
- Arrow controls rotate the cards only; they must not turn the Hero into a commerce carousel.
- Brand card click/tap moves smoothly down to that brand's fullscreen section.
- The background prioritizes dynamic smoke / mist / soft spotlight rather than a static image.
- Smoke / mist should move very slowly and subtly.
- Cards must feel grounded on the floor with natural contact shadows.
- The floor may suggest a dark glossy surface, but only subtly.
- Do not use wide red glow, red light strip, or red floor reflection below cards.
- Do not use red tint on the top of cards.
- Red accent is limited to small UI elements.

### Brand Fullscreen Sections
- One brand per screen.
- ROTI CAMP, ROTI HOMESYS, and LEEL each require their own fullscreen section.
- Sections should feel cinematic, not like repeated empty black text blocks.
- Brand sections should follow a PLAN-AZ-style pinned visual slide structure: a full-bleed brand scene first fills the viewport, then scroll progress turns it into a lifted/rounded/tilted card while the next brand scene rises from below.
- The reference behavior is the vertical card-stack transition, not the PLAN-AZ project portfolio content, copy, logo, or brand identity.
- Brand copy remains lower-centered over the scene image with a restrained dark overlay.
- Each brand may have a distinct scene mood and CTA while keeping a consistent system.

---

## 7. Interaction Rules

### Hero Card Switching
- Left/right arrow controls are the primary way to switch the active Hero card.
- The active card rotates in 3D and moves to the center when changed by arrow controls.
- Clicking a brand card does not rotate the Hero; it scrolls to the matching brand fullscreen section.
- Keep a 3D turntable / carousel feeling.
- Keyboard access must remain available through accessible controls.

### Header / Navigation Scroll Behavior
- In the desktop Hero initial state, the nav link group may sit at the bottom-right.
- When scrolling starts or the Hero is exited, the nav link group moves to the top header area.
- Use opacity / transform / position transition so the movement does not feel like a layout jump.
- ROTI logo and menu icon remain at the top in all states.
- On mobile, simplify and do not force bottom nav exposure.

### Motion Language
- Smooth
- Premium
- Slightly slow-in, smooth-out
- No aggressive bounce
- No gimmicky shake
- Hero card arrows should feel restrained and editorial, not like a shopping carousel.
- Hero-to-brand-section movement should feel like a fullscreen slide transition.

### Micro Interactions
- Hover may use subtle tilt or brightness.
- Selected card is emphasized by brightness, sharpness, and thin edge highlight.
- Do not use large red glow, red floor reflection, or red strip.
- Use only a small red accent line where necessary.
- Background smoke / mist motion must be slow and subtle.
- Use very mild background parallax only if needed.
- In `prefers-reduced-motion`, disable or minimize smoke / mist and heavy transitions.

---

## 8. Brand-Specific Direction

### ROTI CAMP
- Keywords: outdoor, movement, nature, rest
- Visual mood: dark outdoor, mountain ridge, movement, camping gear atmosphere
- Tone: structured and practical, not overly sentimental

### ROTI HOMESYS
- Keywords: organize, move, utility, efficiency
- Visual mood: organized interior, storage structure, warm lighting, home system mood
- Tone: central hub among the brands

### LEEL
- Keywords: kitchen, clean, density, calm
- Visual mood: steel, stone, kitchen lighting, restrained living object mood
- Tone: calm, refined, and premium

---

## 9. Component Rules

### Brand Card
Must include:

- Brand-specific visual treatment or future image slot
- Dark overlay
- Card title
- Short description
- Subtle red accent line
- Glass-like border/highlight
- Natural black / gray contact shadow
- Selected state based on brightness, sharpness, and edge highlight

Must not include:

- Bottom red glow
- Red strip
- Red floor reflection
- Commerce elements

### Hero Smoke / Mist Layer
Must include:

- CSS gradient / blur / opacity / transform based dynamic smoke layer
- Very slow movement
- Low contrast
- `prefers-reduced-motion` handling
- Lower opacity or static behavior on mobile

Must not include:

- Static smoke image
- Fast particles
- Fire
- Game UI effects

### CTA Button
- Simple, thin, and controlled
- Red accent only on hover / active when needed
- Do not make it feel like a shopping banner button

### Section Copy
- H1/H2 + short description + CTA structure
- No long unnecessary paragraphs

---

## 10. Accessibility & Performance

### Accessibility
- Maintain sufficient contrast.
- Keep keyboard navigation available.
- Provide labels for assistive technology.
- Respect `prefers-reduced-motion`.
- Header nav movement must not create a confusing keyboard order.

### Performance
- Prefer CSS-based effects where possible.
- Avoid excessive WebGL use.
- Optimize image slots when real images are added.
- Implement smoke / mist primarily with CSS animation.
- Reduce blur layer count and motion on mobile.
- If pixel ratio is increased for card sharpness, check performance impact.

---

## 11. Do / Don't

### Do
- Keep arrow-based hero card rotation.
- Keep card-click movement into the matching brand section.
- Keep a shared layout system while giving each brand a distinct mood.
- Use Ember Red sparingly.
- Emphasize connected scroll transitions.
- Use PLAN-AZ-style fullscreen visual slides for the brand scenes while keeping ROTI assets, copy, and color rules.
- Allow desktop Hero bottom-right nav in the initial view.
- Move nav naturally to top on scroll.
- Create natural contact shadows so cards feel grounded.
- Use slow dynamic smoke / mist.
- Check all changes against this file.

### Don't
- Use commerce-style carousel controls, product-slider chrome, or auto-advancing sales carousel behavior.
- Make card click rotate the Hero; card click should move to the brand section.
- Add product prices, reviews, discounts, cart, checkout, member, order, or payment UI.
- Add a separate product-listing shop page feel to the Hero.
- Add unapproved third-party brand names or logos.
- Add unverified marketing claims.
- Add Hero card bottom red glow / red strip / red reflection.
- Add Hero card top red tint.
- Replace smoke / mist with a static smoke image.
- Force bottom nav on mobile.

---

## 12. Change Management Rule

Any design or interaction change must follow this order:

1. Read `Design.md`.
2. Define the purpose and scope of the change.
3. Check whether the change preserves:
   - Brand portal identity
   - Dark premium tone
   - Arrow-to-rotate Hero card structure
   - Card-click-to-brand-section movement
   - One-brand-per-screen scroll structure
   - Red accent restraint
   - Hero nav bottom-to-top transition
4. Write a checklist in the report.

### Required Change Checklist
- [ ] Does the change preserve the brand portal concept?
- [ ] Does it keep ROTI logo top-left and menu icon top-right?
- [ ] In desktop Hero initial state, does bottom-right nav avoid disturbing the Hero?
- [ ] After scroll, does nav move naturally to the top header area?
- [ ] Is mobile nav simplified rather than forced into the bottom?
- [ ] Is arrow-based card rotation preserved?
- [ ] Does card click/tap move to the matching brand section?
- [ ] Is one-brand-per-screen section intent preserved?
- [ ] Do brand sections use fullscreen visual slide structure without becoming a project portfolio clone?
- [ ] Is red limited to small accents?
- [ ] Is Hero card bottom red glow / red strip / red reflection removed?
- [ ] Is Hero card top red tint absent?
- [ ] Is dynamic smoke / mist subtle and performance-conscious?
- [ ] Do cards have natural contact shadows that do not look like red glow?
- [ ] Were unverified claims avoided?
- [ ] Were accessibility and performance risks considered?

---

## 13. Definition of Done

The mainpage first pass can be considered complete when:

- The first screen shows three brand cards in a premium stage.
- Brand switching works through restrained left/right arrow controls.
- Card click/tap scrolls to the matching brand fullscreen section.
- Hero background has subtle smoke / mist motion, not a static smoke image.
- Hero cards have natural contact shadows.
- Hero card bottom red glow / red strip / red floor reflection are absent.
- Hero card top red tint is absent.
- Desktop Hero initial nav can appear bottom-right and moves naturally to top after scroll.
- Mobile does not force bottom nav.
- Brand fullscreen sections appear one brand per screen.
- Brand fullscreen sections use full-bleed scene imagery with lower-centered copy and smooth slide continuity.
- Each brand has a clear CTA.
- Logo, menu icon, nav transition, card system, color, and motion are consistent.
- Changes can be reviewed against this `Design.md`.
