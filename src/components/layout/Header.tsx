"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "브랜드", href: "#brand" },
  { label: "소식", href: "#news" },
  { label: "채용", href: "#careers" },
  { label: "문의", href: "#contact" }
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrolledState = () => {
      setIsScrolled(window.scrollY > 24);
    };

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrolledState);
    };
  }, []);

  return (
    <header className="site-header" data-scrolled={isScrolled} aria-label="ROTI 사이트 헤더">
      <a className="site-header__logo" href="/" aria-label="ROTI 홈">
        ROTI
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
