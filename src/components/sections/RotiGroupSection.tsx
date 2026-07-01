import type { Brand } from "@/types/brand";
import { SectionLabel } from "@/components/ui/SectionLabel";

type RotiGroupSectionProps = {
  brands: Brand[];
};

export function RotiGroupSection({ brands }: RotiGroupSectionProps) {
  return (
    <section className="section-shell group-scene" id="brand" aria-labelledby="group-title">
      <SectionLabel>ROTI GROUP</SectionLabel>
      <h2 id="group-title" className="group-section__title">
        세 브랜드, 하나의 기준
      </h2>
      <p className="group-section__copy">
        ROTI는 캠핑·홈리빙·키친을 각기 다른 무드로 전개합니다.
      </p>
      <div className="group-scene__brands" aria-label="ROTI 브랜드 목록">
        {brands.map((brand) => (
          <span key={brand.id}>{brand.name}</span>
        ))}
      </div>
    </section>
  );
}
