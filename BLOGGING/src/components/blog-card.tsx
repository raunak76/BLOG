import { Link } from "@tanstack/react-router";
import { formatDate, getCategory, type Blog } from "@/lib/blog-data";
import { useBookmarks } from "@/lib/bookmarks";

export function BlogCard({ blog }: { blog: Blog }) {
  const category = getCategory(blog.category);
  const { isSaved, toggle } = useBookmarks();
  const saved = isSaved(blog.slug);

  return (
    <article className="flex flex-col rounded-2xl panel p-4 transition-transform hover:-translate-y-1">
      <img
        src={blog.image}
        alt=""
        loading="lazy"
        width={1024}
        height={640}
        className="aspect-16/10 w-full rounded-xl object-cover"
      />
      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-brand-soft/15 px-2 py-0.5 font-semibold text-brand-soft">
            {category?.short}
          </span>
          <span className="text-muted-foreground">By {blog.author}</span>
        </div>
        <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-pretty">
          {blog.title}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {formatDate(blog.date)} · {blog.readMinutes} min read · {blog.likes} likes
        </p>
        <p className="mt-2 flex-1 text-sm text-muted-foreground text-pretty">{blog.excerpt}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <Link
            to="/blogs/$slug"
            params={{ slug: blog.slug }}
            className="rounded-full bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground"
          >
            Read More
          </Link>
          <button
            type="button"
            onClick={() => toggle(blog.slug)}
            aria-pressed={saved}
            className="text-xs font-semibold text-muted-foreground transition-colors hover:text-accent"
          >
            {saved ? "★ Saved" : "☆ Save"}
          </button>
        </div>
      </div>
    </article>
  );
}
