import { Link } from "@tanstack/react-router";
import { categories } from "@/lib/blog-data";

export function SiteFooter() {
  return (
    <footer className="bg-brand text-brand-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-md bg-brand-foreground/10">
              <span className="text-sm font-bold">S</span>
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">SafeSphere</span>
          </div>
          <p className="mt-3 max-w-[30ch] text-sm text-brand-foreground/70">
            Read. Learn. Stay Safe. — a student safety-awareness project.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">Quick links</p>
          <ul className="mt-3 space-y-2 text-sm text-brand-foreground/75">
            <li>
              <Link to="/blogs">Safety Blogs</Link>
            </li>
            <li>
              <Link to="/tools">Safety Tools</Link>
            </li>
            <li>
              <Link to="/emergency">Emergency Help</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">Categories</p>
          <ul className="mt-3 space-y-2 text-sm text-brand-foreground/75">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to="/categories/$category" params={{ category: c.slug }}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-brand-foreground/75">
            <li>hello@safesphere.example</li>
            <li>Privacy: we store your preferences in your own browser only.</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-foreground/10">
        <div className="mx-auto max-w-6xl px-5 py-5 text-xs text-brand-foreground/60">
          © {new Date().getFullYear()} SafeSphere. Educational content only — always contact your
          local emergency services in a real emergency.
        </div>
      </div>
    </footer>
  );
}
