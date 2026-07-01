# 17_Phase-2-Hero-Static-Implementation.md

## Prompt

`Design.md`, `handoff/VISUAL_TARGET_SPEC_FROM_REFERENCES.md`, `handoff/REFERENCE_MANIFEST.md`, `harness/DESIGN_COMPLIANCE_GATE.md`를 먼저 읽고 시작하라.

이번 단계는 Header와 Hero의 정적 시각 완성 단계다.  
아직 복잡한 카드 클릭 회전 로직은 구현하지 않아도 되지만, 화면만 봐도 `04_dark_red_hero_concept_v2_preferred_top_nav.png` 방향에 가까워야 한다.

### 목표
- 상단 fixed Header 구현
- dark premium Hero 구현
- 3개 브랜드 카드 정적 배치
- 중앙 카드와 좌우 카드의 depth 위계 구현
- 좌우 화살표 없이 카드 클릭 기반 구조의 준비 상태 구현

### 필수 구현
1. Header
   - 좌측 ROTI 로고
   - 우측 BRAND / NEWS / CAREERS / CONTACT / menu icon
   - fixed top
2. Hero Copy
   - Title: `일상을 위한 세 가지 방식`
   - Subtitle: `이동, 정리, 휴식을 위한 서로 다른 해석`
3. Brand Cards
   - ROTI CAMP
   - ROTI HOMESYS
   - LEEL
   - 중앙 카드가 가장 선명
   - 좌우 카드가 어둡고 뒤로 물러난 상태
   - glass/acrylic border
   - subtle red accent line/glow
4. Side / Footer Micro UI
   - 작은 portal label 또는 index
   - scroll indicator

### 금지
- 좌우 화살표 금지
- 상품 가격/리뷰/할인 금지
- 녹색 hero accent 금지
- 밝은 화이트 쇼핑몰 톤 금지

### 검수
- `harness/QA_CHECKPOINT_MATRIX.md`의 Gate 2 기준 확인
- 가능하면 모바일 390px 기준으로도 화면 확인

### 출력 형식
AGENTS.md의 Required Response Format을 따른다.
