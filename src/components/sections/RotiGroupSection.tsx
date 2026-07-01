import type { Brand } from "@/types/brand";
import { SectionLabel } from "@/components/ui/SectionLabel";

type RotiGroupSectionProps = {
  brands: Brand[];
};

export function RotiGroupSection({ brands }: RotiGroupSectionProps) {
  return (
    <section className="section-shell brand-section" id="brand" aria-labelledby="group-title">
      <SectionLabel>ROTI GROUP</SectionLabel>
      <h2 id="group-title" className="group-section__title">
        One portal for three brand directions
      </h2>
      <p className="group-section__copy">
        ROTI presents {brands.length} connected brand areas without turning the mainpage into a product list.
      </p>
    </section>
  );
}
