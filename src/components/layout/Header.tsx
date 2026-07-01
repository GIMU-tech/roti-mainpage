const navItems = ["BRAND", "NEWS", "CAREERS", "CONTACT"];

export function Header() {
  return (
    <header className="site-header" aria-label="ROTI site header">
      <a className="site-header__logo" href="/" aria-label="ROTI home">
        ROTI
      </a>
      <nav className="site-header__nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>
            {item}
          </a>
        ))}
        <span className="site-header__menu" aria-hidden="true">
          =
        </span>
      </nav>
    </header>
  );
}
