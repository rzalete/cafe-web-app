import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/reservation", label: "Reservations" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-stone-800 bg-stone-950">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400"
        >
          Cafe Web App
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-6 text-sm text-stone-300">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition hover:text-stone-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
