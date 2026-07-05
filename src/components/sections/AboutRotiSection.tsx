import type { CSSProperties } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const aboutSceneItems = ["ROTI CAMP", "ROTI HOMESYS", "LEEL"];

export function AboutRotiSection() {
  return (
    <section className="section-shell about-roti" id="about" aria-labelledby="about-roti-title">
      <div className="about-roti__copy">
        <SectionLabel>ABOUT ROTI</SectionLabel>
        <h2 id="about-roti-title" className="about-roti__title">
          일상의 장면을 나누고, 하나의 기준으로 묶습니다.
        </h2>
        <p className="about-roti__body">
          ROTI는 캠핑, 정리, 주방과 리빙을 각기 다른 무드로 전개하는 브랜드 그룹입니다. 많은 제품을 한 번에
          보여주기보다, 생활에 필요한 기준을 브랜드별 장면으로 정리합니다.
        </p>
      </div>
      <div className="about-roti__visual" aria-label="ROTI 세 브랜드 장면 요약">
        {aboutSceneItems.map((item, index) => (
          <span key={item} className="about-roti__visual-line" style={{ "--line-index": index } as CSSProperties}>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
