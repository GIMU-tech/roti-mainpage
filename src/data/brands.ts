import type { Brand } from "@/types/brand";

export const brands: Brand[] = [
  {
    id: "roti-camp",
    name: "ROTI CAMP",
    shortName: "CAMP",
    logoSrc: "/images/logos/roti-camp-logo.png",
    logoAlt: "ROTI CAMP",
    logoWidth: 1164,
    logoHeight: 170,
    headline: "밖으로 향하는 생활",
    description: "캠핑과 이동을 위한 실용 브랜드",
    mood: ["outdoor", "movement", "nature", "rest"],
    keywords: ["캠핑", "이동", "수납"],
    heroImage: "/images/brands/camp-hero.jpg",
    sectionImage: "/images/sections/camp-bg.jpg",
    heroAsset: {
      src: "/images/brands/camp-hero.jpg",
      alt: "ROTI CAMP 어두운 야외와 장비 분위기의 장면",
      status: "ready",
      focalPoint: "center bottom"
    },
    visualTagline: "밖으로 향하는 생활",
    visualMaterial: "smoked mountain / matte gear",
    visualScene: "캠핑 · 이동 · 수납",
    scene: {
      title: "밖으로 향하는 생활",
      copy: "캠핑과 이동을 위한 실용 브랜드",
      direction: "어두운 야외, 이동선, 장비 실루엣, 낮은 조도",
      align: "left"
    },
    brandUrl: "#roti-camp"
  },
  {
    id: "roti-homesys",
    name: "ROTI HOMESYS",
    shortName: "HOMESYS",
    logoSrc: "/images/logos/roti-homesys-logo-v2.png",
    logoAlt: "ROTI HOMESYS",
    logoWidth: 1455,
    logoHeight: 172,
    headline: "정리되는 집",
    description: "수납과 이동을 정돈하는 홈 시스템 브랜드",
    mood: ["organize", "move", "utility", "efficiency"],
    keywords: ["수납", "이동", "생활 동선"],
    heroImage: "/images/brands/homesys-hero.jpg",
    sectionImage: "/images/sections/homesys-bg.jpg",
    heroAsset: {
      src: "/images/brands/homesys-hero.jpg",
      alt: "ROTI HOMESYS 정돈된 실내와 수납 구조 장면",
      status: "ready",
      focalPoint: "center center"
    },
    visualTagline: "정리되는 집",
    visualMaterial: "warm interior / charcoal structure",
    visualScene: "수납 · 이동 · 생활 동선",
    scene: {
      title: "정리되는 집",
      copy: "수납과 이동을 정돈하는 홈 시스템 브랜드",
      direction: "정돈된 실내, 수납 구조, 따뜻한 실내 조명",
      align: "right"
    },
    brandUrl: "#roti-homesys"
  },
  {
    id: "leel",
    name: "LeEL",
    shortName: "LeEL",
    logoSrc: "/images/logos/leel-logo.png",
    logoAlt: "LeEL",
    logoWidth: 381,
    logoHeight: 70,
    headline: "차분한 주방과 리빙",
    description: "주방과 생활 공간을 정갈하게 제안하는 브랜드",
    mood: ["kitchen", "clean", "density", "calm"],
    keywords: ["주방", "소재", "여백"],
    heroImage: "/images/brands/leel-hero.jpg",
    sectionImage: "/images/sections/leel-bg.jpg",
    heroAsset: {
      src: "/images/brands/leel-hero.jpg",
      alt: "LeEL 조용한 주방과 리빙 오브젝트 장면",
      status: "ready",
      focalPoint: "center center"
    },
    visualTagline: "차분한 주방과 리빙",
    visualMaterial: "dark stone / brushed steel",
    visualScene: "주방 · 소재 · 여백",
    scene: {
      title: "차분한 주방과 리빙",
      copy: "주방과 생활 공간을 정갈하게 제안하는 브랜드",
      direction: "주방, 스틸, 스톤, 조용한 빛, 여백",
      align: "left"
    },
    brandUrl: "#leel"
  }
];
