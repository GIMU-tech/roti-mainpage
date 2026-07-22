# ROTI 메인페이지 출시 전 디자인·콘텐츠 수정 실행 계획

작성일: 2026-07-13  
목적: 현재 세션의 디자인 리뷰와 `ROTI BUSINESS PLAN.pdf` 검토 결과를 다른 Codex 세션에서 즉시 이어서 실행하기 위한 인수인계 문서

---

## 1. 이 문서의 결론

현재 메인페이지는 첫 화면의 시각 완성도와 브랜드 포털 구조는 충분히 좋다. 그러나 지금 상태로 출시하면 안 된다.

출시 전 반드시 해결할 항목은 다음 네 가지다.

1. 모바일 Hero 화살표와 카드 전환의 목적지 오류
2. 데스크톱 고정 스크롤 섹션과 `ABOUT`·`CONTACT` 앵커의 경계 오류
3. Hero 카드와 브랜드 장면 사이의 이미지·크롭·명도 불연속
4. 실제 연락 수단으로 연결되지 않는 문의 CTA

이미지는 교체 예정이므로 현재 이미지의 색보정이나 세부 크롭을 최종 품질로 다듬는 작업은 보류한다. 대신 새 이미지가 들어와도 전환 구조가 흔들리지 않도록 이미지 규격, focal point, 오버레이, 모바일 대체 자산 구조를 먼저 확정한다.

카피는 전면 수정 대상으로 본다. 2022년 사업계획서의 표현은 브랜드 태도와 회사 정의를 정리하는 근거로 활용하되, 오래된 수치·연락처·인증·거래처·가격 우위·점유율 표현은 현재 확인 없이 사용하지 않는다.

---

## 2. 작업 시작 시 반드시 지킬 기준

### 2.1 권한 우선순위

1. 새 세션에서 사용자가 전달하는 최신 요청
2. 새 세션의 `/goal`
3. `Design.md`
4. `AGENTS.md`
5. 이 문서
6. 기존 handoff·harness·과거 계획 문서

과거 문서에 Hero 화살표 없음, 두 번 클릭, 즉시 앵커 점프, 수동 Intro 진행 등이 적혀 있더라도 적용하지 않는다.

### 2.2 금지 범위

- 쇼핑몰형 제품 리스트, 가격, 할인, 리뷰, 장바구니, 결제, 회원 기능 추가 금지
- Cafe24 API 작업 금지
- 별도 Brand Portfolio 섹션 추가 금지
- 새 애니메이션 라이브러리 추가 금지
- 현재 수정 목표와 무관한 전역 CSS 정리 금지
- 검증되지 않은 품질·인증·판매량·1위·점유율·납품·파트너 주장 금지
- 이미지가 교체되기 전에 현재 이미지에 맞춘 과도한 픽셀 튜닝 금지
- 사용자 승인 전 commit, push, PR 생성·병합 금지

---

## 3. 새 세션 재시작 순서

새 세션은 다음 순서로 시작한다.

1. `Design.md` 읽기
2. `AGENTS.md` 읽기
3. 이 문서 읽기
4. `handoff/PROJECT_CONTEXT_FOR_AI.md`
5. `handoff/CODEX_SETUP_BRIEF.md`
6. `handoff/AGENT_TEAM_AND_HARNESS_PLAN_V2.md`
7. `handoff/VISUAL_TARGET_SPEC_FROM_REFERENCES.md`
8. `handoff/REFERENCE_MANIFEST.md`
9. `handoff/phase-4-section-enhancement.md`
10. `01_File-Generation-Plan.md`
11. `02_Project-Structure.md`
12. `prompts/00_Global-Rules.md`
13. `harness/DESIGN_COMPLIANCE_GATE.md`
14. `harness/QA_CHECKPOINT_MATRIX.md`
15. `harness/phase-4-section-gates.md`
16. `git status --short --branch`
17. 아래 네 파일의 기존 diff를 먼저 확인
    - `src/components/transitions/BrandTransitionProvider.tsx`
    - `src/hooks/useBrandTransitionTimeline.ts`
    - `src/lib/animations/brandTransitionConfig.ts`
    - `src/styles/brand-transition.css`
18. 개발 서버 실행 후 기존 화면을 데스크톱 1440×900, 모바일 390×844에서 다시 재현
19. `/goal` 하나만 구현
20. `pnpm lint`, `pnpm typecheck`, `pnpm build` 실행 후 중단하고 보고

현재 작업 트리에는 위 네 전환 파일의 기존 수정 사항이 있다. 새 세션은 이를 사용자 소유 변경으로 간주하고 덮어쓰거나 되돌리지 않는다.

현재 디자인 리뷰 캡처는 다음 폴더에 있다.

The historical release-review captures were removed from the current tree on
2026-07-22. They remain recoverable from Git history and the
`backup/pre-cleanup-2026-07-22` tag.

---

## 4. 현재 홈페이지 구조 평가

현재 구성 순서는 적절하다.

1. Intro
2. Hero
3. ROTI CAMP Scene
4. ROTI HOMESYS Scene
5. LeEL Scene
6. About ROTI
7. ROTI Standard
8. ROTI Connect
9. Footer / Contact

섹션 순서를 크게 바꾸지 않는다. 문제는 IA 자체보다 각 구간의 목적이 카피에서 선명하지 않고, 고정 스크롤과 직접 이동이 충돌하며, 문의가 실제 행동으로 끝나지 않는다는 점이다.

### 유지할 디자인

- Hero의 검은 무대와 안개
- 중앙 카드가 가장 크고 선명한 3장 구조
- 절제된 좌우 화살표
- 한 번 클릭으로 브랜드 장면에 진입하는 방향
- About의 좌우 편집 레이아웃
- Standard의 큰 이미지와 세 기준 구성
- Connect의 문의 유형 분류와 탭 구조
- 모바일 전체 메뉴의 시각 구조

### 바꿔야 할 디자인

- Hero 화살표의 모바일 인지성 및 hit test
- 카드 확장 시 Hero 이미지에서 브랜드 장면 이미지로 바뀌는 타이밍
- 밝은 브랜드 장면 위 로고·설명 대비
- 검은 About에서 순백색 Standard로 바뀌는 급격한 톤 전환
- Connect 모바일 좌우 화살표의 작은 터치 크기
- Footer 진입 직전 헤더의 밝은 배경·로고 대비 경계

---

## 5. 사업계획서 검토 결과

참조 문서:

```text
//yj_trade/YJ무역/▶4.디자인/007_소개제안/001_소개서/2022 ROTI BUSINESS PLAN/ROTI BUSINESS PLAN.pdf
```

이 문서는 2022년에 작성된 48페이지 이미지형 PDF다. 홈페이지에 활용할 수 있는 내용과 사용할 수 없는 내용을 구분해야 한다.

### 5.1 활용 가능한 근거

| PDF 페이지 | 문서 내용 | 홈페이지 활용 방식 |
| --- | --- | --- |
| p.2 | `Always alert for changes`, `변화에 항상 깨어있다.` | ROTI의 태도와 About 헤드라인의 근거로 활용 가능 |
| p.3 | ROTI는 캠핑용품과 생활용품을 전문적으로 기획하고 판매하는 기업이라는 설명 | 회사 정의를 직접적으로 설명하는 About 본문 근거로 활용 가능. 현재 사업 범위 확인 필요 |
| p.10 | ROTI CAMP는 캠핑을 누구나 쉽게 즐기게 한다는 목적 | CAMP 장면 카피 근거로 활용 가능. `우수한 품질` 표현은 제외 |
| p.10 | ROTI HOMESYS는 기존 생활방식의 불편을 발견하고 개선한다는 목적 | HOMESYS 장면과 Standard 카피 근거로 활용 가능 |
| p.37 | 현재에 안주하지 않고 변화와 미래를 만드는 기업, 쉬운 사용과 기능을 중시한다는 방향 | About·Standard의 태도 문구로 재작성 가능 |
| p.38~39 | 캠핑과 생활용품의 경계를 넘고, 사용·수납·기능을 다시 구성한다는 설명 | 브랜드 그룹 설명 및 실용성 기준의 근거로 활용 가능 |
| p.47 | 전화 `1800-8523`, 이메일 `rt@rotimall.com`, 홈페이지 `rotimall.com` | 2022년 정보이므로 현재 운영 여부를 확인한 뒤에만 Footer·Connect에 사용 |

### 5.2 홈페이지에 그대로 사용하면 안 되는 내용

- p.7의 `우수한 품질`, `부담 없는 가격`, 중국 생산 원가절감 표현
- p.12의 `74%`, `1st` 등 근거가 현재 확인되지 않는 수치·순위
- p.13, p.15~16, p.34~35, p.42 등의 인원·매출·수출입·파트너·판매 채널 정보
- p.9의 상표등록·인증 자료를 근거로 한 인증 마케팅 문구
- 2022년 당시의 직원 수, 조직도, 사업 확장 계획
- `LeEL` 설명. 이 PDF에는 현재 홈페이지의 LeEL 브랜드 근거가 없다.

### 5.3 카피 확정 전 사용자 확인이 필요한 사실

- 회사 설립·법인 전환 연혁을 홈페이지에 공개할지
- 현재도 `캠핑용품과 생활용품을 전문적으로 기획하고 판매하는 기업`이라는 정의가 정확한지
- 현재 대표 전화가 `1800-8523`인지
- `rt@rotimall.com`을 공개 문의 메일로 사용해도 되는지
- `rotimall.com`이 현재 연결해야 하는 공식 사이트인지
- ROTI CAMP, ROTI HOMESYS, LeEL 각각의 공식 외부 URL
- LeEL의 현재 제품 범위와 공식 브랜드 정의
- 개인정보처리방침의 실제 URL

---

## 6. 권장 카피 개편안

아래 문구는 코드에 바로 넣는 최종 확정본이 아니라, 사업계획서와 현재 `Design.md`를 조합한 1차 승인안이다. 새 세션은 사용자 승인을 받거나 최신 회사 자료로 교차 확인한 뒤 적용한다.

### 6.1 Hero

현재:

```text
일상을 위한 세 가지 기준
이동, 정리, 휴식을 위한 서로 다른 해석
```

권장:

```text
변화하는 일상에, 더 나은 쓰임을.
캠핑부터 홈리빙과 키친까지, 생활의 불편을 살피고 사용의 기준을 다시 만듭니다.
```

보조 영문 또는 작은 레이블:

```text
ALWAYS ALERT FOR CHANGES
```

근거: PDF p.2, p.3, p.10, p.37  
주의: Hero에서 긴 회사 설명은 넣지 않는다.

### 6.2 ROTI CAMP

현재:

```text
밖으로 향하는 생활
캠핑과 이동을 위한 실용 브랜드
```

권장:

```text
캠핑을 더 쉽게, 바깥의 시간을 더 편안하게.
누구나 부담 없이 캠핑을 시작하고 즐길 수 있도록 사용이 간편한 캠핑용품을 제안합니다.
```

키워드:

```text
캠핑 · 이동 · 휴식
```

근거: PDF p.10  
제외: `품질이 우수한`, `부담 없는 가격` 같은 검증 필요 표현

### 6.3 ROTI HOMESYS

현재:

```text
정리되는 집
수납과 이동을 정돈하는 홈 시스템 브랜드
```

권장:

```text
생활의 불편을 발견하고, 쓰임을 다시 정리합니다.
수납과 이동, 사용 순서에서 생기는 불편을 살피고 생활의 편리함을 위한 제품을 제안합니다.
```

키워드:

```text
수납 · 이동 · 생활 동선
```

근거: PDF p.10, p.38~39

### 6.4 LeEL

현재:

```text
차분한 주방과 리빙
주방과 생활 공간을 정갈하게 제안하는 브랜드
```

임시 권장:

```text
주방과 생활 공간을 정갈하게.
소재와 형태, 여백의 균형으로 일상 공간을 차분하게 정돈합니다.
```

키워드:

```text
주방 · 소재 · 여백
```

근거: 현재 `Design.md`의 브랜드 방향  
주의: 사업계획서에는 LeEL 자료가 없으므로 최신 브랜드 소개서가 확보되기 전까지 `임시 문구`로 표시한다.

### 6.5 About ROTI

현재:

```text
변화를 읽고, 필요를 나누고, 장면을 만듭니다.
ROTI는 달라지는 일상의 필요를 세 가지 브랜드 장면으로 정리합니다.
```

권장:

```text
현재에 머물지 않고, 변화하는 생활을 읽습니다.
ROTI는 캠핑용품과 생활용품을 전문적으로 기획해 온 기업입니다.
ROTI CAMP, ROTI HOMESYS, LeEL을 통해 야외·홈리빙·키친의 서로 다른 생활 장면을 제안합니다.
```

짧은 보조 문구:

```text
필요한 기능을 더 쉽게, 익숙한 생활을 더 편리하게.
```

근거: PDF p.2, p.3, p.37  
주의: `기획해 온 기업`이라는 정의와 LeEL 포함 범위는 현재 사실 확인 후 확정한다.

### 6.6 ROTI Standard

섹션 제목 권장:

```text
제품은 쓰이는 장면에서 시작합니다.
```

Standard 01:

```text
실용적인 사용
필요한 기능이 쉽게 읽히고 반복 사용에도 자연스러운지 살핍니다.
```

Standard 02:

```text
생활 흐름 개선
보관 위치, 사용 순서, 이동 방식을 다시 정리합니다.
```

Standard 03:

```text
확인 가능한 디테일
소재, 구조, 마감처럼 눈과 손으로 확인할 수 있는 기준을 설명합니다.
```

근거: PDF p.10, p.37~39 및 현재 `Design.md`  
주의: 시험·검사 근거가 없다면 `검증된 품질`이라는 표현을 사용하지 않는다.

### 6.7 ROTI Connect

현재:

```text
로티와 함께하세요.
```

권장:

```text
문의 목적에 맞는 창구를 안내합니다.
제품과 구매 문의, 기업·단체 구매, 유통과 협업 문의를 구분해 안내합니다.
```

카테고리 문구:

```text
고객·제품 문의 → 제품 및 구매 문의
대량 구매·기업 문의 → 기업·단체 구매 문의
유통·입점·협업 → 유통·입점·협업 문의
```

CTA는 `문의 정보 보기`처럼 추상적으로 쓰지 않는다.

```text
제품 문의하기
기업 구매 문의하기
유통·협업 문의하기
```

각 CTA는 확인된 전화·메일·외부 문의 페이지 중 목적에 맞는 실제 목적지로 연결한다.

### 6.8 Footer

보조 설명 권장:

```text
ROTI는 캠핑·홈리빙·키친을 전개하는 브랜드 그룹입니다.
```

반드시 포함할 항목:

- 현재 확인된 대표 연락처
- 현재 확인된 문의 이메일 또는 문의 페이지
- 개인정보처리방침 링크
- 브랜드별 외부 사이트가 있다면 실제 링크

2022년 PDF p.47의 연락처를 확인 없이 복사하지 않는다.

---

## 7. 이미지 교체 계획

### 7.1 기본 원칙

- 현재 이미지는 임시 자산으로 본다.
- Hero 카드와 브랜드 Scene은 가능하면 같은 촬영 세트 또는 같은 마스터 이미지에서 파생한다.
- 다른 이미지를 사용할 때는 피사체, 광원 방향, 색온도, 명도, focal point를 맞춘다.
- 카드가 화면을 대부분 덮기 전에는 section image로 crossfade하지 않는다.
- 모바일은 데스크톱 이미지를 억지로 자르지 않고 별도 세로 자산을 우선한다.
- 새 이미지가 오기 전에는 현재 이미지 기준의 최종 crop·색보정 값을 확정하지 않는다.

### 7.2 필요한 자산 목록

| 구간 | 브랜드/용도 | 데스크톱 권장 | 모바일 권장 | 핵심 조건 |
| --- | --- | --- | --- | --- |
| Hero Card | ROTI CAMP | 세로 카드 크롭 가능한 고해상도 | 4:5 또는 3:4 | 어두운 야외, 장비 또는 텐트, 낮은 조도 |
| Brand Scene | ROTI CAMP | 16:9 이상 | 9:16 | Hero와 동일 피사체·톤, 산·이동·캠핑 분위기 |
| Hero Card | ROTI HOMESYS | 세로 카드 크롭 가능한 고해상도 | 4:5 또는 3:4 | 수납 구조와 정돈된 실내 |
| Brand Scene | ROTI HOMESYS | 16:9 이상 | 9:16 | Hero와 동일 공간·광원, 따뜻한 실내 조명 |
| Hero Card | LeEL | 세로 카드 크롭 가능한 고해상도 | 4:5 또는 3:4 | 주방, 스틸, 스톤, 낮은 채도 |
| Brand Scene | LeEL | 16:9 이상 | 9:16 | 컬러 스툴 중심 장면 제외, 주방·소재·여백 중심 |
| Standard | 3장 | 4:5 또는 세로 3:4 | 동일 이미지 또는 별도 세로 | 실용·흐름·디테일을 각각 직접 보여줄 것 |
| Connect | 3장 | 16:9 | 5:8 또는 9:16 | 제품, 기업 구매, 협업의 상황이 서로 구분될 것 |
| Footer | 회사 공간 | 16:9 | 9:16 | 실제 회사 공간이면 최신 이미지와 사용 승인 확인 |

### 7.3 자산 전달 시 함께 받아야 할 정보

- 파일명과 브랜드
- 사용 권리·촬영 출처
- 데스크톱 focal point
- 모바일 focal point
- 밝은 글자 또는 어두운 글자 중 어떤 오버레이가 적합한지
- Hero 카드와 Brand Scene이 같은 촬영 세트인지 여부
- 모바일 별도 파일 존재 여부

### 7.4 이미지 교체 완료 기준

- 카드 확장 도중 검은 프레임, 빈 프레임, 갑작스러운 밝기 변화 없음
- 피사체가 crossfade 전후에 다른 위치로 점프하지 않음
- 데스크톱 1440×900, 태블릿 768×1024, 모바일 390×844에서 핵심 피사체가 잘리지 않음
- 밝은 장면에서도 로고·설명·CTA 대비 확보
- 실제 렌더링 크기에 맞는 `sizes` 사용
- 이미지별 구체적인 alt 문구 작성
- Next Image `quality` 설정 경고 제거

---

## 8. 단계별 구현 계획

한 번에 전체를 수정하지 않는다. 아래 단계를 각각 독립적인 `/goal`로 실행한다.

### Goal 1. P1 인터랙션 재현과 원인 확정

목적: 리뷰에서 발견된 증상을 현재 브라우저에서 다시 재현하고 수정 범위를 확정한다.

확인할 증상:

1. 모바일 다음 화살표가 카드 회전 대신 브랜드 장면 진입을 발생시키는지
2. 측면 카드 전환이 target section보다 약 50~60px 앞에서 끝나는지
3. 데스크톱 `ABOUT` 클릭 시 LeEL 고정 장면이 계속 덮는지
4. 데스크톱 `CONTACT` 클릭 시 Standard 또는 Connect 고정 상태가 남는지
5. 전환 후 대상 브랜드 heading에 focus가 이동하는지

진단 대상:

- `src/components/hero/BrandCarousel.tsx`
- `src/components/hero/BrandCard.tsx`
- `src/styles/sections/hero.css`
- `src/styles/responsive.css`
- `src/components/transitions/BrandTransitionProvider.tsx`
- `src/hooks/useBrandTransitionTimeline.ts`
- `src/lib/animations/brandTransitionConfig.ts`
- `src/components/scroll/SmoothScrollProvider.tsx`
- `src/components/sections/BrandSlideStack.tsx`
- `src/components/layout/Header.tsx`

진단 원칙:

- 화살표 문제는 먼저 stacking, hit test, pointer-events, 실제 클릭 target을 확인한다.
- 원인 확인 없이 `stopPropagation`만 추가하지 않는다.
- 고정 섹션의 wrapper top과 실제 보이는 content start를 구분한다.
- ScrollTrigger pin spacing과 Lenis target 계산이 같은 프레임에서 최신 상태인지 확인한다.
- debug log·테스트 속성은 진단 후 제거한다.

완료 기준:

- 원인·재현 조건·수정 파일이 문서화됨
- 코드 변경 없이도 재현이 안 되면 `재현 불가`로 사실대로 보고
- 이후 Goal에서 고칠 항목이 P1/P2로 분리됨

### Goal 2. Hero 화살표와 카드 전환 안정화

목적: 화살표는 회전만 하고, 카드는 한 번 클릭으로 정확한 브랜드 장면에 도착하게 한다.

구현 요구:

- 모바일·데스크톱 화살표가 active index만 변경
- 화살표 클릭 시 scrollY가 변하지 않음
- 측면 카드 한 번 클릭 → 중앙 정렬 → `rotateY(0)` → fullscreen 확장
- 중앙 카드 한 번 클릭 → 바로 fullscreen 확장
- section image crossfade는 overlay가 viewport를 충분히 덮은 이후 시작
- section scroll sync 완료 후 실제 target frame 위치를 다시 확인
- 3px 이상 오차가 남으면 overlay를 제거하지 말고 safe correction 또는 명시적 fallback 실행
- fallback timer가 실제 도착 확인 없이 revealing을 강제하지 않도록 검토
- 성공 후 target heading에 `preventScroll: true`로 focus
- transition intent를 별도 `aria-live="polite"` 메시지로 안내
- 실패·resize·orientation change·unmount 시 lock과 overlay 해제

수정 가능성이 높은 파일:

- `src/components/transitions/BrandTransitionProvider.tsx`
- `src/hooks/useBrandTransitionTimeline.ts`
- `src/lib/animations/brandTransitionConfig.ts`
- `src/styles/brand-transition.css`
- `src/components/hero/BrandCarousel.tsx`
- `src/styles/sections/hero.css`
- `src/styles/responsive.css`

완료 기준:

- 데스크톱·모바일에서 이전/다음 화살표 각각 3회 연속 조작 통과
- center, left, right 카드 진입 통과
- 빠른 연속 클릭 시 중복 전환 없음
- 전환 완료 오차 3px 이내 또는 공유 scroll controller의 명시적 완료 조건 충족
- 전환 후 페이지 scroll 가능
- reduced motion에서도 동일 목적지 도착

### Goal 3. Header 앵커와 pinned section 경계 수정

목적: 메뉴를 누르면 이전 고정 장면이 아닌 실제 대상 콘텐츠가 즉시 보여야 한다.

구현 요구:

- `ABOUT`, `STANDARD`, `CONTACT`, `BRAND` 각각의 visible destination 정의
- wrapper top이 pinned end와 겹치면 실제 콘텐츠 시작점 또는 안전한 post-pin point 사용
- 임의의 전역 `+1px` 보정보다 공통 계산 함수 또는 section config 기반 offset 사용
- ScrollTrigger layout이 바뀐 뒤 목적지 계산
- 직접 이동 완료 후 `ScrollTrigger.update()` 실행
- 레이아웃 변화가 있을 때만 `refresh()` 사용
- `CONTACT`를 Footer가 아니라 Connect로 연결할지 사용자 결정 반영
  - 권장: 상단 `CONTACT` → `#group` Connect
  - Connect CTA → 실제 연락처 또는 문의 페이지

수정 가능성이 높은 파일:

- `src/data/sections.ts`
- `src/data/navigation.ts`
- `src/lib/scroll/smoothScroll.ts`
- `src/components/scroll/SmoothScrollProvider.tsx`
- `src/components/layout/Header.tsx`
- `src/components/sections/BrandSlideStack.tsx`
- `src/components/sections/RotiBusinessReplicaSection.tsx`

완료 기준:

- 모든 메뉴 목적지가 첫 프레임부터 대상 콘텐츠를 보여줌
- 추가 wheel input이 없어도 도착한 것으로 인식 가능
- desktop/mobile/reduced motion 동일 결과
- Footer가 페이지 끝에서 완전히 접근 가능

### Goal 4. 회사·브랜드 카피 교체

목적: 추상적이고 반복되는 문구를 실제 회사와 브랜드를 설명하는 문구로 교체한다.

선행 조건:

- 6장의 권장 카피에 대한 사용자 승인
- LeEL 최신 정의 확인
- 현재 회사 사업 범위 확인
- 현재 연락처 확인

수정 대상:

- `src/components/hero/HeroPortal.tsx`
- `src/data/brands.ts`
- `src/components/sections/AboutRotiSection.tsx`
- `src/data/standards.ts`
- `src/components/sections/RotiBusinessReplicaSection.tsx`
- `src/data/rotiConnect.ts`
- `src/data/footer.ts`
- 필요 시 중복 카피를 줄이기 위한 전용 데이터 파일

카피 원칙:

- Hero는 감정적 한 문장 + 직접적인 설명 한 문장
- 브랜드 장면은 목적, 사용 장면, 차이를 한 번씩만 설명
- About은 회사가 무엇을 하는지 직접 설명
- Standard는 보증·인증이 아니라 관찰 가능한 설계 기준을 설명
- Connect는 문의 목적과 다음 행동을 명시
- 같은 세 브랜드 목록을 Hero, About, Footer에서 같은 문장으로 반복하지 않음

완료 기준:

- 사용자가 첫 화면과 About만 보고 ROTI가 어떤 기업인지 설명 가능
- 세 브랜드의 역할이 서로 겹치지 않음
- 검증되지 않은 마케팅 주장 없음
- 한국어 우선, 영문은 레이블과 브랜드명에 한정

### Goal 5. 이미지 교체 기반 마련

목적: 새 이미지가 전달되었을 때 파일 교체만으로 Hero·Scene·모바일 크롭을 안정적으로 관리한다.

구현 요구:

- 브랜드별 hero desktop/mobile, section desktop/mobile 자산 구분 검토
- `src/data/brands.ts`에 breakpoint별 focal point가 필요하면 타입 확장
- image preload 대상과 실제 transition source를 동일 데이터에서 가져옴
- 이미지 파일명과 data entry가 1:1로 대응
- 사용되지 않는 이전 이미지 삭제는 새 이미지 적용과 검증이 끝난 후 별도 cleanup goal에서만 수행

완료 기준:

- 새 이미지가 없어도 데이터 구조와 필요한 파일 목록이 문서화됨
- 새 이미지 전달 후 브랜드 하나씩 독립 교체 가능
- 기존 transition code에 브랜드별 조건문을 추가하지 않아도 됨

### Goal 6. 이미지 교체와 시각 연속성 보정

브랜드별로 하나씩 진행한다.

순서:

1. ROTI CAMP
2. ROTI HOMESYS
3. LeEL
4. Standard 3장
5. Connect 3세트
6. Footer

각 브랜드 완료 기준:

- Hero 카드 정지 화면 승인
- 화살표 회전 후 crop 승인
- center·side transition 중간 프레임 승인
- brand scene 도착 화면 승인
- 모바일 정지 화면·전환 승인
- 밝기·로고·CTA 대비 승인

### Goal 7. 섹션 톤 연결과 미세 디자인 보정

목적: 서로 다른 시안을 이어 붙인 느낌을 줄인다.

작업:

- About dark → Standard off-white 전환 구간의 배경·헤더 tone 보정
- 순백색 대신 ROTI Connect와 공유할 수 있는 warm off-white 검토
- Standard 이미지 카드의 radius, gutter, preview 폭 일관화
- Connect 모바일 화살표 최소 44×44px 확보
- Footer 진입 시 헤더 테마 전환 경계 보정
- Hero 화살표 contrast를 높이되 commerce carousel처럼 만들지 않음
- 밝은 브랜드 scene의 overlay gradient 보정

완료 기준:

- 섹션 전환 시 갑자기 다른 홈페이지처럼 보이지 않음
- 모든 주요 텍스트가 실제 이미지 위에서 읽힘
- 모바일에서 핵심 인터랙션 target 44×44px 이상

### Goal 8. 문의·법적 링크 완성

선행 조건:

- 현재 전화, 이메일, 외부 문의 페이지, 개인정보처리방침 URL 확인

작업:

- 상단 CONTACT 목적지 확정
- Connect 세 CTA 목적지 분리
- Footer에 실제 연락 수단 표시
- 개인정보처리방침을 실제 링크로 변경
- 브랜드 외부 링크가 확인되면 Footer 또는 brand scene CTA에 연결
- `tel:`, `mailto:` 사용 여부를 모바일 기준으로 검토

완료 기준:

- 사용자가 세 문의 유형 각각에서 실제 연락 행동을 완료할 수 있음
- placeholder `#` 링크 없음
- 현재 보고 있는 동일 섹션으로 되돌아가는 CTA 없음

### Goal 9. 최종 QA

필수 화면:

- 1440×900
- 768×1024
- 390×844

필수 시나리오:

- 첫 방문 Intro 자동 완료
- Skip과 fast-complete
- 재방문 session Intro 생략
- Hero 이전·다음 화살표
- center·left·right 카드 진입
- 빠른 반복 클릭
- 전환 중 wheel·touch·keyboard input
- ABOUT·STANDARD·CONTACT 직접 이동
- 모바일 메뉴 open/close/Escape
- Standard 세 단계
- Connect tabs/arrows/autoplay pause
- Footer 및 실제 문의 링크
- reduced motion
- resize와 orientation change

필수 명령:

```powershell
pnpm lint
pnpm typecheck
pnpm build
git diff --check
```

Playwright가 이미 설정된 경우에만 기존 E2E를 실행한다. 새 테스트 의존성 추가는 별도 승인 없이 하지 않는다.

---

## 9. P1/P2 우선순위표

### P1 - 출시 차단

| 항목 | 완료 조건 |
| --- | --- |
| 모바일 화살표가 브랜드 장면 진입을 발생시키는 문제 | 화살표 조작은 active card만 변경 |
| 모바일 전환이 target보다 일찍 끝나는 문제 | 실제 브랜드 frame과 transition overlay가 정렬된 뒤 종료 |
| ABOUT·CONTACT 앵커에서 이전 pinned section이 남는 문제 | 추가 스크롤 없이 대상 콘텐츠 노출 |
| 실제 문의 수단이 없는 문제 | Connect CTA가 확인된 연락 수단으로 연결 |
| 전환 후 scroll/focus 상태 불확실 | scroll 복구 및 대상 heading focus 확인 |

### P2 - 출시 품질 저하

| 항목 | 완료 조건 |
| --- | --- |
| Hero와 브랜드 Scene 이미지 불연속 | 같은 마스터 또는 일치하는 art direction 사용 |
| 밝은 장면 위 낮은 텍스트 대비 | 실제 이미지 기준 대비 확보 |
| Standard의 급격한 화이트 전환 | shared off-white 또는 연결 transition 적용 |
| About 카피가 추상적임 | 회사 정의와 세 브랜드 역할을 직접 설명 |
| Connect 모바일 화살표가 작음 | 최소 44×44px |
| Footer 개인정보처리방침이 텍스트임 | 실제 링크 연결 |
| Next Image quality 경고 | Next 설정 또는 quality 값 정리 |

---

## 10. 각 Goal 종료 시 필수 보고 형식

1. Summary
2. Changed Files
3. Implementation Notes
4. Tests / Checks Run
5. Design.md Compliance Check
6. Accessibility / Reduced Motion
7. Mobile / Performance
8. Scope violations
9. P1 Blockers
10. P2 Issues
11. Remaining cleanup / follow-up

Design.md 체크리스트:

- [ ] Brand portal, not shop
- [ ] Dark premium tone maintained
- [ ] Red accent used with restraint
- [ ] No green primary Hero accent
- [ ] Intro remains automatic, brief, and skippable
- [ ] Restrained arrow card-rotation controls preserved
- [ ] One-click card-to-brand transition preserved
- [ ] Side card centers before fullscreen expansion
- [ ] No immediate anchor jump before viewport coverage
- [ ] One-brand-per-screen structure preserved
- [ ] ROTI CAMP / ROTI HOMESYS / LeEL represented
- [ ] No unverified marketing claims added
- [ ] Scroll recovery and cleanup verified
- [ ] Mobile/accessibility/reduced-motion/performance risks noted

---

## 11. 새 세션에 그대로 붙여 넣을 시작 프롬프트

```text
이 저장소의 `Design.md`, `AGENTS.md`, `handoff/RELEASE_DESIGN_CONTENT_REVISION_PLAN.md`를 먼저 읽고 mandatory read order를 모두 지켜줘.

현재 작업 트리의 기존 변경은 사용자 소유이므로 덮어쓰거나 되돌리지 마. 특히 BrandTransitionProvider.tsx, useBrandTransitionTimeline.ts, brandTransitionConfig.ts, brand-transition.css의 기존 diff를 먼저 확인해.

이번 /goal은 [여기에 Goal 번호와 이름 입력]만 수행해. 이후 Goal을 미리 구현하지 마.

이미지는 교체 예정이므로 새 이미지가 없는 상태에서 현재 이미지에 맞춘 과도한 crop·색보정은 하지 마. 카피는 사업계획서의 근거와 문서의 검증 상태를 지키고, 확인되지 않은 연락처·수치·인증·순위·파트너를 추가하지 마.

작업 전 현재 증상을 데스크톱 1440×900과 모바일 390×844에서 재현하고, 작업 후 pnpm lint, pnpm typecheck, pnpm build, git diff --check를 실행해. commit, push, PR은 하지 마.
```

---

## 12. 최종 출시 승인 조건

다음 조건을 모두 만족해야 출시 후보로 판정한다.

- Hero 화살표와 카드 진입이 desktop/mobile에서 목적대로 분리됨
- 모든 카드가 한 번의 클릭 또는 탭으로 정확한 브랜드 장면에 도착
- pinned section과 상단 메뉴 직접 이동이 충돌하지 않음
- Intro·전환·스크롤이 어떤 실패 뒤에도 lock 상태를 남기지 않음
- 새 이미지가 Hero와 Scene 사이에서 연속적으로 보임
- ROTI가 어떤 기업이고 세 브랜드가 무엇을 담당하는지 카피만으로 이해 가능
- Connect에서 실제 문의 행동 완료 가능
- 연락처와 법적 링크가 현재 정보로 확인됨
- 390×844에서 주요 콘텐츠·CTA·메뉴가 안정적으로 보임
- 키보드 focus, live announcement, reduced motion 확인
- lint, typecheck, build, diff check 통과
- test route, debug log, 사용하지 않는 임시 이미지 제거
