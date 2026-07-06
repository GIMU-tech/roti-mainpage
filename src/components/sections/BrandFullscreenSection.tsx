import type { Brand } from "@/types/brand";
import { CTAButton } from "@/components/ui/CTAButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import Image from "next/image";

type BrandFullscreenSectionProps = {
  brand: Brand;
};

export function BrandFullscreenSection({ brand }: BrandFullscreenSectionProps) {
  return (
    <section className="section-shell brand-section" id={brand.id} aria-labelledby={`${brand.id}-title`}>
      <SectionLabel>
        <span className="brand-logo-wordmark">
          <Image src={brand.logoSrc} alt={brand.logoAlt} width={690} height={320} sizes="8rem" />
        </span>
      </SectionLabel>
      <h2 id={`${brand.id}-title`} className="brand-section__title">
        {brand.headline}
      </h2>
      <p className="brand-section__copy">{brand.description}</p>
      <CTAButton href={brand.brandUrl}>View brand</CTAButton>
    </section>
  );
}
