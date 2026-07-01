export type BrandId = "roti-camp" | "roti-homesys" | "leel";

export type Brand = {
  id: BrandId;
  name: string;
  shortName: string;
  headline: string;
  description: string;
  mood: string[];
  heroImage: string;
  sectionImage: string;
  brandUrl: string;
  shopUrl?: string;
};
