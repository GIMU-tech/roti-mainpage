# ROTI 관리 구조 및 반응형 최적화 통합 계획서

## 문서 목적

이 문서는 ROTI 메인페이지를 앞으로 계속 확장하고 유지보수하기 위해 만든 작업 기준서다.

작업을 단계별로 진행할 때 이 문서를 먼저 확인하고, 각 단계가 끝날 때마다 체크리스트를 갱신한다.

핵심 방향은 다음과 같다.

- 현재 디자인을 유지한다.
- 한 번에 큰 리디자인을 하지 않는다.
- 먼저 안전하게 나누고, 그 다음 구조를 개선한다.
- 모바일은 특정 기기 하나가 아니라 반응형 기준으로 맞춘다.
- `Design.md`의 브랜드 포털 방향을 계속 지킨다.

## 반드시 지킬 기준

- ROTI 메인페이지는 쇼핑몰이 아니라 브랜드 포털이다.
- ROTI CAMP, ROTI HOMESYS, LEEL 세 브랜드가 모두 보여야 한다.
- 다크 프리미엄 톤을 유지한다.
- Ember Red `#B41307`은 작은 포인트로만 사용한다.
- 초록색은 히어로 주요 포인트 색으로 사용하지 않는다.
- 가격, 할인, 리뷰, 장바구니, 결제, 회원, 주문 UI는 넣지 않는다.
- 검증되지 않은 1위, 인증, 납품, 수상, 판매량 표현은 넣지 않는다.
- 히어로 카드는 좌우 화살표로 회전한다.
- 브랜드 카드 클릭은 해당 브랜드 섹션으로 이동한다.
- 모바일에서는 하단 메뉴를 강제로 노출하지 않는다.
- `prefers-reduced-motion` 대응을 유지한다.

## 반응형 기준

특정 아이폰 한 기종에 고정하지 않고, 아래 폭 범위를 기준으로 확인한다.

| 구분 | 기준 폭 | 확인 목적 |
| --- | ---: | --- |
| 작은 모바일 | 360px | 가장 좁은 화면에서 텍스트와 버튼이 잘리는지 확인 |
| 일반 모바일 | 390px | 기본 모바일 기준 화면 확인 |
| 큰 모바일 | 430px | 여백이 과하게 벌어지지 않는지 확인 |
| 태블릿 | 768px | 모바일과 데스크톱 사이 전환 확인 |
| 데스크톱 | 1440px 이상 | 프리미엄 무드, 그리드, 애니메이션 확인 |

모바일 최적화 원칙:

- 인트로 애니메이션 방향은 유지한다.
- 크기, 간격, 줄바꿈, 터치 영역을 모바일에 맞춘다.
- 무거운 고정 스크롤과 과한 3D 효과는 줄인다.
- 주요 콘텐츠가 첫 화면에서 잘리지 않게 한다.
- 텍스트가 버튼, 카드, 이미지 위에서 겹치지 않게 한다.
- 브랜드 섹션은 모바일에서 읽기와 터치를 우선한다.

## 전체 진행 순서

### 1단계. CSS 파일 분리

목표:

- 현재 큰 `globals.css`를 관리 가능한 파일로 나눈다.
- 기존 클래스명은 유지한다.
- 디자인이 깨지지 않게 파일 구조만 먼저 정리한다.

예상 구조:

```txt
src/styles/tokens.css
src/styles/base.css
src/styles/layout.css
src/styles/header.css
src/styles/footer.css
src/styles/intro.css
src/styles/sections/hero.css
src/styles/sections/brand-stack.css
src/styles/sections/about.css
src/styles/sections/standard.css
```

진행 원칙:

- 클래스 이름을 바꾸지 않는다.
- CSS 선언을 섹션별로 옮기는 것부터 한다.
- `globals.css`는 import 중심으로 얇게 만든다.
- 분리 후 `pnpm lint`, `pnpm typecheck`, `pnpm build`를 확인한다.

완료 기준:

- [ ] CSS가 역할별 파일로 분리됨
- [ ] 기존 화면 디자인이 유지됨
- [ ] 모바일 미디어쿼리 위치가 명확해짐
- [ ] `pnpm lint` 통과
- [ ] `pnpm typecheck` 통과
- [ ] `pnpm build` 통과

### 2단계. 공통 섹션 틀 추가

목표:

- 섹션마다 다른 좌우 여백과 기준선을 통일한다.
- 새 섹션을 붙여도 그리드가 흔들리지 않게 한다.

예상 대상:

```txt
src/components/layout/SectionShell.tsx
src/components/layout/SectionGrid.tsx
src/styles/layout.css
```

공통화할 것:

- 섹션 최소 높이
- 좌우 여백
- 내부 최대 너비
- 모바일 여백
- 제목과 본문 기본 간격
- 섹션 스냅 기준

완료 기준:

- [ ] 공통 섹션 기준선이 생김
- [ ] 주요 섹션의 좌우 기준이 어긋나지 않음
- [ ] 360px, 390px, 430px 모바일에서 텍스트가 잘리지 않음
- [ ] 데스크톱에서 섹션별 시작점이 자연스러움

### 3단계. 메뉴 데이터 분리

목표:

- 헤더 안에 직접 들어간 메뉴 항목을 데이터 파일로 분리한다.
- 데스크톱 메뉴와 모바일 메뉴가 같은 데이터를 쓰게 한다.

예상 파일:

```txt
src/data/navigation.ts
```

관리할 항목:

- 메뉴 라벨
- 연결 id
- 표시 여부
- 모바일 표시 여부

완료 기준:

- [x] `Header.tsx`에서 메뉴 배열 하드코딩 제거
- [x] 데스크톱 메뉴와 모바일 메뉴가 같은 데이터 사용
- [x] 메뉴 수정 시 컴포넌트 구조를 건드리지 않음

### 4단계. 섹션 순서 데이터 분리

목표:

- 홈페이지 섹션 순서와 스크롤 대상을 한 곳에서 관리한다.
- 새 섹션을 붙일 때 헤더, 페이지, 스크롤 로직이 서로 어긋나지 않게 한다.

예상 파일:

```txt
src/data/sections.ts
```

관리할 항목:

- 섹션 id
- 섹션 이름
- 메뉴 연결 여부
- 스크롤 스냅 대상 여부
- 모바일 스냅 사용 여부

현재 기본 순서:

1. Intro
2. Header
3. Hero
4. Brand scenes
5. About ROTI
6. ROTI Standard
7. Footer / Contact

완료 기준:

- [x] 섹션 id가 한 곳에서 관리됨
- [x] 스크롤 스냅 대상이 데이터 기준으로 관리됨
- [x] 새 섹션 추가 시 수정 범위가 줄어듦

### 5단계. 푸터 정보 분리

목표:

- 푸터 주소, 링크, 브랜드 로고 정보를 데이터 파일로 분리한다.
- 주소나 로고 변경 시 UI 컴포넌트를 직접 수정하지 않게 한다.

예상 파일:

```txt
src/data/footer.ts
```

관리할 항목:

- 브랜드 로고
- 서울 오피스 주소
- 본점 주소
- 하단 링크
- 카피라이트 문구

완료 기준:

- [x] `Footer.tsx`에서 주소와 로고 배열 하드코딩 제거
- [x] 푸터 데이터가 별도 파일에서 관리됨
- [ ] 모바일에서 푸터 로고와 주소 정렬 확인

### 6단계. 모바일 및 반응형 최적화

목표:

- 다양한 모바일 폭에서 화면이 자연스럽게 보이도록 조정한다.
- 인트로 애니메이션은 유지하되, 모바일 안정성을 우선한다.

확인할 화면:

- 360px
- 390px
- 430px
- 768px
- 1440px 이상

점검 항목:

- [ ] 인트로 로고와 문구가 잘리지 않음
- [ ] 히어로 카드가 모바일에서 과하게 크거나 작지 않음
- [ ] 화살표와 메뉴 터치 영역이 충분함
- [ ] 브랜드 섹션 텍스트가 이미지와 겹치지 않음
- [ ] About 섹션 타이포와 우측/하단 요소가 정렬됨
- [ ] Standard 섹션이 모바일에서 읽기 쉬움
- [ ] Footer 주소와 로고가 하단 그리드에 맞음
- [ ] 모바일에서 하단 메뉴를 강제로 노출하지 않음
- [ ] 스크롤이 과하게 끊기거나 튀지 않음

완료 기준:

- [ ] 360px 주요 콘텐츠 확인
- [ ] 390px 주요 콘텐츠 확인
- [ ] 430px 주요 콘텐츠 확인
- [ ] 768px 주요 콘텐츠 확인
- [ ] 데스크톱 주요 콘텐츠 확인
- [ ] `pnpm lint` 통과
- [ ] `pnpm typecheck` 통과
- [ ] `pnpm build` 통과

### 7단계. 애니메이션 로직 분리

목표:

- 화면 마크업과 움직임 로직을 분리한다.
- 모바일에서 애니메이션만 쉽게 줄일 수 있게 한다.

예상 분리:

```txt
src/hooks/useIntroSequence.ts
src/hooks/useHeaderScrollState.ts
src/hooks/useSectionSnap.ts
src/hooks/useBrandSlideStackAnimation.ts
src/hooks/useStandardSectionAnimation.ts
```

진행 원칙:

- 한 번에 모든 애니메이션을 옮기지 않는다.
- 큰 컴포넌트부터 단계적으로 분리한다.
- 분리 전후 화면 동작이 같아야 한다.
- reduced-motion 동작을 유지한다.

완료 기준:

- [ ] 큰 컴포넌트의 애니메이션 코드가 hook으로 분리됨
- [ ] 모바일에서 애니메이션 축소 제어가 쉬워짐
- [ ] reduced-motion 동작 유지
- [ ] `pnpm lint` 통과
- [ ] `pnpm typecheck` 통과
- [ ] `pnpm build` 통과

## 단계별 작업 전 체크

각 단계를 시작하기 전에 아래를 확인한다.

- [ ] `Design.md` 확인
- [ ] 이 계획서 확인
- [ ] 이번 단계의 범위 확인
- [ ] 디자인을 바꾸는 작업인지, 구조만 바꾸는 작업인지 구분
- [ ] 모바일 영향 여부 확인
- [ ] 기존 작업 중인 변경사항 확인

## 단계별 작업 후 보고 항목

각 단계 완료 후 아래를 보고한다.

1. 변경 파일
2. 구현 요약
3. 모바일 고려사항
4. `pnpm lint` 결과
5. `pnpm typecheck` 결과
6. `pnpm build` 결과
7. Design.md 준수 여부
8. P1 Blockers
9. P2 Issues
10. 다음 단계 제안

## Design.md 준수 체크리스트

- [ ] Brand portal, not shop
- [ ] Dark premium tone maintained
- [ ] Red accent used with restraint
- [ ] No green primary hero accent
- [ ] Restrained arrow card-rotation controls preserved
- [ ] Card-click-to-brand-section scroll preserved
- [ ] One-brand-per-screen scroll structure preserved
- [ ] ROTI CAMP / HOMESYS / LEEL all represented
- [ ] No unverified marketing claims added
- [ ] Mobile/accessibility/performance risks noted

## 우선 적용할 전략

이번 정리의 기본 전략은 다음과 같다.

1. 기존 클래스명을 유지한다.
2. 먼저 CSS 파일을 나눈다.
3. 데이터 분리는 메뉴, 섹션, 푸터 순서로 진행한다.
4. 공통 섹션 틀은 기존 디자인을 깨지 않는 선에서 적용한다.
5. 모바일 최적화는 360px부터 430px까지 자연스럽게 대응하게 한다.
6. 애니메이션 로직 분리는 마지막에 진행한다.

이 방식은 출시 전 정리 목적에 맞는 보수적인 접근이다.
