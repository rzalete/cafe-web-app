import { MenuSection } from "@/components/menu/menu-section";
import { menuSections } from "@/data/menu-sections";

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-stone-950 px-6 py-16 text-stone-100">
      <section className="mx-auto w-full max-w-5xl rounded-3xl bg-stone-900 px-8 py-12 shadow-2xl md:px-12 md:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
          Our Menu
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Crafted drinks and dishes for a modern cafe experience.
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-stone-300 sm:text-lg">
          This page now models realistic menu sections and sample items, giving
          us a stronger foundation for future database-driven features.
        </p>
      </section>

      <section className="mx-auto mt-10 grid w-full max-w-5xl gap-6">
        {menuSections.map((section) => (
          <MenuSection
            key={section.id}
            name={section.name}
            description={section.description}
            items={section.items}
          />
        ))}
      </section>
    </main>
  );
}
