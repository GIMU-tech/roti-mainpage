import Image from "next/image";
import { SectionGrid } from "@/components/layout/SectionGrid";
import { HOME_SECTION_IDS } from "@/data/sections";
import { siteContent } from "@/data/siteContent";

type AboutRotiSectionProps = {
  id?: string;
  showTitle?: boolean;
};

export function AboutRotiSection({ id = HOME_SECTION_IDS.about, showTitle = true }: AboutRotiSectionProps) {
  return (
    <section id={id} className="about-roti" aria-labelledby={`${id}-title`}>
      <div className="about-roti__continuation" aria-hidden="true">
        <Image
          src="/images/sections/roti-company-building-concept.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectPosition: "50% 58%" }}
        />
      </div>

      <SectionGrid className={`about-roti__grid${showTitle ? "" : " about-roti__grid--story-only"}`}>
        <header className="about-roti__heading">
          {showTitle ? (
            <h2 id={`${id}-title`} className="about-roti__title">
              {siteContent.about.title.map((line) => (
                <span key={line} className="about-roti__title-line">
                  {line}
                </span>
              ))}
            </h2>
          ) : (
            <h2 id={`${id}-title`} className="about-roti__title about-roti__title--sr-only">
              ROTI 회사 소개
            </h2>
          )}
        </header>

        <div className="about-roti__story">
          <p className="about-roti__lead">{siteContent.about.lead}</p>
          <p className="about-roti__body">{siteContent.about.description}</p>
          <p className="about-roti__signature">{siteContent.about.signature}</p>
        </div>

      </SectionGrid>
    </section>
  );
}
