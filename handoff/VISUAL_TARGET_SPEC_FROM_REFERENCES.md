# VISUAL_TARGET_SPEC_FROM_REFERENCES.md

## 목적
Codex가 이미지 레퍼런스를 제대로 해석하지 못하거나, 텍스트 기준 없이 구현이 흔들리는 것을 방지하기 위해 참조 이미지를 텍스트 명세로 변환한 문서다.

## 참조 우선순위
1. `references/04_dark_red_hero_concept_v2_preferred_top_nav.png`
2. `references/02_roti_brand_colors.png`
3. `references/01_reference_style_portal.png`
4. `references/03_dark_red_hero_concept_v1.png`

## 핵심 시각 목표

### 전체 분위기
- 어두운 블랙/차콜 배경
- 바닥에 희미한 반사광과 안개/스모크 느낌
- 브랜드 카드가 무대 중앙에 떠 있는 듯한 3D depth
- 과한 네온이 아니라 낮고 절제된 레드 glow
- 고급스럽고 조용한 포털 느낌

### Header
- 좌측 상단: ROTI 로고
- 우측 상단: BRAND / NEWS / CAREERS / CONTACT / menu icon
- 헤더는 Hero 위에 고정 배치
- 우측 하단 메뉴 텍스트는 사용하지 않는다.

### Hero Text
- 상단 중앙 타이틀:
  - `일상을 위한 세 가지 방식`
- 서브 문구:
  - `이동, 정리, 휴식을 위한 서로 다른 해석`
- 텍스트는 과도하게 크거나 광고 배너처럼 보이면 안 된다.
- 타이틀은 충분히 여백을 두고 브랜드 카드 위에 위치한다.

### Brand Cards
- 총 3개:
  - Left: ROTI CAMP
  - Center: ROTI HOMESYS
  - Right: LEEL
- 중앙 카드가 가장 크고 선명하다.
- 좌우 카드는 약간 뒤로 물러나고 어둡게 보인다.
- 카드는 얇은 glass/acrylic border와 subtle highlight를 가진다.
- 각 카드 하단에는 아주 얇은 red accent line 또는 glow가 들어간다.
- 선택된 카드에는 하단 red light가 더 명확하게 보인다.

### Hero Layout Approximation
- 전체 Hero는 최소 100vh.
- 카드 그룹은 화면 중앙보다 약간 아래에 위치한다.
- 카드 높이는 데스크톱 기준 Hero 높이의 약 45~60% 범위.
- 중앙 카드 너비는 좌우 카드보다 약 1.1~1.25배 크다.
- 좌우 카드는 rotateY와 translateZ/scale로 깊이를 만든다.
- 카드 간격은 넓지만 서로 하나의 turntable처럼 연결되어야 한다.

### Side Information
- 좌측에는 현재 브랜드 index나 portal label을 작게 배치할 수 있다.
- 하단에는 아주 절제된 스크롤 인디케이터를 둘 수 있다.
- 좌우 이동 화살표는 기존 시안 이미지처럼 절제된 원형 컨트롤로 배치한다.
- 화살표는 Hero 카드 회전만 담당하고, 카드 클릭은 해당 브랜드 섹션으로 이동한다.

### Scroll Sections
Hero 이후:
1. ROTI CAMP fullscreen section
2. ROTI HOMESYS fullscreen section
3. LEEL fullscreen section
4. ROTI Group section
5. Final CTA

각 브랜드 섹션은 100vh에 가깝게 구성하고, 한 섹션에서 하나의 브랜드만 보여준다.

### 색상 규칙
- Primary background: near black
- Surface: charcoal / glass
- Primary accent: `#B41307`
- Red glow는 강하지 않게 사용한다.
- Lime green은 Hero 포인트 컬러로 사용하지 않는다.

## 금지되는 시각 결과
- 밝은 흰색 쇼핑몰 메인처럼 보이는 결과
- 상품 카드/가격/리뷰 중심 결과
- 상품 슬라이더처럼 보이는 일반 캐러셀 화살표
- 초록색 포인트가 중심이 되는 결과
- 브랜드 카드가 평면 배너처럼 보이는 결과
- 세 브랜드 섹션이 일반 카드 리스트처럼 한 화면에 나열되는 결과
