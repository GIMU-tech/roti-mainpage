import { SectionGrid } from "@/components/layout/SectionGrid";
import { HOME_SECTION_IDS } from "@/data/sections";
import { siteContent } from "@/data/siteContent";

export function RotiVisionValuesSection() {
  return (
    <section id={HOME_SECTION_IDS.standard} className="roti-values" aria-labelledby="roti-values-title">
      <SectionGrid className="roti-values__grid">
        <header className="roti-values__vision">
          <h2 id="roti-values-title">
            {siteContent.standard.title.map((line) => (
              <span key={line} className="roti-values__vision-title-line">
                {line}
              </span>
            ))}
          </h2>
        </header>

        <div className="roti-values__vision-copy">
          <p>{siteContent.standard.description}</p>
        </div>

        <ol className="roti-values__list" aria-label="ROTI 핵심 가치">
          {siteContent.standard.values.map((value) => (
            <li key={value.english} className="roti-values__item">
              <h3>{value.title}</h3>
              <p className="roti-values__statement">{value.statement}</p>
              <p className="roti-values__description">{value.description}</p>
            </li>
          ))}
        </ol>
      </SectionGrid>
    </section>
  );
}
