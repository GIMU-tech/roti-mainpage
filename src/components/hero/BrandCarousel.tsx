"use client";

import type { Brand } from "@/types/brand";
import type { HeroCardMotion } from "@/lib/animations/heroAnimations";
import type { CSSProperties } from "react";
import { BrandCard } from "./BrandCard";
import { useBrandCarousel } from "@/hooks/useBrandCarousel";

type BrandCarouselProps = {
  brands: Brand[];
};

type StageLayerStyle = CSSProperties & {
  "--card-x": string;
  "--card-z": string;
  "--card-rotate-y": string;
  "--card-scale": number;
  "--card-opacity": number;
  "--reflection-y": string;
  "--reflection-z": string;
  "--reflection-scale-y": number;
  "--reflection-opacity": number;
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
    "--reflection-y": motion.reflectionY,
    "--reflection-z": motion.reflectionZ,
    "--reflection-scale-y": motion.reflectionScaleY,
    "--reflection-opacity": motion.reflectionOpacity,
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
  const { activeBrand, cardStates, isTransitioning, selectBrand } = useBrandCarousel(brands);
  const displayCards = cardStates.flatMap((state) => {
    const brand = brands.find((candidate) => candidate.id === state.brandId);

    return brand ? [{ ...state, brand }] : [];
  });

  return (
    <div className="brand-carousel" aria-label="ROTI 브랜드 선택">
      <div className="brand-carousel__stage" aria-label="브랜드 카드를 클릭해 중앙으로 이동">
        <div className="brand-carousel__floor-plane" aria-hidden="true" />
        <div className="brand-carousel__reflections" aria-hidden="true">
          {displayCards.map(({ brand, isActive, slot, motion }) => (
            <span
              key={`${brand.id}-reflection`}
              className="brand-card-reflection"
              data-brand={brand.id}
              data-slot={slot}
              data-active={isActive}
              data-transitioning={isTransitioning}
              style={createStageLayerStyle(brand, motion)}
            />
          ))}
        </div>
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
        <div className="brand-carousel__cards">
          {displayCards.map(({ brand, isActive, slot, motion }) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              isActive={isActive}
              isTransitioning={isTransitioning}
              slot={slot}
              motion={motion}
              onSelect={() => selectBrand(brand.id)}
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
