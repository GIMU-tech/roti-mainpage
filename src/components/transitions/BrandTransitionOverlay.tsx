"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { Brand } from "@/types/brand";
import type { BrandTransitionState } from "@/types/brandTransition";

type BrandTransitionOverlayProps = {
  brand: Brand;
  state: BrandTransitionState;
};

type BrandTransitionOverlayStyle = CSSProperties & {
  "--transition-left": string;
  "--transition-top": string;
  "--transition-width": string;
  "--transition-height": string;
};

export function BrandTransitionOverlay({ brand, state }: BrandTransitionOverlayProps) {
  if (state.phase === "idle" || !state.sourceRect) {
    return null;
  }

  const { sourceRect } = state;
  const style = {
    "--transition-left": `${sourceRect.left}px`,
    "--transition-top": `${sourceRect.top}px`,
    "--transition-width": `${sourceRect.width}px`,
    "--transition-height": `${sourceRect.height}px`
  } as BrandTransitionOverlayStyle;

  return (
    <div className="brand-transition-overlay" data-phase={state.phase} aria-hidden="true">
      <div
        className="brand-transition-overlay__card"
        data-source-slot={state.sourceSlot}
        data-transition-id={state.transitionId}
        style={style}
      >
        <span
          className="brand-transition-overlay__image brand-transition-overlay__image--hero"
          style={{
            backgroundImage: `url(${brand.heroAsset.src})`,
            backgroundPosition: brand.transition.heroFocalPoint
          }}
        />
        <span
          className="brand-transition-overlay__image brand-transition-overlay__image--section"
          style={{
            backgroundImage: `url(${brand.sectionImage})`,
            backgroundPosition: brand.transition.sectionFocalPoint
          }}
        />
        <span
          className="brand-transition-overlay__shade"
          style={{ background: brand.transition.overlayShade ?? "rgba(0, 0, 0, 0.2)" }}
        />
        <span className="brand-transition-overlay__sheen" />
        <span className="brand-transition-overlay__content">
          <span className="brand-transition-overlay__eyebrow">ROTI BRAND PORTAL</span>
          <strong className="brand-transition-overlay__title">
            <Image
              src={brand.logoSrc}
              alt=""
              width={brand.logoWidth}
              height={brand.logoHeight}
              sizes="(max-width: 768px) 9rem, 13rem"
            />
          </strong>
          <span className="brand-transition-overlay__line" />
          <span className="brand-transition-overlay__description">{brand.visualTagline}</span>
        </span>
      </div>
    </div>
  );
}
