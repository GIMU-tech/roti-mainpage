"use client";

import type { Brand } from "@/types/brand";
import { BrandCard } from "./BrandCard";
import { useBrandCarousel } from "@/hooks/useBrandCarousel";

type BrandCarouselProps = {
  brands: Brand[];
};

export function BrandCarousel({ brands }: BrandCarouselProps) {
  const { activeBrandId, selectBrand } = useBrandCarousel(brands);

  return (
    <div className="brand-carousel" aria-label="ROTI brand cards">
      {brands.map((brand) => (
        <BrandCard
          key={brand.id}
          brand={brand}
          isActive={brand.id === activeBrandId}
          onSelect={() => selectBrand(brand.id)}
        />
      ))}
    </div>
  );
}
