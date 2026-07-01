"use client";

import { useMemo, useState } from "react";
import type { Brand, BrandId } from "@/types/brand";

export function useBrandCarousel(brands: Brand[]) {
  const initialBrandId = brands[1]?.id ?? brands[0]?.id;
  const [activeBrandId, setActiveBrandId] = useState<BrandId | undefined>(initialBrandId);

  const activeBrand = useMemo(
    () => brands.find((brand) => brand.id === activeBrandId) ?? brands[0],
    [activeBrandId, brands]
  );

  return {
    activeBrand,
    activeBrandId,
    selectBrand: setActiveBrandId
  };
}
