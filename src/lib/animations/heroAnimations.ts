import type { BrandId } from "@/types/brand";

export type HeroCardSlot = "center" | "left" | "right";

export type HeroCardState = {
  brandId: BrandId;
  isActive: boolean;
  slot: HeroCardSlot;
};

export const heroCardMotion = {
  center: {
    x: "0%",
    z: "150px",
    rotateY: "0deg",
    scale: 1.04,
    opacity: 1
  },
  left: {
    x: "-104%",
    z: "0px",
    rotateY: "32deg",
    scale: 0.78,
    opacity: 0.96
  },
  right: {
    x: "104%",
    z: "0px",
    rotateY: "-32deg",
    scale: 0.78,
    opacity: 0.96
  }
} satisfies Record<HeroCardSlot, Record<string, string | number>>;

export function getHeroCardSlot(
  brandId: BrandId,
  brands: { id: BrandId }[],
  activeBrandId: BrandId | undefined
): HeroCardSlot {
  const activeIndex = brands.findIndex((brand) => brand.id === activeBrandId);
  const cardIndex = brands.findIndex((brand) => brand.id === brandId);

  if (activeIndex < 0 || cardIndex < 0 || cardIndex === activeIndex) {
    return "center";
  }

  const forwardDistance = (cardIndex - activeIndex + brands.length) % brands.length;

  return forwardDistance === 1 ? "right" : "left";
}

export function getHeroCardState(
  brandId: BrandId,
  brands: { id: BrandId }[],
  activeBrandId: BrandId | undefined
): HeroCardState {
  const slot = getHeroCardSlot(brandId, brands, activeBrandId);

  return {
    brandId,
    isActive: brandId === activeBrandId,
    slot
  };
}
