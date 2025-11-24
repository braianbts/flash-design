import HeroFlash from "@/components/hero-flash";
import CrossTapes from "@/components/cross-tapes";
import NewArrivalsSection from "@/components/new-arrivals";
import CategoriesSection from "@/components/categories";
import FeaturedProduct from "@/components/featuredproduct";
import HighlightsSection from "@/components/highlights-section";
import AboutSection from "@/components/about-section";
import Footer from "@/components/footer";
import OpeningFlashSection from "@/components/OpeningFlashSection";

export default function HomePage() {
  return (
    <main className="mx-auto">
      <HeroFlash />

      <CrossTapes
        text="FLASH DESIGN"
        color="#2563EB"
        angle={3}
        height={85}
        offset={-80}
        gap={5}
      />

      {/* 👇 saco el space-y-4 para que no genere huecos raros */}
      <section id="destacados">
        <NewArrivalsSection />
        <CategoriesSection />
        <FeaturedProduct />

        {/* divisor */}
        <div className="relative mt-40">
          <CrossTapes
            text="FLASH DESIGN"
            color="#2563EB"
            angle={3}
            height={85}
            offset={80}
            gap={8}
          />
        </div>

        <HighlightsSection />

        {/* divisor */}
        <div className="relative mt-40">
          <CrossTapes
            text="FLASH DESIGN"
            color="#2563EB"
            angle={3}
            height={85}
            offset={-10}
            gap={8}
          />
        </div>

        {/* 🔥 Opening antes del footer, sin margen extra */}
        <OpeningFlashSection />

        <Footer />
      </section>
    </main>
  );
}