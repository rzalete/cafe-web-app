import type { MenuItem } from "@/data/menu-sections";
import { MenuItemRow } from "@/components/menu/menu-item-row";

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
          <MenuItemRow key={item.id} item={item} />
        ))}
      </div>
    </article>
  );
}
