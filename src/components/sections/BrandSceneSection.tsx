"use client";

import type { Brand } from "@/types/brand";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

type BrandSceneSectionProps = {
  brand: Brand;
  index: number;
};

export function BrandSceneSection({ brand, index }: BrandSceneSectionProps) {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>();

  return (
    <section
      ref={ref}
      className="section-shell brand-scene"
      data-brand={brand.id}
      data-align={brand.scene.align}
      data-visible={isVisible}
      id={brand.id}
      aria-labelledby={`${brand.id}-title`}
    >
      <div className="brand-scene__visual" aria-hidden="true">
        <span className="brand-scene__image-plane" />
        <span className="brand-scene__horizon" />
        <span className="brand-scene__object" />
      </div>
      <div className="brand-scene__copy">
        <span className="brand-scene__count">{String(index + 1).padStart(2, "0")} / 03</span>
        <p className="brand-scene__eyebrow">{brand.name}</p>
        <h2 id={`${brand.id}-title`} className="brand-scene__title">
          {brand.scene.title}
        </h2>
        <p className="brand-scene__body">{brand.scene.copy}</p>
        <p className="brand-scene__keywords">{brand.visualScene}</p>
      </div>
    </section>
  );
}
