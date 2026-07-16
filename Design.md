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
- Black-frame flashes, image flicker, or visible anchor jumps during Hero card selection or brand-scene scrolling

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
- Clicking or tapping a left or right card makes that card the center main card and resolves `rotateY` to `0deg` through the established rotation animation.
- Card selection ends after the clicked card becomes the center main card.
- Clicking a Hero card must not start fullscreen expansion, a transition overlay, or navigation to a brand section.
- Clicking the current center card must keep the user in the Hero and must not change the scroll position.
- Brand scenes are entered through the normal page scroll flow or explicit navigation controls, not through Hero card clicks.
- The background prioritizes dynamic smoke / mist / soft spotlight rather than a static smoke image.
- Smoke / mist should move very slowly and subtly.
- Cards must feel grounded on the floor with natural contact shadows.
- The floor may suggest a dark glossy surface, but only subtly.
- Do not use wide red glow, red light strip, or red floor reflection below cards.
- Do not use red tint on the top of cards.
- Red accent is limited to small UI elements.

### Hero Card Selection Motion
- A clicked side card becomes the center main card through the existing 3D turntable rotation and centering motion.
- The clicked card resolves to the center slot and `rotateY: 0deg`; the other cards move to their corresponding side slots.
- The selection motion should remain smooth and restrained, with no bounce, elastic, shake, or aggressive overshoot.
- The card remains a card throughout the interaction. Its radius, border, shadow, depth, glass edge, and sheen must not be removed for fullscreen expansion.
- Card selection must not create a fixed transition overlay, synchronize the real scroll position, or lock document scrolling.
- Once the centering motion is complete, card and arrow input must be restored.
- Mobile may use a shorter 2D-heavy version of the same center-selection behavior.
- In `prefers-reduced-motion`, update the center main card immediately or with a brief fade while preserving the same selected result.

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
- Clicking a side brand card changes the active brand and moves it to the center main-card slot.
- Clicking the current center card keeps the current active brand and never navigates away from the Hero.
- Card clicks must not perform an anchor jump, fullscreen expansion, or brand-section transition.
- Keyboard access must remain available through accessible controls.
- During the center-selection animation, repeated card and arrow input may be temporarily disabled.
- After the center-selection animation, all card and arrow controls must be restored without changing document scrolling.

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
- Card-selection movement should read as one continuous turntable motion that ends in the Hero center slot.

### Micro Interactions
- Hover may use subtle tilt or brightness.
- Selected card is emphasized by brightness, sharpness, and thin edge highlight.
- Do not use large red glow, red floor reflection, or red strip.
- Use only a small red accent line where necessary.
- Background smoke / mist motion must be slow and subtle.
- Use very mild background parallax only if needed.
- In `prefers-reduced-motion`, disable or minimize smoke / mist and 3D centering.
- Reduced-motion users must still be able to change the center main card through an immediate update or brief fade.

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

### Hero Card Selection
Must include:

- Side-card-to-center handling
- Active-card state synchronization
- Existing card rotation, scale, opacity, and depth motion
- Safe interaction-state cleanup after completion, resize, unmount, or interruption
- Mobile and `prefers-reduced-motion` fallbacks

Must not include:

- Fullscreen card expansion
- A fixed Hero-to-brand transition overlay
- A hard anchor jump or automatic brand-section navigation
- Scroll-position synchronization caused by a card click
- Permanent scroll locking

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

### ROTI Connect
- ROTI Connect is a warm off-white inquiry selection section within the shared body grid.
- Three inquiry-type tabs share one active carousel state with a large center image, restrained side previews, and synchronized detail copy.
- The inquiry carousel may advance automatically every five seconds, but must pause while hovered or keyboard-focused and must stop for reduced-motion users.
- Do not use complex signal networks, SVG connecting lines, 3D, ScrollTrigger, or new scroll locking.

---

## 10. Accessibility & Performance

### Accessibility
- Maintain sufficient contrast.
- Keep keyboard navigation available.
- Provide labels for assistive technology.
- Respect `prefers-reduced-motion`.
- Header nav movement must not create a confusing keyboard order.
- The active center card must expose its selected state through `aria-current` or an equivalent accessible state.
- Card labels must describe changing the main card and must not announce brand-section navigation.
- Inactive brand slides must not expose hidden links in the keyboard tab order.

### Performance
- Prefer CSS-based effects where possible.
- Avoid excessive WebGL use.
- Do not add Three.js or another animation framework for Hero card selection.
- Optimize image slots when real images are added.
- Implement smoke / mist primarily with CSS animation.
- Reduce blur layer count, 3D side depth, and motion duration on mobile.
- If pixel ratio is increased for card sharpness, check performance impact.
- Avoid keeping `will-change` on large full-screen layers outside actual animation periods.

---

## 11. Do / Don't

### Do
- Keep arrow-based Hero card rotation.
- Use card clicks to select and center the clicked brand card only.
- Replay the established side-card-to-center rotation when a side card is clicked.
- Keep brand-scene entry in the normal scroll flow or explicit navigation.
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
- Start fullscreen expansion or brand-section navigation from a Hero card click.
- Jump to a target anchor or synchronize scroll from a Hero card click.
- Move the real BrandCard DOM node outside its normal React structure for card selection.
- Add product prices, reviews, discounts, cart, checkout, member, order, or payment UI.
- Add a separate product-listing shop page feel to the Hero.
- Add unapproved third-party brand names or logos.
- Add unverified marketing claims.
- Add Hero card bottom red glow / red strip / red reflection.
- Add Hero card top red tint.
- Replace smoke / mist with a static smoke image.
- Force bottom nav on mobile.
- Lock scrolling or document interaction during Hero card selection.
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
   - Card-click-to-center-only interaction
   - Side-card centering animation without fullscreen expansion
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
- [ ] Does clicking a side card animate it into the center main-card slot?
- [ ] Does card selection stop in the Hero without fullscreen expansion or brand-section navigation?
- [ ] Is the scroll position unchanged by Hero card clicks?
- [ ] Is repeated input safely restored after the center-selection motion?
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
- Clicking a side card animates it into the center main-card slot and resolves its rotation.
- Clicking a Hero card never starts fullscreen expansion or automatic brand-section navigation.
- Clicking the current center card keeps the Hero and scroll position unchanged.
- Brand scenes remain available through the normal one-brand-per-screen scroll flow or explicit navigation.
- Card-selection completion and interruption both restore card and arrow controls without locking scrolling.
- Hero background has subtle smoke / mist motion, not a static smoke image.
- Hero cards have natural contact shadows.
- Hero card bottom red glow / red strip / red floor reflection are absent.
- Hero card top red tint is absent.
- Desktop Hero initial nav can appear bottom-right and moves naturally to top after scroll.
- Mobile does not force bottom nav.
- Brand fullscreen sections appear one brand per screen.
- Brand fullscreen sections use full-bleed scene imagery with lower-centered copy and smooth slide continuity.
- Each brand has a clear CTA when a verified destination exists.
- Keyboard card selection, active-state announcement, inactive-slide focus, and reduced-motion behavior are verified.
- Logo, menu icon, nav transition, card system, color, and motion are consistent.
- Changes can be reviewed against this `Design.md`.
