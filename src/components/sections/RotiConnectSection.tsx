"use client";

import { getImageProps } from "next/image";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import { SectionGrid } from "@/components/layout/SectionGrid";
import { SectionShell } from "@/components/layout/SectionShell";
import { rotiConnectContent, type RotiConnectItem } from "@/data/rotiConnect";
import { HOME_SECTION_IDS } from "@/data/sections";

const AUTOPLAY_DELAY_MS = 3000;

type ConnectSlideSlot = "previous" | "active" | "next";

function getSlideSlot(index: number, activeIndex: number, itemCount: number): ConnectSlideSlot {
  if (index === activeIndex) {
    return "active";
  }

  return (index - activeIndex + itemCount) % itemCount === 1 ? "next" : "previous";
}

function ConnectMediaImage({ item }: { item: RotiConnectItem }) {
  const { props: desktopImageProps } = getImageProps({
    src: item.imageSrc,
    alt: item.imageAlt,
    width: 1672,
    height: 941,
    sizes: "48vw",
    quality: 88
  });
  const { props: mobileImageProps } = getImageProps({
    src: item.mobileImageSrc,
    alt: "",
    width: 1000,
    height: 1600,
    sizes: "88vw",
    quality: 88
  });

  return (
    <picture>
      <source media="(max-width: 760px)" srcSet={mobileImageProps.srcSet} sizes="88vw" />
      <img {...desktopImageProps} alt={item.imageAlt} className="roti-connect__media-image" />
    </picture>
  );
}

export function RotiConnectSection() {
  const [activeId, setActiveId] = useState<RotiConnectItem["id"]>("business");
  const [isPaused, setIsPaused] = useState(false);
  const items = rotiConnectContent.items;
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.id === activeId)
  );
  const activeItem = items[activeIndex] ?? items[1];
  const slideItems = useMemo(
    () => items.map((item, index) => ({ item, slot: getSlideSlot(index, activeIndex, items.length) })),
    [activeIndex, items]
  );

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let autoplayTimer: number | undefined;

    const scheduleAutoplay = () => {
      window.clearTimeout(autoplayTimer);

      if (isPaused || reducedMotionQuery.matches || document.visibilityState !== "visible") {
        return;
      }

      autoplayTimer = window.setTimeout(() => {
        const nextItem = items[(activeIndex + 1) % items.length];
        setActiveId(nextItem.id);
      }, AUTOPLAY_DELAY_MS);
    };

    scheduleAutoplay();
    document.addEventListener("visibilitychange", scheduleAutoplay);
    reducedMotionQuery.addEventListener("change", scheduleAutoplay);

    return () => {
      window.clearTimeout(autoplayTimer);
      document.removeEventListener("visibilitychange", scheduleAutoplay);
      reducedMotionQuery.removeEventListener("change", scheduleAutoplay);
    };
  }, [activeIndex, isPaused, items]);

  const selectByIndex = (index: number) => {
    const normalizedIndex = (index + items.length) % items.length;
    setActiveId(items[normalizedIndex].id);
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    const nextIndex = event.key === "ArrowRight" ? index + 1 : index - 1;
    const normalizedIndex = (nextIndex + items.length) % items.length;
    selectByIndex(normalizedIndex);
    document.getElementById(`roti-connect-tab-${items[normalizedIndex].id}`)?.focus();
  };

  return (
    <SectionShell
      className="roti-connect"
      id={HOME_SECTION_IDS.group}
      aria-labelledby="roti-connect-title"
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <SectionGrid className="roti-connect__grid">
        <header className="roti-connect__header">
          <h2 id="roti-connect-title" className="roti-connect__title">
            {rotiConnectContent.title}
          </h2>
        </header>

        <div className="roti-connect__selector" role="tablist" aria-label="ROTI 문의 유형">
          {items.map((item, index) => {
            const isActive = item.id === activeId;

            return (
              <button
                key={item.id}
                id={`roti-connect-tab-${item.id}`}
                className="roti-connect__tab"
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="roti-connect-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={(event) => {
                  setActiveId(item.id);
                  if (event.detail > 0) {
                    setIsPaused(false);
                  }
                }}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                <span>{item.index}</span>
                <strong>{item.category}</strong>
              </button>
            );
          })}
        </div>
      </SectionGrid>

      <div className="roti-connect__carousel" aria-roledescription="carousel" aria-label="ROTI 문의 유형 미리보기">
        <button
          className="roti-connect__arrow roti-connect__arrow--previous"
          type="button"
          aria-label="이전 문의 유형"
          onClick={(event) => {
            selectByIndex(activeIndex - 1);
            if (event.detail > 0) {
              setIsPaused(false);
            }
          }}
        >
          <CaretLeft aria-hidden="true" weight="regular" />
        </button>

        <div
          className="roti-connect__viewport"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {slideItems.map(({ item, slot }) => (
            <button
              key={item.id}
              className="roti-connect__media-card"
              type="button"
              data-slot={slot}
              aria-label={`${item.title} 선택`}
              aria-current={slot === "active" ? "true" : undefined}
              tabIndex={slot === "active" ? 0 : -1}
              onClick={(event) => {
                setActiveId(item.id);
                if (event.detail > 0) {
                  setIsPaused(false);
                }
              }}
            >
              <ConnectMediaImage item={item} />
              <span className="roti-connect__media-shade" aria-hidden="true" />
              <span className="roti-connect__media-index" aria-hidden="true">
                {item.index}
              </span>
            </button>
          ))}
        </div>

        <button
          className="roti-connect__arrow roti-connect__arrow--next"
          type="button"
          aria-label="다음 문의 유형"
          onClick={(event) => {
            selectByIndex(activeIndex + 1);
            if (event.detail > 0) {
              setIsPaused(false);
            }
          }}
        >
          <CaretRight aria-hidden="true" weight="regular" />
        </button>
      </div>

      <SectionGrid className="roti-connect__detail-grid">
        <article
          id="roti-connect-panel"
          className="roti-connect__detail"
          role="tabpanel"
          aria-labelledby={`roti-connect-tab-${activeItem.id}`}
          aria-live="polite"
        >
          <div key={activeItem.id} className="roti-connect__detail-content">
            <h3>{activeItem.title}</h3>
            <p>{activeItem.description}</p>
            <ul aria-label={`${activeItem.title} 주요 문의`}>
              {activeItem.keywords.map((keyword) => (
                <li key={keyword}>{keyword}</li>
              ))}
            </ul>
            <a href={activeItem.href}>{activeItem.ctaLabel}</a>
          </div>
        </article>
        <div className="roti-connect__progress" aria-hidden="true">
          <span style={{ "--connect-progress-index": activeIndex } as React.CSSProperties} />
        </div>
      </SectionGrid>
    </SectionShell>
  );
}
