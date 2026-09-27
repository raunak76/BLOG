import { createFileRoute, Link } from "@tanstack/react-router";
import heroKit from "@/assets/hero-kit.jpg";
import { blogs, categories, formatDate, getBlog, getCategory, quickTips } from "@/lib/blog-data";
import { Newsletter } from "@/components/newsletter";
import { BlogCard } from "@/components/blog-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SafeSphere — Your Safety. Your Awareness. Your Power." },
      {
        name: "description",
        content:
          "A calm, well-organized library of safety reading and practical tools: personal, road, cyber, campus, disaster safety and emergency preparedness.",
      },
      { property: "og:title", content: "SafeSphere — Your Safety. Your Awareness. Your Power." },
      {
        property: "og:description",
        content:
          "Safety blogs, an interactive safety toolkit, and emergency information — labeled and within one reach.",
      },
    ],
  }),
  component: Index,
});

const stats = [
  { value: "12,400", label: "Readers guided this month", accent: false },
  { value: "340", label: "Verified safety articles", accent: false },
  { value: "6", label: "Named safety categories", accent: true },
  { value: "98%", label: "Report content as clear", accent: false },
];

function Index() {
  const lead = getBlog("home-emergency-plan")!;
  const secondary = [getBlog("password-hygiene-for-students")!, getBlog("walking-alone-at-night")!];
  const latest = [
    getBlog("essential-road-safety-rules")!,
    getBlog("go-bag-essentials")!,
    getBlog("phishing-tells")!,
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-soft/20 blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-7">
            <p className="rise d1 mb-4 inline-flex items-center gap-2 rounded-full panel px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand-soft">
              <span className="size-1.5 rounded-full bg-accent" /> Safety awareness, made findable
            </p>
            <h1 className="rise d2 font-display text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl md:max-w-[20ch] md:text-6xl">
              Your Safety. Your Awareness. Your Power.
            </h1>
            <p className="rise d3 mt-5 max-w-[52ch] text-base text-muted-foreground text-pretty sm:text-lg">
              A calm, well-organized library of safety reading and practical tools — everything you
              need, labeled and within one reach.
            </p>
            <div className="rise d4 mt-7 flex flex-wrap gap-3">
              <Link
                to="/blogs"
                className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground"
              >
                Explore Safety Blogs
              </Link>
              <Link
                to="/tools"
                className="rounded-full panel px-5 py-3 text-sm font-semibold text-brand-soft"
              >
                Safety Tools
              </Link>
            </div>
          </div>
          <div className="rise d3 md:col-span-5">
            <div className="rounded-3xl panel-strong p-5">
              <img
                src={heroKit}
                alt="A labeled emergency kit with first aid, a torch, water and a printed checklist"
                width={1024}
                height={768}
                className="aspect-4/3 w-full rounded-xl object-cover"
              />
              <div className="mt-4 flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                  !
                </span>
                <p className="text-sm text-muted-foreground text-pretty">
                  Preparedness starts with a 5-minute read. Pick a category and begin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`rise d${i + 1} rounded-2xl panel p-5`}>
                <p
                  className={`font-display text-4xl font-semibold ${s.accent ? "text-accent" : "text-brand-soft"}`}
                >
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground text-pretty">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">Featured</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                The latest in safety reading
              </h2>
            </div>
            <Link to="/blogs" className="hidden shrink-0 text-sm font-semibold text-brand-soft sm:block">
              View all blogs
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            <article className="rise d1 lg:col-span-7">
              <Link to="/blogs/$slug" params={{ slug: lead.slug }}>
                <img
                  src={lead.image}
                  alt=""
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="aspect-16/10 w-full rounded-xl object-cover"
                />
              </Link>
              <div className="mt-5">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="rounded-full bg-brand-soft/15 px-2.5 py-1 font-semibold text-brand-soft">
                    {getCategory(lead.category)?.name}
                  </span>
                  <span className="text-muted-foreground">By {lead.author}</span>
                  <span className="text-muted-foreground">{formatDate(lead.date)}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                  <Link to="/blogs/$slug" params={{ slug: lead.slug }}>
                    {lead.title}
                  </Link>
                </h3>
                <p className="mt-3 max-w-[56ch] text-base text-muted-foreground text-pretty">
                  {lead.excerpt}
                </p>
              </div>
            </article>

            <div className="flex flex-col gap-6 lg:col-span-5">
              {secondary.map((b, i) => (
                <article
                  key={b.slug}
                  className={`rise d${i + 2} rounded-2xl panel p-4 transition-transform hover:-translate-y-1`}
                >
                  <Link to="/blogs/$slug" params={{ slug: b.slug }} className="flex gap-4">
                    <img
                      src={b.image}
                      alt=""
                      loading="lazy"
                      width={512}
                      height={512}
                      className="size-24 shrink-0 rounded-xl object-cover"
                    />
                    <div>
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                        {getCategory(b.category)?.short}
                      </span>
                      <h4 className="mt-2 font-display text-lg font-semibold tracking-tight text-pretty">
                        {b.title}
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground">
                        By {b.author} · {formatDate(b.date)}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">Categories</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Six areas, clearly labeled
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {categories.map((c, i) => (
              <Link
                key={c.slug}
                to="/categories/$category"
                params={{ category: c.slug }}
                className={`rise d${(i % 3) + 1} rounded-2xl panel p-5 transition-transform hover:-translate-y-1`}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{c.short}</h3>
                <p className="mt-1 text-sm text-muted-foreground text-pretty">{c.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick tips + toolkit */}
      <section>
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">Quick tips</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Small habits, real protection
            </h2>
            <div className="mt-6 space-y-3">
              {quickTips.slice(0, 3).map((tip, i) => (
                <div key={tip} className={`rise d${i + 1} flex items-start gap-3 rounded-2xl panel p-4`}>
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-soft/15 text-xs font-bold text-brand-soft">
                    {i + 1}
                  </span>
                  <p className="text-sm text-muted-foreground text-pretty">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
              Safety toolkit
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Tools that do the work
            </h2>
            <div className="mt-6 space-y-3">
              {[
                {
                  title: "Safety Risk Analyzer",
                  tag: "Interactive",
                  accent: true,
                  copy: "Type a situation and get a Low / Moderate / High classification.",
                },
                {
                  title: "Password Strength Checker",
                  tag: "Tool",
                  accent: false,
                  copy: "Test a password and see a plain-language score.",
                },
                {
                  title: "Preparedness Checklist",
                  tag: "Checklist",
                  accent: false,
                  copy: "A labeled kit checklist you can tick off and come back to.",
                },
              ].map((t, i) => (
                <Link
                  key={t.title}
                  to="/tools"
                  className={`rise d${i + 1} block rounded-2xl panel p-4 transition-transform hover:-translate-y-1`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold tracking-tight">{t.title}</h3>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${t.accent ? "bg-accent/15 text-accent" : "bg-brand-soft/15 text-brand-soft"}`}
                    >
                      {t.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground text-pretty">{t.copy}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest blogs */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                Safety blogs
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Browse the library
              </h2>
            </div>
            <Link
              to="/blogs"
              className="shrink-0 self-start rounded-full panel px-4 py-2 text-sm font-semibold text-brand-soft"
            >
              Search all {blogs.length} articles
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((b) => (
              <BlogCard key={b.slug} blog={b} />
            ))}
          </div>
        </div>
      </section>

      {/* Emergency strip */}
      <section className="bg-brand">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-brand-foreground text-balance sm:text-3xl">
              When it matters, every second counts.
            </h2>
            <p className="mt-2 max-w-[48ch] text-sm text-brand-foreground/70 text-pretty">
              Keep your contacts and numbers ready. This is a learning platform, not a substitute for
              emergency services.
            </p>
          </div>
          <Link
            to="/emergency"
            className="shrink-0 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground"
          >
            Open Emergency Help
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-14">
          <Newsletter />
        </div>
      </section>
    </>
  );
}
