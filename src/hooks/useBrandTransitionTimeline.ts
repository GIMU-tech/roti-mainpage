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
      const useMobileAsset = window.matchMedia("(max-width: 900px)").matches;
      const heroSrc = useMobileAsset ? (brand.heroAsset.mobileSrc ?? brand.heroAsset.src) : brand.heroAsset.src;
      const sectionSrc = useMobileAsset
        ? (brand.sectionAsset.mobileSrc ?? brand.sectionAsset.src)
        : brand.sectionAsset.src;

      void Promise.all([preloadImage(heroSrc), preloadImage(sectionSrc)]);

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
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
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

  useEffect(() => {
    if (state.phase !== "revealing" || !state.transitionId || !state.brandId) {
      return;
    }

    const transitionId = state.transitionId;
    const overlayCard = document.querySelector<HTMLElement>(
      `.brand-transition-overlay__card[data-transition-id="${transitionId}"]`
    );
    const overlayImage = overlayCard?.querySelector<HTMLElement>(".brand-transition-overlay__image--section");
    const targetSlide = document.querySelector<HTMLElement>(
      `.brand-slide-stack__slide[data-brand="${state.brandId}"]`
    );
    const targetFrame = targetSlide?.querySelector<HTMLElement>(".brand-slide-stack__frame");
    const targetImage = targetSlide?.querySelector<HTMLElement>(".brand-slide-stack__image");

    if (!overlayCard || !overlayImage || !targetFrame || !targetImage) {
      setBrandTransitionPhase(transitionId, "complete");
      return;
    }

    const targetRect = targetFrame.getBoundingClientRect();
    const targetFrameStyle = window.getComputedStyle(targetFrame);
    const targetImageScale = Number(gsap.getProperty(targetImage, "scaleX")) || 1;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(overlayCard, { opacity: 0 });
      setBrandTransitionPhase(transitionId, "complete");
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: brandTransitionEasing.standard },
      onComplete: () => setBrandTransitionPhase(transitionId, "complete")
    });

    timeline
      .to(overlayCard, {
        left: targetRect.left,
        top: targetRect.top,
        width: targetRect.width,
        height: targetRect.height,
        borderRadius: targetFrameStyle.borderRadius,
        duration: brandTransitionTiming.settle
      })
      .to(
        overlayImage,
        {
          scale: targetImageScale,
          duration: brandTransitionTiming.settle
        },
        "<"
      )
      .to(
        overlayCard,
        {
          opacity: 0,
          duration: brandTransitionTiming.reveal
        },
        `>-${brandTransitionTiming.reveal * 0.45}`
      );

    return () => {
      timeline.kill();
    };
  }, [setBrandTransitionPhase, state.brandId, state.phase, state.transitionId]);
}
