import type { Brand } from "@/types/brand";
import type { HeroCardMotion, HeroCardSlot } from "@/lib/animations/heroAnimations";
import type { CSSProperties, KeyboardEvent } from "react";
import Image from "next/image";

type BrandCardProps = {
  brand: Brand;
  isActive: boolean;
  isTransitioning: boolean;
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
  "--card-focal-point"?: string;
};

export function BrandCard({ brand, isActive, isTransitioning, slot, motion, onSelect }: BrandCardProps) {
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
          "--card-focal-point": brand.heroAsset.focalPoint
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
      aria-label={`${brand.name} 섹션으로 이동`}
      aria-current={isActive ? "true" : undefined}
      data-brand={brand.id}
      data-slot={slot}
      data-active={isActive}
      data-transitioning={isTransitioning}
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
      <span className="brand-card__content">
        <span className="brand-card__eyebrow">ROTI BRAND PORTAL</span>
        <strong className="brand-card__title">
          <Image src={brand.logoSrc} alt={brand.logoAlt} width={690} height={320} sizes="(max-width: 768px) 9rem, 13rem" />
        </strong>
        <span className="brand-card__line" aria-hidden="true" />
        <span className="brand-card__description">{brand.visualTagline}</span>
        <span className="brand-card__scene">{brand.visualScene}</span>
      </span>
      <span className="brand-card__side brand-card__side--left" aria-hidden="true" />
      <span className="brand-card__side brand-card__side--right" aria-hidden="true" />
      <span className="brand-card__glass-edge brand-card__glass-edge--left" aria-hidden="true" />
      <span className="brand-card__glass-edge brand-card__glass-edge--right" aria-hidden="true" />
    </button>
  );
}
