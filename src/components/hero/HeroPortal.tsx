import type { Brand } from "@/types/brand";
import { BrandCarousel } from "./BrandCarousel";
import { HeroScrollCue } from "./HeroScrollCue";

type HeroPortalProps = {
  brands: Brand[];
};

export function HeroPortal({ brands }: HeroPortalProps) {
  return (
    <section className="section-shell hero-portal" aria-labelledby="hero-title">
      <div className="hero-portal__stage-bg" aria-hidden="true" />
      <div className="hero-portal__ambient" aria-hidden="true" />
      <div className="hero-portal__mist hero-portal__mist--back" aria-hidden="true" />
      <div className="hero-portal__mist hero-portal__mist--front" aria-hidden="true" />
      <div className="hero-portal__intro">
        <h1 id="hero-title" className="hero-portal__title">
          일상을 위한 세 가지 기준
        </h1>
        <p className="hero-portal__copy">이동, 정리, 휴식을 위한 서로 다른 해석</p>
      </div>
      <BrandCarousel brands={brands} />
      <div className="hero-portal__footer">
        <HeroScrollCue />
      </div>
    </section>
  );
}
