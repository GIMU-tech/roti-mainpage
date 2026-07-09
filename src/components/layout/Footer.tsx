import Image from "next/image";
import { footerBrandLogos, footerCopyright, footerLinks, footerLocations } from "@/data/footer";
import { HOME_SECTION_HREFS, HOME_SECTION_IDS } from "@/data/sections";

export function Footer() {
  return (
    <footer className="roti-footer" id={HOME_SECTION_IDS.footer} aria-label="ROTI footer">
      <span className="roti-footer__background roti-footer__background--one" aria-hidden="true" />
      <span className="roti-footer__background roti-footer__background--two" aria-hidden="true" />
      <div className="roti-footer__inner">
        <div className="roti-footer__left">
          <h2 className="roti-footer__logo">
            <Image src="/images/logos/roti-logo.png" alt="ROTI" width={589} height={140} />
          </h2>
          <p className="roti-footer__headline" aria-label="THREE BRANDS ONE STANDARD">
            <span aria-hidden="true">THREE BRANDS</span>
            {" "}
            <br aria-hidden="true" />
            <span aria-hidden="true">ONE STANDARD</span>
          </p>
        </div>

        <div className="roti-footer__right" aria-label="ROTI 주소">
          <ul>
            {footerLocations.map((location) => (
              <li key={location.label}>
                <p className="roti-footer__address-label">{location.label}</p>
                <p className="roti-footer__address">{location.address}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="roti-footer__brand-logos" aria-label="ROTI brand logos">
          {footerBrandLogos.map((logo) => (
            <Image
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              data-logo={logo.id}
            />
          ))}
        </div>

        <div className="roti-footer__links" aria-label="ROTI footer links">
          {footerLinks.map((link) =>
            link.href ? (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ) : (
              <span key={link.label}>{link.label}</span>
            )
          )}
        </div>

        <p className="roti-footer__copyright">{footerCopyright}</p>

        <a className="roti-footer__top" href={HOME_SECTION_HREFS.top} aria-label="맨 위로 이동">
          <span aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
