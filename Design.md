# Design.md

## 1. Project Identity

### Project Name
ROTI Brand Portal Mainpage

### Core Positioning
ROTI mainpage must present ROTI as a professional brand group operating three connected brands:

- ROTI CAMP
- ROTI HOMESYS
- LeEL

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
6. **Continuous experience**
   - Intro, Hero, brand scenes, information sections, and Footer should feel like parts of one connected experience rather than separate design samples.

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
- Abrupt section tone changes that make the page feel like multiple unrelated websites
- Black-frame flashes, image flicker, or visible anchor jumps during Hero-to-brand transitions

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
  - Do not use for Hero floor glow, card bottom red strip, or card top tint.

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
- Brand names `ROTI CAMP`, `ROTI HOMESYS`, and `LeEL` may remain in English.
- Do not add unverified marketing claims.
- Do not overload a section with text.
- Emotional or abstract slogans must be supported by a direct explanation of what ROTI or the relevant brand actually does.

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

### Body Section Grid
- Treat the Header as an independent fixed interface layer. Do not force body section content to align to the Header logo or menu position.
- Body information sections should share one content grid: `--section-content-max: 95rem` with `--section-gutter` as the responsive side margin.
- The left edge of key section content should align across body sections: section title, primary copy block, CTA/link groups, and Footer information.
- Full-bleed immersive sections such as Hero and brand scene slides may use the full viewport for imagery and motion, but their readable text, controls, and CTA areas should still respect the body section rhythm when practical.
- Vertical rhythm should be section-based. Keep bottom spacing balanced with the top title area; avoid leaving a large empty lower band or revealing the next section before the snap point.
- Grouped section compositions should be vertically centered through structural layout rules such as flex/grid centering, balanced padding, min-height, and explicit content bands.
- Do not use manual visual offsets, arbitrary `translateY` nudges, or one-off spacer hacks as the default way to make grouped content look centered.
- Use top-aligned or bottom-aligned layouts only when the section explicitly calls for that reading direction, such as fullscreen brand scene copy, pinned visual transitions, or footer/CTA endings.
- If optical adjustment is needed because of a fixed header or oversized media, solve it by changing the section layout model, content band, row sizing, or padding balance first; document any remaining exception in the component CSS.
- On mobile, preserve the same section rhythm with a smaller gutter and prioritize readable content over strict desktop proportions.

### Header / Navigation
- Top-left: ROTI logo
- Top-right: menu icon
- Desktop Hero initial state:
  - `BRAND / ABOUT / STANDARD / CONTACT` nav link group may be placed at the bottom-right.
  - Bottom nav should have low contrast and a small size so it does not disturb the Hero stage.
- Desktop after scroll:
  - The nav link group moves to the top-right header area.
  - The transition should be smooth, not abrupt.
- Mobile:
  - Do not force the nav link group into the bottom area.
  - Hide the nav link group or simplify around the menu icon.

### Intro Sequence
- Intro plays automatically without requiring wheel, swipe, or repeated keyboard input.
- Total desktop duration should remain approximately 2-3 seconds.
- The final ROTI logo scene should connect naturally into the Hero card-spread animation.
- Keep a visible and keyboard-accessible `SKIP` control.
- Full intro playback should occur only once per browser session unless a later product decision changes this rule.
- Wheel, click, Enter, Space, or Escape may fast-complete the intro.
- Fast-complete and automatic completion must use one idempotent completion path.
- In `prefers-reduced-motion`, show only a brief logo state or enter the Hero immediately.
- Intro completion must never leave scrolling or the main document locked.

### Hero
- Three brand cards are arranged like a central stage.
- The center card is the largest and sharpest.
- Left and right cards move backward and appear slightly darker.
- Use restrained left/right arrow controls to rotate the Hero cards, matching the approved visual mockup direction.
- Arrow controls rotate cards only and must not turn the Hero into a commerce carousel.
- Every brand card enters its matching brand scene with one click or tap.
- Clicking a center card begins the fullscreen expansion immediately.
- Clicking a left or right card first moves that card to the center, resolves `rotateY` to `0deg`, and then continues directly into fullscreen expansion.
- A second click must never be required.
- Card selection must not immediately jump or scroll to the target anchor.
- The background prioritizes dynamic smoke / mist / soft spotlight rather than a static smoke image.
- Smoke / mist should move very slowly and subtly.
- Cards must feel grounded on the floor with natural contact shadows.
- The floor may suggest a dark glossy surface, but only subtly.
- Do not use wide red glow, red light strip, or red floor reflection below cards.
- Do not use red tint on the top of cards.
- Red accent is limited to small UI elements.

### Hero-to-Brand Transition
- The selected Hero card becomes the visual source of the transition into the brand section.
- A transition overlay may visually clone the selected card so the source card remains structurally stable in the React tree.
- Non-selected cards and Hero controls should recede through restrained opacity, brightness, or blur changes.
- A side card must center before fullscreen expansion; a center card may skip the centering phase.
- During expansion, card width and height grow to the viewport while radius, border, shadow, side depth, glass edge, and sheen are gradually removed.
- The final transition frame should match a full-viewport brand scene with no visible card chrome.
- Hero and section imagery must connect without an empty frame, black flash, or abrupt crop jump.
- When Hero and section images differ, crossfade only after the expanding card substantially covers the viewport.
- The real scroll position may be synchronized only after the transition image fully covers the viewport.
- After synchronization, the real brand scene must be visually aligned before the transition overlay is removed.
- The brand logo, description, and CTA may reveal in a restrained sequence after the scene is stable.
- Recommended total transition duration is approximately 1.2-1.6 seconds on desktop and shorter on mobile.
- Do not use bounce, elastic, shake, or aggressive overshoot.
- Transition failure must fall back to a safe move to the matching brand section and must never leave the page locked.

### Brand Fullscreen Sections
- One brand per screen.
- ROTI CAMP, ROTI HOMESYS, and LeEL each require their own fullscreen section.
- Sections should feel cinematic, not like repeated empty black text blocks.
- Brand sections should follow a PLAN-AZ-style pinned visual slide structure: a full-bleed brand scene first fills the viewport, then scroll progress turns it into a lifted/rounded/tilted card while the next brand scene rises from below.
- The reference behavior is the vertical card-stack transition, not the PLAN-AZ project portfolio content, copy, logo, or brand identity.
- Brand copy remains lower-centered over the scene image with a restrained dark overlay.
- Each brand may have a distinct scene mood and CTA while keeping a consistent system.
- Hero transition arrival must activate the correct brand scene and must not expose another slide above it.

### Brand Section Content
Each brand section may include:

- One clear brand definition
- Three main product or lifestyle categories
- Two or three representative use scenes
- One real brand-site, shop, or inquiry CTA when the destination is confirmed

Do not include:

- Price
- Discount
- Review count
- Sales ranking
- Unverified product performance, certification, supply, award, or partner claims

---

## 7. Interaction Rules

### Hero Card Switching
- Left/right arrow controls change only the active Hero card.
- Arrow controls preserve the 3D turntable / carousel feeling.
- Clicking any brand card starts a one-click transition into the matching brand section.
- A clicked side card centers and resolves its rotation before fullscreen expansion.
- A clicked center card begins fullscreen expansion directly.
- Card click must not perform an immediate anchor jump before the visual transition covers the viewport.
- Keyboard access must remain available through accessible controls.
- During a brand transition, card input and arrow controls are temporarily disabled.
- After completion or failure, all controls and scrolling must be restored.

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
- Hero-to-brand movement should read as one continuous object transition, not a scroll jump followed by a separate animation.

### Micro Interactions
- Hover may use subtle tilt or brightness.
- Selected card is emphasized by brightness, sharpness, and thin edge highlight.
- Do not use large red glow, red floor reflection, or red strip.
- Use only a small red accent line where necessary.
- Background smoke / mist motion must be slow and subtle.
- Use very mild background parallax only if needed.
- In `prefers-reduced-motion`, disable or minimize smoke / mist, 3D centering, and fullscreen expansion.
- Reduced-motion users must still arrive at the correct brand section through a brief, understandable fade or direct transition.

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

### LeEL
- Keywords: kitchen, clean, density, calm
- Visual mood: steel, stone, kitchen lighting, restrained living object mood
- Tone: calm, refined, and premium

---

## 9. Component Rules

### Brand Card
Must include:

- Brand-specific visual treatment or image slot
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

### Brand Transition Overlay
Must include:

- A visual continuation of the selected Hero card
- Source-card geometry alignment
- Side-card-to-center handling
- Fullscreen expansion
- Hero-to-section image continuity
- Safe cleanup after success, cancellation, resize, unmount, or failure
- Mobile and `prefers-reduced-motion` fallbacks

Must not include:

- A second independent visual design unrelated to the Hero card
- A blank interstitial screen
- A hard anchor jump before the viewport is covered
- Permanent scroll locking
- A requirement for a second click

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
- Avoid repeating the same three-brand introduction in Hero, brand scenes, and About without adding new meaning.

---

## 10. Accessibility & Performance

### Accessibility
- Maintain sufficient contrast.
- Keep keyboard navigation available.
- Provide labels for assistive technology.
- Respect `prefers-reduced-motion`.
- Header nav movement must not create a confusing keyboard order.
- Transition status should be available to assistive technology through a restrained live-region announcement.
- During transition, focus must not enter hidden Hero or inactive brand-slide controls.
- After transition, move focus to the target brand heading or an equivalent focusable landmark without causing another scroll.
- Inactive brand slides must not expose hidden links in the keyboard tab order.
- Escape during a committed transition should fast-complete safely rather than leave an ambiguous half-transition state.

### Performance
- Prefer CSS-based effects where possible.
- Avoid excessive WebGL use.
- Do not add Three.js or another animation framework for this transition.
- Optimize image slots when real images are added.
- Preload the selected section image before or at transition start.
- Implement smoke / mist primarily with CSS animation.
- Reduce blur layer count, 3D side depth, and motion duration on mobile.
- If pixel ratio is increased for card sharpness, check performance impact.
- Avoid keeping `will-change` on large full-screen layers outside actual animation periods.

---

## 11. Do / Don't

### Do
- Keep arrow-based Hero card rotation.
- Use one-click card entry into the matching brand scene.
- Center a clicked side card before expansion.
- Expand the selected card into the fullscreen brand scene.
- Synchronize scroll only while the transition overlay fully covers the viewport.
- Keep a shared layout system while giving each brand a distinct mood.
- Use Ember Red sparingly.
- Emphasize connected scroll transitions.
- Use PLAN-AZ-style fullscreen visual slides for the brand scenes while keeping ROTI assets, copy, and color rules.
- Allow desktop Hero bottom-right nav in the initial view.
- Move nav naturally to top on scroll.
- Create natural contact shadows so cards feel grounded.
- Use slow dynamic smoke / mist.
- Keep intro automatic, brief, skippable, and safe on repeat visits.
- Check all changes against this file.

### Don't
- Use commerce-style carousel controls, product-slider chrome, or auto-advancing sales carousel behavior.
- Require two clicks to enter a brand section.
- Jump to the target anchor before the selected card covers the viewport.
- Move the real BrandCard DOM node outside its normal React structure for the transition.
- Add product prices, reviews, discounts, cart, checkout, member, order, or payment UI.
- Add a separate product-listing shop page feel to the Hero.
- Add unapproved third-party brand names or logos.
- Add unverified marketing claims.
- Add Hero card bottom red glow / red strip / red reflection.
- Add Hero card top red tint.
- Replace smoke / mist with a static smoke image.
- Force bottom nav on mobile.
- Leave scrolling, controls, or document interaction locked after transition failure.
- Reintroduce a manual multi-step intro that requires repeated scrolling.

---

## 12. Change Management Rule

Any design or interaction change must follow this order:

1. Read `Design.md`.
2. Define the purpose and scope of the change.
3. Check whether the change preserves:
   - Brand portal identity
   - Dark premium tone
   - Automatic and skippable intro
   - Arrow-to-rotate Hero card structure
   - One-click card-to-brand transition
   - Side-card centering before fullscreen expansion
   - One-brand-per-screen scroll structure
   - Red accent restraint
   - Hero nav bottom-to-top transition
4. Write a checklist in the report.

### Required Change Checklist
- [ ] Does the change preserve the brand portal concept?
- [ ] Does it keep ROTI logo top-left and menu icon top-right?
- [ ] Is the intro automatic, brief, skippable, and safe for reduced motion?
- [ ] In desktop Hero initial state, does bottom-right nav avoid disturbing the Hero?
- [ ] After scroll, does nav move naturally to the top header area?
- [ ] Is mobile nav simplified rather than forced into the bottom?
- [ ] Is arrow-based card rotation preserved?
- [ ] Does every card enter the matching brand section with one click/tap?
- [ ] Does a side card center before fullscreen expansion?
- [ ] Is immediate anchor jumping avoided until the viewport is covered?
- [ ] Does the transition avoid blank frames, image flicker, and crop jumps?
- [ ] Is one-brand-per-screen section intent preserved?
- [ ] Do brand sections use fullscreen visual slide structure without becoming a project portfolio clone?
- [ ] Is red limited to small accents?
- [ ] Is Hero card bottom red glow / red strip / red reflection removed?
- [ ] Is Hero card top red tint absent?
- [ ] Is dynamic smoke / mist subtle and performance-conscious?
- [ ] Do cards have natural contact shadows that do not look like red glow?
- [ ] Were unverified claims avoided?
- [ ] Are scroll locking, failure recovery, focus, mobile, and reduced-motion risks handled?

---

## 13. Definition of Done

The mainpage first pass can be considered complete when:

- The intro plays automatically, remains skippable, and does not require repeated scroll input.
- The first screen shows three brand cards in a premium stage.
- Brand switching works through restrained left/right arrow controls.
- Any card enters its matching brand scene with one click or tap.
- A clicked side card centers and resolves its rotation before fullscreen expansion.
- A clicked center card expands directly.
- The selected card expands into the brand scene without a blank frame, flicker, or visible anchor jump.
- Scroll position is synchronized only while the transition image covers the viewport.
- Transition success and failure both restore scrolling, controls, and document state.
- Hero background has subtle smoke / mist motion, not a static smoke image.
- Hero cards have natural contact shadows.
- Hero card bottom red glow / red strip / red floor reflection are absent.
- Hero card top red tint is absent.
- Desktop Hero initial nav can appear bottom-right and moves naturally to top after scroll.
- Mobile does not force bottom nav.
- Brand fullscreen sections appear one brand per screen.
- Brand fullscreen sections use full-bleed scene imagery with lower-centered copy and smooth slide continuity.
- Each brand has a clear CTA when a verified destination exists.
- Keyboard, inactive-slide focus, live-region announcement, and reduced-motion behavior are verified.
- Logo, menu icon, nav transition, card system, color, and motion are consistent.
- Changes can be reviewed against this `Design.md`.
