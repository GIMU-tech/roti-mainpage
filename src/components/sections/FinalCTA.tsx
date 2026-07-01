import type { Brand } from "@/types/brand";
import { CTAButton } from "@/components/ui/CTAButton";
import { SectionLabel } from "@/components/ui/SectionLabel";

type FinalCTAProps = {
  brands: Brand[];
};

export function FinalCTA({ brands }: FinalCTAProps) {
  return (
    <section className="section-shell brand-section" id="contact" aria-labelledby="final-cta-title">
      <SectionLabel>NEXT ROUTES</SectionLabel>
      <h2 id="final-cta-title" className="group-section__title">
        Continue to a ROTI brand
      </h2>
      <div className="cta-list" aria-label="Brand routes">
        {brands.map((brand) => (
          <CTAButton key={brand.id} href={brand.brandUrl}>
            {brand.name}
          </CTAButton>
        ))}
      </div>
    </section>
  );
}
