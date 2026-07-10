import { HOME_SECTION_HREFS, type HomeSectionHref } from "@/data/sections";

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

export const footerBrandLogos = [
  {
    id: "roti-camp",
    src: "/images/logos/roti-camp-logo.png",
    alt: "ROTI CAMP",
    width: 1164,
    height: 170
  },
  {
    id: "roti-homesys",
    src: "/images/logos/roti-homesys-logo-v2.png",
    alt: "ROTI HOMESYS",
    width: 1455,
    height: 172
  },
  {
    id: "leel",
    src: "/images/logos/leel-logo.png",
    alt: "LeEL",
    width: 381,
    height: 70
  }
] as const satisfies readonly FooterBrandLogo[];

export const footerLocations = [
  {
    label: "서울 오피스",
    address: "서울특별시 도봉구 마들로 13길 61, 씨드큐브 창동 B동 603, 604호"
  },
  {
    label: "본점",
    address: "경기도 양주시 은현면 화합로 941번길 234 (주)로티"
  }
] as const satisfies readonly FooterLocation[];

export const footerLinks: readonly FooterLink[] = [
  { label: "BRAND", href: HOME_SECTION_HREFS.brand },
  { label: "STANDARD", href: HOME_SECTION_HREFS.standard },
  { label: "개인정보처리방침" }
] as const;

export const footerCopyright = "COPYRIGHT © ROTI. ALL RIGHTS RESERVED.";
