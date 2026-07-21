import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroPortal } from "@/components/hero/HeroPortal";
import { IntroSequence } from "@/components/intro/IntroSequence";
import { CinematicSectionReveal } from "@/components/motion/CinematicSectionReveal";
import { ScrollFillTypography } from "@/components/motion/ScrollFillTypography";
import { SmoothScrollProvider } from "@/components/scroll/SmoothScrollProvider";
import { BrandTransitionProvider } from "@/components/transitions/BrandTransitionProvider";
import { AboutRotiSection } from "@/components/sections/AboutRotiSection";
import { BrandSlideStack } from "@/components/sections/BrandSlideStack";
import { ContactUsSection } from "@/components/sections/ContactUsSection";
import { RotiChannelsSection } from "@/components/sections/RotiChannelsSection";
import { RotiConnectSection } from "@/components/sections/RotiConnectSection";
import { RotiStatsSection } from "@/components/sections/RotiStatsSection";
import { RotiVisionValuesSection } from "@/components/sections/RotiVisionValuesSection";
import { brands } from "@/data/brands";
import { HOME_SECTION_IDS } from "@/data/sections";
import { siteContent } from "@/data/siteContent";

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <BrandTransitionProvider brands={brands}>
        <IntroSequence />
        <Header />
        <main id={HOME_SECTION_IDS.top}>
          <HeroPortal brands={brands} />
          <BrandSlideStack brands={brands} />
          <div className="roti-continuous-flow" data-native-scroll-region>
            <ScrollFillTypography
              headingLevel="h2"
              id={HOME_SECTION_IDS.about}
              lines={siteContent.about.title}
            />
            <CinematicSectionReveal>
              <AboutRotiSection id="about-story" showTitle={false} />
              <RotiVisionValuesSection />
            </CinematicSectionReveal>
            <RotiStatsSection />
            <RotiChannelsSection />
          </div>
          <RotiConnectSection />
          <ContactUsSection />
          <Footer />
        </main>
      </BrandTransitionProvider>
    </SmoothScrollProvider>
  );
}
