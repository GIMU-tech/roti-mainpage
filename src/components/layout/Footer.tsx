import Image from "next/image";
import { CaretUp } from "@phosphor-icons/react/ssr";
import { footerBrandLogos, footerCompanyInfo, footerCopyright, footerLinks, footerLocations } from "@/data/footer";
import { HOME_SECTION_HREFS, HOME_SECTION_IDS } from "@/data/sections";
import { siteContent } from "@/data/siteContent";

export function Footer() {
  const [headOffice, seoulOffice] = footerLocations;

  return (
    <footer className="roti-footer" id={HOME_SECTION_IDS.footer} aria-label="ROTI footer">
      <div className="roti-footer__inner">
        <section className="roti-footer__identity" aria-labelledby="roti-footer-title">
          <div className="roti-footer__identity-copy">
            <h2 className="roti-footer__logo" id="roti-footer-title">
              <Image src="/images/logos/roti-logo.png" alt="ROTI" width={589} height={140} />
            </h2>
            <p className="roti-footer__headline">THREE BRANDS ONE STANDARD</p>
            <p className="roti-footer__description">{siteContent.footer.description}</p>
          </div>

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
        </section>

        <div className="roti-footer__lower">
          <section className="roti-footer__details" aria-label="ROTI 지사 및 대표 연락처">
            <div className="roti-footer__detail-column">
              <div className="roti-footer__detail-row">
                <span>대표전화</span>
                <a href={footerCompanyInfo.phoneHref}>{footerCompanyInfo.phone}</a>
              </div>
              <div className="roti-footer__detail-row">
                <span>{headOffice.label}</span>
                <address>{headOffice.address}</address>
              </div>
            </div>

            <div className="roti-footer__detail-column">
              <div className="roti-footer__detail-row">
                <span>이메일</span>
                <a href={footerCompanyInfo.emailHref}>{footerCompanyInfo.email}</a>
              </div>
              <div className="roti-footer__detail-row">
                <span>{seoulOffice.label}</span>
                <address>{seoulOffice.address}</address>
              </div>
            </div>
          </section>

          <section className="roti-footer__business" aria-label="ROTI 사업자 정보">
            <div className="roti-footer__business-primary">
              <span>{footerCompanyInfo.companyName}</span>
              <span>대표 {footerCompanyInfo.representative}</span>
              <span>사업자등록번호 {footerCompanyInfo.businessRegistrationNumber}</span>
            </div>
            <span>통신판매업 신고번호 {footerCompanyInfo.mailOrderRegistrationNumber}</span>
          </section>

          <div className="roti-footer__bottom">
            <p className="roti-footer__copyright">{footerCopyright}</p>
            <nav className="roti-footer__links" aria-label="ROTI footer links">
              {(["legal", "category"] as const).map((group) => (
                <div key={group} className="roti-footer__link-group" data-group={group}>
                  {footerLinks
                    .filter((link) => link.group === group)
                    .map((link) => (
                      <a key={link.label} href={link.href}>
                        {link.label}
                      </a>
                    ))}
                </div>
              ))}
            </nav>
            <a className="roti-footer__top" href={HOME_SECTION_HREFS.top} aria-label="맨 위로 이동">
              <CaretUp aria-hidden="true" size={15} weight="bold" />
              <span>TOP</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
