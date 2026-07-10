import { HOME_SECTION_HREFS } from "@/data/sections";

export type RotiConnectItem = {
  id: "product" | "business" | "partnership";
  index: string;
  category: "PRODUCT" | "BUSINESS" | "PARTNERSHIP";
  title: string;
  description: string;
  keywords: readonly string[];
  ctaLabel: string;
  href: string;
  tone: "product" | "business" | "partnership";
  imageSrc: string;
  imageAlt: string;
};

export const rotiConnectContent = {
  title: ["로티와 함께하세요."],
  description: "제품 문의부터 기업 구매, 유통과 협업까지 목적에 맞는 창구로 안내합니다.",
  items: [
    {
      id: "product",
      index: "01",
      category: "PRODUCT",
      title: "고객·제품 문의",
      description: "제품 정보, 사용 방법 및 구매 후 문의",
      keywords: ["제품 정보", "사용 문의", "구매 후 문의"],
      ctaLabel: "문의 정보 보기",
      href: HOME_SECTION_HREFS.footer,
      tone: "product",
      imageSrc: "/images/sections/leel-brand-section.webp",
      imageAlt: "LeEL 제품과 소재가 놓인 차분한 생활 공간"
    },
    {
      id: "business",
      index: "02",
      category: "BUSINESS",
      title: "대량 구매·기업 문의",
      description: "기업, 단체 및 기관 구매와 견적 문의",
      keywords: ["기업 구매", "단체 구매", "견적 문의"],
      ctaLabel: "문의 정보 보기",
      href: HOME_SECTION_HREFS.footer,
      tone: "business",
      imageSrc: "/images/sections/roti-homesys-brand-section.webp",
      imageAlt: "ROTI HOMESYS 수납 구조가 보이는 정돈된 실내"
    },
    {
      id: "partnership",
      index: "03",
      category: "PARTNERSHIP",
      title: "유통·입점·협업",
      description: "유통 제안, 입점 및 공동 기획 문의",
      keywords: ["유통 제안", "입점 문의", "공동 기획"],
      ctaLabel: "문의 정보 보기",
      href: HOME_SECTION_HREFS.footer,
      tone: "partnership",
      imageSrc: "/images/sections/roti-camp-brand-section.webp",
      imageAlt: "ROTI CAMP 야외 장면과 캠핑 장비"
    }
  ] as const satisfies readonly RotiConnectItem[]
} as const;
