import { Header } from "@/components/layout/Header";
import { HeroPortal } from "@/components/hero/HeroPortal";
import { BrandFullscreenSection } from "@/components/sections/BrandFullscreenSection";
import { RotiGroupSection } from "@/components/sections/RotiGroupSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { brands } from "@/data/brands";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroPortal brands={brands} />
        {brands.map((brand) => (
          <BrandFullscreenSection key={brand.id} brand={brand} />
        ))}
        <RotiGroupSection brands={brands} />
        <FinalCTA brands={brands} />
      </main>
    </>
  );
}
