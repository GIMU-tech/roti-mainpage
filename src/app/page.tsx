import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroPortal } from "@/components/hero/HeroPortal";
import { IntroSequence } from "@/components/intro/IntroSequence";
import { SmoothScrollProvider } from "@/components/scroll/SmoothScrollProvider";
import { BrandTransitionProvider } from "@/components/transitions/BrandTransitionProvider";
import { AboutRotiSection } from "@/components/sections/AboutRotiSection";
import { BrandSlideStack } from "@/components/sections/BrandSlideStack";
import { RotiBusinessReplicaSection } from "@/components/sections/RotiBusinessReplicaSection";
import { RotiConnectSection } from "@/components/sections/RotiConnectSection";
import { brands } from "@/data/brands";
import { HOME_SECTION_IDS } from "@/data/sections";

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <BrandTransitionProvider brands={brands}>
        <IntroSequence />
        <Header />
        <main id={HOME_SECTION_IDS.top}>
          <HeroPortal brands={brands} />
          <BrandSlideStack brands={brands} />
          <AboutRotiSection />
          <RotiBusinessReplicaSection />
          <RotiConnectSection />
          <Footer />
        </main>
      </BrandTransitionProvider>
    </SmoothScrollProvider>
  );
}
