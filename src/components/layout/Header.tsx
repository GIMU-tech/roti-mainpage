"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { desktopNavigationItems, mobileNavigationItems } from "@/data/navigation";
import { HOME_SECTION_IDS } from "@/data/sections";
import { scrollToTarget } from "@/lib/scroll/smoothScroll";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnLightSurface, setIsOnLightSurface] = useState(false);
  const [isOnFooter, setIsOnFooter] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleNavClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string) => {
      event.preventDefault();
      closeMenu();
      scrollToTarget(href, {
        duration: 1.08,
        lock: true
      });
    },
    [closeMenu]
  );

  useEffect(() => {
    const updateHeaderState = () => {
      setIsScrolled(window.scrollY > 24);

      const headerToneProbeY = Math.min(96, window.innerHeight * 0.14);
      const standardSection = document.getElementById(HOME_SECTION_IDS.standard);
      const standardSectionRect = standardSection?.getBoundingClientRect();
      const footerSection = document.getElementById(HOME_SECTION_IDS.footer);
      const footerSectionRect = footerSection?.getBoundingClientRect();

      setIsOnLightSurface(
        Boolean(
          standardSectionRect &&
            standardSectionRect.top <= headerToneProbeY &&
            standardSectionRect.bottom > headerToneProbeY
        )
      );
      setIsOnFooter(Boolean(footerSectionRect && footerSectionRect.top <= 96 && footerSectionRect.bottom > 96));
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("resize", updateHeaderState);

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.dataset.rotiMenuOpen = "true";
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      delete document.body.dataset.rotiMenuOpen;
    };
  }, [closeMenu, isMenuOpen]);

  return (
    <header
      className="site-header"
      data-scrolled={isScrolled}
      data-theme={isOnLightSurface ? "light" : "dark"}
      data-hidden={isOnFooter}
      data-menu-open={isMenuOpen}
      aria-label="ROTI 사이트 헤더"
    >
      <a className="site-header__logo" href="/" aria-label="ROTI 홈">
        <Image src="/images/logos/roti-logo.png" alt="ROTI" width={589} height={140} priority />
      </a>
      <nav className="site-header__nav" aria-label="주요 메뉴">
        <div className="site-header__nav-links">
          {desktopNavigationItems.map((item) => (
            <a key={item.href} href={item.href} onClick={(event) => handleNavClick(event, item.href)}>
              {item.label}
            </a>
          ))}
        </div>
        <button
          className="site-header__menu"
          type="button"
          aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-controls="site-mobile-menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span aria-hidden="true" />
        </button>
      </nav>
      {isMenuOpen ? (
        <div id="site-mobile-menu" className="site-header__mobile-menu" role="dialog" aria-label="모바일 메뉴">
          <button
            ref={closeButtonRef}
            className="site-header__mobile-close"
            type="button"
            aria-label="메뉴 닫기"
            onClick={closeMenu}
          />
          <nav className="site-header__mobile-links" aria-label="모바일 주요 메뉴">
            {mobileNavigationItems.map((item) => (
              <a key={item.href} href={item.href} onClick={(event) => handleNavClick(event, item.href)}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
