import { Header } from "@/components/layout/Header";
import { HeroPortal } from "@/components/hero/HeroPortal";
import { BrandSceneSection } from "@/components/sections/BrandSceneSection";
import { RotiGroupSection } from "@/components/sections/RotiGroupSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { brands } from "@/data/brands";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroPortal brands={brands} />
        {brands.map((brand, index) => (
          <BrandSceneSection key={brand.id} brand={brand} index={index} />
        ))}
        <RotiGroupSection brands={brands} />
        <FinalCTA brands={brands} />
      </main>
    </>
  );
}
