import { HeroSection } from "@/components/home/hero-section";
import { InfoCard } from "@/components/home/info-card";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-950 px-6 py-16 text-stone-100">
      <HeroSection />

      <section className="mx-auto mt-10 grid w-full max-w-5xl gap-6 md:grid-cols-2">
        <InfoCard
          id="overview"
          tone="light"
          title="Portfolio-ready foundation"
          description="Start with a professional structure that can grow into a full cafe platform."
        />

        <InfoCard
          id="features"
          title="Planned features"
          description="Menu browsing, reservation flows, featured products, and admin-ready content patterns."
        />
      </section>
    </main>
  );
}
