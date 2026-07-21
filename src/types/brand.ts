export type BrandId = "roti-camp" | "roti-homesys" | "leel";

export type BrandAssetStatus = "pending" | "ready";

export type BrandHeroAsset = {
  src: string;
  mobileSrc?: string;
  alt: string;
  status: BrandAssetStatus;
  focalPoint: string;
  mobileFocalPoint?: string;
};

export type BrandSectionAsset = {
  src: string;
  mobileSrc?: string;
  alt: string;
  focalPoint: string;
  mobileFocalPoint?: string;
  visualFilter?: string;
};

export type BrandTransitionAsset = {
  overlayShade?: string;
  accessibilityLabel: string;
};

export type BrandScene = {
  title: string;
  copy: string;
  direction: string;
  align: "left" | "right" | "center";
};

export type BrandAbout = {
  title: string;
  accent: string;
  description: string;
  image: string;
};

export type Brand = {
  id: BrandId;
  name: string;
  shortName: string;
  logoSrc: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  headline: string;
  description: string;
  mood: string[];
  keywords: string[];
  heroAsset: BrandHeroAsset;
  sectionAsset: BrandSectionAsset;
  transition: BrandTransitionAsset;
  visualTagline: string;
  visualMaterial: string;
  visualScene: string;
  scene: BrandScene;
  about: BrandAbout;
  brandUrl: string;
  brandCtaLabel?: string;
  brandUrlAriaLabel?: string;
};
