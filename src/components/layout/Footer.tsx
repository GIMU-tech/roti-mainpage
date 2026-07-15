import Image from "next/image";
import { footerBrandLogos, footerCopyright, footerLinks, footerLocations } from "@/data/footer";
import { HOME_SECTION_HREFS, HOME_SECTION_IDS } from "@/data/sections";
import { siteContent } from "@/data/siteContent";

export function Footer() {
  return (
    <footer className="roti-footer" id={HOME_SECTION_IDS.footer} aria-label="ROTI footer">
      <div className="roti-footer__inner">
        <div className="roti-footer__main">
          <section className="roti-footer__identity" aria-labelledby="roti-footer-title">
            <h2 className="roti-footer__logo" id="roti-footer-title">
              <Image src="/images/logos/roti-logo.png" alt="ROTI" width={589} height={140} />
            </h2>
            <p className="roti-footer__headline" aria-label="THREE BRANDS ONE STANDARD">
              <span aria-hidden="true">THREE BRANDS</span>
              <br aria-hidden="true" />
              <span aria-hidden="true">ONE STANDARD</span>
            </p>
            <p className="roti-footer__description">{siteContent.footer.description}</p>
          </section>

          <nav className="roti-footer__brand-nav" aria-label="ROTI 브랜드">
            <div className="roti-footer__brands">
              {footerBrandLogos.map((logo) => (
                <a
                  key={logo.id}
                  className="roti-footer__brand"
                  data-logo={logo.id}
                  href={`#${logo.id}`}
                  aria-label={`${logo.alt} 섹션으로 이동`}
                >
                  <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} />
                </a>
              ))}
            </div>
          </nav>

          <section className="roti-footer__office" aria-label="ROTI 사무실 정보">
            <ul className="roti-footer__locations">
              {footerLocations.map((location) => (
                <li key={location.label}>
                  <p className="roti-footer__office-name">{location.label}</p>
                  <address>{location.address}</address>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="roti-footer__bottom">
          <p className="roti-footer__copyright">{footerCopyright}</p>
          <nav className="roti-footer__links" aria-label="ROTI footer links">
            {footerLinks.map((link) =>
              link.href ? (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ) : (
                <span key={link.label}>{link.label}</span>
              )
            )}
          </nav>
          <a className="roti-footer__top" href={HOME_SECTION_HREFS.top} aria-label="맨 위로 이동">
            TOP
          </a>
        </div>
      </div>
    </footer>
  );
}
