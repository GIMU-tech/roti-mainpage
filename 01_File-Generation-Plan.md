# 01_File-Generation-Plan.md

이 문서는 **어떤 파일을 어떤 순서로 생성할지** 구체적으로 정리합니다.

## 1. 우선 생성할 핵심 파일

### App shell
1. `app/layout.tsx`
   - 전역 HTML 구조
   - 폰트 로딩
   - 메타데이터 설정

2. `app/page.tsx`
   - 메인페이지 조립
   - 섹션 순서 관리

3. `app/globals.css`
   - 전역 리셋
   - 컬러 토큰
   - 기본 타이포
   - 공통 배경 톤

### Data
4. `data/brands.ts`
   - 브랜드명, 설명, 이미지, 링크, 순서 관리

### Shared components
5. `components/layout/Header.tsx`
   - 상단 고정 헤더

6. `components/hero/HeroPortal.tsx`
   - 첫 화면 전체 래퍼

7. `components/hero/BrandCarousel.tsx`
   - 카드 그룹, 클릭 전환 로직

8. `components/hero/BrandCard.tsx`
   - 개별 카드 UI

9. `components/sections/BrandFullscreenSection.tsx`
   - 공통 브랜드 섹션 컴포넌트

10. `components/sections/RotiGroupSection.tsx`
   - 회사/브랜드 그룹 소개

11. `components/sections/FinalCTA.tsx`
   - 마지막 CTA 섹션

### Animation / behavior
12. `hooks/useBrandCarousel.ts`
   - 카드 선택 상태 및 회전 로직

13. `hooks/useHeroScrollTransition.ts`
   - Hero → 브랜드 섹션 전환 훅

14. `lib/animations/heroAnimations.ts`
   - hero 카드 애니메이션

15. `lib/animations/sectionAnimations.ts`
   - 브랜드 섹션 reveal 애니메이션

### Styles
16. `styles/tokens.css` 또는 CSS 변수 파일
17. 컴포넌트별 module css 또는 styled system

---

## 2. 그 다음 생성할 보조 파일

18. `types/brand.ts`
19. `lib/utils.ts`
20. `public/images/brands/*`
21. `public/images/noise/*`
22. `public/images/backgrounds/*`

---

## 3. 구현 순서

### Step A — 구조 먼저
- layout.tsx
- globals.css
- page.tsx
- brands.ts

### Step B — 정적 화면 먼저
- Header
- HeroPortal
- BrandCard
- BrandCarousel (정적)

### Step C — 인터랙션 추가
- useBrandCarousel
- heroAnimations.ts
- 클릭 시 회전/중앙정렬/선택상태

### Step D — 스크롤 경험 추가
- BrandFullscreenSection
- useHeroScrollTransition
- sectionAnimations.ts

### Step E — 후반 섹션 추가
- RotiGroupSection
- FinalCTA

### Step F — 마무리
- 반응형
- 접근성
- 성능
- QA

---

## 4. 파일 생성 원칙
- 파일 하나당 책임을 명확히 분리한다.
- 애니메이션 로직과 UI 마크업을 과도하게 섞지 않는다.
- 브랜드 데이터는 하드코딩된 JSX 안에 흩뿌리지 말고 `data/brands.ts`에서 관리한다.
- 색상과 spacing은 토큰화한다.
- Design.md를 기준으로 변경 가능성을 열어둔다.

---

## 5. 추천 자산 정책
- 배경 이미지는 브랜드별 1~2장 핵심 비주얼만 사용
- 너무 많은 고용량 이미지를 넣지 않는다.
- Hero 카드 이미지는 강한 콘셉트 컷으로 통일
- ROTI HOMESYS는 가장 메인 허브 느낌이 나게 준비
