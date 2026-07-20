export type RotiStatItem = {
  id: "since" | "products" | "partners" | "brands" | "ip";
  value: number;
  from: number;
  suffix?: string;
  delay: number;
  label: string;
  detail?: string;
  image: string;
};

export const rotiStatsContent = {
  title: "숫자로 보는 로티",
  description: "세 브랜드와 생활 제품을 통해 쌓아온 로티의 현재를 숫자로 소개합니다.",
  items: [
    {
      id: "since",
      value: 2010,
      from: 2000,
      suffix: "~",
      delay: 0,
      label: "SINCE",
      image: "/images/stats/stats-since-2010.png"
    },
    {
      id: "products",
      value: 400,
      from: 0,
      suffix: "+",
      delay: 100,
      label: "기획·생산 제품",
      image: "/images/stats/stats-products-400.png"
    },
    {
      id: "partners",
      value: 40,
      from: 0,
      suffix: "+",
      delay: 180,
      label: "협력 파트너사",
      image: "/images/stats/stats-partners-40.png"
    },
    {
      id: "brands",
      value: 3,
      from: 0,
      delay: 260,
      label: "자체 브랜드",
      detail: "ROTI CAMP · ROTI HOMESYS · LeEL",
      image: "/images/stats/stats-brands-3.png"
    },
    {
      id: "ip",
      value: 5,
      from: 0,
      delay: 340,
      label: "특허·디자인 출원",
      image: "/images/stats/stats-ip-5.png"
    }
  ] as const satisfies readonly RotiStatItem[]
};
