"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { rotiStandards } from "@/data/standards";
import { SectionLabel } from "@/components/ui/SectionLabel";

const transitionSteps = Math.max(rotiStandards.length - 1, 1);

type StandardSectionStyle = CSSProperties & {
  "--standard-steps": number;
};

type StandardSceneStyle = CSSProperties & {
  "--standard-scene-offset": number;
};

export function RotiStandardSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const standardRoot = root;
    let cleanup: (() => void) | undefined;
    let isActive = true;

    async function setupStandardTimeline() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);

      if (!isActive) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        ScrollTrigger.create({
          trigger: standardRoot,
          start: "top top",
          end: "bottom bottom",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progressIndex = Math.min(
              rotiStandards.length - 1,
              Math.max(0, Math.round(self.progress * transitionSteps))
            );

            standardRoot.style.setProperty("--standard-progress", self.progress.toFixed(4));
            setActiveIndex(progressIndex);
          }
        });
      }, standardRoot);

      cleanup = () => context.revert();
      ScrollTrigger.refresh();
    }

    void setupStandardTimeline();

    return () => {
      isActive = false;
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="roti-standard"
      id="standard"
      aria-labelledby="roti-standard-title"
      style={{ "--standard-steps": transitionSteps } as StandardSectionStyle}
    >
      <div className="roti-standard__viewport">
        <div className="roti-standard__scene-stack" aria-hidden="true">
          {rotiStandards.map((standard, index) => (
            <div
              key={`${standard.id}-scene`}
              className="roti-standard__scene"
              data-active={activeIndex === index}
              style={{ "--standard-scene-offset": index - activeIndex } as StandardSceneStyle}
            >
              <div className="roti-standard__scene-image" style={{ backgroundImage: `url(${standard.image})` }} />
              <div className="roti-standard__scene-shade" />
            </div>
          ))}
        </div>

        <div className="roti-standard__copy-stage">
          <SectionLabel>ROTI STANDARD</SectionLabel>
          <p className="roti-standard__section-copy">실제 장면에서 판단하는 ROTI의 기준</p>

          <div className="roti-standard__text-stack">
            {rotiStandards.map((standard, index) => (
              <article
                key={standard.id}
                className="roti-standard__panel"
                data-active={activeIndex === index}
                style={{ "--standard-scene-offset": index - activeIndex } as StandardSceneStyle}
              >
                <span className="roti-standard__count">
                  ROTI STANDARD {String(index + 1).padStart(2, "0")} / {String(rotiStandards.length).padStart(2, "0")}
                </span>
                <p className="roti-standard__english">{standard.englishTitle}</p>
                <h2 id={index === 0 ? "roti-standard-title" : undefined}>{standard.title}</h2>
                <div
                  className="roti-standard__mobile-media"
                  role="img"
                  aria-label={standard.imageAlt}
                  style={{ backgroundImage: `url(${standard.image})` }}
                />
                <p className="roti-standard__copy">{standard.copy}</p>
                <p className="roti-standard__proof">
                  <span>{standard.visualLabel}</span>
                  {standard.visualCopy}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="roti-standard__progress" aria-hidden="true">
          {rotiStandards.map((standard, index) => (
            <span key={`${standard.id}-progress`} data-active={activeIndex === index}>
              {String(index + 1).padStart(2, "0")}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
