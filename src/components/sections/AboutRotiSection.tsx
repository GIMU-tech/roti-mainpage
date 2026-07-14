"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { brands } from "@/data/brands";
import { HOME_SECTION_IDS } from "@/data/sections";
import { siteContent } from "@/data/siteContent";
import { scrollToTarget } from "@/lib/scroll/smoothScroll";
import type { Brand } from "@/types/brand";

type AboutScene = {
  id: string;
  label: string;
  title: string;
  accent: string;
  description: string;
  glowPosition: string;
  brand?: Brand;
};

type AboutSequenceStyle = CSSProperties & {
  "--about-scene-count": number;
};

const brandGlowPositions = ["28%", "72%", "55%"];

const aboutScenes: AboutScene[] = [
  {
    id: "roti-group",
    label: "ROTI",
    title: siteContent.about.title[0],
    accent: siteContent.about.title[1],
    description: siteContent.about.description,
    glowPosition: "50%"
  },
  ...brands.map((brand, index) => ({
    id: brand.id,
    label: brand.name,
    title: brand.about.title,
    accent: brand.about.accent,
    description: brand.about.description,
    glowPosition: brandGlowPositions[index],
    brand
  }))
];

const sceneSnapProgress = aboutScenes
  .slice(1)
  .map((_, index) => (index + 1) / aboutScenes.length)
  .join(",");

function clampSceneIndex(index: number) {
  return Math.max(0, Math.min(aboutScenes.length - 1, index));
}

export function AboutRotiSection() {
  const rootRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  const updateSceneFromScroll = useCallback(() => {
    animationFrameRef.current = null;

    const root = rootRef.current;

    if (!root) {
      return;
    }

    const viewportHeight = Math.max(window.innerHeight, 1);
    const sectionTop = root.getBoundingClientRect().top + window.scrollY;
    const nextSceneIndex = clampSceneIndex(Math.round((window.scrollY - sectionTop) / viewportHeight));

    setActiveSceneIndex((currentIndex) => (currentIndex === nextSceneIndex ? currentIndex : nextSceneIndex));
  }, []);

  useEffect(() => {
    const requestSceneUpdate = () => {
      if (animationFrameRef.current !== null) {
        return;
      }

      animationFrameRef.current = window.requestAnimationFrame(updateSceneFromScroll);
    };

    window.addEventListener("scroll", requestSceneUpdate, { passive: true });
    window.addEventListener("resize", requestSceneUpdate, { passive: true });
    requestSceneUpdate();

    return () => {
      window.removeEventListener("scroll", requestSceneUpdate);
      window.removeEventListener("resize", requestSceneUpdate);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateSceneFromScroll]);

  const moveToScene = (sceneIndex: number) => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const sectionTop = root.getBoundingClientRect().top + window.scrollY;
    const targetTop = sectionTop + window.innerHeight * clampSceneIndex(sceneIndex);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    scrollToTarget(targetTop, {
      duration: prefersReducedMotion ? 0 : 0.9,
      lock: !prefersReducedMotion
    });
  };

  const activeScene = aboutScenes[activeSceneIndex];

  return (
    <section
      ref={rootRef}
      id={HOME_SECTION_IDS.about}
      className="about-roti-scroll"
      aria-labelledby="about-roti-title"
      data-section-snap-progress={sceneSnapProgress}
      data-section-snap-range-vh={aboutScenes.length}
      style={{ "--about-scene-count": aboutScenes.length } as AboutSequenceStyle}
    >
      <div className="about-roti-scroll__stage">
        <div className="about-roti-scroll__backgrounds" aria-hidden="true">
          <div
            className="about-roti-scroll__background about-roti-scroll__background--group"
            data-active={activeSceneIndex === 0}
          >
            {brands.map((brand) => (
              <span className="about-roti-scroll__background-panel" key={`${brand.id}-about-group`}>
                <Image src={brand.about.image} alt="" fill sizes="33vw" />
              </span>
            ))}
          </div>

          {brands.map((brand, index) => (
            <div
              key={`${brand.id}-about-background`}
              className="about-roti-scroll__background"
              data-active={activeSceneIndex === index + 1}
              data-brand={brand.id}
            >
              <Image src={brand.about.image} alt="" fill sizes="100vw" />
            </div>
          ))}
        </div>

        <span
          className="about-roti-scroll__shade"
          aria-hidden="true"
          style={{ "--about-glow-x": activeScene.glowPosition } as CSSProperties}
        />
        <span className="about-roti-scroll__grain" aria-hidden="true" />

        <div className="about-roti-scroll__content">
          <div className="about-roti-scroll__main">
            <div className="about-roti-scroll__side-index" aria-hidden="true">
              <span>STORY</span>
              <strong>{String(activeSceneIndex + 1).padStart(2, "0")}</strong>
            </div>

            <div className="about-roti-scroll__story-frame">
              {aboutScenes.map((scene, index) => {
                const isActive = activeSceneIndex === index;

                return (
                  <article
                    key={scene.id}
                    className="about-roti-scroll__story"
                    data-active={isActive}
                    aria-hidden={!isActive}
                  >
                    {scene.brand ? (
                      <Image
                        className="about-roti-scroll__story-logo"
                        src={scene.brand.logoSrc}
                        alt={scene.brand.logoAlt}
                        width={scene.brand.logoWidth}
                        height={scene.brand.logoHeight}
                        sizes="(max-width: 560px) 42vw, 10rem"
                      />
                    ) : (
                      <p className="about-roti-scroll__kicker">ALWAYS ALERT FOR CHANGES</p>
                    )}

                    {index === 0 ? (
                      <h2 id="about-roti-title" className="about-roti-scroll__title">
                        {scene.title}
                        <br />
                        <em>{scene.accent}</em>
                      </h2>
                    ) : (
                      <h3 className="about-roti-scroll__title">
                        {scene.title}
                        <br />
                        <em>{scene.accent}</em>
                      </h3>
                    )}

                    <p className="about-roti-scroll__description">{scene.description}</p>
                  </article>
                );
              })}

              <div className="about-roti-scroll__progress" aria-label="ABOUT ROTI 장면 선택">
                {aboutScenes.map((scene, index) => {
                  const isActive = activeSceneIndex === index;

                  return (
                    <button
                      key={`${scene.id}-progress`}
                      className="about-roti-scroll__progress-button"
                      type="button"
                      data-active={isActive}
                      aria-pressed={isActive}
                      aria-label={`${scene.label} 소개 보기`}
                      onClick={() => moveToScene(index)}
                    >
                      <span className="about-roti-scroll__progress-line" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
