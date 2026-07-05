import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroPortal } from "@/components/hero/HeroPortal";
import { SmoothScrollProvider } from "@/components/scroll/SmoothScrollProvider";
import { BrandSlideStack } from "@/components/sections/BrandSlideStack";
import { HakjisaBusinessReplicaSection } from "@/components/sections/HakjisaBusinessReplicaSection";
import { brands } from "@/data/brands";

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <Header />
      <main id="top">
        <HeroPortal brands={brands} />
        <BrandSlideStack brands={brands} />
        <HakjisaBusinessReplicaSection />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
