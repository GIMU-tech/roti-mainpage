import type { Brand } from "@/types/brand";
import type { HeroCardSlot } from "@/lib/animations/heroAnimations";
import type { CSSProperties, KeyboardEvent } from "react";

type BrandCardProps = {
  brand: Brand;
  isActive: boolean;
  slot: HeroCardSlot;
  motion?: Record<string, string | number>;
  onSelect: () => void;
};

type BrandCardStyle = CSSProperties & {
  "--card-x": string;
  "--card-z": string;
  "--card-rotate-y": string;
  "--card-scale": number;
  "--card-opacity": number;
};

export function BrandCard({ brand, isActive, slot, motion, onSelect }: BrandCardProps) {
  const cardStyle: BrandCardStyle = {
    "--card-x": String(motion?.x ?? "0%"),
    "--card-z": String(motion?.z ?? "0px"),
    "--card-rotate-y": String(motion?.rotateY ?? "0deg"),
    "--card-scale": Number(motion?.scale ?? 1),
    "--card-opacity": Number(motion?.opacity ?? 1)
  };
  const hasReadyAsset = brand.heroAsset.status === "ready";
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
      aria-label={`${brand.name} 선택`}
      aria-pressed={isActive}
      data-brand={brand.id}
      data-slot={slot}
      style={cardStyle}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
    >
      <span
        className="brand-card__asset"
        data-status={brand.heroAsset.status}
        style={
          hasReadyAsset
            ? {
                backgroundImage: `url(${brand.heroAsset.src})`,
                backgroundPosition: brand.heroAsset.focalPoint
              }
            : undefined
        }
        aria-label={hasReadyAsset ? brand.heroAsset.alt : undefined}
      >
        {!hasReadyAsset ? <span className="brand-card__scene-visual" aria-hidden="true" /> : null}
      </span>
      <span className="brand-card__content">
        <strong className="brand-card__title">{brand.name}</strong>
        <span className="brand-card__description">{brand.visualTagline}</span>
        <span className="brand-card__keywords" aria-label={`${brand.name} 키워드`}>
          {brand.keywords.map((keyword) => (
            <span key={keyword}>{keyword}</span>
          ))}
        </span>
        <span className="brand-card__line" aria-hidden="true" />
      </span>
    </button>
  );
}
