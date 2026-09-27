import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { blogs, categories, type CategorySlug } from "@/lib/blog-data";
import { BlogCard } from "@/components/blog-card";
import { useBookmarks } from "@/lib/bookmarks";

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      { title: "Safety Blogs — SafeSphere" },
      {
        name: "description",
        content:
          "Search, filter and sort every SafeSphere safety article across personal, road, cyber, campus, disaster safety and emergency preparedness.",
      },
      { property: "og:title", content: "Safety Blogs — SafeSphere" },
      {
        property: "og:description",
        content: "Search and filter the full SafeSphere library of safety articles.",
      },
    ],
  }),
  component: BlogsPage,
});

type Sort = "newest" | "oldest" | "popular";

function BlogsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategorySlug | "all">("all");
  const [sort, setSort] = useState<Sort>("newest");
  const [onlySaved, setOnlySaved] = useState(false);
  const { saved } = useBookmarks();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = blogs.filter((b) => {
      const matchesCategory = category === "all" || b.category === category;
      const matchesQuery =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q);
      const matchesSaved = !onlySaved || saved.includes(b.slug);
      return matchesCategory && matchesQuery && matchesSaved;
    });
    list = [...list].sort((a, b) => {
      if (sort === "popular") return b.likes - a.likes;
      if (sort === "oldest") return a.date.localeCompare(b.date);
      return b.date.localeCompare(a.date);
    });
    return list;
  }, [query, category, sort, onlySaved, saved]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">Safety blogs</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Browse the library
      </h1>
      <p className="mt-3 max-w-[56ch] text-base text-muted-foreground text-pretty">
        {blogs.length} articles across six safety areas. Search by title, author or topic, filter by
        category, and save anything you want to come back to.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex flex-1 items-center gap-2 rounded-full panel px-4 py-2">
          <span className="text-sm text-muted-foreground">Search</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='e.g. "fire escape"'
            className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
          />
        </label>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 rounded-full panel px-4 py-2 text-sm">
            <span className="text-muted-foreground">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="bg-transparent text-sm font-semibold focus:outline-none"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="popular">Most popular</option>
            </select>
          </label>
          <button
            type="button"
            onClick={() => setOnlySaved((v) => !v)}
            aria-pressed={onlySaved}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              onlySaved ? "bg-accent text-accent-foreground" : "panel text-muted-foreground"
            }`}
          >
            ★ Saved ({saved.length})
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            category === "all" ? "bg-brand text-brand-foreground" : "panel text-muted-foreground"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setCategory(c.slug)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              category === c.slug ? "bg-brand text-brand-foreground" : "panel text-muted-foreground"
            }`}
          >
            {c.short}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Showing {results.length} of {blogs.length} articles
      </p>

      {results.length === 0 ? (
        <div className="mt-6 rounded-2xl panel p-8 text-center">
          <p className="font-display text-xl font-semibold">No articles match that yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a shorter search word, or clear the category filter.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((b) => (
            <BlogCard key={b.slug} blog={b} />
          ))}
        </div>
      )}
    </div>
  );
}
