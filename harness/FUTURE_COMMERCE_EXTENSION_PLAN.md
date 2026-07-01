# FUTURE_COMMERCE_EXTENSION_PLAN.md

## 목적
현재는 ROTI 통합 홈페이지 메인페이지를 만든다.  
이 문서는 이후 카페24 쇼핑몰 연결 단계에서 현재 구조를 어떻게 확장할지 정리한다.

## 현재 단계에서 하지 않는 것
- 카페24 실 API 연동
- 회원가입
- 장바구니
- 결제
- 주문 관리
- 배송 조회
- 카페24 토큰 저장/갱신
- 관리자 페이지

## 현재 단계에서 남겨둘 확장 포인트

### 브랜드 데이터
현재 `src/data/brands.ts`는 나중에 브랜드별 쇼핑몰 링크를 받을 수 있어야 한다.

예상 필드:
```ts
type Brand = {
  id: 'roticamp' | 'rotihomesys' | 'leel'
  name: string
  shortName: string
  headline: string
  description: string
  mood: string[]
  heroImage: string
  sectionImage: string
  brandUrl?: string
  shopUrl?: string
  cafe24CategoryId?: string
}
```

### CTA 링크
현재는 placeholder 또는 브랜드 소개 route를 사용한다.  
이후 쇼핑몰 연결 시 `shopUrl` 또는 Cafe24 상품/카테고리 URL로 연결한다.

### 파일 확장 계획
카페24 연동이 시작되면 아래 구조를 추가한다.

```txt
src/lib/cafe24/
  client.ts
  products.ts
  categories.ts
  mapper.ts
  types.ts
  mock-client.ts
```

### 상품 카드 구조
현재 메인페이지에서는 상품 리스트를 전면에 두지 않는다.  
향후 필요한 경우에도 “Featured Products”는 브랜드 진입을 보조하는 수준으로 제한한다.

## 향후 Phase

### Commerce Phase 1. 링크 연결
- 브랜드 CTA → 카페24 브랜드/카테고리 페이지 연결
- 상품 상세 직접 구현 없음
- 결제는 카페24로 이동

### Commerce Phase 2. 상품 미리보기
- 카페24 API 또는 수동 mock 데이터로 대표 상품 3~6개만 노출
- 가격/할인보다 브랜드 소개 맥락 우선
- 메인 Hero에는 상품 그리드 삽입 금지

### Commerce Phase 3. API 연동
- 서버 전용 Cafe24 API client 구현
- 상품 목록/상세 read-only 연동
- 품절/가격 표시
- 구매하기 → 카페24 상품 상세 또는 결제 흐름 이동

### Commerce Phase 4. 고도화
- SEO 구조화 데이터
- 추천 상품 관리
- 관리자/콘텐츠 관리 검토
- API mock / E2E / 보안 하네스 강화

## 보안 원칙
- Admin API secret은 브라우저에 노출하지 않는다.
- `NEXT_PUBLIC_` 환경변수에 secret을 넣지 않는다.
- 토큰 갱신 로직은 서버 전용으로 격리한다.
- 실제 결제/주문/회원은 카페24 기본 흐름을 우선 사용한다.
