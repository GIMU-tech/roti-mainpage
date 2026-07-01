import type { Brand } from "@/types/brand";

export const brands: Brand[] = [
  {
    id: "roti-camp",
    name: "ROTI CAMP",
    shortName: "CAMP",
    headline: "Outdoor movement and rest",
    description: "A brand area for outdoor scenes, movement, and calm breaks.",
    mood: ["outdoor", "movement", "nature", "rest"],
    heroImage: "/images/brands/camp-hero.jpg",
    sectionImage: "/images/sections/camp-bg.jpg",
    brandUrl: "/brands/roti-camp"
  },
  {
    id: "roti-homesys",
    name: "ROTI HOMESYS",
    shortName: "HOMESYS",
    headline: "Utility for organized living",
    description: "A central brand area for storage, moving, and everyday utility.",
    mood: ["organize", "move", "utility", "efficiency"],
    heroImage: "/images/brands/homesys-hero.jpg",
    sectionImage: "/images/sections/homesys-bg.jpg",
    brandUrl: "/brands/roti-homesys"
  },
  {
    id: "leel",
    name: "LEEL",
    shortName: "LEEL",
    headline: "Calm kitchen and living scenes",
    description: "A brand area for clean, dense, and quiet kitchen-living moments.",
    mood: ["kitchen", "clean", "density", "calm"],
    heroImage: "/images/brands/leel-hero.jpg",
    sectionImage: "/images/sections/leel-bg.jpg",
    brandUrl: "/brands/leel"
  }
];
