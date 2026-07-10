import { HOME_SECTION_HREFS } from "@/data/sections";

export type RotiConnectItem = {
  id: "product" | "bulk" | "partnership";
  index: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  visual: "rings" | "grid" | "network";
};

export const rotiConnectContent = {
  eyebrow: "ROTI CONNECT",
  title: ["함께 만드는", "다음 장면."],
  description: "제품에 관한 질문부터 기업 구매, 유통과 협업까지 목적에 맞는 창구로 연결합니다.",
  items: [
    {
      id: "product",
      index: "01",
      title: "고객·제품 문의",
      description: "제품 정보, 사용 방법 및 구매 후 문의",
      ctaLabel: "문의 정보 보기",
      href: HOME_SECTION_HREFS.footer,
      visual: "rings"
    },
    {
      id: "bulk",
      index: "02",
      title: "대량 구매·기업 문의",
      description: "기업, 단체 및 기관 구매와 견적 문의",
      ctaLabel: "문의 정보 보기",
      href: HOME_SECTION_HREFS.footer,
      visual: "grid"
    },
    {
      id: "partnership",
      index: "03",
      title: "유통·입점·협업",
      description: "유통 제안, 입점 및 공동 기획 문의",
      ctaLabel: "문의 정보 보기",
      href: HOME_SECTION_HREFS.footer,
      visual: "network"
    }
  ] as const satisfies readonly RotiConnectItem[]
} as const;

