import type { MenuItem } from "@/data/menu-sections";

type MenuItemRowProps = {
  item: MenuItem;
};

export function MenuItemRow({ item }: MenuItemRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-stone-800 pt-4 first:border-t-0 first:pt-0">
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
  );
}
