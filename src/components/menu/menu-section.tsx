import type { MenuItem } from "@/data/menu-sections";

type MenuSectionProps = {
  name: string;
  description: string;
  items: MenuItem[];
};

export function MenuSection({
  name,
  description,
  items,
}: MenuSectionProps) {
  return (
    <article className="rounded-3xl border border-stone-800 bg-stone-900 p-6">
      <div>
        <h2 className="text-2xl font-semibold">{name}</h2>
        <p className="mt-3 leading-7 text-stone-300">{description}</p>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-4 border-t border-stone-800 pt-4 first:border-t-0 first:pt-0"
          >
            <div className="flex-1">
              <h3 className="font-medium text-stone-100">{item.name}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-400">
                {item.description}
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-stone-800 px-3 py-1 text-sm font-semibold text-amber-400">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
