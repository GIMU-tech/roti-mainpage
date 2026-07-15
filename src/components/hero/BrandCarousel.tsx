"use client";

import type { Brand } from "@/types/brand";
import type { HeroCardSlot } from "@/lib/animations/heroAnimations";
import { useCallback, useEffect, useRef, useState } from "react";
import { BrandCard } from "./BrandCard";
import { useBrandCarousel } from "@/hooks/useBrandCarousel";
import { useBrandTransition } from "@/hooks/useBrandTransition";

type BrandCarouselProps = {
  brands: Brand[];
};

export function BrandCarousel({ brands }: BrandCarouselProps) {
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);
  const controlLayoutFrameRef = useRef<number | null>(null);
  const isCardRotationActiveRef = useRef(false);
  const pendingBrandRef = useRef<Brand["id"] | null>(null);
  const [pendingBrandId, setPendingBrandId] = useState<Brand["id"] | null>(null);
  const { state: brandTransitionState, startBrandTransition } = useBrandTransition();
  const {
    activeBrand,
    cardStates,
    isTransitioning,
    selectBrand,
    selectNextBrand,
    selectPreviousBrand
  } = useBrandCarousel(brands);
  const displayCards = cardStates.flatMap((state) => {
    const brand = brands.find((candidate) => candidate.id === state.brandId);

    return brand ? [{ ...state, brand }] : [];
  });
  const isBrandTransitionActive = brandTransitionState.phase !== "idle";
  const isCardSelectionPending = pendingBrandId !== null;
  isCardRotationActiveRef.current = isTransitioning;

  const syncControlLayout = useCallback(() => {
    const controls = controlsRef.current;
    const cards = cardsRef.current;

    if (!controls || !cards) {
      return;
    }

    if (isCardRotationActiveRef.current) {
      return;
    }

    if (!window.matchMedia("(min-width: 901px)").matches) {
      controls.style.removeProperty("--hero-previous-control-x");
      controls.style.removeProperty("--hero-next-control-x");
      controls.style.removeProperty("--hero-side-control-y");
      controls.dataset.layoutReady = "true";
      return;
    }

    const isHeroSettled =
      document.body.dataset.rotiIntroActive !== "true" &&
      document.body.dataset.rotiHeroSpread === "true" &&
      document.body.dataset.rotiHeroSettling !== "true";

    if (!isHeroSettled) {
      controls.dataset.layoutReady = "false";
      return;
    }

    const leftCard = cards.querySelector<HTMLElement>('.brand-card[data-slot="left"]');
    const rightCard = cards.querySelector<HTMLElement>('.brand-card[data-slot="right"]');

    if (!leftCard || !rightCard) {
      return;
    }

    const controlsRect = controls.getBoundingClientRect();
    const leftRect = leftCard.getBoundingClientRect();
    const rightRect = rightCard.getBoundingClientRect();
    const leftCenterY = (leftRect.top + leftRect.bottom) / 2;
    const rightCenterY = (rightRect.top + rightRect.bottom) / 2;

    const previousCenterX = leftRect.left / 2;
    const nextCenterX = (rightRect.right + window.innerWidth) / 2;
    const sideCenterY = (leftCenterY + rightCenterY) / 2;
    const toHorizontalPercent = (viewportX: number) =>
      ((viewportX - controlsRect.left) / controlsRect.width) * 100;
    const toVerticalPercent = (viewportY: number) =>
      ((viewportY - controlsRect.top) / controlsRect.height) * 100;

    controls.style.setProperty("--hero-previous-control-x", `${toHorizontalPercent(previousCenterX)}%`);
    controls.style.setProperty("--hero-next-control-x", `${toHorizontalPercent(nextCenterX)}%`);
    controls.style.setProperty("--hero-side-control-y", `${toVerticalPercent(sideCenterY)}%`);
    controls.dataset.layoutReady = "true";
  }, []);

  const scheduleControlLayout = useCallback(() => {
    if (controlLayoutFrameRef.current !== null) {
      window.cancelAnimationFrame(controlLayoutFrameRef.current);
    }

    controlLayoutFrameRef.current = window.requestAnimationFrame(() => {
      controlLayoutFrameRef.current = window.requestAnimationFrame(() => {
        controlLayoutFrameRef.current = null;
        syncControlLayout();
      });
    });
  }, [syncControlLayout]);

  useEffect(() => {
    const controls = controlsRef.current;
    const cards = cardsRef.current;

    if (!controls || !cards) {
      return;
    }

    const cardElements = Array.from(cards.querySelectorAll<HTMLElement>(".brand-card"));
    const heroStateObserver = new MutationObserver(scheduleControlLayout);
    const sizeObserver = new ResizeObserver(scheduleControlLayout);

    heroStateObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-roti-intro-active", "data-roti-hero-spread", "data-roti-hero-settling"]
    });
    sizeObserver.observe(controls);
    cardElements.forEach((card) => sizeObserver.observe(card));

    window.addEventListener("resize", scheduleControlLayout);
    scheduleControlLayout();

    return () => {
      if (controlLayoutFrameRef.current !== null) {
        window.cancelAnimationFrame(controlLayoutFrameRef.current);
        controlLayoutFrameRef.current = null;
      }
      heroStateObserver.disconnect();
      sizeObserver.disconnect();
      window.removeEventListener("resize", scheduleControlLayout);
    };
  }, [isTransitioning, scheduleControlLayout]);

  useEffect(() => {
    if (!pendingBrandId || isTransitioning || isBrandTransitionActive) {
      return;
    }

    const transitionFrame = window.requestAnimationFrame(() => {
      const centeredElement = cardsRef.current?.querySelector<HTMLButtonElement>(
        `.brand-card[data-brand="${pendingBrandId}"][data-slot="center"]`
      );

      if (centeredElement) {
        startBrandTransition({
          brandId: pendingBrandId,
          sourceElement: centeredElement,
          sourceSlot: "center",
          centerElement: centeredElement
        });
      }

      pendingBrandRef.current = null;
      setPendingBrandId(null);
    });

    return () => window.cancelAnimationFrame(transitionFrame);
  }, [isBrandTransitionActive, isTransitioning, pendingBrandId, startBrandTransition]);

  useEffect(
    () => () => {
      pendingBrandRef.current = null;
    },
    []
  );

  const handleCardSelect = (brandId: Brand["id"], sourceSlot: HeroCardSlot, sourceElement: HTMLButtonElement) => {
    if (isBrandTransitionActive || pendingBrandRef.current) {
      return;
    }

    if (sourceSlot !== "center") {
      pendingBrandRef.current = brandId;
      setPendingBrandId(brandId);
      selectBrand(brandId);
      return;
    }

    const centerElement = cardsRef.current?.querySelector<HTMLButtonElement>(".brand-card[data-slot=\"center\"]");

    startBrandTransition({
      brandId,
      sourceElement,
      sourceSlot,
      centerElement
    });
  };

  return (
    <div
      className="brand-carousel"
      aria-label="ROTI 브랜드 선택"
      data-transition-active={isBrandTransitionActive}
    >
      <div className="brand-carousel__stage" aria-label="화살표로 브랜드 카드를 회전하고 카드를 클릭하면 섹션으로 이동">
        <div
          ref={controlsRef}
          className="brand-carousel__controls"
          aria-label="브랜드 카드 회전"
          data-layout-ready="false"
        >
          <div className="brand-carousel__control-group brand-carousel__control-group--previous">
            <div className="brand-carousel__meta" aria-live="polite">
              <span className="brand-carousel__count">
                {String(brands.findIndex((brand) => brand.id === activeBrand?.id) + 1).padStart(2, "0")} /{" "}
                {String(brands.length).padStart(2, "0")}
              </span>
              <p className="brand-carousel__active-label">{activeBrand?.name}</p>
              <p className="brand-carousel__active-copy">{activeBrand?.visualTagline}</p>
            </div>
            <button
              className="brand-carousel__arrow brand-carousel__arrow--previous"
              type="button"
              aria-label="이전 브랜드 카드 보기"
              onClick={selectPreviousBrand}
              disabled={isBrandTransitionActive || isCardSelectionPending}
            >
              <span aria-hidden="true">‹</span>
            </button>
          </div>
          <button
            className="brand-carousel__arrow brand-carousel__arrow--next"
            type="button"
            aria-label="다음 브랜드 카드 보기"
            onClick={selectNextBrand}
            disabled={isBrandTransitionActive || isCardSelectionPending}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
        <div className="brand-carousel__floor-plane" aria-hidden="true" />
        <div ref={cardsRef} className="brand-carousel__cards">
          {displayCards.map(({ brand, isActive, slot, motion }) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              isActive={isActive}
              isTransitioning={isTransitioning || isBrandTransitionActive}
              isTransitionSelected={brandTransitionState.brandId === brand.id}
              isDisabled={isBrandTransitionActive || isCardSelectionPending}
              slot={slot}
              motion={motion}
              onSelect={(sourceElement) => handleCardSelect(brand.id, slot, sourceElement)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
