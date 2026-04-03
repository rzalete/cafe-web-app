const categories = [
    {
      name: "Signature Coffee",
      description: "House espresso, manual brew options, and seasonal beans.",
    },
    {
      name: "Fresh Pastries",
      description: "Daily baked croissants, danishes, and sweet cafe favorites.",
    },
    {
      name: "Brunch Plates",
      description: "Simple savory dishes designed for a relaxed cafe experience.",
    },
  ];
  
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
            This page is the starting point for the cafe menu experience. Later,
            we can evolve it into database-driven categories, featured items, and
            pricing.
          </p>
        </section>
  
        <section className="mx-auto mt-10 grid w-full max-w-5xl gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <article
              key={category.name}
              className="rounded-3xl border border-stone-800 bg-stone-900 p-6"
            >
              <h2 className="text-xl font-semibold">{category.name}</h2>
              <p className="mt-3 leading-7 text-stone-300">
                {category.description}
              </p>
            </article>
          ))}
        </section>
      </main>
    );
  }
  