export type RotiConnectItem = {
  id: "product" | "business" | "partnership";
  index: string;
  category: "PRODUCT" | "BUSINESS" | "PARTNERSHIP";
  tabLabel: string;
  title: string;
  description: string;
  keywords: readonly string[];
  ctaLabel: string;
  href?: string;
  tone: "product" | "business" | "partnership";
  imageSrc: string;
  mobileImageSrc: string;
  imageAlt: string;
};

export const rotiConnectContent = {
  eyebrow: "ROTI CONNECT",
  title: "로티와 함께하세요",
  description: "문의 목적에 맞는 경로를 선택해 주세요.",
  items: [
    {
      id: "product",
      index: "01",
      category: "PRODUCT",
      tabLabel: "제품 문의",
      title: "제품 및 구매 문의",
      description: "제품 정보와 사용 방법, 구매 후 문의를 안내합니다.",
      keywords: ["제품 정보", "사용 문의", "구매 후 문의"],
      ctaLabel: "제품 문의로 이동",
      href: undefined,
      tone: "product",
      imageSrc: "/images/connect/connect-product-desktop.webp",
      mobileImageSrc: "/images/connect/connect-product-mobile.webp",
      imageAlt: "제품 샘플과 소재를 함께 검토하는 업무 장면"
    },
    {
      id: "business",
      index: "02",
      category: "BUSINESS",
      tabLabel: "기업·단체",
      title: "기업·단체 구매 문의",
      description: "기업, 단체 및 기관 구매와 견적 문의를 안내합니다.",
      keywords: ["기업 구매", "단체 구매", "견적 문의"],
      ctaLabel: "기업 구매 문의로 이동",
      href: undefined,
      tone: "business",
      imageSrc: "/images/connect/connect-business-desktop.webp",
      mobileImageSrc: "/images/connect/connect-business-mobile.webp",
      imageAlt: "제품 구성과 소재를 테이블 위에서 논의하는 업무 장면"
    },
    {
      id: "partnership",
      index: "03",
      category: "PARTNERSHIP",
      tabLabel: "유통·협업",
      title: "유통·입점·협업 문의",
      description: "유통 제안, 입점 및 공동 기획 문의를 안내합니다.",
      keywords: ["유통 제안", "입점 문의", "공동 기획"],
      ctaLabel: "유통·협업 문의로 이동",
      href: undefined,
      tone: "partnership",
      imageSrc: "/images/connect/connect-partnership-desktop.webp",
      mobileImageSrc: "/images/connect/connect-partnership-mobile.webp",
      imageAlt: "전시 공간에서 진열 구조를 함께 살펴보는 협업 장면"
    }
  ] as const satisfies readonly RotiConnectItem[]
} as const;
