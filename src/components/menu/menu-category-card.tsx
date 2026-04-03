type MenuCategoryCardProps = {
    name: string;
    description: string;
  };
  
  export function MenuCategoryCard({
    name,
    description,
  }: MenuCategoryCardProps) {
    return (
      <article className="rounded-3xl border border-stone-800 bg-stone-900 p-6">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="mt-3 leading-7 text-stone-300">{description}</p>
      </article>
    );
  }
  