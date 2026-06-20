import HeroFlash from "@/components/hero-flash";
import CrossTapes from "@/components/cross-tapes";
import NewArrivalsSection from "@/components/new-arrivals";
import CategoriesSection from "@/components/categories";
import FeaturedProduct from "@/components/featuredproduct";
import HighlightsSection from "@/components/highlights-section";
import Footer from "@/components/footer";
import OpeningFlashSection from "@/components/OpeningFlashSection";
import KickSection from "@/components/kick-section";
import ScrollReveal from "@/components/scroll-reveal";

export default function HomePage() {
  return (
    <main className="mx-auto">
      <HeroFlash />

      <div style={{ marginTop: "-60px", position: "relative", zIndex: 40 }}>
        <CrossTapes
          text="FLASH DESIGN"
          color="#2563EB"
          angle={3}
          height={85}
          offset={0}
          mobileOffset={0}
          gap={5}
        />
      </div>

      <section id="destacados">
        <ScrollReveal>
          <NewArrivalsSection />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <CategoriesSection />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <FeaturedProduct />
        </ScrollReveal>

        <CrossTapes
          text="FLASH DESIGN"
          color="#2563EB"
          angle={3}
          height={85}
          offset={80}
          gap={8}
        />

        <ScrollReveal delay={100}>
          <HighlightsSection />
        </ScrollReveal>

        <CrossTapes
          text="FLASH DESIGN"
          color="#2563EB"
          angle={3}
          height={85}
          offset={-10}
          gap={8}
        />

        <ScrollReveal delay={100}>
          <KickSection />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <OpeningFlashSection />
        </ScrollReveal>

        <Footer />
      </section>
    </main>
  );
}
