"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import styles from "./CinematicSectionReveal.module.css";

type CinematicSectionRevealProps = {
  children: ReactNode;
  className?: string;
  replayKey?: number;
};

const MOTION_TARGETS = [
  ".about-roti__continuation",
  ".about-roti__continuation img",
  ".about-roti__title",
  ".about-roti__title-line",
  ".about-roti__lead",
  ".about-roti__body",
  ".about-roti__signature",
  ".roti-values",
  ".roti-values__vision h2",
  ".roti-values__vision-title-line",
  ".roti-values__vision-copy",
  ".roti-values__list",
  ".roti-values__item"
].join(",");

export function CinematicSectionReveal({
  children,
  className,
  replayKey = 0
}: CinematicSectionRevealProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return undefined;
    }

    let cancelled = false;
    let dispose: (() => void) | undefined;

    const setupMotion = async () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        root.dataset.motionStatus = "reduced";
        return undefined;
      }

      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger")
        ]);

        if (cancelled) {
          return undefined;
        }

        gsap.registerPlugin(ScrollTrigger);
        root.dataset.motionStatus = "ready";

        const triggers: Array<ReturnType<typeof ScrollTrigger.create>> = [];
        const timelines: gsap.core.Timeline[] = [];
        const media = gsap.matchMedia();

        const context = gsap.context(() => {
          media.add(
            {
              desktop: "(min-width: 701px)",
              mobile: "(max-width: 700px)"
            },
            (contextState) => {
              const isMobile = Boolean(contextState.conditions?.mobile);
              const about = root.querySelector<HTMLElement>(".about-roti");
              const values = root.querySelector<HTMLElement>(".roti-values");

              if (about) {
                const continuation = about.querySelector<HTMLElement>(".about-roti__continuation");
                const continuationImage = about.querySelector<HTMLElement>(".about-roti__continuation img");
                const title = about.querySelector<HTMLElement>(".about-roti__title");
                const titleLines = Array.from(
                  about.querySelectorAll<HTMLElement>(".about-roti__title-line")
                );
                const story = Array.from(
                  about.querySelectorAll<HTMLElement>(".about-roti__lead, .about-roti__body")
                );
                const signature = about.querySelector<HTMLElement>(".about-roti__signature");

                gsap.set(continuation, { autoAlpha: 0 });
                gsap.set(continuationImage, {
                  scale: isMobile ? 1.055 : 1.12,
                  yPercent: isMobile ? -0.5 : -2,
                  transformOrigin: "50% 50%"
                });
                gsap.set(title, { autoAlpha: 1 });
                if (titleLines.length > 0) {
                  gsap.set(titleLines, {
                    autoAlpha: 0,
                    clipPath: "inset(0 0 100% 0)",
                    y: isMobile ? 22 : 54
                  });
                }
                gsap.set(story, { autoAlpha: 0, y: isMobile ? 16 : 32 });
                gsap.set(signature, {
                  autoAlpha: 0,
                  clipPath: "inset(0 100% 0 0)",
                  x: isMobile ? -8 : -16
                });

                const aboutTimeline = gsap
                  .timeline({ paused: true, defaults: { ease: "power4.out" } })
                  .to(continuation, { autoAlpha: 1, duration: isMobile ? 0.5 : 0.92 }, 0)
                  .to(
                    continuationImage,
                    {
                      scale: 1.02,
                      yPercent: 0,
                      duration: isMobile ? 0.78 : 1.5,
                      ease: "power2.out",
                      clearProps: "transform"
                    },
                    0
                  );

                if (titleLines.length > 0) {
                  aboutTimeline.to(
                    titleLines,
                    {
                      autoAlpha: 1,
                      clipPath: "inset(0 0 0% 0)",
                      y: 0,
                      duration: isMobile ? 0.5 : 0.84,
                      stagger: isMobile ? 0.08 : 0.14,
                      clearProps: "clipPath,transform"
                    },
                    isMobile ? 0.04 : 0.08
                  );
                }

                aboutTimeline
                  .to(
                    story,
                    {
                      autoAlpha: 1,
                      y: 0,
                      duration: isMobile ? 0.4 : 0.62,
                      stagger: isMobile ? 0.07 : 0.12,
                      clearProps: "transform"
                    },
                    isMobile ? 0.23 : 0.42
                  )
                  .to(
                    signature,
                    {
                      autoAlpha: 1,
                      clipPath: "inset(0 0% 0 0)",
                      x: 0,
                      duration: isMobile ? 0.42 : 0.64,
                      clearProps: "clipPath,transform"
                    },
                    isMobile ? 0.34 : 0.62
                  );

                timelines.push(aboutTimeline);
                triggers.push(
                  ScrollTrigger.create({
                    trigger: about,
                    start: isMobile ? "top 88%" : "top 78%",
                    once: true,
                    onEnter: () => aboutTimeline.play(0)
                  })
                );
              }

              if (values) {
                const title = values.querySelector<HTMLElement>(".roti-values__vision h2");
                const titleLines = Array.from(
                  values.querySelectorAll<HTMLElement>(".roti-values__vision-title-line")
                );
                const copy = values.querySelector<HTMLElement>(".roti-values__vision-copy");
                const list = values.querySelector<HTMLElement>(".roti-values__list");
                const items = Array.from(values.querySelectorAll<HTMLElement>(".roti-values__item"));

                gsap.set(values, {
                  clipPath: isMobile ? "inset(5% 0 0 0)" : "inset(15% 0 0 0)",
                  borderRadius: isMobile ? "1.25rem 1.25rem 0 0" : "3rem 3rem 0 0",
                  y: isMobile ? 14 : 42
                });
                gsap.set(title, { autoAlpha: 1 });
                gsap.set(titleLines, {
                  autoAlpha: 0,
                  clipPath: "inset(0 0 100% 0)",
                  y: isMobile ? 22 : 48
                });
                gsap.set(copy, { autoAlpha: 0, y: isMobile ? 14 : 28 });
                gsap.set(list, { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" });
                gsap.set(items, { autoAlpha: 0, y: isMobile ? 14 : 30, scale: 0.985 });

                const valuesTimeline = gsap
                  .timeline({ paused: true, defaults: { ease: "power4.out" } })
                  .to(
                    values,
                    {
                      clipPath: "inset(0% 0 0 0)",
                      borderRadius: 0,
                      y: 0,
                      duration: isMobile ? 0.56 : 1.02,
                      clearProps: "clipPath,borderRadius,transform"
                    },
                    0
                  )
                  .to(
                    titleLines,
                    {
                      autoAlpha: 1,
                      clipPath: "inset(0 0 0% 0)",
                      y: 0,
                      duration: isMobile ? 0.48 : 0.8,
                      stagger: isMobile ? 0.08 : 0.13,
                      clearProps: "clipPath,transform"
                    },
                    isMobile ? 0.04 : 0.1
                  )
                  .to(
                    copy,
                    {
                      autoAlpha: 1,
                      y: 0,
                      duration: isMobile ? 0.38 : 0.56,
                      clearProps: "transform"
                    },
                    isMobile ? 0.2 : 0.38
                  )
                  .to(
                    list,
                    {
                      autoAlpha: 1,
                      clipPath: "inset(0 0% 0 0)",
                      duration: isMobile ? 0.38 : 0.62,
                      clearProps: "clipPath"
                    },
                    isMobile ? 0.29 : 0.5
                  )
                  .to(
                    items,
                    {
                      autoAlpha: 1,
                      y: 0,
                      scale: 1,
                      duration: isMobile ? 0.34 : 0.5,
                      stagger: isMobile ? 0.055 : 0.09,
                      clearProps: "transform"
                    },
                    isMobile ? 0.33 : 0.62
                  );

                timelines.push(valuesTimeline);
                triggers.push(
                  ScrollTrigger.create({
                    trigger: values,
                    start: isMobile ? "top 90%" : "top 82%",
                    onEnter: () => valuesTimeline.restart(),
                    onEnterBack: () => valuesTimeline.restart(),
                    onLeaveBack: () => valuesTimeline.pause(0)
                  })
                );
              }
            }
          );
        }, root);

        ScrollTrigger.refresh();

        return () => {
          triggers.forEach((trigger) => trigger.kill());
          timelines.forEach((timeline) => timeline.kill());
          media.revert();
          context.revert();
          delete root.dataset.motionStatus;
        };
      } catch {
        root.dataset.motionStatus = "fallback";
        root.querySelectorAll<HTMLElement>(MOTION_TARGETS).forEach((element) => {
          element.style.removeProperty("opacity");
          element.style.removeProperty("visibility");
          element.style.removeProperty("transform");
          element.style.removeProperty("clip-path");
          element.style.removeProperty("border-radius");
          element.style.removeProperty("will-change");
        });
        return undefined;
      }
    };

    void setupMotion().then((cleanup) => {
      if (cancelled) {
        cleanup?.();
        return;
      }

      dispose = cleanup;
    });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [replayKey]);

  return (
    <div ref={rootRef} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
