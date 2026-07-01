import type { Brand } from "@/types/brand";
import { CTAButton } from "@/components/ui/CTAButton";
import { SectionLabel } from "@/components/ui/SectionLabel";

type FinalCTAProps = {
  brands: Brand[];
};

export function FinalCTA({ brands }: FinalCTAProps) {
  return (
    <section className="section-shell final-scene" id="contact" aria-labelledby="final-cta-title">
      <SectionLabel>브랜드 바로가기</SectionLabel>
      <h2 id="final-cta-title" className="group-section__title">
        원하는 브랜드로 이동
      </h2>
      <div className="cta-list" aria-label="브랜드 바로가기">
        {brands.map((brand) => (
          <CTAButton key={brand.id} href={brand.brandUrl}>
            {brand.name}
          </CTAButton>
        ))}
      </div>
    </section>
  );
}
