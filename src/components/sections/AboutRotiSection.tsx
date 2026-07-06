import type { CSSProperties } from "react";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";

const aboutSceneItems = [
  {
    code: "01",
    name: "ROTI CAMP",
    description: "변화하는 환경에 반응하는 아웃도어.",
    href: "#roti-camp",
    image: "/images/sections/camp-bg.webp",
    logoHeight: 170,
    logoSrc: "/images/logos/roti-camp-logo.png",
    logoWidth: 1164
  },
  {
    code: "02",
    name: "ROTI HOMESYS",
    description: "달라지는 생활 흐름을 정돈하는 방식.",
    href: "#roti-homesys",
    image: "/images/sections/homesys-bg.webp",
    logoHeight: 172,
    logoSrc: "/images/logos/roti-homesys-logo-v2.png",
    logoWidth: 1455
  },
  {
    code: "03",
    name: "LeEL",
    description: "공간의 균형을 섬세하게 다듬는 태도.",
    href: "#leel",
    image: "/images/sections/leel-bg.webp",
    logoHeight: 70,
    logoSrc: "/images/logos/leel-logo.png",
    logoWidth: 381
  }
];

export function AboutRotiSection() {
  return (
    <section className="section-shell about-roti" id="about" aria-labelledby="about-roti-title">
      <div className="about-roti__copy">
        <SectionLabel>ROTI STANDARD</SectionLabel>
        <h2 id="about-roti-title" className="about-roti__title">
          <span>변화를 읽고,</span>
          <span>필요를 나누고,</span>
          <span>장면을 만듭니다.</span>
        </h2>
        <p className="about-roti__body">
          ROTI는 달라지는 일상의 필요를
          <br />
          세 가지 브랜드 장면으로 정리합니다.
        </p>
        <div className="about-roti__signature" aria-hidden="true">
          <span>ALWAYS ALERT FOR CHANGES</span>
          <strong>ROTI</strong>
        </div>
      </div>
      <div className="about-roti__visual" aria-label="ROTI 세 브랜드 장면 인덱스">
        <p className="about-roti__visual-kicker">THREE WAYS FOR EVERYDAY LIFE</p>
        <span className="about-roti__wordmark" aria-hidden="true">
          ROTI
        </span>
        <div className="about-roti__visual-list">
          {aboutSceneItems.map((item) => (
            <a
              key={item.name}
              className="about-roti__visual-line"
              href={item.href}
              style={{ "--about-scene-image": `url(${item.image})` } as CSSProperties}
            >
              <span className="about-roti__visual-index">{item.code}</span>
              <span className="about-roti__visual-copy">
                <span className="about-roti__visual-logo" data-logo={item.href.slice(1)}>
                  <Image
                    src={item.logoSrc}
                    alt={item.name}
                    width={item.logoWidth}
                    height={item.logoHeight}
                    sizes="(max-width: 900px) 42vw, 18rem"
                  />
                </span>
                <span className="about-roti__visual-description">{item.description}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
