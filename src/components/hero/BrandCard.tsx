import type { Brand } from "@/types/brand";
import type { HeroCardMotion, HeroCardSlot } from "@/lib/animations/heroAnimations";
import type { CSSProperties, KeyboardEvent } from "react";
import { BrandCardIdentity } from "./BrandCardIdentity";

type BrandCardProps = {
  brand: Brand;
  isActive: boolean;
  isTransitioning: boolean;
  isTransitionSelected: boolean;
  isDisabled: boolean;
  slot: HeroCardSlot;
  motion?: HeroCardMotion;
  onSelect: () => void;
};

type BrandCardStyle = CSSProperties & {
  "--card-x": string;
  "--card-z": string;
  "--card-rotate-y": string;
  "--card-scale": number;
  "--card-opacity": number;
  "--card-scene-image"?: string;
  "--card-scene-image-mobile"?: string;
  "--card-focal-point"?: string;
  "--card-focal-point-mobile"?: string;
};

export function BrandCard({
  brand,
  isActive,
  isTransitioning,
  isTransitionSelected,
  isDisabled,
  slot,
  motion,
  onSelect
}: BrandCardProps) {
  const hasReadyAsset = brand.heroAsset.status === "ready";
  const cardStyle: BrandCardStyle = {
    "--card-x": String(motion?.x ?? "0%"),
    "--card-z": String(motion?.z ?? "0px"),
    "--card-rotate-y": String(motion?.rotateY ?? "0deg"),
    "--card-scale": Number(motion?.scale ?? 1),
    "--card-opacity": Number(motion?.opacity ?? 1),
    ...(hasReadyAsset
      ? {
          "--card-scene-image": `url(${brand.heroAsset.src})`,
          "--card-scene-image-mobile": `url(${brand.heroAsset.mobileSrc ?? brand.heroAsset.src})`,
          "--card-focal-point": brand.heroAsset.focalPoint,
          "--card-focal-point-mobile": brand.heroAsset.mobileFocalPoint ?? brand.heroAsset.focalPoint
        }
      : {})
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <button
      className="brand-card"
      type="button"
      aria-label={`${brand.name} 카드를 메인으로 보기`}
      aria-current={isActive ? "true" : undefined}
      data-brand={brand.id}
      data-slot={slot}
      data-active={isActive}
      data-transitioning={isTransitioning}
      data-transition-selected={isTransitionSelected}
      disabled={isDisabled}
      style={cardStyle}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
    >
      <span className="brand-card__backplate" aria-hidden="true" />
      <span
        className="brand-card__asset"
        data-status={brand.heroAsset.status}
        data-has-image={hasReadyAsset}
        aria-hidden="true"
      />
      <span className="brand-card__sheen" aria-hidden="true" />
      <BrandCardIdentity brand={brand} className="brand-card__content" />
      <span className="brand-card__side brand-card__side--left" aria-hidden="true" />
      <span className="brand-card__side brand-card__side--right" aria-hidden="true" />
      <span className="brand-card__glass-edge brand-card__glass-edge--left" aria-hidden="true" />
      <span className="brand-card__glass-edge brand-card__glass-edge--right" aria-hidden="true" />
      <span className="brand-card__reflection" aria-hidden="true">
        <span className="brand-card__reflection-surface">
          <span className="brand-card__backplate" />
          <span
            className="brand-card__asset"
            data-status={brand.heroAsset.status}
            data-has-image={hasReadyAsset}
          />
          <span className="brand-card__sheen" />
          <BrandCardIdentity brand={brand} className="brand-card__content" decorative />
          <span className="brand-card__side brand-card__side--left" />
          <span className="brand-card__side brand-card__side--right" />
          <span className="brand-card__glass-edge brand-card__glass-edge--left" />
          <span className="brand-card__glass-edge brand-card__glass-edge--right" />
        </span>
      </span>
    </button>
  );
}
