import type { Brand } from "@/types/brand";

type BrandCardProps = {
  brand: Brand;
  isActive: boolean;
  onSelect: () => void;
};

export function BrandCard({ brand, isActive, onSelect }: BrandCardProps) {
  return (
    <button className="brand-card" type="button" aria-pressed={isActive} onClick={onSelect}>
      <span className="brand-card__eyebrow">{brand.shortName}</span>
      <strong className="brand-card__title">{brand.name}</strong>
      <span className="brand-card__description">{brand.description}</span>
      <span className="brand-card__line" aria-hidden="true" />
    </button>
  );
}
