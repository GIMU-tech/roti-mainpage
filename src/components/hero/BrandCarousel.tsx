"use client";

import type { Brand } from "@/types/brand";
import type { HeroCardMotion } from "@/lib/animations/heroAnimations";
import type { CSSProperties, MouseEvent } from "react";
import { BrandCard } from "./BrandCard";
import { useBrandCarousel } from "@/hooks/useBrandCarousel";
import { scrollToTarget } from "@/lib/scroll/smoothScroll";

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
  const { activeBrand, cardStates, isTransitioning, selectNextBrand, selectPreviousBrand } = useBrandCarousel(brands);
  const displayCards = cardStates.flatMap((state) => {
    const brand = brands.find((candidate) => candidate.id === state.brandId);

    return brand ? [{ ...state, brand }] : [];
  });
  const scrollToBrand = (brandId: Brand["id"]) => {
    scrollToTarget(brandId, {
      duration: 1.15,
      lock: true
    });
  };
  const handleCardsLayerClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    if (target.closest(".brand-card")) {
      return;
    }

    const candidates = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>(".brand-card"))
      .map((card) => {
        const rect = card.getBoundingClientRect();
        const brandId = card.dataset.brand as Brand["id"] | undefined;
        const isInside =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;
        const distanceFromCenter = Math.hypot(
          event.clientX - (rect.left + rect.width / 2),
          event.clientY - (rect.top + rect.height / 2)
        );

        return { brandId, distanceFromCenter, isInside };
      })
      .filter((candidate): candidate is { brandId: Brand["id"]; distanceFromCenter: number; isInside: boolean } =>
        Boolean(candidate.brandId && candidate.isInside)
      )
      .sort((first, second) => first.distanceFromCenter - second.distanceFromCenter);

    const selectedBrandId = candidates[0]?.brandId;

    if (selectedBrandId) {
      scrollToBrand(selectedBrandId);
    }
  };

  return (
    <div className="brand-carousel" aria-label="ROTI 브랜드 선택">
      <div className="brand-carousel__stage" aria-label="화살표로 브랜드 카드를 회전하고 카드를 클릭하면 섹션으로 이동">
        <div className="brand-carousel__controls" aria-label="브랜드 카드 회전">
          <button
            className="brand-carousel__arrow brand-carousel__arrow--previous"
            type="button"
            aria-label="이전 브랜드 카드 보기"
            onClick={selectPreviousBrand}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            className="brand-carousel__arrow brand-carousel__arrow--next"
            type="button"
            aria-label="다음 브랜드 카드 보기"
            onClick={selectNextBrand}
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
        <div className="brand-carousel__cards" onClick={handleCardsLayerClick}>
          {displayCards.map(({ brand, isActive, slot, motion }) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              isActive={isActive}
              isTransitioning={isTransitioning}
              slot={slot}
              motion={motion}
              onSelect={() => scrollToBrand(brand.id)}
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
