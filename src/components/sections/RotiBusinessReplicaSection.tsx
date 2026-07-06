"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const rotiBusinessSlides = [
  {
    tab: "Practicality",
    title: "실용성",
    description: ["매일 손이 닿는 순간부터", "싣고, 꺼내고, 정리하는 흐름까지 먼저 확인합니다."],
    image: "/images/standards/standard-practicality.png",
    alt: "ROTI 실용성 기준을 보여주는 생활 장면"
  },
  {
    tab: "Ordered design",
    title: "정돈된 설계",
    description: ["공간과 동선이 흐트러지지 않도록", "보관 위치, 사용 순서, 이동 방식을 정리합니다."],
    image: "/images/standards/standard-ordered-design.png",
    alt: "ROTI 정돈된 설계 기준을 보여주는 정리된 공간"
  },
  {
    tab: "Trusted quality",
    title: "믿을 수 있는 품질",
    description: ["소재와 마감, 접합부처럼", "눈과 손으로 확인되는 디테일을 중심에 둡니다."],
    image: "/images/standards/standard-trusted-quality.png",
    alt: "ROTI 품질 기준을 보여주는 소재와 마감 디테일"
  }
] as const;

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

        const isMobile = () => window.innerWidth <= 768;
        const getGap = () => (isMobile() ? 16 : 20);
        const getItemHeight = () => {
          const firstTabHeight = tabItems[0]?.offsetHeight || 24;
          return firstTabHeight + (isMobile() ? 12 : 0);
        };
        const getImageWidth = () => {
          if (isMobile()) {
            return 530;
          }

          const preferredWidth = imageContainer.offsetWidth * 0.5;
          return Math.max(800, Math.min(968, preferredWidth));
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
            x: () => index * (getImageWidth() + getGap()),
            width: getImageWidth,
            filter: "brightness(1)",
            position: "absolute",
            left: 0
          });
        });

        serviceContents.forEach((content, index) => {
          const title = content.querySelector(".roti-business-replica__content-title");
          const description = content.querySelector(".roti-business-replica__content-description");

          gsap.set(content, { autoAlpha: index === 0 ? 1 : 0 });
          gsap.set([title, description], {
            autoAlpha: index === 0 ? 1 : 0,
            clipPath: index === 0 ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)"
          });
        });

        const actualSlideCount = serviceContents.length;
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${40 + actualSlideCount * 80}%`,
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
          const nextTitle = nextContent.querySelector(".roti-business-replica__content-title");
          const nextDescription = nextContent.querySelector(".roti-business-replica__content-description");

          timeline.to(nextContent, { autoAlpha: 1, duration: 0.1 }, `step-${index}`);
          timeline.fromTo(
            nextTitle,
            { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" },
            { autoAlpha: 1, clipPath: "inset(0 0% 0 0)", duration: 0.5, ease: "power2.out" },
            `step-${index}+=0.2`
          );
          timeline.fromTo(
            nextDescription,
            { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" },
            { autoAlpha: 1, clipPath: "inset(0 0% 0 0)", duration: 0.5, ease: "power2.out" },
            `step-${index}+=0.4`
          );

          if (isMobile()) {
            serviceImages.forEach((image, imageIndex) => {
              timeline.to(
                image,
                {
                  x: () => imageIndex * (getImageWidth() + getGap()) - nextIndex * (getImageWidth() + getGap()),
                  duration: 1,
                  ease: "power2.inOut"
                },
                `step-${index}`
              );
            });
          } else {
            timeline.to(serviceImages[index], { filter: "brightness(0.3)", duration: 1, ease: "none" }, `step-${index}`);

            serviceImages.forEach((image, imageIndex) => {
              if (imageIndex > index) {
                timeline.to(
                  image,
                  {
                    x: () => imageIndex * (getImageWidth() + getGap()) - nextIndex * (getImageWidth() + getGap()),
                    duration: 1,
                    ease: "none"
                  },
                  `step-${index}`
                );
              }
            });
          }

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
    <section ref={sectionRef} className="roti-business-replica" id="standard" aria-labelledby="roti-business-replica-title">
      <div className="roti-business-replica__container">
        <div className="roti-business-replica__top">
          <div className="roti-business-replica__header">
            <h2 id="roti-business-replica-title" className="roti-business-replica__title">
              일상을 위한 세 가지 기준
            </h2>
          </div>
        </div>

        <div className="roti-business-replica__bottom">
          <div className="roti-business-replica__content-wrapper">
            {rotiBusinessSlides.map((item, index) => (
              <div key={item.title} className="roti-business-replica__content" data-active={index === 0}>
                <h3 className="roti-business-replica__content-title">{item.title}</h3>
                <p className="roti-business-replica__content-description">
                  {item.description.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>

          <div className="roti-business-replica__image-stage" aria-hidden="true">
            {rotiBusinessSlides.map((item) => (
              <figure key={item.image} className="roti-business-replica__image">
                <Image src={item.image} alt={item.alt} width={968} height={550} sizes="(max-width: 768px) 33.125rem, 60.5rem" />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
