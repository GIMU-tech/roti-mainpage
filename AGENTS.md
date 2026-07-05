# ROTI Mainpage Codex Agent Rules

## Project Mission
Build the ROTI integrated brand portal mainpage.

ROTI must look like a professional brand group that operates:
- ROTI CAMP
- ROTI HOMESYS
- LEEL

This is not a product-listing shopping mall homepage.

## ROTI Mainpage Canonical Direction v2

This repository's goal is to build a premium brand portal mainpage for ROTI's three brands, not a shopping mall.

### Core Brands

- ROTI CAMP
- ROTI HOMESYS
- LEEL

### Final IA

Do not create a separate Brand Portfolio section.

The final mainpage should follow this order:

1. Hero
   - ROTI brand portal
   - Three ways for everyday life
   - 3D brand cards / glass card stage for the three brands

2. ROTI CAMP Scene
   - Outdoor life
   - Camping / movement / storage
   - Dark outdoor mood, mountain ridge, movement, and camping gear atmosphere

3. ROTI HOMESYS Scene
   - An organized home
   - Storage / movement / daily flow
   - Organized interior, storage structure, warm lighting, and home system mood

4. LEEL Scene
   - Calm kitchen and living
   - Kitchen / material / negative space
   - Steel, stone, kitchen lighting, and restrained living-object mood

5. About ROTI
   - Briefly explain what kind of brand group ROTI is.
   - Keep company introduction short and focused on brand philosophy.

6. ROTI Standard
   - Practicality
   - Ordered design
   - Verifiable quality
   - Do not use unverified claims such as No. 1, best, certified, supplied to, or awarded.

7. ROTI Group + Final CTA
   - Three brands, one standard
   - Move to the brand the user wants
   - ROTI CAMP / ROTI HOMESYS / LEEL CTA

8. Contact / Partnership
   - Can expand to inquiry, partnership, bulk purchase, and distribution inquiries.
   - Do not implement checkout, cart, order, or signup features yet.

### Additional Forbidden Scope

- Do not create a product-listing shopping mall UI.
- Do not implement price, buy, cart, order, or signup flows.
- Do not implement Cafe24 API in this phase.
- Do not create a separate Brand Portfolio section.
- Do not use green as a primary accent color.
- Do not use third-party brand names, logos, delivery claims, or supply claims without explicit approval.
- Do not leave test routes, experiment components, or unused model files in a main merge target.

### Additional Design Criteria

- Base tone: black / charcoal / dark premium
- Accent color: ROTI Ember Red `#B41307`
- User-facing copy should be Korean-first.
- Brand names `ROTI CAMP`, `ROTI HOMESYS`, and `LEEL` may remain in English.
- Motion should use restrained reveal, fade, slide, and depth transitions.
- On mobile, prioritize active content, readability, and stability over heavy 3D effects.

### Required Work Report Items

Every task must report:

1. Changed files
2. Scope violations, if any
3. `pnpm lint` result
4. `pnpm typecheck` result
5. `pnpm build` result
6. Mobile considerations
7. P1 Blockers
8. P2 Issues

Do not run `git commit`, `git push`, or PR merge before user approval.

## Mandatory Read Order Before Any Work
Before planning or editing code, read these files in this order:

1. `Design.md`
2. `handoff/PROJECT_CONTEXT_FOR_AI.md`
3. `handoff/CODEX_SETUP_BRIEF.md`
4. `handoff/AGENT_TEAM_AND_HARNESS_PLAN_V2.md`
5. `handoff/VISUAL_TARGET_SPEC_FROM_REFERENCES.md`
6. `handoff/REFERENCE_MANIFEST.md`
7. `handoff/phase-4-section-enhancement.md`
8. `01_File-Generation-Plan.md`
9. `02_Project-Structure.md`
10. `prompts/00_Global-Rules.md`
11. `harness/DESIGN_COMPLIANCE_GATE.md`
12. `harness/QA_CHECKPOINT_MATRIX.md`
13. `harness/phase-4-section-gates.md`

## Non-Negotiable Design Rules
- The mainpage is a brand portal, not a shop page.
- Hero must use a dark premium black/charcoal tone.
- The main accent is ROTI Ember Red `#B41307`.
- Green must not be used as the main hero accent.
- Hero must contain three brand cards.
- Brand switching must be done by restrained left/right arrow controls, matching the approved visual mockup direction.
- Brand card click/tap must smoothly scroll down to that brand's fullscreen section.
- Clicked cards must rotate in 3D and move to the center.
- After Hero, each brand section must appear as a fullscreen one-brand-per-screen experience.
- ROTI CAMP, ROTI HOMESYS, and LEEL must each have their own section.
- The final part must include ROTI group positioning and three brand CTA routes.
- Any design or interaction change must be checked against `Design.md`.

## Explicitly Forbidden
- Do not use commerce-style carousel controls; restrained Hero arrow controls are allowed for card rotation.
- Do not turn the Hero into a normal product grid.
- Do not add product prices, discounts, reviews, or commerce-heavy elements to the main Hero.
- Do not use green as the primary highlight color.
- Do not change the overall design to a bright white shop style.
- Do not invent product specs, sales numbers, certifications, delivery claims, or partner names.
- Do not implement Cafe24 API, cart, checkout, member, order, or payment functions in the mainpage phase.
- Do not make broad unrelated refactors.
- Do not edit `Design.md` unless the task explicitly requests a design-rule update.

## Technical Direction
- Use Next.js App Router + TypeScript.
- Prefer component/data separation.
- Keep brand data in `src/data/brands.ts`.
- Keep animation logic separated from UI markup as much as practical.
- CSS 3D transform is preferred for Hero card depth.
- GSAP/ScrollTrigger may be used for scroll/pin behavior if the project accepts the dependency.
- If a new dependency is added, explain why it is necessary.

## Required Completion Checks
Before marking a task complete, run the available checks. If the project has not yet defined these scripts, create or document them during the foundation phase.

Preferred checks:
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`

Recommended after Playwright setup:
- `pnpm test`
- `pnpm test:e2e`

## Required Response Format
Every task response must include:

1. Summary
2. Changed Files
3. Implementation Notes
4. Tests / Checks Run
5. Design.md Compliance Check
6. Risks / Follow-ups

## Design.md Compliance Check Format
Use this exact checklist:

- [ ] Brand portal, not shop
- [ ] Dark premium tone maintained
- [ ] Red accent used with restraint
- [ ] No green primary hero accent
- [ ] Restrained arrow card-rotation controls preserved
- [ ] Card-click-to-brand-section scroll preserved
- [ ] One-brand-per-screen scroll structure preserved
- [ ] ROTI CAMP / HOMESYS / LEEL all represented
- [ ] No unverified marketing claims added
- [ ] Mobile/accessibility/performance risks noted

## Work Mode
Work in small phases. Do not attempt to implement the whole page in one large change.

Recommended order:
1. Harness and repo audit
2. Foundation
3. Static Header/Hero
4. 3D card interaction
5. Fullscreen brand scroll sections
6. ROTI group / final CTA
7. Responsive, accessibility, performance, QA
8. Future commerce extension planning only
