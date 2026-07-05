"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { nativeScrollTo, ROTI_SMOOTH_SCROLL_EVENT, type SmoothScrollEventDetail } from "@/lib/scroll/smoothScroll";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

const easeOutExpo = (value: number) => Math.min(1, 1.001 - Math.pow(2, -10 * value));
const easeOutSine = (value: number) => Math.sin((value * Math.PI) / 2);

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let isMounted = true;

    async function setupSmoothScroll() {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        const handleNativeScrollTo = (event: Event) => {
          event.preventDefault();
          const { target, offset } = (event as CustomEvent<SmoothScrollEventDetail>).detail;
          nativeScrollTo(target, { offset });
        };

        window.addEventListener(ROTI_SMOOTH_SCROLL_EVENT, handleNativeScrollTo);
        cleanup = () => window.removeEventListener(ROTI_SMOOTH_SCROLL_EVENT, handleNativeScrollTo);
        return;
      }

      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis")
      ]);

      if (!isMounted) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        anchors: {
          duration: 1.15,
          easing: easeOutSine
        },
        duration: 0.75,
        easing: easeOutExpo,
        infinite: false,
        orientation: "vertical",
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 2,
        wheelMultiplier: 1
      });
      const updateScrollTrigger = () => ScrollTrigger.update();
      const rafLenis = (time: number) => lenis.raf(time * 1000);
      const handleScrollTo = (event: Event) => {
        event.preventDefault();
        const { duration = 1.15, lock = false, offset = 0, target } = (event as CustomEvent<SmoothScrollEventDetail>)
          .detail;

        if (typeof target === "number") {
          lenis.scrollTo(Math.max(0, target + offset), {
            duration,
            easing: easeOutSine,
            force: true,
            lock
          });
          return;
        }

        const targetId = target.startsWith("#") ? target.slice(1) : target;
        const element = document.getElementById(targetId);

        if (!element) {
          return;
        }

        lenis.scrollTo(element, {
          duration,
          easing: easeOutSine,
          force: true,
          lock,
          offset
        });
      };
      const handleRefresh = () => lenis.resize();

      lenis.on("scroll", updateScrollTrigger);
      gsap.ticker.add(rafLenis);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.addEventListener("refresh", handleRefresh);
      window.addEventListener(ROTI_SMOOTH_SCROLL_EVENT, handleScrollTo);
      ScrollTrigger.refresh();

      cleanup = () => {
        window.removeEventListener(ROTI_SMOOTH_SCROLL_EVENT, handleScrollTo);
        ScrollTrigger.removeEventListener("refresh", handleRefresh);
        gsap.ticker.remove(rafLenis);
        lenis.off("scroll", updateScrollTrigger);
        lenis.destroy();
      };
    }

    void setupSmoothScroll();

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
