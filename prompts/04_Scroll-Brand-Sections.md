# 04_Scroll-Brand-Sections.md

## Prompt

`Design.md`를 먼저 읽고 시작하라.

이번 단계에서는 Hero 아래의 **브랜드 풀스크린 섹션 스크롤 경험**을 구현하라.
사용자가 아래로 스크롤하면, Hero의 카드 포털 경험이 자연스럽게 이어져서 **한 화면당 하나의 브랜드**가 꽉 차게 나타나야 한다.

### 목표
- Hero → Brand sections 전환
- scroll one-brand-per-screen 구조 구현
- 각 브랜드에 CTA 연결

### 반드시 구현할 내용
1. Hero 이후 아래 순서의 브랜드 섹션을 만든다.
   - ROTI CAMP
   - ROTI HOMESYS
   - LEEL
2. 각 섹션은 viewport를 꽉 채운다.
3. 각 섹션의 구조는 공통 레이아웃을 쓰되, 배경/카피/무드가 브랜드별로 달라야 한다.
4. 각 섹션에 아래를 포함한다.
   - 브랜드명
   - 짧은 헤드라인
   - 1~2줄 설명
   - CTA 버튼 (브랜드 바로가기)
5. 스크롤 경험은 가능하면 snap 또는 pin 전략으로 구현한다.
6. Hero에서 바로 다음 섹션으로 넘어갈 때, 연결감 있는 전환을 준다.
7. 텍스트는 reveal 모션, 배경은 subtle parallax 정도만 사용한다.

### 브랜드별 무드
- ROTI CAMP: dark outdoor / mountain / rest / movement
- ROTI HOMESYS: modern interior / organize / move / efficiency
- LEEL: premium kitchen / calm / clean / density

### 금지 사항
- 브랜드 섹션마다 레이아웃 시스템을 다르게 만들지 마라
- 설명을 길게 쓰지 마라
- 쇼핑몰 상품 리스트를 넣지 마라

### 완료 기준
- 사용자가 스크롤하면서 세 브랜드를 각각 하나의 장면처럼 체험할 수 있어야 한다.
