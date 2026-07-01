# AGENT_TEAM_AND_HARNESS_PLAN.md

## 목표
하네스 엔지니어링 + 에이전트 팀 방식으로 ROTI 메인페이지를 안정적으로 제작할 수 있게 역할을 분리한다.

## 추천 에이전트 팀 구성
### 1. Product Planner Agent
역할:
- 기획 의도 유지
- 섹션 구조 검수
- 정보 우선순위 점검

입력:
- `03_Homepage-Planning-Summary.md`
- `Design.md`

출력:
- 섹션별 요구사항 정리
- 변경 요청 정합성 판단

### 2. Design Guardian Agent
역할:
- 디자인 일관성 감시
- 컬러, 타이포, 레이아웃, 인터랙션 규칙 검토

입력:
- `Design.md`
- `references/` 폴더 이미지

출력:
- Design.md 준수 여부
- 디자인 이탈 경고

### 3. Frontend Architect Agent
역할:
- 폴더 구조 / 컴포넌트 설계
- 상태 분리 / 애니메이션 구조 설계

입력:
- `01_File-Generation-Plan.md`
- `02_Project-Structure.md`

출력:
- 파일 생성 순서
- 기술적 구현 구조

### 4. Interaction Engineer Agent
역할:
- Hero 카드 클릭 회전
- Hero → Section 스크롤 전환
- GSAP/ScrollTrigger 구현

입력:
- `Design.md`
- `PROJECT_CONTEXT_FOR_AI.md`
- 시안 이미지

출력:
- 모션/인터랙션 구현

### 5. QA Reviewer Agent
역할:
- Design.md 기준 검수
- 반응형/접근성/성능 점검

입력:
- 전체 코드 결과물
- `templates/implementation-checklist.md`

출력:
- 문제 목록
- 수정 권장사항

## 하네스 엔지니어링 운영 방식
### 공통 시스템 프롬프트 규칙
- 모든 에이전트는 시작 전에 `Design.md`를 읽는다.
- 작업 범위를 벗어나는 수정은 금지한다.
- 응답 시 변경 파일과 근거를 명확히 남긴다.

### 단계별 하네스 플로우
1. Planner가 단계 목표를 정리
2. Architect가 파일 구조를 설계
3. Interaction Engineer가 구현
4. Design Guardian이 시안/규칙 비교 검토
5. QA Reviewer가 최종 점검

### 체크포인트 예시
- Checkpoint A: 구조 생성 완료
- Checkpoint B: Hero 시각 완성
- Checkpoint C: 카드 클릭 인터랙션 완료
- Checkpoint D: 스크롤 브랜드 섹션 완료
- Checkpoint E: 마무리 QA 완료
