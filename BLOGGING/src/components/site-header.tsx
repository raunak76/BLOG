import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTheme } from "@/lib/theme";

const links = [
  { to: "/", label: "Home" },
  { to: "/blogs", label: "Safety Blogs" },
  { to: "/categories", label: "Categories" },
  { to: "/tools", label: "Safety Tools" },
  { to: "/emergency", label: "Emergency Help" },
  { to: "/about", label: "About Us" },
] as const;

export function SiteHeader() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Emergency strip */}
      <div className="bg-brand text-brand-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2 text-xs sm:text-sm">
          <p className="flex items-center gap-2 font-medium">
            <span className="size-2 shrink-0 rounded-full bg-accent" />
            In an emergency, call your local emergency number now.
          </p>
          <Link
            to="/emergency"
            className="shrink-0 rounded-full bg-accent px-3 py-1 font-semibold text-accent-foreground"
          >
            Emergency Help
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-border bg-surface-strong backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-md bg-brand text-brand-foreground">
              <span className="text-sm font-bold">S</span>
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">SafeSphere</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-brand-soft" }}
                className="transition-colors hover:text-brand-soft"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="grid size-9 place-items-center rounded-full panel text-sm"
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label="Toggle navigation menu"
              className="grid size-9 place-items-center rounded-full panel text-sm md:hidden"
            >
              ☰
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-border bg-surface-strong px-5 pb-4 md:hidden">
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border py-3 text-sm font-medium"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
