"use client";

import Image from "next/image";
import type { Brand } from "@/types/brand";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { HOME_SECTION_IDS } from "@/data/sections";
import { scrollToTarget } from "@/lib/scroll/smoothScroll";

type BrandSlideStackProps = {
  brands: Brand[];
};

type BrandSlideStackStyle = CSSProperties & {
  "--brand-stack-steps": number;
};

type BrandSceneStyle = CSSProperties & {
  "--brand-scene-image": string;
};

type BrandAnchorStyle = CSSProperties & {
  "--brand-anchor-index": number;
};

const BRAND_SNAP_DURATION_SECONDS = 1.15;
const BRAND_SNAP_RELEASE_MS = BRAND_SNAP_DURATION_SECONDS * 1000 + 140;
const BRAND_SETTLED_HOLD_SECONDS = 0.18;

export function BrandSlideStack({ brands }: BrandSlideStackProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const transitionSteps = Math.max(brands.length - 1, 1);
  const stackStyle = {
    "--brand-stack-steps": transitionSteps
  } as BrandSlideStackStyle;

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let isActive = true;
    let setupRun = 0;
    const mobileStackQuery = window.matchMedia("(max-width: 900px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    async function setupScrollTimeline() {
      setupRun += 1;
      const currentRun = setupRun;
      cleanup?.();
      cleanup = undefined;

      const root = rootRef.current;
      const viewport = viewportRef.current;
      const usesMobileStack = mobileStackQuery.matches;

      if (!root || !viewport || reducedMotionQuery.matches) {
        return;
      }

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      if (!isActive || currentRun !== setupRun) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      if (usesMobileStack) {
        const context = gsap.context(() => {
          const slides = gsap.utils.toArray<HTMLElement>(".brand-slide-stack__slide", root);
          const mobileStepCount = Math.max(brands.length - 1, 1);
          const mobileSnapPoints = Array.from({ length: brands.length }, (_, index) => index / mobileStepCount);
          const getClosestMobileSnap = (progress: number) => {
            if (mobileSnapPoints.length === 0) {
              return progress;
            }

            return mobileSnapPoints.reduce((closestPoint, point) =>
              Math.abs(point - progress) < Math.abs(closestPoint - progress) ? point : closestPoint
            );
          };

          gsap.set(slides, {
            zIndex: (index) => index + 1,
            y: "108svh",
            opacity: 0,
            pointerEvents: "none"
          });

          gsap.set(slides[0], {
            y: 0,
            opacity: 1,
            pointerEvents: "auto"
          });

          gsap.set(".brand-slide-stack__frame", {
            xPercent: 0,
            yPercent: 0,
            x: 0,
            y: 0,
            width: "100%",
            height: "100%",
            borderRadius: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: 1,
            transformOrigin: "center bottom"
          });

          gsap.set(".brand-slide-stack__image", {
            scale: 1.03,
            yPercent: 0,
            transformOrigin: "center center"
          });

          gsap.set(".brand-slide-stack__copy", {
            y: 28,
            opacity: 0
          });

          gsap.set(slides[0]?.querySelector(".brand-slide-stack__copy"), {
            y: 0,
            opacity: 1
          });

          const timeline = gsap.timeline({
            defaults: {
              ease: "none"
            },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              invalidateOnRefresh: true,
              snap: {
                snapTo: getClosestMobileSnap,
                duration: { min: 0.18, max: 0.38 },
                delay: 0.02,
                ease: "power2.out"
              },
              onUpdate: (self) => {
                const nextIndex = Math.min(brands.length - 1, Math.max(0, Math.round(self.progress * mobileStepCount)));
                setActiveSlideIndex(nextIndex);
              }
            }
          });

          slides.slice(0, -1).forEach((slide, index) => {
            const nextSlide = slides[index + 1];
            const currentFrame = slide.querySelector<HTMLElement>(".brand-slide-stack__frame");
            const nextFrame = nextSlide?.querySelector<HTMLElement>(".brand-slide-stack__frame");
            const currentImage = slide.querySelector<HTMLElement>(".brand-slide-stack__image");
            const nextImage = nextSlide?.querySelector<HTMLElement>(".brand-slide-stack__image");
            const currentCopy = slide.querySelector<HTMLElement>(".brand-slide-stack__copy");
            const nextCopy = nextSlide?.querySelector<HTMLElement>(".brand-slide-stack__copy");
            const label = `mobile-brand-slide-${index}`;

            if (!nextSlide || !currentFrame || !nextFrame || !currentImage || !nextImage || !currentCopy || !nextCopy) {
              return;
            }

            timeline.addLabel(label, ">");

            timeline
              .set(
                nextSlide,
                {
                  opacity: 1,
                  pointerEvents: "auto"
                },
                label
              )
              .to(
                currentFrame,
                {
                  y: "-8svh",
                  borderRadius: 16,
                  scale: 0.7,
                  duration: 1
                },
                label
              )
              .to(
                currentImage,
                {
                  yPercent: -2,
                  scale: 1.08,
                  duration: 1
                },
                label
              )
              .to(
                currentCopy,
                {
                  y: -30,
                  opacity: 0,
                  duration: 0.42
                },
                label
              )
              .fromTo(
                nextSlide,
                {
                  y: "106svh",
                  opacity: 1,
                  pointerEvents: "auto"
                },
                {
                  y: 0,
                  opacity: 1,
                  pointerEvents: "auto",
                  duration: 1
                },
                label
              )
              .fromTo(
                nextFrame,
                {
                  y: "3svh",
                  borderRadius: 16,
                  scale: 0.7
                },
                {
                  y: 0,
                  borderRadius: 0,
                  scale: 1,
                  duration: 1
                },
                label
              )
              .fromTo(
                nextImage,
                {
                  yPercent: 2,
                  scale: 1.08
                },
                {
                  yPercent: 0,
                  scale: 1.03,
                  duration: 1
                },
                label
              )
              .fromTo(
                nextCopy,
                {
                  y: 30,
                  opacity: 0
                },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.48
                },
                `${label}+=0.42`
              )
              .to(
                slide,
                {
                  opacity: 0,
                  pointerEvents: "none",
                  duration: 0.01
                },
                `${label}+=0.98`
              );
          });
        }, root);

        cleanup = () => {
          context.revert();
        };
        ScrollTrigger.refresh();
        return;
      }

      let removeWheelSnap: (() => void) | undefined;

      const context = gsap.context(() => {
        const slides = gsap.utils.toArray<HTMLElement>(".brand-slide-stack__slide", root);

        gsap.set(slides, {
          y: "108vh",
          opacity: 0,
          pointerEvents: "none"
        });

        gsap.set(slides[0], {
          y: 0,
          opacity: 1,
          pointerEvents: "auto"
        });

        gsap.set(".brand-slide-stack__frame", {
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: 0,
          width: "100%",
          height: "100%",
          borderRadius: 0,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          transformOrigin: "center bottom"
        });

        gsap.set(".brand-slide-stack__image", {
          scale: 1.02,
          yPercent: 0,
          transformOrigin: "center center"
        });

        gsap.set(slides[0]?.querySelector(".brand-slide-stack__copy"), {
          y: 0,
          opacity: 1
        });

        const timeline = gsap.timeline({
          defaults: {
            ease: "none"
          },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: () => {
              const currentY = window.scrollY;
              const snapPoints = Array.from(root.querySelectorAll<HTMLElement>(".brand-slide-stack__anchor")).map(
                (anchor) => Math.round(anchor.getBoundingClientRect().top + window.scrollY)
              );
              const nextIndex = snapPoints.reduce((nearestIndex, point, index) => {
                const currentDistance = Math.abs(point - currentY);
                const nearestDistance = Math.abs(snapPoints[nearestIndex] - currentY);

                return currentDistance < nearestDistance ? index : nearestIndex;
              }, 0);

              setActiveSlideIndex(nextIndex);
            }
          }
        });

        slides.slice(0, -1).forEach((slide, index) => {
          const nextSlide = slides[index + 1];
          const currentFrame = slide.querySelector<HTMLElement>(".brand-slide-stack__frame");
          const nextFrame = nextSlide?.querySelector<HTMLElement>(".brand-slide-stack__frame");
          const currentImage = slide.querySelector<HTMLElement>(".brand-slide-stack__image");
          const nextImage = nextSlide?.querySelector<HTMLElement>(".brand-slide-stack__image");
          const currentCopy = slide.querySelector<HTMLElement>(".brand-slide-stack__copy");
          const nextCopy = nextSlide?.querySelector<HTMLElement>(".brand-slide-stack__copy");
          const label = `brand-slide-${index}`;

          if (!nextSlide || !currentFrame || !nextFrame || !currentImage || !nextImage || !currentCopy || !nextCopy) {
            return;
          }

          timeline.addLabel(label, ">");

          timeline
            .to(
              currentFrame,
              {
                y: "-48vh",
                width: "82%",
                height: "62%",
                borderRadius: 38,
                rotateX: 3,
                rotateY: index % 2 === 0 ? -16 : 16,
                rotateZ: index % 2 === 0 ? -2.4 : 2.4,
                scale: 0.82,
                duration: 1
              },
              label
            )
            .to(
              currentImage,
              {
                yPercent: -4,
                scale: 1.18,
                duration: 1
              },
              label
            )
            .to(
              currentCopy,
              {
                y: -56,
                opacity: 0,
                duration: 0.45
              },
              label
            )
            .fromTo(
              nextSlide,
              {
                y: "106vh",
                opacity: 1,
                pointerEvents: "auto"
              },
              {
                y: 0,
                opacity: 1,
                pointerEvents: "auto",
                duration: 1
              },
              `${label}+=0.16`
            )
            .fromTo(
              nextFrame,
              {
                width: "88%",
                height: "70%",
                borderRadius: 44,
                y: "6vh",
                rotateX: 4,
                rotateY: index % 2 === 0 ? 12 : -12,
                rotateZ: index % 2 === 0 ? 1.8 : -1.8,
                scale: 0.92
              },
              {
                width: "100%",
                height: "100%",
                borderRadius: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                scale: 1,
                duration: 1
              },
              `${label}+=0.16`
            )
            .fromTo(
              nextImage,
              {
                yPercent: 5,
                scale: 1.14
              },
              {
                yPercent: 0,
                scale: 1.02,
                duration: 1
              },
              `${label}+=0.16`
            )
            .fromTo(
              nextCopy,
              {
                y: 38,
                opacity: 0
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.45
              },
              `${label}+=0.58`
            )
            .to(
              slide,
              {
                opacity: 0,
                pointerEvents: "none",
                duration: 0.18
              },
              `${label}+=0.94`
            );

          if (index < brands.length - 2) {
            timeline.to({}, { duration: BRAND_SETTLED_HOLD_SECONDS });
          }
        });

        let isWheelSnapping = false;
        let wheelSnapTimer: number | undefined;
        const getBrandSnapPoints = () =>
          Array.from(root.querySelectorAll<HTMLElement>(".brand-slide-stack__anchor")).map((anchor) =>
            Math.round(anchor.getBoundingClientRect().top + window.scrollY)
          );
        const getPreviousSnapPoint = (snapPoints: number[], currentY: number) => {
          for (let index = snapPoints.length - 1; index >= 0; index -= 1) {
            if (snapPoints[index] < currentY - 8) {
              return snapPoints[index];
            }
          }

          return undefined;
        };
        const scrollToBrandSnapPoint = (targetY: number) => {
          isWheelSnapping = true;

          if (wheelSnapTimer) {
            window.clearTimeout(wheelSnapTimer);
          }

          scrollToTarget(targetY, {
            duration: BRAND_SNAP_DURATION_SECONDS,
            lock: true
          });

          wheelSnapTimer = window.setTimeout(() => {
            ScrollTrigger.update();
            isWheelSnapping = false;
            wheelSnapTimer = undefined;
          }, BRAND_SNAP_RELEASE_MS);
        };
        const getWheelSnapTarget = (event: WheelEvent) => {
          const stackTop = root.getBoundingClientRect().top + window.scrollY;
          const stackEnd = stackTop + root.offsetHeight - window.innerHeight;
          const nextSectionTop = stackTop + root.offsetHeight;
          const currentY = window.scrollY;
          const isScrollingDown = event.deltaY > 0;

          if (currentY < stackTop - 2 || currentY > stackEnd + 2) {
            return undefined;
          }

          const snapPoints = getBrandSnapPoints();

          if (isScrollingDown) {
            return snapPoints.find((point) => point > currentY + 8) ?? (currentY < stackEnd - 8 ? stackEnd : nextSectionTop);
          }

          return getPreviousSnapPoint(snapPoints, currentY) ?? Math.max(0, stackTop - window.innerHeight);
        };
        const handleWheelSnap = (event: WheelEvent) => {
          if (
            event.defaultPrevented ||
            event.ctrlKey ||
            Math.abs(event.deltaY) < 6 ||
            Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ) {
            return;
          }

          const targetY = getWheelSnapTarget(event);

          if (targetY === undefined || Math.abs(targetY - window.scrollY) <= 4) {
            return;
          }

          event.preventDefault();

          if (isWheelSnapping) {
            return;
          }

          scrollToBrandSnapPoint(targetY);
        };

        window.addEventListener("wheel", handleWheelSnap, { capture: true, passive: false });
        removeWheelSnap = () => {
          window.removeEventListener("wheel", handleWheelSnap, { capture: true });

          if (wheelSnapTimer) {
            window.clearTimeout(wheelSnapTimer);
          }
        };
      }, root);

      cleanup = () => {
        removeWheelSnap?.();
        context.revert();
      };
      ScrollTrigger.refresh();
    }

    void setupScrollTimeline();
    const handleMediaChange = () => {
      void setupScrollTimeline();
    };

    mobileStackQuery.addEventListener("change", handleMediaChange);
    reducedMotionQuery.addEventListener("change", handleMediaChange);

    return () => {
      isActive = false;
      mobileStackQuery.removeEventListener("change", handleMediaChange);
      reducedMotionQuery.removeEventListener("change", handleMediaChange);
      cleanup?.();
    };
  }, [brands.length, transitionSteps]);

  return (
    <section
      ref={rootRef}
      id={HOME_SECTION_IDS.brand}
      className="brand-slide-stack"
      aria-label="ROTI brand scene slides"
      style={stackStyle}
    >
      {brands.map((brand, index) => (
        <span
          key={`${brand.id}-anchor`}
          id={brand.id}
          className="brand-slide-stack__anchor"
          style={
            {
              "--brand-anchor-index": index
            } as BrandAnchorStyle
          }
          aria-hidden="true"
        />
      ))}
      <div ref={viewportRef} className="brand-slide-stack__viewport">
        <nav className="brand-slide-stack__index" aria-label="ROTI brand scene index">
          {brands.map((brand, index) => (
            <button
              key={`${brand.id}-index`}
              className="brand-slide-stack__index-button"
              type="button"
              aria-current={activeSlideIndex === index ? "true" : undefined}
              data-active={activeSlideIndex === index}
              aria-label={`${String(index + 1).padStart(2, "0")} ${brand.name} 장면으로 이동`}
              onClick={() =>
                scrollToTarget(brand.id, {
                  duration: BRAND_SNAP_DURATION_SECONDS,
                  lock: true
                })
              }
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {brand.shortName}
            </button>
          ))}
        </nav>
        <div className="brand-slide-stack__slides">
          {brands.map((brand) => (
            <article
              key={brand.id}
              className="brand-slide-stack__slide"
              data-brand={brand.id}
              aria-labelledby={`${brand.id}-slide-title`}
              style={{ "--brand-scene-image": `url(${brand.sectionImage})` } as BrandSceneStyle}
            >
              <div className="brand-slide-stack__frame">
                <span className="brand-slide-stack__image" aria-hidden="true" />
                <span className="brand-slide-stack__shade" aria-hidden="true" />
                <div className="brand-slide-stack__copy">
                  <h2 id={`${brand.id}-slide-title`} className="brand-slide-stack__title">
                    <Image
                      src={brand.logoSrc}
                      alt={brand.logoAlt}
                      width={brand.logoWidth}
                      height={brand.logoHeight}
                      sizes="(max-width: 760px) 48vw, 20rem"
                    />
                  </h2>
                  <p className="brand-slide-stack__body">{brand.scene.copy}</p>
                  <a
                    className="brand-slide-stack__keywords-link"
                    href={brand.brandUrl}
                    aria-label={`${brand.name} 섹션으로 이동`}
                  >
                    <span>{brand.visualScene}</span>
                    <span className="brand-slide-stack__keyword-arrow" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
