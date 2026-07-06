"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navItems = [
  { label: "BRAND", href: "#brand" },
  { label: "ABOUT", href: "#about" },
  { label: "STANDARD", href: "#standard" },
  { label: "CONTACT", href: "#roti-footer" }
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnFooter, setIsOnFooter] = useState(false);

  useEffect(() => {
    const updateHeaderState = () => {
      setIsScrolled(window.scrollY > 24);

      const footerSection = document.querySelector<HTMLElement>(".roti-footer");
      const footerSectionRect = footerSection?.getBoundingClientRect();

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

  return (
    <header
      className="site-header"
      data-scrolled={isScrolled}
      data-theme="dark"
      data-hidden={isOnFooter}
      aria-label="ROTI 사이트 헤더"
    >
      <a className="site-header__logo" href="/" aria-label="ROTI 홈">
        <Image src="/images/logos/roti-logo.png" alt="ROTI" width={589} height={140} priority />
      </a>
      <nav className="site-header__nav" aria-label="주요 메뉴">
        <div className="site-header__nav-links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <span className="site-header__menu" aria-hidden="true">
          =
        </span>
      </nav>
    </header>
  );
}
