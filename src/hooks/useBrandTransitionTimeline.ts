"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { brandTransitionEasing, brandTransitionTiming } from "@/lib/animations/brandTransitionConfig";
import type { Brand } from "@/types/brand";
import type { BrandTransitionPhase, BrandTransitionState } from "@/types/brandTransition";

type BrandTransitionTimelineOptions = {
  brand: Brand | undefined;
  state: BrandTransitionState;
  setBrandTransitionPhase: (transitionId: number, phase: BrandTransitionPhase) => void;
  cancelBrandTransition: (transitionId: number) => void;
};

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();

    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;

    if (image.complete) {
      resolve();
    }
  });
}

export function useBrandTransitionTimeline({
  brand,
  state,
  setBrandTransitionPhase,
  cancelBrandTransition
}: BrandTransitionTimelineOptions) {
  useEffect(() => {
    if (!brand || !state.transitionId || !state.sourceRect || !state.centerRect) {
      return;
    }

    let isActive = true;
    let killTimeline: (() => void) | undefined;
    const transitionId = state.transitionId;
    const sourceSlot = state.sourceSlot;
    const centerRect = state.centerRect;
    const initialViewport = { width: window.innerWidth, height: window.innerHeight };
    const handleResize = () => {
      const widthDelta = Math.abs(window.innerWidth - initialViewport.width);
      const heightDelta = Math.abs(window.innerHeight - initialViewport.height);

      if (widthDelta > 16 || heightDelta > 16) {
        cancelBrandTransition(transitionId);
      }
    };

    const runTimeline = () => {
      void Promise.all([preloadImage(brand.heroAsset.src), preloadImage(brand.sectionImage)]);

      const animationFrame = window.requestAnimationFrame(() => {
        if (!isActive) {
          return;
        }

        const overlayCard = document.querySelector<HTMLElement>(
          `.brand-transition-overlay__card[data-transition-id="${transitionId}"]`
        );
        const heroImage = overlayCard?.querySelector<HTMLElement>(".brand-transition-overlay__image--hero");
        const sectionImage = overlayCard?.querySelector<HTMLElement>(".brand-transition-overlay__image--section");
        const overlayContent = overlayCard?.querySelector<HTMLElement>(".brand-transition-overlay__content");

        if (!overlayCard || !heroImage || !sectionImage || !overlayContent) {
          cancelBrandTransition(transitionId);
          return;
        }

        const centerState = {
          left: centerRect.left,
          top: centerRect.top,
          width: centerRect.width,
          height: centerRect.height
        };
        const expandedState = {
          left: 0,
          top: 0,
          width: window.innerWidth,
          height: window.innerHeight,
          borderRadius: 0,
          boxShadow: "none"
        };
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
          gsap.set(overlayCard, expandedState);
          gsap.set(heroImage, { opacity: 0 });
          gsap.set(sectionImage, { opacity: 1 });
          gsap.set(overlayContent, { opacity: 0 });
          setBrandTransitionPhase(transitionId, "syncing");
          return;
        }

        const timeline = gsap.timeline({
          defaults: { ease: brandTransitionEasing.standard }
        });
        killTimeline = () => timeline.kill();

        timeline
          .to({}, { duration: brandTransitionTiming.prepare })
          .call(() => setBrandTransitionPhase(transitionId, "centering"))
          .to(overlayCard, {
            ...centerState,
            duration: sourceSlot === "center" ? 0.08 : brandTransitionTiming.center
          })
          .call(() => setBrandTransitionPhase(transitionId, "expanding"))
          .to(overlayCard, {
            ...expandedState,
            duration: brandTransitionTiming.expand
          })
          .to(heroImage, { opacity: 0, duration: brandTransitionTiming.reveal }, "<0.08")
          .to(sectionImage, { opacity: 1, duration: brandTransitionTiming.reveal }, "<")
          .to(overlayContent, { opacity: 0, y: -12, duration: brandTransitionTiming.reveal }, "<")
          .call(() => setBrandTransitionPhase(transitionId, "syncing"));

      });

      return () => window.cancelAnimationFrame(animationFrame);
    };

    window.addEventListener("resize", handleResize, { once: true });
    const cancelAnimationFrame = runTimeline();

    return () => {
      isActive = false;
      killTimeline?.();
      cancelAnimationFrame?.();
      window.removeEventListener("resize", handleResize);
    };
  }, [
    brand,
    cancelBrandTransition,
    setBrandTransitionPhase,
    state.centerRect,
    state.sourceRect,
    state.sourceSlot,
    state.transitionId
  ]);
}
