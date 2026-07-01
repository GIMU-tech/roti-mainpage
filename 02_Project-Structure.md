# 02_Project-Structure.md

아래는 권장 프로젝트 구조입니다.

```txt
src/
  app/
    layout.tsx
    page.tsx
    globals.css

  components/
    layout/
      Header.tsx
    hero/
      HeroPortal.tsx
      BrandCarousel.tsx
      BrandCard.tsx
    sections/
      BrandFullscreenSection.tsx
      RotiGroupSection.tsx
      FinalCTA.tsx
    ui/
      SectionLabel.tsx
      CTAButton.tsx

  data/
    brands.ts

  hooks/
    useBrandCarousel.ts
    useHeroScrollTransition.ts

  lib/
    animations/
      heroAnimations.ts
      sectionAnimations.ts
    utils.ts

  styles/
    tokens.css
    hero.module.css
    brand-card.module.css
    fullscreen-section.module.css
    header.module.css

  types/
    brand.ts

public/
  images/
    brands/
      camp-hero.jpg
      homesys-hero.jpg
      leel-hero.jpg
    sections/
      camp-bg.jpg
      homesys-bg.jpg
      leel-bg.jpg
    textures/
      noise.png
      vignette.png
```

## 컴포넌트 역할 분리

### Header.tsx
- 상단 고정 네비게이션
- 배경 투명도 / 스크롤 상태 변화 대응

### HeroPortal.tsx
- Hero 전체 컨테이너
- 타이틀, 보조 문구, 인덱스, 스크롤 인디케이터 포함

### BrandCarousel.tsx
- 3개 카드의 위치 계산
- 클릭 전환 제어
- 현재 선택 브랜드 상태 보유

### BrandCard.tsx
- 개별 카드 UI
- 배경 / 테두리 / 제목 / 설명 / 선택 상태 렌더

### BrandFullscreenSection.tsx
- 브랜드별 풀스크린 섹션 공통 템플릿
- 제목 / 설명 / CTA / 배경 / 정렬 제어

### RotiGroupSection.tsx
- ROTI 그룹 소개
- 키워드 / 간단 소개 / 구조 설명

### FinalCTA.tsx
- 브랜드별 쇼핑몰 링크 CTA

## 상태 관리 최소 원칙
- 현재 선택 브랜드 index
- 스크롤 트리거 상태
- reduced motion 여부

## 확장성 고려
- 브랜드가 늘어나더라도 `brands.ts` 데이터 수정으로 확장 가능하게 유지
- Hero / Fullscreen section이 데이터 기반으로 렌더되도록 설계
