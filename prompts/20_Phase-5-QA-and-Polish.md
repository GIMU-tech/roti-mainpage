# 20_Phase-5-QA-and-Polish.md

## Prompt

`Design.md`, `harness/DESIGN_COMPLIANCE_GATE.md`, `harness/QA_CHECKPOINT_MATRIX.md`, `templates/qa-checkpoint-report.md`를 먼저 읽고 시작하라.

이번 단계는 기능 추가가 아니라 최종 QA와 polish 단계다.

### 목표
- 전체 페이지가 ROTI 브랜드 포털처럼 느껴지도록 정리
- 모바일/태블릿/데스크톱 반응형 점검
- 접근성/성능/빌드 문제 해결
- Design.md 이탈 요소 제거

### 필수 점검
1. Hero
   - dark premium인지
   - 3개 카드인지
   - 화살표 없는지
   - 클릭 회전이 작동하는지
2. Scroll sections
   - 한 화면 한 브랜드 구조인지
   - 3개 브랜드가 모두 있는지
   - CTA가 있는지
3. Closing
   - ROTI Group 소개가 있는지
   - Final CTA가 자연스러운지
4. Responsive
   - 390x844
   - 768x1024
   - 1440x900
5. Accessibility
   - keyboard focus
   - aria/semantic
   - contrast
   - reduced-motion
6. Performance
   - heavy images
   - unnecessary re-render
   - motion jank

### 검수 명령
가능한 경우:
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- `pnpm test`
- `pnpm test:e2e`

### 출력 형식
`templates/qa-checkpoint-report.md` 형식을 사용하라.
