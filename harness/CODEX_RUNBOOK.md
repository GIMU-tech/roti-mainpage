# CODEX_RUNBOOK.md

## 1. 지금 가장 먼저 할 일

바로 코드를 구현하지 말고, 먼저 Gate 0을 수행한다.

### Gate 0 목표
- ZIP 자료가 프로젝트 루트에 제대로 들어왔는지 확인
- `Design.md` 기준을 Codex가 읽도록 고정
- 기존 문서와 V2 하네스 문서를 비교
- 실제 구현 전 단계별 작업 계획 작성
- 현재 단계에서 구현하지 않을 범위 명시

### Codex 첫 작업 프롬프트
`prompts/15_Phase-0-Repo-Audit-and-Harness-Setup.md`를 사용한다.

---

## 2. 권장 GitHub 운영

```txt
main         배포 기준
dev          통합 개발 기준
feature/*    Codex 작업 브랜치
review/*     Codex 리뷰/수정 브랜치
```

### 운영 규칙
- Codex는 feature 브랜치에서만 작업한다.
- 한 PR에는 한 Gate만 포함한다.
- Design Guardian 리뷰와 QA Gatekeeper 리뷰를 통과한 뒤 병합한다.
- `Design.md` 변경은 별도 PR로만 허용한다.

---

## 3. 단계별 실행 순서

### Step 0. Harness / Repo Audit
사용 프롬프트:
- `prompts/15_Phase-0-Repo-Audit-and-Harness-Setup.md`

목표:
- 문서 정리
- 실행 계획 작성
- 금지 범위 재확인

### Step 1. Foundation
사용 프롬프트:
- `prompts/16_Phase-1-Foundation.md`

목표:
- Next.js 구조
- 토큰
- 브랜드 데이터
- 컴포넌트 골격

### Step 2. Static Hero
사용 프롬프트:
- `prompts/17_Phase-2-Hero-Static-Implementation.md`

목표:
- Header
- Hero
- 3개 브랜드 카드 정적 디자인

### Step 3. 3D Interaction
사용 프롬프트:
- `prompts/18_Phase-3-3D-Interaction.md`

목표:
- 카드 클릭 회전
- active/inactive 위계
- hover/touch/reduced-motion

### Step 4. Scroll Sections
사용 프롬프트:
- `prompts/19_Phase-4-Scroll-Brand-Sections.md`

목표:
- 브랜드별 fullscreen section
- 스크롤 한 화면 한 브랜드

### Step 5. QA / Polish
사용 프롬프트:
- `prompts/20_Phase-5-QA-and-Polish.md`

목표:
- 모바일
- 접근성
- 성능
- Design.md 최종 검수

---

## 4. Codex에게 항상 요구할 보고 형식

```md
## Summary

## Changed Files

## Implementation Notes

## Tests / Checks Run

## Design.md Compliance Check
- [ ] Brand portal, not shop
- [ ] Dark premium tone maintained
- [ ] Red accent used with restraint
- [ ] No green primary hero accent
- [ ] No arrow carousel controls
- [ ] Click-to-rotate card structure preserved
- [ ] One-brand-per-screen scroll structure preserved
- [ ] ROTI CAMP / HOMESYS / LEEL all represented
- [ ] No unverified marketing claims added
- [ ] Mobile/accessibility/performance risks noted

## Risks / Follow-ups
```

---

## 5. 이후 쇼핑몰 연결은 언제 시작할까?

아래 조건이 끝난 뒤에만 시작한다.

- 메인 Hero 완성
- 브랜드 3개 섹션 완성
- 모바일/태블릿/데스크톱 기본 QA 통과
- Final CTA 구조 확정
- 브랜드별 이동 링크 정책 확정

그 전에는 Cafe24 API, 장바구니, 결제, 회원 기능을 구현하지 않는다.
