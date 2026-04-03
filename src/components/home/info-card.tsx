type InfoCardProps = {
    title: string;
    description: string;
    id?: string;
    tone?: "light" | "dark";
  };
  
  export function InfoCard({
    title,
    description,
    id,
    tone = "dark",
  }: InfoCardProps) {
    const cardClassName =
      tone === "light"
        ? "rounded-3xl bg-stone-100 p-6 text-stone-900"
        : "rounded-3xl border border-stone-800 bg-stone-900 p-6 text-stone-100";
  
    const descriptionClassName =
      tone === "light"
        ? "mt-3 leading-7 text-stone-700"
        : "mt-3 leading-7 text-stone-300";
  
    return (
      <article id={id} className={cardClassName}>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className={descriptionClassName}>{description}</p>
      </article>
    );
  }
  