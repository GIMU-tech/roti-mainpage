import { brands } from "@/data/brands";

export type FooterBrandLogo = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type FooterLocation = {
  label: string;
  address: string;
};

export type FooterLink = {
  label: string;
  href: string;
  group: "legal" | "category";
};

export type FooterCompanyInfo = {
  companyName: string;
  representative: string;
  businessRegistrationNumber: string;
  mailOrderRegistrationNumber: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
};

export const footerBrandLogos: readonly FooterBrandLogo[] = brands.map((brand) => ({
  id: brand.id,
  src: brand.logoSrc,
  alt: brand.logoAlt,
  width: brand.logoWidth,
  height: brand.logoHeight
}));

export const footerLocations = [
  {
    label: "본사",
    address: "경기도 양주시 은현면 화합로 941번길 234 (주)로티"
  },
  {
    label: "서울지사",
    address: "서울특별시 도봉구 마들로 13길 61, 씨드큐브 창동 B동 603, 604호"
  }
] as const satisfies readonly FooterLocation[];

export const footerCompanyInfo: FooterCompanyInfo = {
  companyName: "(주)로티",
  representative: "정영진",
  businessRegistrationNumber: "571-86-00618",
  mailOrderRegistrationNumber: "제 2017-경기양주-0088 호",
  phone: "1800-8523",
  phoneHref: "tel:18008523",
  email: "RT@rotimall.com",
  emailHref: "mailto:RT@rotimall.com"
};

export const footerLinks: readonly FooterLink[] = [
  { label: "이용약관", href: "#", group: "legal" },
  { label: "개인정보처리방침", href: "#", group: "legal" },
  { label: "캠핑", href: "#", group: "category" },
  { label: "공구", href: "#", group: "category" },
  { label: "주방", href: "#", group: "category" }
] as const;

export const footerCopyright = "COPYRIGHT © ROTI. ALL RIGHTS RESERVED.";
