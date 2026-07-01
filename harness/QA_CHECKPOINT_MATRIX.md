# QA_CHECKPOINT_MATRIX.md

## 목적
각 구현 단계별로 “완료”라고 판단하기 전에 확인해야 할 체크포인트를 정리한다.

## 기본 명령어
프로젝트 생성 후 가능한 한 아래 scripts를 `package.json`에 맞춘다.

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

패키지 매니저는 `pnpm`을 우선한다. 기존 프로젝트가 `npm`을 사용한다면 명령어만 맞춰 적용한다.

---

## Gate 0. Repo / Harness Audit

### 확인 항목
- [ ] `Design.md` 존재
- [ ] `AGENTS.md` 존재
- [ ] `handoff/VISUAL_TARGET_SPEC_FROM_REFERENCES.md` 존재
- [ ] `harness/DESIGN_COMPLIANCE_GATE.md` 존재
- [ ] `harness/QA_CHECKPOINT_MATRIX.md` 존재
- [ ] 구현 금지 범위가 문서화됨
- [ ] Codex가 읽을 파일 순서가 명시됨

### 완료 기준
- Codex가 즉시 구현에 들어가지 않고 문서 기반 계획을 먼저 작성한다.

---

## Gate 1. Foundation

### 확인 항목
- [ ] Next.js App Router 구조 생성
- [ ] TypeScript 적용
- [ ] 전역 스타일 / 토큰 생성
- [ ] `src/data/brands.ts` 생성
- [ ] 컴포넌트 골격 생성
- [ ] `src/types/brand.ts` 생성
- [ ] `pnpm build` 통과
- [ ] `pnpm typecheck` 통과

### 디자인 체크
- [ ] dark premium 기본 배경
- [ ] 레드 토큰 정의
- [ ] 그린 포인트 사용 없음
- [ ] 브랜드 데이터가 ROTI CAMP / HOMESYS / LEEL 모두 포함

---

## Gate 2. Static Header / Hero

### 확인 항목
- [ ] Header fixed
- [ ] 좌측 ROTI 로고
- [ ] 우측 BRAND / NEWS / CAREERS / CONTACT / menu icon
- [ ] Hero title/subtitle 배치
- [ ] 3개 브랜드 카드 정적 배치
- [ ] 중앙 카드가 가장 선명함
- [ ] 좌우 화살표 없음
- [ ] 모바일에서 첫 화면 주요 요소 확인 가능

### 디자인 체크
- [ ] 04 reference 방향 반영
- [ ] 블랙/차콜 기반
- [ ] 레드 포인트 절제
- [ ] 쇼핑몰 상품 나열처럼 보이지 않음

---

## Gate 3. 3D Card Interaction

### 확인 항목
- [ ] 카드 클릭으로 active brand 변경
- [ ] 클릭 카드가 중앙으로 이동
- [ ] rotateY / scale / opacity / z-index 위계 적용
- [ ] hover tilt 구현
- [ ] 키보드 focus 가능
- [ ] reduced-motion 환경에서 과한 회전 제거 또는 완화
- [ ] 좌측 index가 현재 브랜드와 동기화

### 디자인 체크
- [ ] 화살표 UI 없음
- [ ] turntable / carousel depth 느낌
- [ ] active card red glow 과하지 않음

---

## Gate 4. Fullscreen Brand Scroll Sections

### 확인 항목
- [ ] ROTI CAMP section
- [ ] ROTI HOMESYS section
- [ ] LEEL section
- [ ] 각 섹션 100vh 또는 그에 준하는 풀스크린 경험
- [ ] 스크롤당 한 브랜드가 중심
- [ ] CTA 포함
- [ ] 섹션 공통 레이아웃 유지
- [ ] 모바일에서 텍스트/CTA 가독성 유지

### 디자인 체크
- [ ] 브랜드별 무드 차이 있음
- [ ] 레이아웃 시스템은 일관됨
- [ ] 상품 가격/리뷰/할인 없음

---

## Gate 5. ROTI Group / Final CTA

### 확인 항목
- [ ] ROTI 그룹 소개 섹션
- [ ] 3개 브랜드 CTA
- [ ] 브랜드별 이동 링크 placeholder 또는 route 준비
- [ ] Footer/closing 흐름 자연스러움

### 디자인 체크
- [ ] 하단도 dark premium 톤 유지
- [ ] 갑자기 일반 회사소개 템플릿처럼 변하지 않음

---

## Gate 6. Responsive / Accessibility / Performance

### 뷰포트
- [ ] 390 x 844
- [ ] 768 x 1024
- [ ] 1440 x 900

### 접근성
- [ ] 클릭 가능한 카드는 button 또는 role/aria 처리
- [ ] 키보드 focus visible
- [ ] 이미지 alt 처리
- [ ] 텍스트 대비 확인
- [ ] prefers-reduced-motion 대응

### 성능
- [ ] 배경 이미지 최적화
- [ ] 불필요한 대용량 이미지 사용 없음
- [ ] 불필요한 re-render 최소화
- [ ] WebGL 의존 없이 CSS 3D 우선

### 완료 기준
- [ ] `pnpm lint` 통과
- [ ] `pnpm typecheck` 통과
- [ ] `pnpm build` 통과
- [ ] 주요 화면 수동 확인 완료
