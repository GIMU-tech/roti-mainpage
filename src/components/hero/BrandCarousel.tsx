"use client";

import type { Brand } from "@/types/brand";
import { BrandCard } from "./BrandCard";
import { useBrandCarousel } from "@/hooks/useBrandCarousel";

type BrandCarouselProps = {
  brands: Brand[];
};

export function BrandCarousel({ brands }: BrandCarouselProps) {
  const { activeBrand, activeBrandId, cardStates, selectBrand } = useBrandCarousel(brands);

  return (
    <div className="brand-carousel" aria-label="ROTI 브랜드 선택">
      <div className="brand-carousel__stage" aria-label="브랜드 카드를 클릭해 중앙으로 이동">
        {brands.map((brand) => {
          const cardState = cardStates.find((state) => state.brandId === brand.id);

          return (
            <BrandCard
              key={brand.id}
              brand={brand}
              isActive={brand.id === activeBrandId}
              slot={cardState?.slot ?? "center"}
              motion={cardState?.motion}
              onSelect={() => selectBrand(brand.id)}
            />
          );
        })}
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
