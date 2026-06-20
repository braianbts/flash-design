import type { Metadata } from "next";
import HeroFlash from "@/components/hero-flash";

export const metadata: Metadata = {
  alternates: { canonical: "https://flashdesign.com.ar" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Flash Design",
  description:
    "Customización de sneakers a mano, blackout de botines, canvas de lujo y trabajos únicos hechos a medida en Argentina.",
  url: "https://flashdesign.com.ar",
  logo: "https://flashdesign.com.ar/flashlogo.png",
  image: "https://flashdesign.com.ar/IMG1.jpg",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressCountry: "AR",
    addressRegion: "Buenos Aires",
  },
  sameAs: [
    "https://www.instagram.com/flashxdesign",
    "https://kick.com/flashxdesign",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios Flash Design",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Sneaker" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Blackout Botines" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Canvas de Lujo" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Just Married" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cambio de Materiales" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Curso Sneaker Custom" } },
    ],
  },
};
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent />
    </>
  );
}

function HomeContent() {
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
