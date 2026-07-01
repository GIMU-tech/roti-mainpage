# 19_Phase-4-Scroll-Brand-Sections.md

## Prompt

`Design.md`, `prompts/04_Scroll-Brand-Sections.md`, `harness/QA_CHECKPOINT_MATRIX.md`, `harness/DESIGN_COMPLIANCE_GATE.md`를 먼저 읽고 시작하라.

이번 단계는 Hero 이후의 브랜드 풀스크린 스크롤 경험 구현이다.

### 목표
- Hero 이후 한 화면당 하나의 브랜드가 나타나는 구조
- ROTI CAMP / ROTI HOMESYS / LEEL 각각의 section 구현
- 공통 레이아웃 시스템 유지
- 브랜드별 무드 차이 표현
- CTA 포함

### 필수 구현
1. `BrandFullscreenSection` 데이터 기반 렌더링
2. 섹션 순서
   - ROTI CAMP
   - ROTI HOMESYS
   - LEEL
3. 각 섹션 필수 요소
   - 브랜드명
   - 헤드라인
   - 짧은 설명
   - CTA
   - 브랜드별 배경/무드
4. scroll snap 또는 pin/trigger 구조
5. reduced-motion 환경에서는 자연스러운 기본 스크롤로 fallback
6. 모바일에서 100vh 이슈 대응

### 금지
- 상품 리스트 삽입 금지
- 섹션별 레이아웃을 제각각으로 만들기 금지
- 설명문 과밀 금지
- green primary accent 금지

### 검수
- `harness/QA_CHECKPOINT_MATRIX.md` Gate 4 기준 확인

### 출력 형식
AGENTS.md의 Required Response Format을 따른다.
