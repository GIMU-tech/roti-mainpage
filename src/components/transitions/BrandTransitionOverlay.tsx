"use client";

import type { CSSProperties } from "react";
import type { Brand } from "@/types/brand";
import type { BrandTransitionState } from "@/types/brandTransition";
import { BrandCardIdentity } from "@/components/hero/BrandCardIdentity";

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

type BrandTransitionImageStyle = CSSProperties & {
  "--transition-image": string;
  "--transition-image-mobile": string;
  "--transition-focal-point": string;
  "--transition-focal-point-mobile": string;
  "--transition-filter"?: string;
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
          style={
            {
              "--transition-image": `url(${brand.heroAsset.src})`,
              "--transition-image-mobile": `url(${brand.heroAsset.mobileSrc ?? brand.heroAsset.src})`,
              "--transition-focal-point": brand.heroAsset.focalPoint,
              "--transition-focal-point-mobile": brand.heroAsset.mobileFocalPoint ?? brand.heroAsset.focalPoint
            } as BrandTransitionImageStyle
          }
        />
        <span
          className="brand-transition-overlay__image brand-transition-overlay__image--section"
          style={
            {
              "--transition-image": `url(${brand.sectionAsset.src})`,
              "--transition-image-mobile": `url(${brand.sectionAsset.mobileSrc ?? brand.sectionAsset.src})`,
              "--transition-focal-point": brand.sectionAsset.focalPoint,
              "--transition-focal-point-mobile":
                brand.sectionAsset.mobileFocalPoint ?? brand.sectionAsset.focalPoint,
              "--transition-filter": brand.sectionAsset.visualFilter ?? "none"
            } as BrandTransitionImageStyle
          }
        />
        <span
          className="brand-transition-overlay__shade"
          style={{ background: brand.transition.overlayShade ?? "rgba(0, 0, 0, 0.2)" }}
        />
        <span className="brand-transition-overlay__sheen" />
        <BrandCardIdentity brand={brand} className="brand-transition-overlay__content" decorative />
      </div>
    </div>
  );
}
