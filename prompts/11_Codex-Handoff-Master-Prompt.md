# 11_Codex-Handoff-Master-Prompt.md

## Prompt

당신은 인터랙티브 프론트엔드 구현 전문가, UI/UX 디자이너, 그리고 코드 아키텍트다.
이번 작업은 **ROTI 브랜드 포털 메인페이지**를 구현하는 것이다.

작업 전 반드시 아래 자료를 모두 읽고 이해하라.
- `Design.md`
- `03_Homepage-Planning-Summary.md`
- `01_File-Generation-Plan.md`
- `02_Project-Structure.md`
- `handoff/PROJECT_CONTEXT_FOR_AI.md`
- `handoff/REFERENCE_MANIFEST.md`
- `references/` 폴더의 이미지들
- `prompts/00_Global-Rules.md`

## 구현 목표
- ROTI를 3개 브랜드를 운영하는 전문 그룹처럼 보이게 한다.
- 첫 화면은 3장의 브랜드 카드로 구성된 dark premium hero다.
- 화살표 전환은 사용하지 않는다.
- 브랜드 카드를 클릭하면 해당 카드가 3D로 회전하며 중앙으로 온다.
- 아래로 스크롤하면 브랜드 섹션이 한 화면당 하나씩 풀스크린으로 등장한다.
- 마지막에는 ROTI 그룹 소개와 브랜드 바로가기 CTA가 이어진다.

## 브랜드
- ROTI CAMP
- ROTI HOMESYS
- LEEL

## 컬러 원칙
- 메인 포인트 컬러는 `#B41307` 레드
- 블랙/차콜 기반
- 그린은 메인 히어로 포인트로 사용하지 않는다

## 작업 방식
이번 작업은 한 번에 끝내려 하지 말고 단계적으로 진행하라.
1. 구조 생성
2. Hero 정적 완성
3. 카드 클릭 인터랙션
4. 스크롤 브랜드 섹션
5. ROTI Group / Final CTA
6. 반응형 / 접근성 / 성능 / QA

## 응답 규칙
매 단계마다 아래를 반드시 출력하라.
1. Summary
2. Changed Files
3. Implementation Notes
4. Remaining Tasks
5. Design.md Compliance Check
