import { navigationSections, type HomeSectionHref } from "@/data/sections";

export type NavigationItem = {
  label: string;
  href: HomeSectionHref;
  showOnDesktop: boolean;
  showOnMobile: boolean;
};

export const mainNavigationItems = navigationSections.map(({ href, label, showOnDesktop, showOnMobile }) => ({
  href,
  label,
  showOnDesktop,
  showOnMobile
})) satisfies NavigationItem[];

export const desktopNavigationItems = mainNavigationItems.filter((item) => item.showOnDesktop);
export const mobileNavigationItems = mainNavigationItems.filter((item) => item.showOnMobile);
