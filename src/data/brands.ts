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
    headline: "캠핑을 더 쉽게, 바깥의 시간을 더 편안하게.",
    description: "누구나 캠핑을 시작하고 즐길 수 있도록 사용이 간편한 캠핑용품을 제안합니다.",
    mood: ["outdoor", "movement", "nature", "rest"],
    keywords: ["캠핑", "이동", "휴식"],
    heroAsset: {
      src: "/images/brands/roti-camp-card-v7.webp",
      alt: "ROTI CAMP 숲 캠프장에 탄색 육각 쉘터가 놓인 낮 풍경",
      status: "ready",
      focalPoint: "58% center"
    },
    sectionAsset: {
      src: "/images/sections/roti-camp-brand-section-v8.webp",
      alt: "ROTI CAMP 자연스러운 숲 캠프장에 탄색 육각 쉘터가 놓인 낮 풍경",
      focalPoint: "center center",
      mobileFocalPoint: "66% center",
      visualFilter: "brightness(0.88) saturate(0.9) contrast(1)"
    },
    transition: {
      overlayShade: "rgba(0, 0, 0, 0.32)",
      accessibilityLabel: "ROTI CAMP 브랜드 섹션으로 이동합니다."
    },
    visualTagline: "캠핑을 더 쉽게, 바깥의 시간을 더 편안하게.",
    visualMaterial: "smoked mountain / matte gear",
    visualScene: "캠핑 · 이동 · 휴식",
    scene: {
      title: "캠핑을 더 쉽게, 바깥의 시간을 더 편안하게.",
      copy: "누구나 캠핑을 시작하고 즐길 수 있도록 사용이 간편한 캠핑용품을 제안합니다.",
      direction: "어두운 야외, 이동선, 장비 실루엣, 낮은 조도",
      align: "left"
    },
    about: {
      title: "바깥의 시간을",
      accent: "더 쉽게 시작하도록.",
      description: "누구나 캠핑을 시작하고 즐길 수 있도록 사용이 간편한 캠핑용품을 제안합니다.",
      image: "/images/sections/roti-camp-brand-section.webp"
    },
    brandUrl: "/roticamp-shop",
    brandCtaLabel: "ROTI CAMP 쇼핑몰 보기",
    brandUrlAriaLabel: "ROTI CAMP 임시 쇼핑몰 프론트 보기"
  },
  {
    id: "roti-homesys",
    name: "ROTI HOMESYS",
    shortName: "HOMESYS",
    logoSrc: "/images/logos/roti-homesys-logo-v2.png",
    logoAlt: "ROTI HOMESYS",
    logoWidth: 1455,
    logoHeight: 172,
    headline: "생활의 불편을 편리하게",
    description: "수납과 이동, 사용 순서에서 생기는 불편을 살피고 생활의 편리함을 위한 제품을 제안합니다.",
    mood: ["organize", "move", "utility", "efficiency"],
    keywords: ["수납", "이동", "생활 동선"],
    heroAsset: {
      src: "/images/brands/roti-homesys-card.png",
      alt: "ROTI HOMESYS 핸드카트와 플랫폼 카트가 정돈된 무대에 놓인 장면",
      status: "ready",
      focalPoint: "center center"
    },
    sectionAsset: {
      src: "/images/sections/roti-homesys-brand-section.webp",
      alt: "ROTI HOMESYS 카트와 발판 사다리 제품군이 정돈된 무대에 나열된 장면",
      focalPoint: "center center",
      mobileFocalPoint: "50% center",
      visualFilter: "brightness(0.9) saturate(0.9) contrast(1.02)"
    },
    transition: {
      overlayShade: "rgba(0, 0, 0, 0.22)",
      accessibilityLabel: "ROTI HOMESYS 브랜드 섹션으로 이동합니다."
    },
    visualTagline: "생활을 더 편리하게, 하루를 더 가볍게.",
    visualMaterial: "warm interior / charcoal structure",
    visualScene: "수납 · 이동 · 생활 동선",
    scene: {
      title: "생활의 불편을 편리하게",
      copy: "수납과 이동, 사용 순서에서 생기는 불편을 살피고 생활의 편리함을 위한 제품을 제안합니다.",
      direction: "정돈된 실내, 수납 구조, 따뜻한 실내 조명",
      align: "right"
    },
    about: {
      title: "수납과 이동의 불편을",
      accent: "더 편리하게.",
      description: "수납과 이동, 사용 순서에서 생기는 불편을 살피고 생활의 편리함을 위한 제품을 제안합니다.",
      image: "/images/sections/roti-homesys-brand-section.webp"
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
    headline: "주방과 생활 공간을 정갈하게.",
    description: "소재와 형태, 여백의 균형으로 일상 공간을 차분하게 정돈합니다.",
    mood: ["kitchen", "clean", "density", "calm"],
    keywords: ["주방", "소재", "여백"],
    heroAsset: {
      src: "/images/brands/leel-card-v2.webp",
      alt: "LeEL 화이트 프레임과 밝은 목재 트롤리가 놓인 차분한 월넛 리빙 공간",
      status: "ready",
      focalPoint: "center 62%"
    },
    sectionAsset: {
      src: "/images/sections/leel-brand-section-v1.webp",
      alt: "LeEL 트롤리 제품군이 놓인 월넛 키친과 리빙 공간",
      focalPoint: "center center",
      mobileFocalPoint: "58% center",
      visualFilter: "brightness(0.9) saturate(0.86) contrast(1.03)"
    },
    transition: {
      overlayShade: "rgba(0, 0, 0, 0.22)",
      accessibilityLabel: "LeEL 브랜드 섹션으로 이동합니다."
    },
    visualTagline: "공간을 더 단정하게, 일상을 더 곱게.",
    visualMaterial: "dark stone / brushed steel",
    visualScene: "주방 · 소재 · 여백",
    scene: {
      title: "주방과 생활 공간을 정갈하게.",
      copy: "소재와 형태, 여백의 균형으로 일상 공간을 차분하게 정돈합니다.",
      direction: "주방, 스틸, 스톤, 조용한 빛, 여백",
      align: "left"
    },
    about: {
      title: "주방과 생활 공간을",
      accent: "정갈하게.",
      description: "소재와 형태, 여백의 균형으로 일상 공간을 차분하게 정돈합니다.",
      image: "/images/sections/leel-bg.webp"
    },
    brandUrl: "#leel"
  }
];
