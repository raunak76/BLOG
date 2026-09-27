import { createFileRoute, Link } from "@tanstack/react-router";
import { blogs, categories } from "@/lib/blog-data";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "Safety Categories — SafeSphere" },
      {
        name: "description",
        content:
          "Six clearly labeled safety areas: personal safety, road safety, cyber safety, emergency preparedness, campus safety and disaster safety.",
      },
      { property: "og:title", content: "Safety Categories — SafeSphere" },
      {
        property: "og:description",
        content: "Browse SafeSphere's six safety areas and the articles in each.",
      },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">Categories</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Six areas, clearly labeled
      </h1>
      <p className="mt-3 max-w-[56ch] text-base text-muted-foreground text-pretty">
        Every article sits in exactly one area, so you always know where to look next.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => {
          const count = blogs.filter((b) => b.category === c.slug).length;
          return (
            <Link
              key={c.slug}
              to="/categories/$category"
              params={{ category: c.slug }}
              className="rounded-2xl panel p-4 transition-transform hover:-translate-y-1"
            >
              <img
                src={c.image}
                alt=""
                loading="lazy"
                width={1024}
                height={640}
                className="aspect-16/10 w-full rounded-xl object-cover"
              />
              <span className="mt-4 block text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-1 font-display text-xl font-semibold tracking-tight">{c.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground text-pretty">{c.blurb}</p>
              <p className="mt-3 text-xs font-semibold text-brand-soft">{count} articles →</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
