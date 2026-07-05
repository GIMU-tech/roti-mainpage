import type { Brand } from "@/types/brand";
import { CTAButton } from "@/components/ui/CTAButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import Image from "next/image";

type FinalCTAProps = {
  brands: Brand[];
};

export function FinalCTA({ brands }: FinalCTAProps) {
  return (
    <section className="section-shell final-scene" id="contact" aria-labelledby="final-cta-title">
      <SectionLabel>BRAND ROUTE</SectionLabel>
      <h2 id="final-cta-title" className="group-section__title">
        원하는 브랜드로 이동
      </h2>
      <div className="cta-list" aria-label="브랜드 바로가기">
        {brands.map((brand) => (
          <CTAButton key={brand.id} href={brand.brandUrl}>
            <span className="brand-logo-wordmark">
              <Image src={brand.logoSrc} alt={brand.logoAlt} width={690} height={320} sizes="8rem" />
            </span>
          </CTAButton>
        ))}
      </div>
    </section>
  );
}
