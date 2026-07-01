import type { BrandId } from "@/types/brand";

export type HeroCardState = {
  brandId: BrandId;
  isActive: boolean;
};

export function getHeroCardState(brandId: BrandId, activeBrandId: BrandId | undefined): HeroCardState {
  return {
    brandId,
    isActive: brandId === activeBrandId
  };
}
