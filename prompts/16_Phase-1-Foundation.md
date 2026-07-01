# 16_Phase-1-Foundation.md

## Prompt

`Design.md`, `AGENTS.md`, `01_File-Generation-Plan.md`, `02_Project-Structure.md`, `harness/DESIGN_COMPLIANCE_GATE.md`를 먼저 읽고 시작하라.

이번 단계는 ROTI 메인페이지의 Foundation 단계다.  
아직 완성된 Hero 디자인이나 인터랙션을 만들지 말고, 구조와 토큰, 데이터, 컴포넌트 골격을 만든다.

### 목표
- Next.js App Router + TypeScript 구조 준비
- 전역 스타일과 디자인 토큰 준비
- 브랜드 데이터 구조 준비
- 주요 컴포넌트 파일 골격 생성
- 다음 단계에서 Header/Hero 정적 구현을 쉽게 할 수 있게 만들기

### 생성/수정 대상
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `src/data/brands.ts`
- `src/types/brand.ts`
- `src/components/layout/Header.tsx`
- `src/components/hero/HeroPortal.tsx`
- `src/components/hero/BrandCarousel.tsx`
- `src/components/hero/BrandCard.tsx`
- `src/components/sections/BrandFullscreenSection.tsx`
- `src/components/sections/RotiGroupSection.tsx`
- `src/components/sections/FinalCTA.tsx`
- `src/styles/tokens.css` 또는 이에 준하는 토큰 파일

### 필수 조건
- 브랜드 데이터는 JSX에 직접 흩뿌리지 말고 `src/data/brands.ts`에 둔다.
- 색상 토큰에는 `#B41307`, black/charcoal 계열이 포함되어야 한다.
- green은 primary hero accent로 사용하지 않는다.
- 현재 단계에서 Cafe24 API 파일을 만들지 않는다.
- 결제/회원/장바구니 기능을 만들지 않는다.

### 검수
가능한 경우:
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`

### 출력 형식
AGENTS.md의 Required Response Format을 따른다.
