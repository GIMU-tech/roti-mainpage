import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroPortal } from "@/components/hero/HeroPortal";
import { IntroSequence } from "@/components/intro/IntroSequence";
import { SmoothScrollProvider } from "@/components/scroll/SmoothScrollProvider";
import { AboutRotiSection } from "@/components/sections/AboutRotiSection";
import { BrandSlideStack } from "@/components/sections/BrandSlideStack";
import { RotiBusinessReplicaSection } from "@/components/sections/RotiBusinessReplicaSection";
import { brands } from "@/data/brands";

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <IntroSequence />
      <Header />
      <main id="top">
        <HeroPortal brands={brands} />
        <BrandSlideStack brands={brands} />
        <AboutRotiSection />
        <RotiBusinessReplicaSection />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
