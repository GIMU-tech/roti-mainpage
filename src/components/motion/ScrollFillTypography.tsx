"use client";

import { useEffect, useRef } from "react";
import styles from "./ScrollFillTypography.module.css";

type ScrollFillTypographyProps = {
  headingLevel?: "h1" | "h2";
  id: string;
  lines: readonly string[];
  replayKey?: number;
};

export function ScrollFillTypography({
  headingLevel = "h1",
  id,
  lines,
  replayKey = 0
}: ScrollFillTypographyProps) {
  const Heading = headingLevel;
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;

    if (!section || !title) {
      return undefined;
    }

    const lineElements = Array.from(
      title.querySelectorAll<HTMLElement>("[data-scroll-fill-line]")
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.dataset.motionStatus = "reduced";
      return () => delete section.dataset.motionStatus;
    }

    let cancelled = false;
    let dispose: (() => void) | undefined;

    const setupMotion = async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger")
        ]);

        if (cancelled) {
          return undefined;
        }

        gsap.registerPlugin(ScrollTrigger);
        section.dataset.motionStatus = "ready";

        const context = gsap.context(() => {
          gsap.set(title, {
            autoAlpha: 0.08,
            y: 44
          });
          gsap.set(lineElements, { "--fill-progress": "0%" });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.45,
              invalidateOnRefresh: true
            }
          });

          timeline.to(title, {
            autoAlpha: 1,
            y: 0,
            duration: 0.28,
            ease: "power3.out"
          });

          lineElements.forEach((line, index) => {
            timeline.to(line, {
              "--fill-progress": "100%",
              duration: index === 0 ? 0.3 : 0.5,
              ease: "none"
            });
          });

          timeline.to({}, { duration: 0.08 });
        }, section);

        ScrollTrigger.refresh();

        return () => {
          context.revert();
          delete section.dataset.motionStatus;
        };
      } catch {
        section.dataset.motionStatus = "fallback";
        title.style.removeProperty("opacity");
        title.style.removeProperty("visibility");
        title.style.removeProperty("transform");
        lineElements.forEach((line) => line.style.setProperty("--fill-progress", "100%"));
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
    <section ref={sectionRef} id={id} className={styles.track} aria-labelledby={`${id}-title`}>
      <div className={styles.stage}>
        <Heading ref={titleRef} id={`${id}-title`} className={styles.title}>
          {lines.map((line) => (
            <span key={line} data-scroll-fill-line>
              {line}
            </span>
          ))}
        </Heading>
        <div className={styles.progressCue} aria-hidden="true">
          <span>SCROLL</span>
          <i />
        </div>
      </div>
    </section>
  );
}
