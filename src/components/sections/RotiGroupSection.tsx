import type { Brand } from "@/types/brand";
import { SectionGrid } from "@/components/layout/SectionGrid";
import { SectionShell } from "@/components/layout/SectionShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { rotiGroupContent } from "@/data/rotiGroup";
import { HOME_SECTION_IDS } from "@/data/sections";

type RotiGroupSectionProps = {
  brands: readonly Brand[];
};

export function RotiGroupSection({ brands }: RotiGroupSectionProps) {
  return (
    <SectionShell className="roti-group" id={HOME_SECTION_IDS.group} aria-labelledby="roti-group-title">
      <SectionGrid className="roti-group__grid">
        <div className="roti-group__intro">
          <SectionLabel>{rotiGroupContent.eyebrow}</SectionLabel>
          <h2 id="roti-group-title" className="roti-group__title">
            {rotiGroupContent.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="roti-group__description">{rotiGroupContent.description}</p>
        </div>

        <nav className="roti-group__brand-nav" aria-label={rotiGroupContent.actionLabel}>
          <p className="roti-group__action-label">{rotiGroupContent.actionLabel}</p>
          <ul className="roti-group__brand-list">
            {brands.map((brand, index) => (
              <li key={brand.id}>
                <a className="roti-group__brand-link" href={brand.brandUrl}>
                  <span className="roti-group__brand-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="roti-group__brand-copy">
                    <strong>{brand.name}</strong>
                    <span>{brand.scene.title}</span>
                  </span>
                  <span className="roti-group__brand-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </SectionGrid>
    </SectionShell>
  );
}

