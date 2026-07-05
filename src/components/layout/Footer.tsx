import Image from "next/image";

const brandLogos = [
  { src: "/images/logos/roti-camp-logo.png", alt: "ROTI CAMP", width: 685, height: 299 },
  { src: "/images/logos/roti-homesys-logo.png", alt: "ROTI HOMESYS", width: 690, height: 320 },
  { src: "/images/logos/leel-logo.png", alt: "LEEL", width: 381, height: 70 }
] as const;

const locations = [
  {
    label: "서울 오피스",
    address: "서울특별시 도봉구 마들로 13길 61, 씨드큐브 창동 B동 603, 604호"
  },
  {
    label: "본점",
    address: "경기도 양주시 은현면 화합로 941번길 234 (주)로티"
  }
] as const;

export function Footer() {
  return (
    <footer className="roti-footer" id="roti-footer" aria-label="ROTI footer">
      <span className="roti-footer__background roti-footer__background--one" aria-hidden="true" />
      <span className="roti-footer__background roti-footer__background--two" aria-hidden="true" />
      <div className="roti-footer__inner">
        <div className="roti-footer__left">
          <h2 className="roti-footer__logo">
            <Image src="/images/logos/roti-logo.png" alt="ROTI" width={589} height={140} />
          </h2>
          <p className="roti-footer__headline">
            THREE BRANDS
            <br />
            ONE STANDARD
          </p>
        </div>

        <div className="roti-footer__right" aria-label="ROTI 주소">
          <ul>
            {locations.map((location) => (
              <li key={location.label}>
                <p className="roti-footer__address-label">{location.label}</p>
                <p className="roti-footer__address">{location.address}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="roti-footer__links" aria-label="ROTI footer links">
          <a href="#brand">BRAND</a>
          <a href="#roti-standard">STANDARD</a>
          <span>개인정보처리방침</span>
        </div>

        <p className="roti-footer__copyright">COPYRIGHT © ROTI. ALL RIGHTS RESERVED.</p>

        <div className="roti-footer__brand-logos" aria-label="ROTI brand logos">
          {brandLogos.map((logo) => (
            <Image key={logo.alt} src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} />
          ))}
        </div>

        <a className="roti-footer__top" href="#top" aria-label="맨 위로 이동">
          <span aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
