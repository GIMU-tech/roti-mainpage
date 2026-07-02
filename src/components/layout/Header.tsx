const navItems = [
  { label: "브랜드", href: "#brand" },
  { label: "소식", href: "#news" },
  { label: "채용", href: "#careers" },
  { label: "문의", href: "#contact" }
];

export function Header() {
  return (
    <header className="site-header" aria-label="ROTI 사이트 헤더">
      <a className="site-header__logo" href="/" aria-label="ROTI 홈">
        ROTI
      </a>
      <nav className="site-header__nav" aria-label="주요 메뉴">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
        <span className="site-header__menu" aria-hidden="true">
          =
        </span>
      </nav>
    </header>
  );
}
