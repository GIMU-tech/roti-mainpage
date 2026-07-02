import { Header } from "@/components/layout/Header";
import { HeroPortalLab } from "@/components/hero/lab/HeroPortalLab";
import { BrandSceneSection } from "@/components/sections/BrandSceneSection";
import { RotiGroupSection } from "@/components/sections/RotiGroupSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { brands } from "@/data/brands";

export default function HeroCardLabPage() {
  return (
    <>
      <Header />
      <main>
        <HeroPortalLab brands={brands} />
        {brands.map((brand, index) => (
          <BrandSceneSection key={brand.id} brand={brand} index={index} />
        ))}
        <RotiGroupSection brands={brands} />
        <FinalCTA brands={brands} />
      </main>
    </>
  );
}
