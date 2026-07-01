# ROTI Mainpage Build Kit

이 패키지는 **ROTI 브랜드 포털 메인페이지**를 순서대로 제작하기 위한 문서 세트입니다.

목표:
- ROTI를 단순 쇼핑몰이 아니라 **3개 브랜드를 운영하는 전문 그룹**처럼 보이게 만들기
- 첫 화면은 **3D 브랜드 카드 포털**
- 브랜드 전환은 **화살표가 아니라 카드 클릭**
- 스크롤 시 **한 화면당 한 브랜드**가 풀스크린으로 전개
- 디자인 변경 시 반드시 `Design.md`를 기준으로 일관성 유지

## 권장 기술 스택
- Next.js (App Router)
- TypeScript
- GSAP + ScrollTrigger
- CSS Modules 또는 Tailwind 중 하나
- 선택: Framer Motion (보조 모션), Lenis (부드러운 스크롤)

## 이 ZIP 안의 파일 구성
- `Design.md` : 디자인 시스템 / 변경 기준 / 금지사항
- `00_Roadmap.md` : 제작 순서와 단계별 목표
- `01_File-Generation-Plan.md` : 어떤 파일을 어떤 순서로 만들지 상세 계획
- `02_Project-Structure.md` : 권장 디렉터리/컴포넌트 구조
- `prompts/` : 순서대로 복붙해 사용할 수 있는 제작 프롬프트
- `templates/` : 디자인 변경 요청 및 점검용 템플릿

## 사용 순서
1. `Design.md`를 먼저 읽고 기준 확정
2. `00_Roadmap.md`로 전체 흐름 확인
3. `01_File-Generation-Plan.md`와 `02_Project-Structure.md`로 생성 파일 구조 확정
4. `prompts/01_...md`부터 순서대로 실행
5. 변경 작업 시 `prompts/10_Change-Request-Template.md` 사용
6. 모든 변경 전후에 `Design.md` 체크리스트 확인

## 인코딩
- 모든 파일은 UTF-8 마크다운 기준으로 작성
- 파일명은 영문으로 구성하여 Windows/ZIP 환경 호환성을 고려

## 권장 응답 방식 (코드 에이전트용)
매 단계마다 아래를 함께 반환하게 하세요.
- 변경한 파일 목록
- 핵심 구현 요약
- 아직 남은 작업
- 주의할 리스크
- `Design.md` 기준으로 어긋나는 부분이 없는지 점검 결과


## 추가된 AI 핸드오프 자료
- `03_Homepage-Planning-Summary.md` : 홈페이지 기획 요약
- `handoff/PROJECT_CONTEXT_FOR_AI.md` : AI가 바로 이해할 수 있는 프로젝트 컨텍스트
- `handoff/CODEX_SETUP_BRIEF.md` : Codex에 넘길 때의 전달 가이드
- `handoff/AGENT_TEAM_AND_HARNESS_PLAN.md` : 에이전트 팀 / 하네스 엔지니어링 초안
- `handoff/REFERENCE_MANIFEST.md` : 참조 이미지 설명
- `references/` : 시안 이미지 및 컬러 레퍼런스
- `prompts/11_Codex-Handoff-Master-Prompt.md` : Codex 초기 스타트용 프롬프트
- `prompts/12_Agent-Team-Setup-Prompt.md` : 에이전트 팀 설계용 프롬프트
- `prompts/13_Use-This-ZIP-First.md` : ZIP을 먼저 읽고 계획 세우게 하는 프롬프트


## V2 하네스 보강 자료

Codex를 에이전트 팀 + 하네스 엔지니어링 방식으로 운영하기 위해 아래 파일이 추가되었습니다.

- `AGENTS.md` : Codex가 반드시 따라야 할 루트 작업 규칙
- `handoff/AGENT_TEAM_AND_HARNESS_PLAN_V2.md` : 역할별 에이전트 구조
- `handoff/VISUAL_TARGET_SPEC_FROM_REFERENCES.md` : 참조 이미지를 텍스트로 해석한 시각 목표
- `harness/CODEX_RUNBOOK.md` : Codex 실행 순서
- `harness/DESIGN_COMPLIANCE_GATE.md` : Design.md 준수 게이트
- `harness/QA_CHECKPOINT_MATRIX.md` : 단계별 검수표
- `harness/FUTURE_COMMERCE_EXTENSION_PLAN.md` : 이후 카페24 쇼핑몰 연결 계획
- `prompts/14_...` ~ `prompts/20_...` : Codex 단계별 실행 프롬프트

첫 작업은 `prompts/15_Phase-0-Repo-Audit-and-Harness-Setup.md`부터 시작하세요.
