# 18_Phase-3-3D-Interaction.md

## Prompt

`Design.md`, `prompts/03_3D-Card-Interaction.md`, `harness/DESIGN_COMPLIANCE_GATE.md`, `harness/QA_CHECKPOINT_MATRIX.md`를 먼저 읽고 시작하라.

이번 단계는 Hero의 핵심인 카드 클릭 3D 전환 구현이다.

### 목표
- 카드 클릭으로 active brand 변경
- 클릭한 카드가 3D 회전하며 중앙으로 이동
- 중앙/좌우 카드의 depth와 위계가 명확하게 보임
- 키보드/터치/reduced-motion 대응

### 필수 구현
1. `useBrandCarousel` 또는 이에 준하는 상태 로직
2. active brand state
3. 카드 클릭 handler
4. active/inactive visual state
   - active: scale up, opacity 1, stronger clarity, subtle red glow
   - inactive: scale down, opacity lower, rotateY/translateZ depth
5. hover tilt
6. focus-visible 스타일
7. prefers-reduced-motion 대응
8. 현재 브랜드 index/copy 동기화

### 금지
- 화살표 UI 금지
- 외부 캐러셀 라이브러리로 대체 금지
- 단순 translateX 슬라이드만으로 끝내기 금지
- 과한 bounce/shake 금지

### 검수
- `harness/QA_CHECKPOINT_MATRIX.md` Gate 3 기준 확인
- `harness/DESIGN_COMPLIANCE_GATE.md` P1 blockers 없는지 확인

### 출력 형식
AGENTS.md의 Required Response Format을 따른다.
