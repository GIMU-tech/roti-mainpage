import type { Brand } from "@/types/brand";
import { SectionLabel } from "@/components/ui/SectionLabel";
import Image from "next/image";

type RotiGroupSectionProps = {
  brands: Brand[];
};

export function RotiGroupSection({ brands }: RotiGroupSectionProps) {
  return (
    <section className="section-shell group-scene" id="roti-group" aria-labelledby="group-title">
      <SectionLabel>ROTI GROUP</SectionLabel>
      <h2 id="group-title" className="group-section__title">
        세 브랜드, 하나의 기준
      </h2>
      <p className="group-section__copy">
        ROTI는 캠핑, 홈 시스템, 주방과 리빙을 각기 다른 장면으로 전개하는 브랜드 그룹입니다.
      </p>
      <div className="group-scene__brands" aria-label="ROTI 브랜드 목록">
        {brands.map((brand) => (
          <span key={brand.id} className="brand-logo-wordmark">
            <Image src={brand.logoSrc} alt={brand.logoAlt} width={690} height={320} sizes="8rem" />
          </span>
        ))}
      </div>
    </section>
  );
}
