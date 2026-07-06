import type { BrandId } from "@/types/brand";

export type HeroCardSlot = "center" | "left" | "right";

export type HeroCardState = {
  brandId: BrandId;
  isActive: boolean;
  slot: HeroCardSlot;
};

export type HeroCardMotion = {
  x: string;
  z: string;
  rotateY: string;
  scale: number;
  opacity: number;
  shadowY: string;
  shadowScaleX: number;
  shadowOpacity: number;
};

export const heroCardMotion = {
  center: {
    x: "0%",
    z: "170px",
    rotateY: "0deg",
    scale: 1.08,
    opacity: 1,
    shadowY: "clamp(13.4rem, 30vh, 17.3rem)",
    shadowScaleX: 0.96,
    shadowOpacity: 0.92
  },
  left: {
    x: "-112%",
    z: "-26px",
    rotateY: "37deg",
    scale: 0.82,
    opacity: 0.84,
    shadowY: "clamp(10.2rem, 23vh, 13.3rem)",
    shadowScaleX: 0.58,
    shadowOpacity: 0.64
  },
  right: {
    x: "112%",
    z: "-26px",
    rotateY: "-37deg",
    scale: 0.82,
    opacity: 0.84,
    shadowY: "clamp(10.2rem, 23vh, 13.3rem)",
    shadowScaleX: 0.58,
    shadowOpacity: 0.64
  }
} satisfies Record<HeroCardSlot, HeroCardMotion>;

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
