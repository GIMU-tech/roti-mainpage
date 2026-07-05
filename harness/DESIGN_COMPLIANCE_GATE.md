# DESIGN_COMPLIANCE_GATE.md

## 목적
Codex가 `Design.md`를 단순히 “읽었다”고 말하는 데서 끝나지 않고, 실제 구현 결과가 디자인 기준을 통과하는지 강제하기 위한 게이트 문서다.

## Pre-flight Gate
모든 작업 시작 전 다음을 응답하거나 내부 계획에 반영해야 한다.

```md
## Pre-flight Design Check
- 이번 작업에서 참조한 Design.md 항목:
- 이번 작업의 디자인 변경 범위:
- 건드리면 안 되는 요소:
- 예상 리스크:
```

## Blocking Rules
아래 항목 중 하나라도 발생하면 해당 작업은 FAIL이다.

### P1 Blockers
- Hero 화살표가 상품 슬라이더처럼 과하거나 commerce UI처럼 보임
- Hero를 상품 나열형 쇼핑몰 구조로 바꿈
- 녹색을 메인 히어로 포인트로 사용함
- `Design.md`와 충돌하는 밝은 화이트 중심 테마로 변경함
- ROTI CAMP / ROTI HOMESYS / LEEL 중 하나가 누락됨
- 화살표 기반 카드 회전 구조가 사라짐
- 카드 클릭 시 브랜드 섹션으로 이동하지 않음
- 스크롤 one-brand-per-screen 구조가 사라짐
- 빌드가 실패함
- 모바일에서 주요 콘텐츠가 보이지 않음

### P2 Issues
- 레드 glow가 과도함
- 텍스트가 과밀함
- 브랜드별 분위기 차이가 없음
- CTA가 불명확함
- 헤더 가독성이 낮음
- 애니메이션이 과격하거나 어색함
- reduced-motion 대응이 없음

### P3 Improvements
- 카피 문구 더 정리 필요
- hover/touch 감도 보정 필요
- spacing 또는 typography 미세 조정 필요
- 이미지 최적화 여지 있음

## Required Post-flight Report
각 작업 완료 후 아래 체크리스트를 작성해야 한다.

```md
## Design.md Compliance Check
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
```

## Manual Visual Review Checklist
이미지/브라우저로 반드시 확인할 항목:

- 첫 화면이 `04_dark_red_hero_concept_v2_preferred_top_nav.png`의 방향과 유사한가?
- Header가 상단 우측 네비게이션 구조인가?
- 카드 3개가 중앙 무대처럼 보이는가?
- 중앙 카드와 좌우 카드의 깊이감이 명확한가?
- 레드 포인트가 하단 glow/line 수준으로 절제되어 있는가?
- Hero 아래 스크롤 시 한 화면당 하나의 브랜드 장면으로 전환되는가?
