"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { SectionShell } from "@/components/layout/SectionShell";
import { HOME_SECTION_IDS } from "@/data/sections";
import { rotiStandards } from "@/data/standards";
import { siteContent } from "@/data/siteContent";

const rotiBusinessSlides = rotiStandards;

const STANDARD_SCROLL_RANGE_PERCENT = 40 + rotiBusinessSlides.length * 80;
const STANDARD_SNAP_PROGRESS = [0.5, 0.75] as const;

export function RotiBusinessReplicaSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let isMounted = true;
    let context: { revert: () => void } | undefined;

    const setupScrollAnimation = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);

      if (!isMounted || !sectionRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      context = gsap.context(() => {
        const tabList = section.querySelector<HTMLElement>(".roti-business-replica__tab-list");
        const tabItems = gsap.utils.toArray<HTMLElement>(".roti-business-replica__tab", section);
        const imageContainer = section.querySelector<HTMLElement>(".roti-business-replica__image-stage");
        const serviceImages = gsap.utils.toArray<HTMLElement>(".roti-business-replica__image", section);
        const serviceContents = gsap.utils.toArray<HTMLElement>(".roti-business-replica__content", section);

        if (!imageContainer || serviceImages.length === 0 || serviceContents.length === 0) {
          return;
        }

        const actualSlideCount = serviceContents.length;
        const isMobile = () => window.innerWidth <= 768;
        const getGap = () => (isMobile() ? 16 : 20);
        const getPreviewRatio = () => (isMobile() ? 0.28 : 0.24);
        const getItemHeight = () => {
          const firstTabHeight = tabItems[0]?.offsetHeight || 24;
          return firstTabHeight + (isMobile() ? 12 : 0);
        };
        const getStageWidth = () => {
          return Math.max(1, imageContainer.offsetWidth);
        };
        const getPreviewWidth = () => Math.max(44, getStageWidth() * getPreviewRatio());
        const getActiveWidth = () => Math.max(1, getStageWidth() - getPreviewWidth() - getGap());
        const getPreviewX = () => getActiveWidth() + getGap();
        const getWaitingX = () => getStageWidth() + getGap();
        const getExitX = () => -(getActiveWidth() + getGap());
        const getImageOrder = (activeIndex: number, imageIndex: number) => (imageIndex - activeIndex + actualSlideCount) % actualSlideCount;
        const getImageX = (activeIndex: number, imageIndex: number) => {
          const order = getImageOrder(activeIndex, imageIndex);

          if (order === 0) {
            return 0;
          }

          if (order === 1) {
            return getPreviewX();
          }

          return getWaitingX();
        };
        const getImageWidth = (activeIndex: number, imageIndex: number) => (getImageOrder(activeIndex, imageIndex) === 0 ? getActiveWidth() : getPreviewWidth());
        const getImageBrightness = (activeIndex: number, imageIndex: number) => {
          const order = getImageOrder(activeIndex, imageIndex);
          return order === 0 ? 1 : order === 1 ? 0.64 : 0.42;
        };
        const getImageZIndex = (activeIndex: number, imageIndex: number) => {
          const order = getImageOrder(activeIndex, imageIndex);
          return order === 0 ? 3 : order === 1 ? 2 : 1;
        };

        if (tabList && tabItems.length > 0) {
          gsap.set(tabList, { y: 0 });
          tabItems.forEach((item, index) => {
            gsap.set(item, {
              fontWeight: index === 0 ? 760 : 400,
              opacity: index === 0 ? 1 : index === 1 ? 0.5 : 0.3
            });
          });
        }

        serviceImages.forEach((image, index) => {
          gsap.set(image, {
            x: () => getImageX(0, index),
            width: () => getImageWidth(0, index),
            filter: () => `brightness(${getImageBrightness(0, index)})`,
            position: "absolute",
            left: 0,
            zIndex: () => getImageZIndex(0, index)
          });
        });

        serviceContents.forEach((content, index) => {
          const meta = content.querySelector(".roti-business-replica__content-meta");
          const english = content.querySelector(".roti-business-replica__content-english");
          const title = content.querySelector(".roti-business-replica__content-title");
          const description = content.querySelector(".roti-business-replica__content-description");

          gsap.set(content, { autoAlpha: index === 0 ? 1 : 0 });
          gsap.set([meta, english, title, description], {
            autoAlpha: index === 0 ? 1 : 0,
            clipPath: index === 0 ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)"
          });
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${STANDARD_SCROLL_RANGE_PERCENT}%`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
          }
        });

        timeline.to({}, { duration: 1 });

        for (let index = 0; index < actualSlideCount - 1; index += 1) {
          const nextIndex = index + 1;

          timeline.addLabel(`step-${index}`);

          if (tabList && tabItems.length > 0) {
            timeline.to(tabList, { y: () => -(nextIndex * getItemHeight()), duration: 0.01, ease: "none" }, `step-${index}+=0.5`);

            tabItems.forEach((item, tabIndex) => {
              const offset = tabIndex - nextIndex;
              const opacity = offset === 0 ? 1 : offset === 1 ? 0.5 : offset === 2 ? 0.3 : 0.1;

              timeline.to(
                item,
                {
                  fontWeight: offset === 0 ? 760 : 400,
                  opacity,
                  duration: 0.01,
                  ease: "none"
                },
                `step-${index}+=0.5`
              );
            });
          }

          timeline.to(serviceContents[index], { autoAlpha: 0, duration: 0.3, ease: "power2.in" }, `step-${index}`);

          const nextContent = serviceContents[nextIndex];
          const nextMeta = nextContent.querySelector(".roti-business-replica__content-meta");
          const nextEnglish = nextContent.querySelector(".roti-business-replica__content-english");
          const nextTitle = nextContent.querySelector(".roti-business-replica__content-title");
          const nextDescription = nextContent.querySelector(".roti-business-replica__content-description");

          timeline.to(nextContent, { autoAlpha: 1, duration: 0.1 }, `step-${index}`);
          timeline.fromTo(
            nextMeta,
            { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" },
            { autoAlpha: 1, clipPath: "inset(0 0% 0 0)", duration: 0.42, ease: "power2.out" },
            `step-${index}+=0.12`
          );
          timeline.fromTo(
            nextEnglish,
            { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" },
            { autoAlpha: 1, clipPath: "inset(0 0% 0 0)", duration: 0.36, ease: "power2.out" },
            `step-${index}+=0.18`
          );
          timeline.fromTo(
            nextTitle,
            { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" },
            { autoAlpha: 1, clipPath: "inset(0 0% 0 0)", duration: 0.5, ease: "power2.out" },
            `step-${index}+=0.3`
          );
          timeline.fromTo(
            nextDescription,
            { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" },
            { autoAlpha: 1, clipPath: "inset(0 0% 0 0)", duration: 0.5, ease: "power2.out" },
            `step-${index}+=0.52`
          );

          const exitingImage = serviceImages[index];
          const enteringImage = serviceImages[nextIndex];
          const followingImage = serviceImages[(nextIndex + 1) % actualSlideCount];

          timeline.set(enteringImage, { zIndex: 3 }, `step-${index}`);
          timeline.set(followingImage, { zIndex: 2 }, `step-${index}`);
          timeline.set(exitingImage, { zIndex: 1 }, `step-${index}`);

          timeline.to(
            exitingImage,
            {
              x: getExitX,
              opacity: 0,
              filter: "brightness(0.42)",
              duration: 0.55,
              ease: "power2.inOut"
            },
            `step-${index}`
          );
          timeline.to(
            enteringImage,
            {
              x: 0,
              width: getActiveWidth,
              opacity: 1,
              filter: "brightness(1)",
              duration: 1,
              ease: "power2.inOut"
            },
            `step-${index}`
          );
          timeline.set(
            followingImage,
            {
              x: getWaitingX,
              width: getPreviewWidth,
              opacity: 1,
              filter: "brightness(0.42)"
            },
            `step-${index}`
          );
          timeline.to(
            followingImage,
            {
              x: getPreviewX,
              width: getPreviewWidth,
              filter: "brightness(0.64)",
              duration: 0.45,
              ease: "power2.out"
            },
            `step-${index}+=0.55`
          );
          timeline.set(
            exitingImage,
            {
              x: getWaitingX,
              width: getPreviewWidth,
              opacity: 1,
              filter: "brightness(0.42)"
            },
            `step-${index}+=1`
          );

          timeline.to({}, { duration: 0.5 });
        }

        timeline.to({}, { duration: 0.5 });
      }, section);

      ScrollTrigger.refresh();
    };

    void setupScrollAnimation();

    return () => {
      isMounted = false;
      context?.revert();
    };
  }, []);

  return (
    <SectionShell
      ref={sectionRef}
      className="roti-business-replica"
      id={HOME_SECTION_IDS.standard}
      aria-labelledby="roti-business-replica-title"
      data-section-snap-progress={STANDARD_SNAP_PROGRESS.join(",")}
      data-section-snap-range-vh={STANDARD_SCROLL_RANGE_PERCENT / 100}
    >
      <div className="roti-business-replica__container">
        <div className="roti-business-replica__layout">
          <div className="roti-business-replica__copy-column">
            <div className="roti-business-replica__header">
              <h2 id="roti-business-replica-title" className="roti-business-replica__title">
                {siteContent.standard.title}
              </h2>
            </div>
            <div className="roti-business-replica__content-wrapper">
              {rotiBusinessSlides.map((item, index) => (
                <div key={item.title} className="roti-business-replica__content" data-active={index === 0}>
                  <span className="roti-business-replica__content-meta">
                    STANDARD {String(index + 1).padStart(2, "0")} / {String(rotiBusinessSlides.length).padStart(2, "0")}
                  </span>
                  <p className="roti-business-replica__content-english">{item.englishTitle}</p>
                  <h3 className="roti-business-replica__content-title">{item.title}</h3>
                  <p className="roti-business-replica__content-description" aria-label={item.copyLines.join(" ")}>
                    {item.copyLines.map((line, lineIndex) => (
                      <span key={line} aria-hidden="true">
                        {line}
                        {lineIndex < item.copyLines.length - 1 ? (
                          <>
                            <br />
                            {" "}
                          </>
                        ) : null}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="roti-business-replica__image-stage" aria-hidden="true">
            {rotiBusinessSlides.map((item, index) => (
              <figure key={`${item.image}-${index}`} className="roti-business-replica__image">
                <Image src={item.image} alt={item.imageAlt} width={968} height={550} sizes="(max-width: 768px) 80vw, 60vw" />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
