import type { Brand } from "@/types/brand";
import { BrandCarousel } from "./BrandCarousel";
import { SectionLabel } from "@/components/ui/SectionLabel";

type HeroPortalProps = {
  brands: Brand[];
};

export function HeroPortal({ brands }: HeroPortalProps) {
  return (
    <section className="section-shell hero-portal" aria-labelledby="hero-title">
      <div className="hero-portal__intro">
        <SectionLabel>ROTI BRAND PORTAL</SectionLabel>
        <h1 id="hero-title" className="hero-portal__title">
          Three ways for everyday life
        </h1>
        <p className="hero-portal__copy">
          ROTI connects distinct brand areas for movement, organization, and calm living.
        </p>
      </div>
      <BrandCarousel brands={brands} />
    </section>
  );
}
