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
import MomentosSection from "@/components/momentos-section";
import Footer from "@/components/footer";
import OpeningFlashSection from "@/components/OpeningFlashSection";
import KickSection from "@/components/kick-section";
import ScrollReveal from "@/components/scroll-reveal";

function WAButton() {
  return (
    <a
      href="https://wa.me/5491151370031?text=%C2%A1Hola!%20Vi%20tu%20web%20y%20quiero%20consultar%20sobre%20un%20custom%20%F0%9F%91%9F"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[500] group flex items-center gap-3"
      aria-label="Contactar por WhatsApp"
    >
      {/* globo de diálogo */}
      <span
        className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none
          bg-white text-black text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap"
      >
        ¡Hablemos!
      </span>

      {/* botón verde WA */}
      <span
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(37,211,102,0.45)] transition-transform duration-300 group-hover:scale-110"
        style={{ background: "#25D366" }}
      >
        <svg viewBox="0 0 32 32" width="28" height="28" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.514L4 29l7.697-1.813A11.94 11.94 0 0016 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 21.818a9.822 9.822 0 01-5.01-1.374l-.36-.213-3.73.878.894-3.633-.234-.373A9.817 9.817 0 016.182 15c0-5.42 4.398-9.818 9.818-9.818S25.818 9.58 25.818 15 21.42 24.818 16 24.818zm5.39-7.347c-.295-.148-1.747-.862-2.018-.96-.27-.098-.467-.147-.663.148-.197.295-.762.96-.934 1.157-.172.196-.344.22-.639.073-.295-.148-1.245-.459-2.373-1.463-.877-.781-1.469-1.747-1.641-2.042-.172-.295-.018-.454.13-.601.132-.132.295-.344.442-.516.148-.172.197-.295.296-.492.098-.197.049-.369-.025-.516-.074-.148-.663-1.6-.908-2.19-.24-.576-.483-.498-.663-.507l-.565-.01c-.197 0-.516.074-.786.369s-1.033 1.01-1.033 2.462 1.058 2.855 1.206 3.052c.147.197 2.082 3.18 5.044 4.459.705.304 1.255.486 1.684.623.708.225 1.352.193 1.861.117.568-.085 1.747-.714 1.994-1.404.246-.689.246-1.28.172-1.404-.073-.123-.27-.197-.565-.344z"/>
        </svg>
      </span>
    </a>
  );
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent />
      <WAButton />
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

        <MomentosSection />

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
