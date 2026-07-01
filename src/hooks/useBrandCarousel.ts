"use client";

import { useMemo, useState } from "react";
import type { Brand, BrandId } from "@/types/brand";
import { getHeroCardState, heroCardMotion } from "@/lib/animations/heroAnimations";

export function useBrandCarousel(brands: Brand[]) {
  const initialBrandId = brands[1]?.id ?? brands[0]?.id;
  const [activeBrandId, setActiveBrandId] = useState<BrandId | undefined>(initialBrandId);

  const activeBrand = useMemo(
    () => brands.find((brand) => brand.id === activeBrandId) ?? brands[0],
    [activeBrandId, brands]
  );

  const cardStates = useMemo(
    () =>
      brands.map((brand) => {
        const state = getHeroCardState(brand.id, brands, activeBrandId);

        return {
          ...state,
          motion: heroCardMotion[state.slot]
        };
      }),
    [activeBrandId, brands]
  );

  return {
    activeBrand,
    activeBrandId,
    cardStates,
    selectBrand: setActiveBrandId
  };
}
