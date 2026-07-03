import { brands } from "@/data/brands";
import { CardShadowTestClient } from "./CardShadowTestClient";

export default function CardShadowTestPage() {
  return (
    <main className="card-shadow-test" aria-label="ROTI card shadow test">
      <CardShadowTestClient brands={brands} />
    </main>
  );
}
