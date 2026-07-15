# ROTI HOMESYS 이미지 제작 및 적용 가이드

최종 업데이트: 2026-07-15

## 1. 문서 목적

ROTI HOMESYS에 사용한 이미지의 제작 방향과 현재 적용 위치를 정리한다.

이미지는 다음 세 용도에 맞춰 각각 별도로 제작한다.

1. Hero 브랜드 카드 이미지
2. Hero의 HOMESYS 활성 배경 이미지
3. ROTI HOMESYS 브랜드 섹션 이미지

세 이미지는 같은 공간과 조명 톤을 공유하되 동일 이미지를 크롭해서 재사용하지 않는다. 카드, Hero 배경, 브랜드 섹션은 화면에서 맡는 역할과 필요한 여백이 서로 다르기 때문이다.

---

## 2. 공통 비주얼 방향

### 기본 분위기

- 따뜻한 중간 회색의 콘크리트 또는 미장 벽
- 차콜 또는 흑연색의 무광 바닥
- 검은 금속 선반과 정돈된 수납함을 가장자리에서 제한적으로 사용
- 너무 밝은 가정집이나 흰색 쇼핑몰 스튜디오가 아닌 차분한 프리미엄 톤
- 제품의 검정 플라스틱, 알루미늄, 고무 바퀴가 구분될 정도의 부드러운 측면광
- 사람이 등장하지 않는 정돈된 제품 중심 장면
- 녹색을 주요 포인트로 사용하지 않음
- 텍스트, 워터마크, 임의 로고를 이미지 안에 생성하지 않음

### 세 이미지의 연결 방식

- 벽과 바닥의 색온도, 질감, 조명 방향을 유사하게 유지한다.
- 팬트리 느낌은 선반이나 수납함을 화면 가장자리에 소량 배치하는 정도로만 표현한다.
- 이미지 구도는 용도별로 확실히 다르게 만든다.
- 카드에는 소수 제품, 브랜드 섹션에는 여러 제품, Hero 배경에는 제품을 넣지 않는다.

---

## 3. Hero 브랜드 카드 이미지

### 역할

ROTI HOMESYS 카드의 배경 이미지다. 카드 위에는 브랜드명, 설명, 키워드가 HTML 텍스트로 올라간다. 따라서 제품 사진 자체보다 텍스트 가독성과 작은 카드에서의 제품 식별성이 우선이다.

### 필수 구도 규칙

- 세로형 카드 비율을 기준으로 제작한다. 현재 이미지는 약 `4:5` 비율이다.
- **좌측 상단은 카피 전용 안전영역으로 완전히 비운다.**
- 권장 안전영역은 전체 이미지 기준으로 다음과 같다.
  - 가로: 왼쪽 약 `60%`
  - 세로: 위쪽 약 `50%`
- 카피 안전영역에는 제품뿐 아니라 다음 요소도 들어가지 않아야 한다.
  - 카트 손잡이와 프레임
  - 사다리 다리와 상판
  - 선반과 수납함
  - 강한 그림자 또는 빛줄기
  - 제품 반사와 시선을 끄는 밝은 하이라이트
- 좌측 제품은 반드시 좌측 하단에 낮게 배치한다.
- 높이가 긴 카트는 우측에 배치하고 손잡이는 화면 오른쪽 약 `35%` 영역 안에 제한한다.
- 제품 두 개는 서로 겹치지 않으며 전체 외곽선과 바퀴가 카드 안에서 보여야 한다.
- 카드 가장자리와 제품 사이에 충분한 안전 여백을 둔다.

### 현재 적용된 구성

- 좌측 하단: 2단 발판 사다리
- 우측 하단: 펼쳐진 트랜스폼 플랫폼 카트
- 좌측 상단: 질감이 약한 회색 벽면만 유지
- 우측 가장자리: 팬트리 분위기를 만드는 검은 금속 선반

### 제품 변형 방지 검수

생성 이미지에서는 제품의 구조가 달라질 수 있으므로 다음 항목을 원본 사진과 대조한다.

- 바퀴 개수와 위치
- 알루미늄 프레임의 연결 방향
- 손잡이 형태와 높이
- 힌지, 잠금장치, 지지대 위치
- 플랫폼과 발판의 실제 형태
- 제품 비율과 두 제품 사이의 자연스러운 크기 관계
- 제품끼리 합쳐지거나 부품이 중복되지 않았는지 여부

정확한 제품 구조가 중요한 최종 광고물이라면 AI 생성 합성만 사용하지 않고, 원본 누끼 제품을 이용한 수동 합성을 우선한다.

### 현재 파일

- 프로젝트 경로: `public/images/brands/roti-homesys-card.png`
- 웹 경로: `/images/brands/roti-homesys-card.png`
- 크기: `1122 × 1402`
- 형식: PNG
- 데이터 연결: `src/data/brands.ts`의 `heroAsset.src`

---

## 4. Hero의 HOMESYS 활성 배경 이미지

### 역할

Hero에서 ROTI HOMESYS 카드가 활성화됐을 때 카드 뒤에 표시되는 무대 배경이다. 화면 앞에는 세 장의 브랜드 카드가 서 있거나 떠 있는 형태로 배치된다.

### 필수 구도 규칙

- 제품을 넣지 않는다.
- 카드와 카드 그림자가 놓일 수 있도록 바닥면을 충분히 보여준다.
- 벽과 바닥의 경계가 자연스럽게 보여야 한다.
- 중앙은 카드 세 장이 가려도 복잡해지지 않도록 비운다.
- 선반과 수납 구조는 좌우 가장자리에만 제한적으로 배치한다.
- 바닥은 지나치게 반짝이지 않으며, 카드 아래의 접지 그림자를 받을 정도의 약한 반사만 허용한다.
- 배경 자체가 카드보다 밝거나 강하게 보이지 않도록 대비를 절제한다.
- 카드 이미지나 브랜드 섹션 이미지와 동일한 장면처럼 보이지 않게 한다.

### 현재 파일

- 프로젝트 경로: `public/images/hero/roti-homesys-stage.png`
- 웹 경로: `/images/hero/roti-homesys-stage.png`
- 크기: `1672 × 941`
- 형식: PNG
- CSS 연결: `src/styles/sections/hero.css`의 `.hero-portal__stage-bg::after`
- 표시 조건: HOMESYS 카드가 Hero의 활성 카드일 때 노출

---

## 5. ROTI HOMESYS 브랜드 섹션 이미지

### 역할

ROTI HOMESYS 전체 제품군과 브랜드의 생활 정돈 이미지를 보여주는 풀스크린 장면이다. 카드보다 많은 제품을 한눈에 보여주되 상품 목록처럼 보이지 않아야 한다.

### 필수 구도 규칙

- 가로형 장면으로 제작한다.
- 서로 다른 제품을 최소 3개 이상 사용해 HOMESYS의 범위를 보여준다.
- 제품을 한 줄로 기계적으로 나열하기보다 높이와 간격에 약한 리듬을 준다.
- 모든 제품이 같은 바닥 위에 자연스럽게 서 있어야 한다.
- 제품끼리 겹치거나 프레임이 합쳐지지 않도록 충분한 간격을 둔다.
- 주요 제품군은 화면 중앙 영역에서 식별 가능해야 한다.
- 브랜드 설명이 하단 중앙에 표시되므로, 가장 아래쪽 카피 영역에는 중요한 제품 부품을 몰아넣지 않는다.
- 배경은 카드 및 Hero와 같은 재질 톤을 유지하지만 조명과 선반 배치는 다르게 구성한다.
- 쇼핑몰 상품 진열장보다는 정돈된 브랜드 쇼룸 또는 생활 도구 아카이브처럼 보이게 한다.

### 현재 적용된 구성

- 플랫폼 카트
- 2단 발판 사다리
- 몬스터 핸드카트
- 트랜스폼 카트
- 좌우 가장자리의 수납 선반과 중앙의 회색 미장 벽

### 현재 파일

- 프로젝트 경로: `public/images/sections/roti-homesys-brand-section.webp`
- 웹 경로: `/images/sections/roti-homesys-brand-section.webp`
- 크기: `1536 × 1024`
- 형식: WebP
- 파일 크기: 약 `158 KB`
- 데이터 연결:
  - `src/data/brands.ts`의 `sectionAsset.src`
  - `src/data/brands.ts`의 `about.image`
- 현재 표시 설정:
  - 데스크톱 초점: `center center`
  - 모바일 초점: `50% center`
  - 필터: `brightness(0.9) saturate(0.9) contrast(1.02)`

---

## 6. 현재 적용 관계

| 홈페이지 영역 | 사용 이미지 | 제품 포함 | 핵심 여백 |
| --- | --- | --- | --- |
| Hero 활성 배경 | `/images/hero/roti-homesys-stage.png` | 없음 | 중앙과 바닥면 |
| Hero HOMESYS 카드 | `/images/brands/roti-homesys-card.png` | 2개 | 좌측 상단 카피 영역 |
| HOMESYS 브랜드 섹션 | `/images/sections/roti-homesys-brand-section.webp` | 4개 | 하단 중앙 카피 영역 |

Hero 카드가 선택되면 카드 이미지가 전환의 출발 이미지가 되고, 화면을 충분히 덮은 뒤 브랜드 섹션 이미지로 교차 전환된다. 따라서 카드와 브랜드 섹션 이미지는 달라도 되지만 벽, 바닥, 조명 톤은 연결되어야 한다.

---

## 7. 생성 프롬프트 작성 원칙

### 카드용 프롬프트에서 반드시 명시할 내용

```text
Portrait 4:5 website brand-card image.
Reserve the entire upper-left copy-safe area.
The left 60% across the upper 50% must contain only a plain, low-contrast wall.
No product, handle, shelf, shadow, reflection, or light beam may enter this area.
Place one compact product in the lower-left quadrant.
Place the taller product on the far right and keep its frame inside the rightmost 35%.
Show complete product silhouettes with generous margins and natural contact shadows.
No people, no text, no watermark, no bright white catalog background.
Preserve the reference products' wheel counts, frames, hinges, handles, and proportions.
```

### Hero 배경용 프롬프트에서 반드시 명시할 내용

```text
Wide empty premium utility-room stage for three foreground brand cards.
No products and no people.
Show a clear floor plane with a natural wall-to-floor boundary.
Keep the center uncluttered and place subtle pantry shelving only at the far edges.
Use restrained warm-gray concrete, charcoal flooring, and soft directional light.
```

### 브랜드 섹션용 프롬프트에서 반드시 명시할 내용

```text
Wide ROTI HOMESYS brand-scene image with three or more different utility products.
Arrange the products as a curated lineup on one continuous floor plane.
Keep each silhouette complete, separated, and structurally faithful to its reference.
Maintain a quiet lower-center area for overlaid brand copy.
Match the warm-gray concrete and charcoal visual family, but use a composition distinct from the Hero and card images.
No people, no text, no watermark, and no shopping-mall product-grid styling.
```

---

## 8. 최종 검수 체크리스트

### 카드

- [ ] 좌측 상단 카피 영역에 제품 손잡이가 들어오지 않는가?
- [ ] 브랜드명, 설명, 키워드와 제품이 겹치지 않는가?
- [ ] 작은 사이드 카드에서도 두 제품의 형태가 구분되는가?
- [ ] 모바일 크롭에서도 주력 제품이 사라지지 않는가?

### Hero 배경

- [ ] 제품이 없는 순수한 무대 배경인가?
- [ ] 카드 아래로 바닥면이 충분히 보이는가?
- [ ] 카드 그림자와 반사를 자연스럽게 받을 수 있는가?
- [ ] 배경이 카드보다 시각적으로 강하지 않은가?

### 브랜드 섹션

- [ ] 제품이 3개 이상 보이면서도 상품 목록처럼 보이지 않는가?
- [ ] 모든 제품의 바퀴와 프레임이 자연스러운가?
- [ ] 하단 중앙 카피와 중요한 제품 부품이 겹치지 않는가?
- [ ] 데스크톱과 모바일에서 핵심 제품이 유지되는가?

### 공통

- [ ] 세 이미지가 같은 브랜드 톤으로 연결되는가?
- [ ] 세 이미지가 서로 다른 용도와 구도를 갖는가?
- [ ] 이미지 안에 잘못된 텍스트나 임의 로고가 없는가?
- [ ] 제품의 바퀴, 손잡이, 힌지, 프레임이 원본과 맞는가?
- [ ] 너무 밝거나 지나치게 어둡지 않은가?
- [ ] 웹용 파일 크기와 형식이 적절한가?

---

## 9. 현재 결정 요약

- 최초 선택한 이미지 세트는 Hero 배경, 카드, 브랜드 섹션을 각각 분리해 적용했다.
- 이후 카드에서 텍스트와 긴 카트 손잡이가 겹치는 문제가 확인됐다.
- 카드 이미지는 좌측 상단을 비우도록 새로 생성한 두 시안 중 두 번째 시안으로 교체했다.
- 현재 카드 이미지는 발판 사다리를 좌측 하단에, 트랜스폼 카트를 우측에 배치한 버전이다.
- 향후 카드 이미지를 다시 생성하더라도 좌측 상단 카피 안전영역 규칙을 유지한다.

