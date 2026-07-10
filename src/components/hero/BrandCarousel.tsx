"use client";

import type { Brand } from "@/types/brand";
import type { HeroCardMotion, HeroCardSlot } from "@/lib/animations/heroAnimations";
import type { CSSProperties } from "react";
import { useRef } from "react";
import { BrandCard } from "./BrandCard";
import { useBrandCarousel } from "@/hooks/useBrandCarousel";
import { useBrandTransition } from "@/hooks/useBrandTransition";

type BrandCarouselProps = {
  brands: Brand[];
};

type StageLayerStyle = CSSProperties & {
  "--card-x": string;
  "--card-z": string;
  "--card-rotate-y": string;
  "--card-scale": number;
  "--card-opacity": number;
  "--shadow-y": string;
  "--shadow-scale-x": number;
  "--shadow-opacity": number;
  "--card-scene-image"?: string;
  "--card-focal-point"?: string;
};

function createStageLayerStyle(brand: Brand, motion: HeroCardMotion): StageLayerStyle {
  const hasReadyAsset = brand.heroAsset.status === "ready";

  return {
    "--card-x": motion.x,
    "--card-z": motion.z,
    "--card-rotate-y": motion.rotateY,
    "--card-scale": motion.scale,
    "--card-opacity": motion.opacity,
    "--shadow-y": motion.shadowY,
    "--shadow-scale-x": motion.shadowScaleX,
    "--shadow-opacity": motion.shadowOpacity,
    ...(hasReadyAsset
      ? {
          "--card-scene-image": `url(${brand.heroAsset.src})`,
          "--card-focal-point": brand.heroAsset.focalPoint
        }
      : {})
  };
}

export function BrandCarousel({ brands }: BrandCarouselProps) {
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const { state: brandTransitionState, startBrandTransition } = useBrandTransition();
  const {
    activeBrand,
    cardStates,
    isTransitioning,
    selectNextBrand,
    selectPreviousBrand
  } = useBrandCarousel(brands);
  const displayCards = cardStates.flatMap((state) => {
    const brand = brands.find((candidate) => candidate.id === state.brandId);

    return brand ? [{ ...state, brand }] : [];
  });
  const isBrandTransitionActive = brandTransitionState.phase !== "idle";
  const handleCardSelect = (brandId: Brand["id"], sourceSlot: HeroCardSlot, sourceElement: HTMLButtonElement) => {
    if (isBrandTransitionActive) {
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
          <button
            className="brand-carousel__arrow brand-carousel__arrow--previous"
            type="button"
            aria-label="이전 브랜드 카드 보기"
            onClick={selectPreviousBrand}
            disabled={isBrandTransitionActive}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            className="brand-carousel__arrow brand-carousel__arrow--next"
            type="button"
            aria-label="다음 브랜드 카드 보기"
            onClick={selectNextBrand}
            disabled={isBrandTransitionActive}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
        <div className="brand-carousel__floor-plane" aria-hidden="true" />
        <div className="brand-carousel__contact-shadows" aria-hidden="true">
          {displayCards.map(({ brand, isActive, slot, motion }) => (
            <span
              key={`${brand.id}-contact-shadow`}
              className="brand-card-contact-shadow"
              data-brand={brand.id}
              data-slot={slot}
              data-active={isActive}
              data-transitioning={isTransitioning}
              style={createStageLayerStyle(brand, motion)}
            />
          ))}
        </div>
        <div ref={cardsRef} className="brand-carousel__cards">
          {displayCards.map(({ brand, isActive, slot, motion }) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              isActive={isActive}
              isTransitioning={isTransitioning || isBrandTransitionActive}
              isTransitionSelected={brandTransitionState.brandId === brand.id}
              isDisabled={isBrandTransitionActive}
              slot={slot}
              motion={motion}
              onSelect={(sourceElement) => handleCardSelect(brand.id, slot, sourceElement)}
            />
          ))}
        </div>
      </div>
      <div className="brand-carousel__meta" aria-live="polite">
        <span className="brand-carousel__count">
          {String(brands.findIndex((brand) => brand.id === activeBrand?.id) + 1).padStart(2, "0")} /{" "}
          {String(brands.length).padStart(2, "0")}
        </span>
        <p className="brand-carousel__active-label">{activeBrand?.name}</p>
        <p className="brand-carousel__active-copy">{activeBrand?.visualTagline}</p>
      </div>
    </div>
  );
}
