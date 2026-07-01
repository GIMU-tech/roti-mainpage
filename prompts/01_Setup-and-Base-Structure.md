# 01_Setup-and-Base-Structure.md

## Prompt

`Design.md`를 먼저 읽고, 그 기준을 최우선으로 삼아라.

ROTI 브랜드 포털 메인페이지 구현을 시작한다.
이번 단계에서는 **프로젝트의 기본 구조와 골격 파일**만 생성하라.

### 목표
- Next.js + TypeScript 기반 메인페이지 구조 준비
- 향후 Hero, 카드 인터랙션, 스크롤 브랜드 섹션을 올리기 위한 파일 구조 생성
- 아직 복잡한 애니메이션 완성보다 구조적 기반을 우선한다

### 이번 단계에서 반드시 할 일
1. 필요한 폴더 구조를 만든다.
2. `app/layout.tsx`, `app/page.tsx`, `app/globals.css`를 만든다.
3. `data/brands.ts`를 만든다.
4. `types/brand.ts`를 만든다.
5. 아래 컴포넌트 파일의 기본 틀을 생성한다.
   - `components/layout/Header.tsx`
   - `components/hero/HeroPortal.tsx`
   - `components/hero/BrandCarousel.tsx`
   - `components/hero/BrandCard.tsx`
   - `components/sections/BrandFullscreenSection.tsx`
   - `components/sections/RotiGroupSection.tsx`
   - `components/sections/FinalCTA.tsx`
6. 아직 세부 애니메이션이 미완성이어도 괜찮지만, 페이지에는 각 섹션의 자리와 기본 구조가 보이게 한다.
7. 컬러 토큰과 기본 배경 톤은 `Design.md`에 맞게 반영한다.

### 중요한 규칙
- Hero는 브랜드 포털 구조여야 한다.
- 좌우 화살표 UI를 넣지 마라.
- 브랜드 전환은 훗날 카드 클릭으로 구현될 예정이므로 구조를 그렇게 준비하라.
- 나중에 GSAP/ScrollTrigger를 붙이기 쉬운 구조로 만든다.

### 완료 기준
- 프로젝트가 실행 가능해야 한다.
- 전체 섹션의 구조가 page.tsx에 연결되어 있어야 한다.
- 브랜드 데이터가 하드코딩 JSX가 아니라 데이터 파일로 분리되어 있어야 한다.
- 응답에는 변경 파일 목록과 다음 단계 제안을 포함하라.
