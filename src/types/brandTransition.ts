import type { BrandId } from "@/types/brand";
import type { HeroCardSlot } from "@/lib/animations/heroAnimations";

export type BrandTransitionPhase =
  | "idle"
  | "preparing"
  | "centering"
  | "expanding"
  | "syncing"
  | "revealing"
  | "complete";

export type BrandTransitionState = {
  transitionId: number;
  phase: BrandTransitionPhase;
  brandId: BrandId | null;
  sourceSlot: HeroCardSlot | null;
  sourceRect: DOMRect | null;
  centerRect: DOMRect | null;
  isLocked: boolean;
};

export type StartBrandTransitionRequest = {
  brandId: BrandId;
  sourceElement: HTMLElement;
  sourceSlot: HeroCardSlot;
  centerElement?: HTMLElement | null;
};
