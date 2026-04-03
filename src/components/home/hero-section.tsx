import Link from "next/link";

export function HeroSection() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 rounded-3xl bg-stone-900 px-8 py-12 shadow-2xl md:px-12 md:py-16">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
          Cafe Web App Template
        </p>

        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Build a modern digital home for a cafe brand.
        </h1>

        <p className="max-w-2xl text-base leading-7 text-stone-300 sm:text-lg">
          This starter project is designed for menus, reservations, promotions,
          and customer engagement with a clean Next.js foundation.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="#overview"
          className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-400"
        >
          Explore the concept
        </Link>

        <Link
          href="#features"
          className="inline-flex items-center justify-center rounded-full border border-stone-700 px-6 py-3 text-sm font-semibold text-stone-100 transition hover:border-stone-500 hover:bg-stone-800"
        >
          View planned features
        </Link>
      </div>
    </section>
  );
}
