"use client";

import type { Brand } from "@/types/brand";
import { HeroGlassStage } from "./HeroGlassStage";
import { useBrandCarousel } from "@/hooks/useBrandCarousel";

type BrandCarouselProps = {
  brands: Brand[];
};

export function BrandCarousel({ brands }: BrandCarouselProps) {
  const { activeBrand, activeBrandId, cardStates, selectBrand } = useBrandCarousel(brands);

  return (
    <div className="brand-carousel" aria-label="ROTI 브랜드 선택">
      <div className="brand-carousel__stage" aria-label="브랜드 카드를 클릭해 중앙으로 이동">
        <div className="brand-carousel__contact-shadows" aria-hidden="true">
          <span className="brand-carousel__contact-shadow brand-carousel__contact-shadow--left" />
          <span className="brand-carousel__contact-shadow brand-carousel__contact-shadow--center" />
          <span className="brand-carousel__contact-shadow brand-carousel__contact-shadow--right" />
        </div>
        <HeroGlassStage
          brands={brands}
          activeBrandId={activeBrandId}
          cardStates={cardStates}
          onSelectBrand={selectBrand}
        />
      </div>
      <div className="brand-carousel__a11y-controls" aria-label="브랜드 카드 선택">
        {brands.map((brand) => (
          <button
            key={brand.id}
            type="button"
            aria-pressed={brand.id === activeBrandId}
            onClick={() => selectBrand(brand.id)}
          >
            {brand.name}
          </button>
        ))}
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
