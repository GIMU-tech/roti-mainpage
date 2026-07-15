import { HOME_SECTION_HREFS, type HomeSectionHref } from "@/data/sections";
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
  href?: HomeSectionHref;
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

export const footerLinks: readonly FooterLink[] = [
  { label: "BRAND", href: HOME_SECTION_HREFS.brand },
  { label: "STANDARD", href: HOME_SECTION_HREFS.standard },
  { label: "개인정보처리방침" }
] as const;

export const footerCopyright = "COPYRIGHT © ROTI. ALL RIGHTS RESERVED.";
