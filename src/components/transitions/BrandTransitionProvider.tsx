"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Brand } from "@/types/brand";
import type { BrandTransitionPhase, BrandTransitionState, StartBrandTransitionRequest } from "@/types/brandTransition";
import { BrandTransitionOverlay } from "./BrandTransitionOverlay";
import { BrandTransitionContext } from "@/hooks/useBrandTransition";
import { useBrandTransitionTimeline } from "@/hooks/useBrandTransitionTimeline";
import { brandTransitionTiming } from "@/lib/animations/brandTransitionConfig";
import { scrollToTarget } from "@/lib/scroll/smoothScroll";

type BrandTransitionProviderProps = {
  brands: Brand[];
  children: ReactNode;
};

const IDLE_BRAND_TRANSITION_STATE: BrandTransitionState = {
  transitionId: 0,
  phase: "idle",
  brandId: null,
  sourceSlot: null,
  sourceRect: null,
  centerRect: null,
  isLocked: false
};

export function BrandTransitionProvider({ brands, children }: BrandTransitionProviderProps) {
  const [state, setState] = useState<BrandTransitionState>(IDLE_BRAND_TRANSITION_STATE);
  const transitionLockRef = useRef(false);
  const transitionIdRef = useRef(0);
  const activeBrand = useMemo(
    () => brands.find((brand) => brand.id === state.brandId),
    [brands, state.brandId]
  );

  const startBrandTransition = useCallback((request: StartBrandTransitionRequest) => {
    const sourceRect = request.sourceElement.getBoundingClientRect();
    const centerRect = request.centerElement?.getBoundingClientRect();

    if (transitionLockRef.current || !sourceRect.width || !sourceRect.height || !centerRect || !centerRect.width || !centerRect.height) {
      return false;
    }

    transitionLockRef.current = true;
    transitionIdRef.current += 1;
    const transitionId = transitionIdRef.current;

    setState((currentState) => {
      if (currentState.phase !== "idle") {
        transitionLockRef.current = false;
        return currentState;
      }

      return {
        transitionId,
        phase: "preparing",
        brandId: request.brandId,
        sourceSlot: request.sourceSlot,
        sourceRect,
        centerRect,
        isLocked: true
      };
    });

    return true;
  }, []);

  const setBrandTransitionPhase = useCallback((transitionId: number, phase: BrandTransitionPhase) => {
    setState((currentState) =>
      currentState.transitionId === transitionId && currentState.phase !== "idle"
        ? { ...currentState, phase }
        : currentState
    );
  }, []);

  const cancelBrandTransition = useCallback((transitionId?: number) => {
    setState((currentState) => {
      if (transitionId !== undefined && currentState.transitionId !== transitionId) {
        return currentState;
      }

      transitionLockRef.current = false;
      return IDLE_BRAND_TRANSITION_STATE;
    });
  }, []);

  const resetBrandTransition = useCallback(() => {
    cancelBrandTransition();
  }, [cancelBrandTransition]);

  useBrandTransitionTimeline({
    brand: activeBrand,
    state,
    setBrandTransitionPhase,
    cancelBrandTransition
  });

  useEffect(() => {
    if (state.phase !== "syncing" || !state.brandId) {
      return;
    }

    const transitionId = state.transitionId;
    const brandId = state.brandId;
    const brandSection = document.getElementById(brandId);

    if (!brandSection) {
      cancelBrandTransition(transitionId);
      return;
    }

    let animationFrame = 0;
    const revealBrandScene = () => setBrandTransitionPhase(transitionId, "revealing");
    const scrollFallbackTimer = window.setTimeout(
      revealBrandScene,
      brandTransitionTiming.sectionScrollFallback * 1000
    );
    const confirmBrandSceneArrival = () => {
      if (Math.abs(brandSection.getBoundingClientRect().top) <= 3) {
        window.clearTimeout(scrollFallbackTimer);
        revealBrandScene();
        return;
      }

      animationFrame = window.requestAnimationFrame(confirmBrandSceneArrival);
    };

    scrollToTarget(brandId, {
      duration: brandTransitionTiming.sectionScroll,
      lock: true
    });
    animationFrame = window.requestAnimationFrame(confirmBrandSceneArrival);

    return () => {
      window.clearTimeout(scrollFallbackTimer);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [cancelBrandTransition, setBrandTransitionPhase, state.brandId, state.phase, state.transitionId]);

  useEffect(() => {
    if (state.phase !== "revealing") {
      return;
    }

    const transitionId = state.transitionId;
    const revealTimer = window.setTimeout(
      () => setBrandTransitionPhase(transitionId, "complete"),
      brandTransitionTiming.reveal * 1000
    );

    return () => window.clearTimeout(revealTimer);
  }, [setBrandTransitionPhase, state.phase, state.transitionId]);

  useEffect(() => {
    if (state.phase !== "complete") {
      return;
    }

    const transitionId = state.transitionId;
    const completeTimer = window.setTimeout(() => cancelBrandTransition(transitionId), 0);

    return () => window.clearTimeout(completeTimer);
  }, [cancelBrandTransition, state.phase, state.transitionId]);

  useEffect(() => {
    if (state.isLocked) {
      document.body.dataset.rotiBrandTransition = "true";
    } else {
      delete document.body.dataset.rotiBrandTransition;
    }

    return () => {
      delete document.body.dataset.rotiBrandTransition;
    };
  }, [state.isLocked]);

  useEffect(() => {
    if (!state.isLocked) {
      return;
    }

    const lockedScrollY = window.scrollY;
    const preventScrollInput = (event: Event) => event.preventDefault();
    const preventKeyboardScroll = (event: KeyboardEvent) => {
      if ([" ", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(event.key)) {
        event.preventDefault();
      }
    };
    const keepScrollPosition = () => {
      if (state.phase === "syncing") {
        return;
      }

      if (window.scrollY !== lockedScrollY) {
        window.scrollTo({ top: lockedScrollY, left: 0, behavior: "auto" });
      }
    };

    window.addEventListener("wheel", preventScrollInput, { capture: true, passive: false });
    window.addEventListener("touchmove", preventScrollInput, { capture: true, passive: false });
    window.addEventListener("keydown", preventKeyboardScroll, { capture: true });
    window.addEventListener("scroll", keepScrollPosition, { capture: true, passive: true });

    return () => {
      window.removeEventListener("wheel", preventScrollInput, { capture: true });
      window.removeEventListener("touchmove", preventScrollInput, { capture: true });
      window.removeEventListener("keydown", preventKeyboardScroll, { capture: true });
      window.removeEventListener("scroll", keepScrollPosition, { capture: true });
    };
  }, [state.isLocked, state.phase]);

  const contextValue = useMemo(
    () => ({ state, startBrandTransition, setBrandTransitionPhase, cancelBrandTransition, resetBrandTransition }),
    [cancelBrandTransition, resetBrandTransition, setBrandTransitionPhase, startBrandTransition, state]
  );

  return (
    <BrandTransitionContext.Provider value={contextValue}>
      {children}
      {activeBrand ? <BrandTransitionOverlay brand={activeBrand} state={state} /> : null}
    </BrandTransitionContext.Provider>
  );
}
