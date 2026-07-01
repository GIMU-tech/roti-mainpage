export type BrandId = "roti-camp" | "roti-homesys" | "leel";

export type BrandAssetStatus = "pending" | "ready";

export type BrandHeroAsset = {
  src: string;
  alt: string;
  status: BrandAssetStatus;
  focalPoint: string;
};

export type BrandScene = {
  title: string;
  copy: string;
  direction: string;
  align: "left" | "right" | "center";
};

export type Brand = {
  id: BrandId;
  name: string;
  shortName: string;
  headline: string;
  description: string;
  mood: string[];
  keywords: string[];
  heroImage: string;
  sectionImage: string;
  heroAsset: BrandHeroAsset;
  visualTagline: string;
  visualMaterial: string;
  visualScene: string;
  scene: BrandScene;
  brandUrl: string;
  shopUrl?: string;
};
