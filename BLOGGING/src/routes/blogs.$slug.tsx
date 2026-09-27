import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { blogs, formatDate, getBlog, getCategory } from "@/lib/blog-data";
import { useBookmarks } from "@/lib/bookmarks";
import { useLocalStorage } from "@/lib/use-local-storage";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const blog = getBlog(params.slug);
    if (!blog) throw notFound();
    return { blog };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article not found — SafeSphere" }, { name: "robots", content: "noindex" }],
      };
    }
    const { blog } = loaderData;
    return {
      meta: [
        { title: `${blog.title} — SafeSphere` },
        { name: "description", content: blog.excerpt },
        { property: "og:title", content: blog.title },
        { property: "og:description", content: blog.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: ArticlePage,
});

type Comment = { name: string; text: string; at: string };

function ArticlePage() {
  const { blog } = Route.useLoaderData();
  const category = getCategory(blog.category)!;
  const { isSaved, toggle } = useBookmarks();
  const saved = isSaved(blog.slug);

  const { value: likes, setValue: setLikes } = useLocalStorage<Record<string, boolean>>(
    "safesphere-likes",
    {},
  );
  const liked = !!likes[blog.slug];

  const { value: comments, setValue: setComments } = useLocalStorage<Record<string, Comment[]>>(
    "safesphere-comments",
    {},
  );
  const list = comments[blog.slug] ?? [];

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const related = blogs
    .filter((b) => b.category === blog.category && b.slug !== blog.slug)
    .slice(0, 2);

  function submitComment(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError("Please enter your name (at least 2 characters).");
      return;
    }
    if (text.trim().length < 10) {
      setError("Please write at least 10 characters so your comment is useful.");
      return;
    }
    setError(null);
    setComments((prev) => ({
      ...prev,
      [blog.slug]: [
        ...(prev[blog.slug] ?? []),
        { name: name.trim(), text: text.trim(), at: new Date().toISOString() },
      ],
    }));
    setName("");
    setText("");
  }

  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      <Link to="/blogs" className="text-sm font-semibold text-brand-soft">
        ← All safety blogs
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
        <Link
          to="/categories/$category"
          params={{ category: category.slug }}
          className="rounded-full bg-brand-soft/15 px-2.5 py-1 font-semibold text-brand-soft"
        >
          {category.name}
        </Link>
        <span className="text-muted-foreground">By {blog.author}</span>
        <span className="text-muted-foreground">{formatDate(blog.date)}</span>
        <span className="text-muted-foreground">{blog.readMinutes} min read</span>
      </div>

      <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
        {blog.title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground text-pretty">{blog.excerpt}</p>

      <img
        src={blog.image}
        alt=""
        loading="lazy"
        width={1280}
        height={800}
        className="mt-8 aspect-16/10 w-full rounded-2xl object-cover"
      />

      <div className="mt-8 space-y-5 text-base leading-relaxed">
        {blog.body.map((p) => (
          <p key={p.slice(0, 24)} className="text-pretty">
            {p}
          </p>
        ))}
      </div>

      <div className="mt-10 rounded-2xl panel p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">Key takeaways</p>
        <ul className="mt-3 space-y-2">
          {blog.takeaways.map((t, i) => (
            <li key={t} className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-soft/15 text-xs font-bold text-brand-soft">
                {i + 1}
              </span>
              <span className="text-pretty">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setLikes((prev) => ({ ...prev, [blog.slug]: !prev[blog.slug] }))}
          aria-pressed={liked}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            liked ? "bg-accent text-accent-foreground" : "panel text-muted-foreground"
          }`}
        >
          ♥ {blog.likes + (liked ? 1 : 0)} likes
        </button>
        <button
          type="button"
          onClick={() => toggle(blog.slug)}
          aria-pressed={saved}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            saved ? "bg-brand text-brand-foreground" : "panel text-muted-foreground"
          }`}
        >
          {saved ? "★ Saved for later" : "☆ Save for later"}
        </button>
      </div>

      {/* Comments */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          Comments ({list.length})
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Comments are stored in your own browser for this demo project.
        </p>

        <form onSubmit={submitComment} className="mt-5 space-y-3 rounded-2xl panel p-5" noValidate>
          <div>
            <label htmlFor="c-name" className="text-sm font-medium text-muted-foreground">
              Your name
            </label>
            <input
              id="c-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl bg-surface-strong px-4 py-2.5 text-sm ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-brand-soft"
            />
          </div>
          <div>
            <label htmlFor="c-text" className="text-sm font-medium text-muted-foreground">
              Your comment
            </label>
            <textarea
              id="c-text"
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-1 w-full rounded-xl bg-surface-strong px-4 py-2.5 text-sm ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-brand-soft"
            />
          </div>
          {error && <p className="text-xs font-medium text-danger">{error}</p>}
          <button
            type="submit"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground"
          >
            Post comment
          </button>
        </form>

        <ul className="mt-5 space-y-3">
          {list.map((c) => (
            <li key={c.at} className="rounded-2xl panel p-4">
              <p className="text-sm font-semibold">{c.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {new Date(c.at).toLocaleString()}
              </p>
              <p className="mt-2 text-sm text-pretty">{c.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            More in {category.name}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {related.map((b) => (
              <Link
                key={b.slug}
                to="/blogs/$slug"
                params={{ slug: b.slug }}
                className="rounded-2xl panel p-4 transition-transform hover:-translate-y-1"
              >
                <h3 className="font-display text-lg font-semibold tracking-tight text-pretty">
                  {b.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  By {b.author} · {formatDate(b.date)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
