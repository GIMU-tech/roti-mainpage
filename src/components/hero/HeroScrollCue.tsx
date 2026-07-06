"use client";

import { useEffect, useState } from "react";

export function HeroScrollCue() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateCue = () => {
      const threshold = reducedMotionQuery.matches ? 8 : Math.min(120, window.innerHeight * 0.16);
      setIsHidden(window.scrollY > threshold);
    };

    updateCue();
    window.addEventListener("scroll", updateCue, { passive: true });
    reducedMotionQuery.addEventListener("change", updateCue);

    return () => {
      window.removeEventListener("scroll", updateCue);
      reducedMotionQuery.removeEventListener("change", updateCue);
    };
  }, []);

  return (
    <p className="hero-portal__scroll-note" data-hidden={isHidden}>
      <span aria-hidden="true" />
      SCROLL
    </p>
  );
}
