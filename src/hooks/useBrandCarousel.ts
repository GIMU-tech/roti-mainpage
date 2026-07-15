"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Brand, BrandId } from "@/types/brand";
import { getHeroCardState, heroCardMotion } from "@/lib/animations/heroAnimations";

const HERO_CARD_REFLECTION_SETTLE_MS = 680;

export function useBrandCarousel(brands: Brand[]) {
  const initialBrandId = brands.find((brand) => brand.id === "roti-camp")?.id ?? brands[0]?.id;
  const [activeBrandId, setActiveBrandId] = useState<BrandId | undefined>(initialBrandId);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const activeBrand = useMemo(
    () => brands.find((brand) => brand.id === activeBrandId) ?? brands[0],
    [activeBrandId, brands]
  );

  const cardStates = useMemo(
    () =>
      brands.map((brand) => {
        const state = getHeroCardState(brand.id, brands, activeBrandId);

        return {
          ...state,
          motion: heroCardMotion[state.slot]
        };
      }),
    [activeBrandId, brands]
  );

  const selectBrand = useCallback(
    (brandId: BrandId) => {
      if (brandId === activeBrandId) {
        return;
      }

      setActiveBrandId(brandId);
      setIsTransitioning(true);

      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }

      transitionTimerRef.current = window.setTimeout(() => {
        setIsTransitioning(false);
        transitionTimerRef.current = null;
      }, HERO_CARD_REFLECTION_SETTLE_MS);
    },
    [activeBrandId]
  );

  const selectBrandByOffset = useCallback(
    (offset: number) => {
      if (!brands.length) {
        return;
      }

      const currentIndex = brands.findIndex((brand) => brand.id === activeBrandId);
      const safeCurrentIndex = currentIndex >= 0 ? currentIndex : 0;
      const nextIndex = (safeCurrentIndex + offset + brands.length) % brands.length;
      const nextBrand = brands[nextIndex];

      if (nextBrand) {
        selectBrand(nextBrand.id);
      }
    },
    [activeBrandId, brands, selectBrand]
  );

  return {
    activeBrand,
    activeBrandId,
    cardStates,
    isTransitioning,
    selectBrand,
    selectNextBrand: () => selectBrandByOffset(1),
    selectPreviousBrand: () => selectBrandByOffset(-1)
  };
}
