"use client";

import { HeroGlassStage } from "@/components/hero/HeroGlassStage";
import { useBrandCarousel } from "@/hooks/useBrandCarousel";
import type { Brand } from "@/types/brand";

type CardShadowTestClientProps = {
  brands: Brand[];
};

export function CardShadowTestClient({ brands }: CardShadowTestClientProps) {
  const { activeBrandId, cardStates, selectBrand } = useBrandCarousel(brands);

  return (
    <div className="card-shadow-test__stage" aria-label="3D card shadow test stage">
      <HeroGlassStage
        brands={brands}
        activeBrandId={activeBrandId}
        cardStates={cardStates}
        onSelectBrand={selectBrand}
      />
    </div>
  );
}
