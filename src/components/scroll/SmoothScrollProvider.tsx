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
      let desktopSectionSnapTimer: number | undefined;
      let lastSectionSnapDirection = 0;
      let mobileSectionSnapTimer: number | undefined;
      const mobileSectionSnapQuery = window.matchMedia("(max-width: 900px)");
      const clearDesktopSectionSnap = () => {
        if (desktopSectionSnapTimer) {
          window.clearTimeout(desktopSectionSnapTimer);
          desktopSectionSnapTimer = undefined;
        }
      };
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
        document.body.dataset.rotiHeroInteractive !== "false" &&
        document.body.dataset.rotiBrandTransition !== "true";
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
      const shouldUseNativeScrollRegion = (deltaY = 0) => {
        const currentY = lenis.scroll;
        const entryBuffer = window.innerHeight * 0.55;

        return Array.from(document.querySelectorAll<HTMLElement>("[data-native-scroll-region]")).some((region) => {
          const regionTop = getElementScrollTop(region);
          const regionBottom = regionTop + region.offsetHeight;
          const isInsideRegion =
            currentY >= regionTop - SECTION_SNAP_DEAD_ZONE && currentY <= regionBottom + SECTION_SNAP_DEAD_ZONE;
          const isEnteringFromAbove = deltaY > 0 && currentY < regionTop && regionTop - currentY <= entryBuffer;
          const isEnteringFromBelow = deltaY < 0 && currentY > regionBottom && currentY - regionBottom <= entryBuffer;

          return isInsideRegion || isEnteringFromAbove || isEnteringFromBelow;
        });
      };
      const getSectionSnapPoints = () => {
        const maxScroll = lenis.limit;
        const elementPoints = Array.from(document.querySelectorAll<HTMLElement>(sectionSnapSelector)).map(
          getElementScrollTop
        );
        const nativeScrollRegionEntryPoints = Array.from(
          document.querySelectorAll<HTMLElement>("[data-native-scroll-region]")
        ).map(getElementScrollTop);
        const steppedSectionPoints = Array.from(
          document.querySelectorAll<HTMLElement>("[data-section-snap-progress][data-section-snap-range-vh]")
        ).flatMap((section) => {
          const rangeInViewports = Number(section.dataset.sectionSnapRangeVh);
          const snapProgress = section.dataset.sectionSnapProgress
            ?.split(",")
            .map(Number)
            .filter((progress) => Number.isFinite(progress) && progress > 0 && progress < 1);

          if (!snapProgress?.length || !Number.isFinite(rangeInViewports) || rangeInViewports <= 0) {
            return [];
          }

          const sectionTop = getElementScrollTop(section);
          const snapRange = window.innerHeight * rangeInViewports;

          return snapProgress.map((progress) => sectionTop + snapRange * progress);
        });

        return getUniqueSnapPoints(
          [0, ...elementPoints, ...nativeScrollRegionEntryPoints, ...steppedSectionPoints],
          maxScroll
        );
      };
      const getSectionSnapTarget = (deltaY: number) => {
        const currentY = lenis.scroll;
        const snapPoints = getSectionSnapPoints();

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
          event.ctrlKey ||
          !canUseSectionSnap() ||
          isInsideDesktopBrandStack() ||
          shouldUseNativeScrollRegion(event.deltaY) ||
          Math.abs(event.deltaY) < SECTION_SNAP_MIN_DELTA ||
          Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ) {
          return;
        }

        if (isSectionSnapping) {
          event.preventDefault();
          ScrollTrigger.update();
          return;
        }

        const targetY = getSectionSnapTarget(event.deltaY);

        if (targetY === undefined || Math.abs(targetY - lenis.scroll) <= 4) {
          return;
        }

        // Lenis may already have marked the native wheel event as handled.
        // Section snapping is the single owner for this boundary, so the
        // presence of defaultPrevented must not prevent the snap target from
        // being selected and locked here.
        event.preventDefault();
        scrollToSectionSnapPoint(targetY);
      };
      const scheduleDesktopSectionSnap = (deltaY: number) => {
        if (
          mobileSectionSnapQuery.matches ||
          !canUseSectionSnap() ||
          isSectionSnapping ||
          isInsideDesktopBrandStack() ||
          shouldUseNativeScrollRegion(deltaY) ||
          Math.abs(deltaY) < SECTION_SNAP_MIN_DELTA
        ) {
          return;
        }

        lastSectionSnapDirection = deltaY > 0 ? 1 : -1;
        clearDesktopSectionSnap();
        desktopSectionSnapTimer = window.setTimeout(() => {
          desktopSectionSnapTimer = undefined;

          if (
            mobileSectionSnapQuery.matches ||
            !canUseSectionSnap() ||
            isSectionSnapping ||
            isInsideDesktopBrandStack() ||
            shouldUseNativeScrollRegion(lastSectionSnapDirection)
          ) {
            return;
          }

          const targetY = getSectionSnapTarget(lastSectionSnapDirection);

          if (targetY === undefined || Math.abs(targetY - lenis.scroll) <= 10) {
            return;
          }

          scrollToSectionSnapPoint(targetY);
        }, 160);
      };
      const scheduleMobileSectionSnap = () => {
        if (
          !mobileSectionSnapQuery.matches ||
          !canUseSectionSnap() ||
          isSectionSnapping ||
          shouldUseNativeScrollRegion()
        ) {
          return;
        }

        clearMobileSectionSnap();
        mobileSectionSnapTimer = window.setTimeout(() => {
          mobileSectionSnapTimer = undefined;

          if (
            !mobileSectionSnapQuery.matches ||
            !canUseSectionSnap() ||
            isSectionSnapping ||
            shouldUseNativeScrollRegion()
          ) {
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
            lock,
            onComplete: () => ScrollTrigger.update()
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
          offset,
          onComplete: () => ScrollTrigger.update()
        });
      };
      const handleRefresh = () => lenis.resize();

      const handleLenisScroll = () => {
        updateScrollTrigger();
        scheduleMobileSectionSnap();
      };
      const handleLenisVirtualScroll = ({
        deltaX,
        deltaY,
        event
      }: {
        deltaX: number;
        deltaY: number;
        event: Event;
      }) => {
        if (event.type !== "wheel" || Math.abs(deltaX) > Math.abs(deltaY)) {
          return;
        }

        scheduleDesktopSectionSnap(deltaY);
      };

      lenis.on("scroll", handleLenisScroll);
      lenis.on("virtual-scroll", handleLenisVirtualScroll);
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
        lenis.off("virtual-scroll", handleLenisVirtualScroll);
        clearDesktopSectionSnap();
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
