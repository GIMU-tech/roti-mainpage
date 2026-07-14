# ABOUT ROTI Scroll Prototype - Design QA

- Source visual truth: `references/roti_about_final_sourced_copy.html`
- Implementation: `public/prototypes/about-roti-scroll/index.html`
- Source capture: `qa-source.png`
- Desktop implementation capture: `qa-prototype-desktop.png`
- Mobile implementation capture: `qa-prototype-mobile.png`
- Combined comparison: `qa-comparison.png`
- Desktop viewport: 1280 x 720
- Mobile viewport: 390 x 844
- Compared state: 01 / 04 group statement

## Full-view comparison evidence

The prototype preserves the source's dark premium field, framed central statement, restrained progress segments, blur/fade transition language, and four-part narrative. The full-screen expansion and brand imagery are intentional additions requested for the production ABOUT section rather than fidelity drift. The former top metadata, right-side brand rail, bottom note, and vertical scroll label are intentionally removed per the latest layout direction.

## Focused region comparison evidence

A separate focused crop was not required because the main typography, frame lines, reduced brand marks, and right-aligned status lines are clearly readable in the 1280 x 720 full-view comparison.

## Findings

- No actionable P0, P1, or P2 findings.
- P3: The source uses four short corner brackets while the prototype uses long top and bottom rules. The current treatment fits the full-screen grid, but the corner treatment can be reconsidered during production application.

## Required fidelity surfaces

- Fonts and typography: Korean display hierarchy, optical weight, line height, and letter spacing remain readable at desktop and mobile sizes. No clipping was found.
- Spacing and layout rhythm: The 460px source card was intentionally expanded into a 100svh, 12-column desktop stage and a single-column mobile stage. Main content remains within the viewport.
- Colors and visual tokens: Black/charcoal base and restrained red accent are maintained. The prototype uses ROTI Ember Red for the primary accent.
- Image quality and asset fidelity: Existing ROTI CAMP, ROTI HOMESYS, and LeEL section assets and official logo files are used without placeholders.
- Copy and content: Unverified price, audience, founding-year, and CS claims from the source were not carried into the prototype.
- Frame controls: The central frame has increased vertical breathing room, the former top metadata and right brand list are removed, and the four original status lines are rotated vertically and joined end-to-end inside the frame on the right. The active red segment is 2px thick, and the control keeps clear space from the frame's top and bottom rules.
- Brand marks: The three brand logos are reduced to approximately 60% of their previous prototype size.

## Primary interactions tested

- Native scroll snap enters ABOUT at 01 / 04.
- Each subsequent scroll advances to 02, 03, and 04 with matching copy and image.
- Rollover preview behavior and transparent image hit areas are removed; scene changes are driven by native mouse-wheel/page scrolling.
- Status-line controls remain functional and share the same scene/scroll state.
- At 1280 x 720, the measured story-text left inset and status-line right inset both equal 22px. At 390 x 844, both equal 4px with no text overlap.
- Desktop and 390 x 844 mobile layouts have no horizontal overflow.
- No browser console errors were reported.

## Comparison history

- Pass 1: No P0/P1/P2 differences requiring correction. The prototype intentionally adapts the small source card into the requested full-screen, image-led scroll experience.

final result: passed
