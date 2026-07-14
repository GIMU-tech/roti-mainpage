"use client";

import { useEffect, useState } from "react";
import { cx } from "@/lib/utils";

type HeroScrollCueProps = {
  className?: string;
};

export function HeroScrollCue({ className }: HeroScrollCueProps) {
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
    <p className={cx("hero-portal__scroll-note", className)} data-hidden={isHidden} aria-label="스크롤">
      <span className="hero-portal__scroll-note-inner" aria-hidden="true">
        <span className="hero-portal__scroll-icon" aria-hidden="true" />
        <span className="hero-portal__scroll-label">SCROLL</span>
      </span>
    </p>
  );
}
