# V2 Harness Addendum

## 추가 목적
기존 ZIP은 ROTI 메인페이지의 디자인 방향, 파일 생성 계획, 순차 프롬프트가 잘 정리되어 있다.  
다만 Codex를 에이전트 팀 + 하네스 엔지니어링 방식으로 안정적으로 운영하기에는 다음 항목이 부족했다.

- 루트 `AGENTS.md` 부재
- Design.md 준수 여부를 강제하는 게이트 규칙 부족
- 단계별 검수 기준의 구체성 부족
- Codex 작업 전용 시스템 프롬프트 부족
- 참조 이미지를 텍스트로 해석한 시각 목표 명세 부족
- 이후 카페24 쇼핑몰 연결을 위한 확장 경계 부족

## V2에서 추가한 파일
- `AGENTS.md`
- `handoff/AGENT_TEAM_AND_HARNESS_PLAN_V2.md`
- `handoff/VISUAL_TARGET_SPEC_FROM_REFERENCES.md`
- `harness/CODEX_RUNBOOK.md`
- `harness/DESIGN_COMPLIANCE_GATE.md`
- `harness/QA_CHECKPOINT_MATRIX.md`
- `harness/FUTURE_COMMERCE_EXTENSION_PLAN.md`
- `prompts/14_Codex-System-Prompt-Harness.md`
- `prompts/15_Phase-0-Repo-Audit-and-Harness-Setup.md`
- `prompts/16_Phase-1-Foundation.md`
- `prompts/17_Phase-2-Hero-Static-Implementation.md`
- `prompts/18_Phase-3-3D-Interaction.md`
- `prompts/19_Phase-4-Scroll-Brand-Sections.md`
- `prompts/20_Phase-5-QA-and-Polish.md`
- `templates/agent-task-card.md`
- `templates/design-compliance-report.md`
- `templates/qa-checkpoint-report.md`

## 사용 방식
1. GitHub 저장소 루트에 이 ZIP의 내용을 둔다.
2. Codex 첫 작업에는 `prompts/15_Phase-0-Repo-Audit-and-Harness-Setup.md`를 사용한다.
3. 실제 구현은 Phase 1부터 단계별로 진행한다.
4. 각 단계 완료 시 `harness/QA_CHECKPOINT_MATRIX.md`와 `harness/DESIGN_COMPLIANCE_GATE.md` 기준으로 검수한다.
