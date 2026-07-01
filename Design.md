# Design.md

## 1. Project Identity

### Project Name
ROTI Brand Portal Mainpage

### Core Positioning
ROTI는 단일 쇼핑몰이 아니라 **생활, 이동, 정리, 휴식을 다루는 3개 브랜드를 운영하는 전문 그룹**처럼 보여야 한다.

### Connected Brands
- ROTI CAMP
- ROTI HOMESYS
- LEEL

### Primary User Goal
사용자는 메인페이지에서 다음을 빠르게 이해해야 한다.
1. ROTI는 3개 브랜드를 운영한다.
2. 각 브랜드는 서로 다른 생활 장면을 담당한다.
3. 원하는 브랜드로 자연스럽게 이동할 수 있다.

---

## 2. Experience Principles

1. **Portal, not shop**
   - 메인페이지는 상품 나열형 쇼핑몰이 아니라 브랜드 포털이어야 한다.
2. **Premium but restrained**
   - 고급스럽되 과장되지 않아야 한다.
3. **Motion with meaning**
   - 모든 모션은 탐색/전환/위계 표현에 기여해야 한다.
4. **One-screen focus**
   - 한 번에 하나의 브랜드 경험에 집중되도록 한다.
5. **Consistency first**
   - 디자인 변경 시 기존 시각 문법을 유지한다.

---

## 3. Visual Direction

### Overall Tone
- Dark premium
- Minimal interface
- Soft cinematic lighting
- Glass / acrylic panel feel
- Subtle 3D depth

### Mood Keywords
- professional
- curated
- controlled
- elegant
- immersive
- modern

### Avoid
- 과한 네온 감성
- 게임 UI 같은 연출
- 과도한 파티클/이펙트
- 쇼핑몰식 가격/할인/리뷰 노출
- 카드뉴스형 과밀 텍스트
- 색상 남용

---

## 4. Color System

### Core Brand Colors
- Ember Red: `#B41307`
- Muted Black: `#272727`
- Soft Gray: `#D8D8D8`
- Lime Green: `#82D275`

### Usage Rule
- 이 메인페이지의 **주 포인트 컬러는 레드**다.
- 그린은 현재 메인 히어로에서 사용하지 않는다. 필요 시 보조/대체 개념으로만 제한 사용.

### UI Tokens (recommended)
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

### Color Ratio
- 80% dark neutrals
- 15% whites / grays
- 5% accent red

---

## 5. Typography

### Recommended Fonts
- Korean: Pretendard or SUIT
- English/UI: Inter

### Typographic Tone
- Bold, clean, geometric sans feeling
- 넓은 여백과 큰 타이틀 사용
- 본문은 짧고 밀도 낮게 유지

### Type Scale (guide)
- Hero Title: 56~72px desktop
- Hero Subtitle: 22~28px desktop
- Card Title: 24~38px
- Section Title: 48~64px
- Body: 16~20px
- Nav: 14~16px

### Text Rules
- 문장은 짧고 명확하게
- 마케팅 과장 금지
- 검증되지 않은 수치/표현 금지
- 한 섹션에 텍스트를 과도하게 넣지 않는다

---

## 6. Layout Principles

### Global Layout
- Full viewport sections 중심
- 큰 여백
- 명확한 시선 흐름
- 헤더는 고정
- 스크롤당 한 주요 포인트만 전달

### Header
- Left: ROTI logo
- Right: BRAND / NEWS / CAREERS / CONTACT / menu icon
- 항상 상단 고정
- 초기 hero와 브랜드 섹션 모두에서 가독성 유지

### Hero
- 3장의 브랜드 카드가 중앙 무대처럼 배치
- 중앙 카드가 가장 크고 선명
- 좌우 카드는 뒤로 물러나며 어두움
- 좌우 화살표는 사용하지 않는다
- 카드 클릭으로 브랜드 선택

### Brand Fullscreen Sections
- 한 섹션 = 한 브랜드
- 카드가 확대되어 섹션이 된 것처럼 연결감 유지
- 각 브랜드는 각자의 분위기와 CTA를 갖되, 레이아웃 시스템은 동일하게 유지

---

## 7. Interaction Rules

### Hero Card Switching
필수:
- 화살표 전환 금지
- 브랜드 카드 클릭으로 전환
- 단순 슬라이드가 아니라 **회전하며 중앙에 오는 방식**
- 3D turntable / carousel 느낌 유지

### Scroll Behavior
- Hero 이후에는 스크롤로 브랜드 풀스크린 섹션 전환
- 한 번의 스크롤 이동당 한 브랜드가 확실히 나타나야 함
- 가능하면 snap / pin 기반 구조

### Motion Language
- smooth
- premium
- slightly slow-in, smooth-out
- no aggressive bounce
- no gimmicky shake

### Micro Interactions
- hover 시 미세한 tilt
- 선택된 카드 하단 red light
- 텍스트 reveal
- 배경 parallax는 매우 약하게만 사용

---

## 8. Brand-Specific Direction

### ROTI CAMP
- 키워드: outdoor, movement, nature, rest
- 비주얼: 어두운 자연, 산, 캠프 무드
- 느낌: 감성보다 구조적이고 단정한 아웃도어

### ROTI HOMESYS
- 키워드: organize, move, utility, efficiency
- 비주얼: 모던한 실내, 수납, 이동, 생활 편의
- 느낌: 세 브랜드 중 가장 중심 허브 느낌

### LEEL
- 키워드: kitchen, clean, density, calm
- 비주얼: 다크 프리미엄 주방 / 리빙
- 느낌: 고요하고 단정하며 프리미엄

---

## 9. Component Rules

### Brand Card
포함 요소:
- background image
- dark overlay
- card title
- short description
- subtle red accent line
- glass-like border/highlight
- bottom glow when selected

### CTA Button
- 단순하고 얇은 선 기반
- red accent는 hover / active에 제한 사용
- 지나치게 두껍거나 쇼핑몰 배너 같은 버튼 금지

### Section Copy
- H1/H2 + 짧은 설명 + CTA 구조 유지
- 불필요한 설명문 추가 금지

---

## 10. Accessibility & Performance

### Accessibility
- 충분한 명도 대비 유지
- 키보드 탐색 가능
- 스크린리더용 레이블 보조
- motion-reduced 환경 대응

### Performance
- 첫 화면 3D 효과는 CSS 3D 우선
- 과도한 WebGL 사용 지양
- 이미지 lazy loading
- 큰 배경 이미지는 적절히 최적화

---

## 11. Do / Don't

### Do
- 카드 클릭 기반 탐색 유지
- 브랜드별 개성은 주되 공통 레이아웃 유지
- 레드 포인트를 절제해서 사용
- 스크롤 전환의 연결감을 강조
- 변경 시 항상 Design.md 기준 비교

### Don’t
- 화살표 중심 캐러셀로 회귀하지 말 것
- 갑자기 밝은 컬러 테마로 전환하지 말 것
- 메인에 상품 가격/리뷰/할인을 넣지 말 것
- 브랜드별 레이아웃 시스템을 제각각으로 만들지 말 것
- 불필요한 글래스모피즘 남용 금지

---

## 12. Change Management Rule

디자인 또는 인터랙션 변경 시 반드시 아래를 지킨다.

1. 먼저 `Design.md`를 읽는다.
2. 변경 목적을 한 줄로 정의한다.
3. 이번 변경이 아래 5가지에 어긋나는지 점검한다.
   - 브랜드 포털 정체성
   - dark premium 톤
   - click-to-rotate 카드 구조
   - scroll one-brand-per-screen 구조
   - red accent restraint
4. 변경 후 체크리스트를 작성한다.

### Required Change Checklist
- [ ] 변경이 브랜드 포털 컨셉을 유지하는가?
- [ ] 상단 헤더 구조를 해치지 않는가?
- [ ] 카드 클릭 회전 규칙이 유지되는가?
- [ ] 섹션 전환이 한 화면 한 브랜드 원칙을 지키는가?
- [ ] 색상 사용이 레드 중심으로 일관적인가?
- [ ] 과도한 텍스트/장식이 추가되지 않았는가?
- [ ] 성능 및 접근성에 큰 문제를 만들지 않는가?

---

## 13. Definition of Done

아래 조건을 만족하면 메인페이지 1차 완성으로 본다.
- 첫 화면에 3개의 브랜드 카드가 고급스럽게 배치된다.
- 화살표 없이 카드 클릭으로 브랜드 전환이 된다.
- 스크롤 시 브랜드 풀스크린 섹션이 1개씩 자연스럽게 등장한다.
- 각 브랜드에 명확한 CTA가 있다.
- 상단 헤더/브랜드 구조/컬러/모션이 일관적이다.
- 변경 시 항상 Design.md 기준으로 유지/검토할 수 있다.
