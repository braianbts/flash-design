import HeroFlash from "@/components/hero-flash";
import CrossTapes from "@/components/cross-tapes";
import NewArrivalsSection from "@/components/new-arrivals";
import CategoriesSection from "@/components/categories";
import FeaturedProduct from "@/components/featuredproduct";
import HighlightsSection from "@/components/highlights-section";
import AboutSection from "@/components/about-section";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <main className="mx-auto">
      <HeroFlash />
      <CrossTapes
        text="FLASH DESIGN"
        color="#2563EB"
        angle={3}
        height={85}
        offset={-80} // subí/bajá el conjunto respecto del bottom del hero
        gap={5} // distancia entre cintas (dónde se cruzan)
      />

      <section id="destacados" className="space-y-4">
        <NewArrivalsSection />
        <CategoriesSection />
        <FeaturedProduct />
                {/* divisor de página */}
        <div className="relative mt-40">
          <CrossTapes
            text="FLASH DESIGN"
            color="#2563EB"
            angle={3}
            height={85}
            offset={80} // ✅ positivo
            gap={8}
          />
        </div>
        <HighlightsSection />

        {/* divisor de página */}
        <div className="relative mt-40">
          <CrossTapes
            text="FLASH DESIGN"
            color="#2563EB"
            angle={3}
            height={85}
            offset={24} // ✅ positivo
            gap={8}
          />
        </div>
        <AboutSection/>
         <Footer />
      </section>
    </main>
  );
}
