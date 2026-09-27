import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { blogs, getCategory } from "@/lib/blog-data";
import { BlogCard } from "@/components/blog-card";

export const Route = createFileRoute("/categories/$category")({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Category not found — SafeSphere" }, { name: "robots", content: "noindex" }],
      };
    }
    const { category } = loaderData;
    return {
      meta: [
        { title: `${category.name} — SafeSphere` },
        { name: "description", content: `${category.name}: ${category.blurb} Articles and practical guidance from SafeSphere.` },
        { property: "og:title", content: `${category.name} — SafeSphere` },
        { property: "og:description", content: `${category.name}: ${category.blurb}` },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const list = blogs
    .filter((b) => b.category === category.slug)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <Link to="/categories" className="text-sm font-semibold text-brand-soft">
        ← All categories
      </Link>
      <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        {category.name}
      </h1>
      <p className="mt-3 max-w-[56ch] text-base text-muted-foreground text-pretty">
        {category.blurb} {list.length} articles in this area.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((b) => (
          <BlogCard key={b.slug} blog={b} />
        ))}
      </div>
    </div>
  );
}
