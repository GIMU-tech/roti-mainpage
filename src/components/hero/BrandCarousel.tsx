"use client";

import type { Brand } from "@/types/brand";
import type { HeroCardSlot } from "@/lib/animations/heroAnimations";
import { useEffect, useRef, useState } from "react";
import { BrandCard } from "./BrandCard";
import { useBrandCarousel } from "@/hooks/useBrandCarousel";
import { useBrandTransition } from "@/hooks/useBrandTransition";

type BrandCarouselProps = {
  brands: Brand[];
};

export function BrandCarousel({ brands }: BrandCarouselProps) {
  const cardsRef = useRef<HTMLDivElement | null>(null);
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
        <div className="brand-carousel__controls" aria-label="브랜드 카드 회전">
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
