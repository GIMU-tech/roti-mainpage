# 03_Homepage-Planning-Summary.md

## 프로젝트 개요
이 프로젝트는 ROTI 메인페이지를 단순 쇼핑몰 첫 화면이 아니라 **3개 브랜드를 연결하는 브랜드 포털형 메인페이지**로 구축하는 것이 목표다.

연결 브랜드:
- ROTI CAMP
- ROTI HOMESYS
- LEEL

## 핵심 목표
1. ROTI를 생활용품 전문 브랜드 그룹처럼 보이게 한다.
2. 사용자가 메인페이지에서 3개 브랜드 구조를 빠르게 이해하게 한다.
3. 각 브랜드 쇼핑몰로 자연스럽게 이동하게 한다.
4. 시각적으로는 블랙 기반, 고급스럽고 절제된 3D/모션 중심 경험을 만든다.

## 메인 UX 개요
### Hero
- 블랙/차콜 배경
- 중앙에 3장의 브랜드 카드
- 좌우 화살표 없음
- 카드 클릭 시 3D로 회전하며 중앙으로 이동
- 상단 헤더 고정

### Scroll Experience
- Hero 아래부터는 한 화면당 한 브랜드가 풀스크린으로 등장
- 순서 예시:
  1. ROTI CAMP
  2. ROTI HOMESYS
  3. LEEL
- 각 섹션에는 브랜드 소개 문구와 CTA가 있음

### Closing Sections
- ROTI 그룹 소개 섹션
- Final CTA 섹션

## 시각 톤
- dark premium
- restrained motion
- glass-like brand cards
- red accent only
- 쇼핑몰 배너식 과잉 정보 지양

## 중요한 인터랙션 규칙
- 화살표 기반 전환 금지
- 카드 클릭 기반 탐색 필수
- Hero와 브랜드 섹션이 서로 단절되지 않도록 연결감 유지
- 스크롤 한 번당 한 브랜드가 확실히 드러나야 함

## 추천 기술 방향
- Next.js + TypeScript
- GSAP + ScrollTrigger
- CSS 3D transform
- 선택적으로 Framer Motion / Lenis
