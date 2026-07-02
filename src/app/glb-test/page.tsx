import { GlbCardPreview } from "@/components/test/GlbCardPreview";

export default function GlbTestPage() {
  return (
    <main className="glb-test-page" aria-label="GLB 카드 테스트 페이지">
      <GlbCardPreview modelPath="/models/roti-glass-card.glb" />
    </main>
  );
}
