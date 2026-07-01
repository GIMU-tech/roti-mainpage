# AGENT_TEAM_AND_HARNESS_PLAN_V2.md

## 1. 운영 전제

이 프로젝트에서 말하는 “에이전트 팀”은 실제로 한 번에 여러 AI가 자동으로 협업한다는 뜻이 아니라, Codex 작업을 역할별로 나누어 각각 별도 작업/PR/리뷰 단위로 운영한다는 뜻이다.

현재 목표는 ROTI 통합 홈페이지 메인페이지다.  
카페24 쇼핑몰 연동은 이후 확장 단계로 분리한다.

---

## 2. 필요한 에이전트 팀 구성

### A. Project Director Agent

#### 책임
- 전체 범위 통제
- ZIP 자료 읽기 순서 준수 확인
- “회사 통합 브랜드 포털” 목표 유지
- 쇼핑몰/결제/API 구현이 현재 범위에 들어오지 않도록 차단
- 단계별 작업 카드 생성

#### 입력 자료
- `Design.md`
- `handoff/PROJECT_CONTEXT_FOR_AI.md`
- `handoff/CODEX_SETUP_BRIEF.md`
- `00_Roadmap.md`
- `harness/CODEX_RUNBOOK.md`

#### 출력 형식
```md
## Project Direction Check
- 현재 단계:
- 이번 작업 범위:
- 제외할 범위:
- 완료 기준:
- 다음 작업:
```

---

### B. Design Guardian Agent

#### 책임
- `Design.md` 준수 여부 검수
- 참조 이미지와 구현 결과 간 방향성 비교
- 색상, 타이포, 카드 구조, 헤더 위치, 레드 포인트 사용량 점검
- 녹색 포인트/화살표/쇼핑몰형 제품 나열 등 디자인 이탈 차단

#### 입력 자료
- `Design.md`
- `handoff/VISUAL_TARGET_SPEC_FROM_REFERENCES.md`
- `handoff/REFERENCE_MANIFEST.md`
- `references/` 이미지

#### 출력 형식
```md
## Design Compliance Review
- 통과 항목:
- 이탈 항목:
- 수정 필요 파일:
- 우선순위 P1/P2/P3:
- Design.md 근거:
```

---

### C. Frontend Architect Agent

#### 책임
- Next.js App Router 구조 설계
- 컴포넌트 책임 분리
- 데이터/상태/애니메이션 로직 분리
- 향후 카페24 연동 가능성을 해치지 않는 구조 설계

#### 입력 자료
- `01_File-Generation-Plan.md`
- `02_Project-Structure.md`
- `harness/FUTURE_COMMERCE_EXTENSION_PLAN.md`

#### 출력 형식
```md
## Architecture Plan
- 생성/수정할 파일:
- 컴포넌트 책임:
- 데이터 구조:
- 상태 관리:
- 향후 확장 포인트:
```

---

### D. Frontend Implementation Agent

#### 책임
- 실제 UI 컴포넌트 구현
- Header, Hero, BrandCard, BrandCarousel, BrandFullscreenSection, RotiGroupSection, FinalCTA 구현
- 모바일 우선 반응형 대응
- 브랜드 데이터를 JSX에 흩뿌리지 않고 `src/data/brands.ts`에서 관리

#### 입력 자료
- `Design.md`
- `01_File-Generation-Plan.md`
- `02_Project-Structure.md`
- `prompts/01_...` ~ `prompts/09_...`

#### 출력 형식
```md
## Implementation Report
- Summary:
- Changed Files:
- Tests / Checks:
- Design.md Compliance:
- Known Issues:
```

---

### E. Interaction Engineer Agent

#### 책임
- Hero 카드 클릭 3D 회전
- 선택 카드 중앙 이동
- hover tilt
- 브랜드 index 상태 갱신
- Hero 이후 fullscreen brand section 전환
- reduced-motion 대응
- 과한 모션 제거

#### 입력 자료
- `Design.md`
- `prompts/03_3D-Card-Interaction.md`
- `prompts/04_Scroll-Brand-Sections.md`
- `handoff/VISUAL_TARGET_SPEC_FROM_REFERENCES.md`

#### 출력 형식
```md
## Interaction Report
- 구현한 인터랙션:
- 사용한 기술:
- reduced-motion 대응:
- 성능 리스크:
- Design.md 준수 여부:
```

---

### F. QA Gatekeeper Agent

#### 책임
- 기능/디자인/반응형/접근성/성능 검수
- 빌드 통과 여부 확인
- “완료” 판정 또는 재작업 요청
- 체크포인트 리포트 작성

#### 입력 자료
- `harness/QA_CHECKPOINT_MATRIX.md`
- `harness/DESIGN_COMPLIANCE_GATE.md`
- `templates/qa-checkpoint-report.md`
- 전체 코드 결과물

#### 출력 형식
```md
## QA Gate Report
- Gate:
- Result: PASS / FAIL / PASS WITH RISKS
- Blockers:
- Recommended Fixes:
- Checks Run:
- Screenshots / Notes:
```

---

### G. Future Commerce Architect Agent

#### 현재 상태
- 지금은 구현하지 않는다.
- 문서화와 경계 설계만 수행한다.

#### 책임
- 향후 카페24 API 연결 구조 정의
- 상품 데이터 구조와 브랜드 매핑 계획
- 현재 홈페이지 구조가 쇼핑몰 연결을 방해하지 않도록 확장 포인트 보존

#### 입력 자료
- `harness/FUTURE_COMMERCE_EXTENSION_PLAN.md`
- `02_Project-Structure.md`

#### 출력 형식
```md
## Future Commerce Plan
- 현재 유지할 구조:
- 나중에 추가할 파일:
- 지금 구현하면 안 되는 기능:
- 카페24 연결 시 검토할 사항:
```

---

## 3. 단계별 하네스 플로우

### Gate 0. ZIP 자료 이해
- Design.md 읽기
- reference priority 확인
- 시각 목표를 텍스트로 요약
- 구현 금지 범위 확인

### Gate 1. Foundation
- 프로젝트 구조 생성
- `src/data/brands.ts` 생성
- 토큰/전역 스타일 생성
- 빈 컴포넌트 골격 생성

### Gate 2. Static Hero
- Header 고정
- dark premium Hero 완성
- 3개 브랜드 카드 정적 배치
- 04 reference 방향 반영
- 화살표 없음 확인

### Gate 3. Card Interaction
- 카드 클릭 전환
- 3D rotateY/translateZ/scale 위계
- active/inactive 상태
- hover/touch 대응
- reduced-motion 대응

### Gate 4. Brand Scroll Sections
- ROTI CAMP / HOMESYS / LEEL 풀스크린 섹션
- 한 화면 한 브랜드 구조
- CTA 포함
- 섹션 간 레이아웃 일관성

### Gate 5. Closing Sections
- ROTI Group 소개
- Final CTA
- 세 브랜드 바로가기 지점

### Gate 6. QA / Polish
- 모바일/태블릿/데스크톱 확인
- 빌드/타입/린트 확인
- 접근성/성능/이미지 최적화 점검
- Design.md 최종 준수 리포트

---

## 4. 운영 방식

- 한 번에 전체 구현 금지.
- 각 Gate는 별도 Codex 작업/PR로 분리.
- Design Guardian과 QA Gatekeeper는 구현 후 별도 리뷰 작업으로 운용.
- 카페24 API, 결제, 회원, 주문은 현재 단계에서 구현하지 않는다.
