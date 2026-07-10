"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { HOME_SECTION_IDS, sectionSnapSelector } from "@/data/sections";
import { nativeScrollTo, ROTI_SMOOTH_SCROLL_EVENT, type SmoothScrollEventDetail } from "@/lib/scroll/smoothScroll";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

const easeOutExpo = (value: number) => Math.min(1, 1.001 - Math.pow(2, -10 * value));
const easeOutSine = (value: number) => Math.sin((value * Math.PI) / 2);
const SECTION_SNAP_DURATION_SECONDS = 1.08;
const SECTION_SNAP_RELEASE_MS = SECTION_SNAP_DURATION_SECONDS * 1000 + 180;
const SECTION_SNAP_MIN_DELTA = 6;
const SECTION_SNAP_DEAD_ZONE = 8;

function clampScrollPoint(point: number, limit: number) {
  return Math.max(0, Math.min(Math.round(point), Math.round(limit)));
}

function getElementScrollTop(element: HTMLElement) {
  return element.getBoundingClientRect().top + window.scrollY;
}

function getUniqueSnapPoints(points: number[], limit: number) {
  return points
    .map((point) => clampScrollPoint(point, limit))
    .sort((a, b) => a - b)
    .filter((point, index, sortedPoints) => index === 0 || Math.abs(point - sortedPoints[index - 1]) > 24);
}

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
      let isSectionSnapping = false;
      let sectionSnapReleaseTimer: number | undefined;
      let mobileSectionSnapTimer: number | undefined;
      const mobileSectionSnapQuery = window.matchMedia("(max-width: 900px)");
      const clearMobileSectionSnap = () => {
        if (mobileSectionSnapTimer) {
          window.clearTimeout(mobileSectionSnapTimer);
          mobileSectionSnapTimer = undefined;
        }
      };
      const releaseSectionSnap = () => {
        isSectionSnapping = false;

        if (sectionSnapReleaseTimer) {
          window.clearTimeout(sectionSnapReleaseTimer);
          sectionSnapReleaseTimer = undefined;
        }
      };
      const canUseSectionSnap = () =>
        document.body.dataset.rotiIntroActive !== "true" &&
        document.body.dataset.rotiHeroInteractive !== "false";
      const isInsideDesktopBrandStack = () => {
        if (mobileSectionSnapQuery.matches) {
          return false;
        }

        const brandSection = document.getElementById(HOME_SECTION_IDS.brand);

        if (!brandSection) {
          return false;
        }

        const brandTop = getElementScrollTop(brandSection);
        const brandBottom = brandTop + brandSection.offsetHeight - window.innerHeight;

        return lenis.scroll >= brandTop - SECTION_SNAP_DEAD_ZONE && lenis.scroll <= brandBottom + SECTION_SNAP_DEAD_ZONE;
      };
      const getSectionSnapPoints = () => {
        const maxScroll = lenis.limit;
        const elementPoints = Array.from(document.querySelectorAll<HTMLElement>(sectionSnapSelector)).map(
          getElementScrollTop
        );
        const standardSection = document.getElementById(HOME_SECTION_IDS.standard);
        const footerSection = document.getElementById(HOME_SECTION_IDS.footer);

        if (standardSection && footerSection) {
          const standardTop = getElementScrollTop(standardSection);
          const footerTop = getElementScrollTop(footerSection);
          const standardDistance = footerTop - standardTop;

          if (standardDistance > window.innerHeight * 1.4) {
            elementPoints.push(standardTop + standardDistance / 3, standardTop + (standardDistance / 3) * 2);
          }
        }

        return getUniqueSnapPoints([0, ...elementPoints], maxScroll);
      };
      const getSectionSnapTarget = (deltaY: number) => {
        const currentY = lenis.scroll;
        const snapPoints = getSectionSnapPoints();
        const standardSection = document.getElementById(HOME_SECTION_IDS.standard);
        const footerSection = document.getElementById(HOME_SECTION_IDS.footer);

        if (deltaY > 0 && standardSection && footerSection) {
          const standardTop = getElementScrollTop(standardSection);
          const footerTop = getElementScrollTop(footerSection);
          const standardDistance = footerTop - standardTop;

          if (
            standardDistance > window.innerHeight * 1.4 &&
            currentY >= standardTop + standardDistance * 0.58 &&
            currentY < footerTop - SECTION_SNAP_DEAD_ZONE
          ) {
            return footerTop;
          }
        }

        if (deltaY > 0) {
          return snapPoints.find((point) => point > currentY + SECTION_SNAP_DEAD_ZONE);
        }

        for (let index = snapPoints.length - 1; index >= 0; index -= 1) {
          const point = snapPoints[index];

          if (point < currentY - SECTION_SNAP_DEAD_ZONE) {
            return point;
          }
        }

        return undefined;
      };
      const getNearestSectionSnapTarget = () => {
        const currentY = lenis.scroll;
        const snapPoints = getSectionSnapPoints();

        if (snapPoints.length === 0) {
          return undefined;
        }

        return snapPoints.reduce((nearestPoint, point) =>
          Math.abs(point - currentY) < Math.abs(nearestPoint - currentY) ? point : nearestPoint
        );
      };
      const scrollToSectionSnapPoint = (targetY: number) => {
        isSectionSnapping = true;
        clearMobileSectionSnap();

        if (sectionSnapReleaseTimer) {
          window.clearTimeout(sectionSnapReleaseTimer);
        }

        ScrollTrigger.update();
        lenis.scrollTo(targetY, {
          duration: SECTION_SNAP_DURATION_SECONDS,
          easing: easeOutSine,
          force: true,
          lock: true,
          userData: { initiator: "section-snap" },
          onComplete: () => {
            ScrollTrigger.update();
            releaseSectionSnap();
          }
        });

        sectionSnapReleaseTimer = window.setTimeout(() => {
          ScrollTrigger.update();
          releaseSectionSnap();
        }, SECTION_SNAP_RELEASE_MS);
      };
      const handleSectionWheelSnap = (event: WheelEvent) => {
        if (
          event.defaultPrevented ||
          event.ctrlKey ||
          !canUseSectionSnap() ||
          isInsideDesktopBrandStack() ||
          Math.abs(event.deltaY) < SECTION_SNAP_MIN_DELTA ||
          Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ) {
          return;
        }

        event.preventDefault();

        if (isSectionSnapping) {
          ScrollTrigger.update();
          return;
        }

        const targetY = getSectionSnapTarget(event.deltaY);

        if (targetY === undefined || Math.abs(targetY - lenis.scroll) <= 4) {
          return;
        }

        scrollToSectionSnapPoint(targetY);
      };
      const scheduleMobileSectionSnap = () => {
        if (!mobileSectionSnapQuery.matches || !canUseSectionSnap() || isSectionSnapping) {
          return;
        }

        clearMobileSectionSnap();
        mobileSectionSnapTimer = window.setTimeout(() => {
          mobileSectionSnapTimer = undefined;

          if (!mobileSectionSnapQuery.matches || !canUseSectionSnap() || isSectionSnapping) {
            return;
          }

          const targetY = getNearestSectionSnapTarget();

          if (targetY === undefined || Math.abs(targetY - lenis.scroll) <= 10) {
            return;
          }

          scrollToSectionSnapPoint(targetY);
        }, 140);
      };
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

      const handleLenisScroll = () => {
        updateScrollTrigger();
        scheduleMobileSectionSnap();
      };

      lenis.on("scroll", handleLenisScroll);
      gsap.ticker.add(rafLenis);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.addEventListener("refresh", handleRefresh);
      window.addEventListener("wheel", handleSectionWheelSnap, { capture: true, passive: false });
      window.addEventListener(ROTI_SMOOTH_SCROLL_EVENT, handleScrollTo);
      ScrollTrigger.refresh();

      cleanup = () => {
        window.removeEventListener(ROTI_SMOOTH_SCROLL_EVENT, handleScrollTo);
        window.removeEventListener("wheel", handleSectionWheelSnap, { capture: true });
        ScrollTrigger.removeEventListener("refresh", handleRefresh);
        gsap.ticker.remove(rafLenis);
        lenis.off("scroll", handleLenisScroll);
        clearMobileSectionSnap();
        releaseSectionSnap();
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
