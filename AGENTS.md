# ROTI Mainpage Codex Agent Rules

## Project Mission
Build the ROTI integrated brand portal mainpage.

ROTI must look like a professional brand group that operates:
- ROTI CAMP
- ROTI HOMESYS
- LEEL

This is not a product-listing shopping mall homepage.

## Mandatory Read Order Before Any Work
Before planning or editing code, read these files in this order:

1. `Design.md`
2. `handoff/PROJECT_CONTEXT_FOR_AI.md`
3. `handoff/CODEX_SETUP_BRIEF.md`
4. `handoff/AGENT_TEAM_AND_HARNESS_PLAN_V2.md`
5. `handoff/VISUAL_TARGET_SPEC_FROM_REFERENCES.md`
6. `handoff/REFERENCE_MANIFEST.md`
7. `01_File-Generation-Plan.md`
8. `02_Project-Structure.md`
9. `prompts/00_Global-Rules.md`
10. `harness/DESIGN_COMPLIANCE_GATE.md`
11. `harness/QA_CHECKPOINT_MATRIX.md`

## Non-Negotiable Design Rules
- The mainpage is a brand portal, not a shop page.
- Hero must use a dark premium black/charcoal tone.
- The main accent is ROTI Ember Red `#B41307`.
- Green must not be used as the main hero accent.
- Hero must contain three brand cards.
- Brand switching must be done by clicking cards, not by left/right arrows.
- Clicked cards must rotate in 3D and move to the center.
- After Hero, each brand section must appear as a fullscreen one-brand-per-screen experience.
- ROTI CAMP, ROTI HOMESYS, and LEEL must each have their own section.
- The final part must include ROTI group positioning and three brand CTA routes.
- Any design or interaction change must be checked against `Design.md`.

## Explicitly Forbidden
- Do not add arrow carousel controls.
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
- [ ] No arrow carousel controls
- [ ] Click-to-rotate card structure preserved
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
