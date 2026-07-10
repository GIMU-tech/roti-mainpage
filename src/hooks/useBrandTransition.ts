"use client";

import { createContext, useContext } from "react";
import type { BrandTransitionPhase, BrandTransitionState, StartBrandTransitionRequest } from "@/types/brandTransition";

export type BrandTransitionContextValue = {
  state: BrandTransitionState;
  startBrandTransition: (request: StartBrandTransitionRequest) => boolean;
  setBrandTransitionPhase: (transitionId: number, phase: BrandTransitionPhase) => void;
  cancelBrandTransition: (transitionId?: number) => void;
  resetBrandTransition: () => void;
};

export const BrandTransitionContext = createContext<BrandTransitionContextValue | null>(null);

export function useBrandTransition() {
  const context = useContext(BrandTransitionContext);

  if (!context) {
    throw new Error("useBrandTransition must be used within BrandTransitionProvider");
  }

  return context;
}
