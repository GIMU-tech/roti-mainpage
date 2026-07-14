# P1 기준선 및 인터랙션 진단

진단일: 2026-07-13  
범위: `RELEASE_DESIGN_CONTENT_REVISION_PLAN`의 기준 상태 고정 + Goal 1 원인 진단  
원칙: 기존 사용자 소유 diff를 보존하고 제품 코드는 수정하지 않음

## 기준 상태

- 브랜치: `test3` (`origin/test3` 추적)
- 기존 수정 파일:
  - `src/components/transitions/BrandTransitionProvider.tsx`
  - `src/hooks/useBrandTransitionTimeline.ts`
  - `src/lib/animations/brandTransitionConfig.ts`
  - `src/styles/brand-transition.css`
- 기존 전환 수정은 사용자 소유 변경으로 유지함.
- 진단 화면: 데스크톱 `1440×900`, 모바일 `390×844`

## 진단 결과

| 항목 | 결과 | 측정 근거 | 판정 |
| --- | --- | --- | --- |
| 모바일 Hero 화살표 | 재현 | 이전/다음 화살표는 각각 `44×44px`이지만 중앙점의 실제 hit target이 두 경우 모두 `ROTI HOMESYS` 카드임. 다음 화살표 위치를 실제 탭하면 카드 전환 단계가 실행되고 `scrollY 1789`로 브랜드 장면에 진입함. | P1 |
| 데스크톱 측면 카드 hit test | 재현 | ROTI CAMP 측면 카드의 시각 rect는 `250×388px`이지만 중앙과 오른쪽 표본점은 카드가 아니라 부모 레이어를 hit함. 왼쪽 일부 영역에서만 카드 클릭 가능. | P1 |
| 모바일 측면 카드 hit test | 재현 | ROTI CAMP 왼쪽 카드는 rect 대부분이 화면 밖에 있고, 화면 안쪽 표본점은 이전 화살표 또는 중앙 카드와 겹침. 측면 카드 직접 선택이 안정적이지 않음. | P1 |
| 중앙 카드 전환 도착 | 데스크톱 정상 | HOMESYS anchor top `0px`, 실제 frame `0,0,1425,900`, 전환 lock 해제 확인. | 통과 |
| 측면 카드 전환 순서 | 데스크톱 정상 | 실제 카드가 hit되는 영역에서 CAMP를 누르면 `centering → expanding → syncing → revealing` 순서 후 anchor top `0px` 도착. | 통과, hit test 수정 필요 |
| 모바일 전환 도착 | 일부 잔여 오차 | HOMESYS anchor top은 `0px`이지만 실제 frame은 top 약 `7px`, bottom 약 `848px`로 측정됨. 과거 보고의 `50~60px` 오차는 현재 diff 기준으로 재현되지 않았지만 완료 허용치 `3px`은 넘음. | P1 |
| 전환 후 focus | 재현 | 데스크톱과 모바일 모두 전환 완료 후 `document.activeElement`가 `BODY`. 대상 heading에는 `tabIndex`가 없고 focus 이동 코드도 없음. | P1 접근성 |
| 전환 안내 live region | 미구현 | 브랜드별 `accessibilityLabel` 데이터는 있으나 전환 전용 `aria-live` 출력에 사용되지 않음. Hero meta의 live region은 active 카드 정보용임. | P1 접근성 |
| ABOUT 직접 이동 | 현재 재현 안 됨 | 데스크톱에서 About top `0px`, LeEL viewport bottom `0px`, 화면 상단 hit element가 About section으로 확인됨. | 현재 통과 |
| CONTACT 직접 이동 | 잔존 문제 재현 안 됨 | 데스크톱에서 Footer top `0px`, Connect bottom `0px`, Standard bottom `-900px`. 이전 pinned section이 덮지 않음. | 현재 통과 |
| CONTACT 목적지 | 구조 결정 필요 | 현재 `CONTACT`는 `#roti-footer`로 연결됨. 출시 계획 권장은 Connect `#group`이며 사용자 결정이 필요한 IA 변경임. | Goal 3 결정 |

## 원인

### 1. 모바일 화살표 오작동

이벤트 전파 문제가 아니라 stacking/hit-test 문제다.

- 화살표 컨테이너는 `z-index: 12`지만 Hero stage가 `preserve-3d`이고 중앙 카드는 `translateZ(95px)`를 사용한다.
- 실제 브라우저 hit test에서 화살표 중앙점이 화살표가 아니라 중앙 카드로 판정된다.
- 따라서 `stopPropagation`으로 해결할 문제가 아니며, 컨트롤을 카드 3D 장면보다 확실히 앞선 독립 상호작용 레이어로 분리해야 한다.

관련 파일:

- `src/styles/sections/hero.css`
- `src/styles/responsive.css`
- 필요 시 `src/components/hero/BrandCarousel.tsx`

### 2. 측면 카드 클릭 영역 불일치

시각적 bounding rect와 실제 투영된 hit 영역이 일치하지 않는다. 모바일에서는 측면 카드가 화면 밖으로 크게 밀리고 화살표·중앙 카드와 겹친다.

관련 파일:

- `src/styles/sections/hero.css`
- `src/styles/responsive.css`
- `src/components/hero/BrandCard.tsx`

### 3. 모바일 전환 종료 시 잔여 오차

전환 도착 확인은 브랜드 anchor의 `getBoundingClientRect().top`만 검사한다. 모바일 ScrollTrigger의 실제 frame은 scrub/snap 과정에서 anchor가 0에 도착한 뒤에도 수 px 움직일 수 있다. 현재 reveal 정착 로직은 당시의 frame 위치를 측정하지만, frame 자체의 안정 상태를 완료 조건으로 확인하지 않는다.

관련 파일:

- `src/components/transitions/BrandTransitionProvider.tsx`
- `src/hooks/useBrandTransitionTimeline.ts`
- `src/components/sections/BrandSlideStack.tsx`
- `src/components/scroll/SmoothScrollProvider.tsx`

### 4. 포커스와 전환 안내 누락

전환 완료 후 대상 heading에 focus하는 코드가 없고, 브랜드 데이터의 `accessibilityLabel`도 전환 전용 live region에 연결되지 않았다.

관련 파일:

- `src/components/transitions/BrandTransitionProvider.tsx`
- `src/components/transitions/BrandTransitionOverlay.tsx`
- `src/components/sections/BrandSlideStack.tsx`

## 다음 Goal 수정 범위

### Goal 2

1. Hero 컨트롤을 카드 3D 렌더링보다 확실히 앞선 hit-test 레이어로 분리
2. 모바일 측면 카드의 화면 내 노출과 실제 클릭 영역 재설계
3. 화살표 3회 연속 조작 시 active index만 바뀌고 `scrollY`는 유지되는지 검증
4. anchor뿐 아니라 실제 target frame의 위치와 안정 상태를 전환 완료 조건에 포함
5. 성공 후 대상 heading focus 및 전환 전용 `aria-live="polite"` 추가
6. 실패·resize·orientation change에서 기존 lock 복구 유지

### Goal 3

- ABOUT·CONTACT pinned 잔존 문제는 현재 기준에서 재현되지 않았으므로 임의 보정은 추가하지 않는다.
- CONTACT 목적지를 Footer에서 Connect로 변경할지는 사용자 결정 후 반영한다.
- 변경 시 공통 목적지 계산과 직접 이동 회귀 검증만 수행한다.

## 재현되지 않은 보고 항목

- 데스크톱 ABOUT에서 LeEL 장면이 화면을 덮는 증상
- 데스크톱 CONTACT에서 Standard 또는 Connect 고정 상태가 남는 증상
- 모바일 전환이 target보다 `50~60px` 앞에서 끝나는 증상

위 항목은 현재 작업 트리와 테스트 환경에서는 재현되지 않았다. 모바일 전환의 잔여 오차는 약 `7px`로 별도 기록한다.
