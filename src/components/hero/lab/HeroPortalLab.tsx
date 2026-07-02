"use client";

import type { Brand } from "@/types/brand";
import { HeroScrollCue } from "@/components/hero/HeroScrollCue";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useBrandCarousel } from "@/hooks/useBrandCarousel";
import { ThreeTextureCardStage } from "./ThreeTextureCardStage";

type HeroPortalLabProps = {
  brands: Brand[];
};

export function HeroPortalLab({ brands }: HeroPortalLabProps) {
  const { activeBrand, activeBrandId, cardStates, selectBrand } = useBrandCarousel(brands);

  return (
    <section className="section-shell hero-portal hero-portal--lab" aria-labelledby="hero-lab-title">
      <div className="hero-portal__ambient" aria-hidden="true" />
      <div className="hero-portal__mist hero-portal__mist--left" aria-hidden="true" />
      <div className="hero-portal__mist hero-portal__mist--right" aria-hidden="true" />
      <div className="hero-portal__intro">
        <SectionLabel>ROTI 브랜드 포털</SectionLabel>
        <h1 id="hero-lab-title" className="hero-portal__title">
          일상을 위한 세 가지 방식
        </h1>
        <p className="hero-portal__copy">이동, 정리, 휴식을 위한 서로 다른 해석</p>
      </div>
      <div className="brand-carousel brand-carousel--lab" aria-label="ROTI 브랜드 선택">
        <div className="brand-carousel__stage" aria-label="브랜드 카드를 클릭해 중앙으로 이동">
          <ThreeTextureCardStage
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
          <p className="brand-carousel__active-copy">{activeBrand?.headline}</p>
        </div>
      </div>
      <div className="hero-portal__floor" aria-hidden="true" />
      <div className="hero-portal__footer">
        <p className="hero-portal__copyright">© ROTI. All rights reserved.</p>
        <HeroScrollCue />
      </div>
    </section>
  );
}
