export const HOME_SECTION_IDS = {
  top: "top",
  brand: "brand",
  about: "about",
  standard: "standard",
  group: "group",
  footer: "roti-footer"
} as const;

export const HOME_SECTION_HREFS = {
  top: "#top",
  brand: "#brand",
  about: "#about",
  standard: "#standard",
  group: "#group",
  footer: "#roti-footer"
} as const;

export type HomeSectionKey = keyof typeof HOME_SECTION_IDS;
export type HomeSectionHref = (typeof HOME_SECTION_HREFS)[keyof typeof HOME_SECTION_HREFS];

export type HomeSectionConfig = {
  key: HomeSectionKey;
  label: string;
  id: (typeof HOME_SECTION_IDS)[HomeSectionKey];
  href: HomeSectionHref;
  snapSelector: string;
  showInNavigation: boolean;
  showOnDesktop: boolean;
  showOnMobile: boolean;
};

export const homeSections = [
  {
    key: "top",
    label: "TOP",
    id: HOME_SECTION_IDS.top,
    href: HOME_SECTION_HREFS.top,
    snapSelector: ".hero-portal",
    showInNavigation: false,
    showOnDesktop: false,
    showOnMobile: false
  },
  {
    key: "brand",
    label: "BRAND",
    id: HOME_SECTION_IDS.brand,
    href: HOME_SECTION_HREFS.brand,
    snapSelector: ".brand-slide-stack__anchor",
    showInNavigation: true,
    showOnDesktop: true,
    showOnMobile: true
  },
  {
    key: "about",
    label: "ABOUT",
    id: HOME_SECTION_IDS.about,
    href: HOME_SECTION_HREFS.about,
    snapSelector: HOME_SECTION_HREFS.about,
    showInNavigation: true,
    showOnDesktop: true,
    showOnMobile: true
  },
  {
    key: "standard",
    label: "STANDARD",
    id: HOME_SECTION_IDS.standard,
    href: HOME_SECTION_HREFS.standard,
    snapSelector: HOME_SECTION_HREFS.standard,
    showInNavigation: true,
    showOnDesktop: true,
    showOnMobile: true
  },
  {
    key: "group",
    label: "CONNECT",
    id: HOME_SECTION_IDS.group,
    href: HOME_SECTION_HREFS.group,
    snapSelector: HOME_SECTION_HREFS.group,
    showInNavigation: false,
    showOnDesktop: false,
    showOnMobile: false
  },
  {
    key: "footer",
    label: "CONTACT",
    id: HOME_SECTION_IDS.footer,
    href: HOME_SECTION_HREFS.footer,
    snapSelector: HOME_SECTION_HREFS.footer,
    showInNavigation: true,
    showOnDesktop: true,
    showOnMobile: true
  }
] as const satisfies readonly HomeSectionConfig[];

export const navigationSections = homeSections.filter((section) => section.showInNavigation);
export const sectionSnapSelector = homeSections.map((section) => section.snapSelector).join(", ");
