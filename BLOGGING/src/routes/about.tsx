import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SafeSphere — Read. Learn. Stay Safe." },
      {
        name: "description",
        content:
          "Why SafeSphere was created, its mission and vision, why safety awareness matters, and the technologies behind the platform.",
      },
      { property: "og:title", content: "About SafeSphere" },
      {
        property: "og:description",
        content: "Our mission, vision, and the technology behind this safety awareness platform.",
      },
    ],
  }),
  component: AboutPage,
});

const faqs = [
  {
    q: "Is SafeSphere a substitute for emergency services?",
    a: "No. It is an awareness and education platform. In any real emergency, contact your local emergency services immediately.",
  },
  {
    q: "How accurate is the Safety Risk Analyzer?",
    a: "It is an educational demo. It weighs keywords in the text you type and sorts the description into Low, Moderate or High risk. It does not observe your surroundings and cannot predict real-world danger.",
  },
  {
    q: "Where is my data stored?",
    a: "Saved articles, likes, comments, checklists, contacts and your theme choice are kept in your own browser's local storage. Nothing is uploaded to a server.",
  },
  {
    q: "Who writes the articles?",
    a: "The articles in this project are written as demonstration content for a safety-awareness platform. Always cross-check specific guidance against your local authorities.",
  },
  {
    q: "Can I use SafeSphere on my phone?",
    a: "Yes. Every page is responsive and works on phones, tablets and desktops, in light or dark mode.",
  },
];

const tech = [
  ["React 19 + TypeScript", "Typed components for every page and tool"],
  ["TanStack Router", "One real page per section, with its own address and preview"],
  ["Tailwind CSS v4", "A single design system of colour and type tokens"],
  ["JavaScript ES6+", "Search, filtering, sorting and quiz scoring logic"],
  ["Local storage", "Bookmarks, likes, comments, checklists and theme"],
  ["Keyword-weighting model", "The demo Safety Risk Analyzer classifier"],
];

function AboutPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">About us</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Safety information should be calm, findable and free.
      </h1>
      <p className="mt-4 text-lg text-muted-foreground text-pretty">
        SafeSphere began with a simple observation: safety advice is everywhere, but it arrives as
        panic. Scattered posts, alarming headlines, and long documents nobody finishes. The useful part
        is usually three sentences long.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <section className="rounded-3xl panel p-6">
          <h2 className="font-display text-xl font-semibold tracking-tight">Our mission</h2>
          <p className="mt-2 text-sm text-muted-foreground text-pretty">
            To turn safety awareness into short, practical reading and tools that a person can act on
            the same day — without fear as the motivator.
          </p>
        </section>
        <section className="rounded-3xl panel p-6">
          <h2 className="font-display text-xl font-semibold tracking-tight">Our vision</h2>
          <p className="mt-2 text-sm text-muted-foreground text-pretty">
            A reader who knows their exits, their numbers, and their next step — in every area of life,
            from a night walk to a flood warning.
          </p>
        </section>
      </div>

      <section className="mt-6 rounded-3xl panel p-6">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Why safety awareness matters
        </h2>
        <p className="mt-2 text-sm text-muted-foreground text-pretty">
          Most harm is not prevented by heroics; it is prevented by ordinary habits practised before
          anything happens. A tested smoke alarm, a known meeting point, a passphrase that is not
          reused, a three-second gap in traffic. Awareness is the cheapest safety equipment available,
          and the only kind you always have with you.
        </p>
      </section>

      <section className="mt-6 rounded-3xl panel p-6">
        <h2 className="font-display text-xl font-semibold tracking-tight">How it is built</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {tech.map(([name, what]) => (
            <li key={name} className="rounded-xl bg-surface-strong px-4 py-3">
              <p className="text-sm font-semibold">{name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground text-pretty">{what}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Frequently asked</h2>
        <div className="mt-4 space-y-2">
          {faqs.map((f, i) => (
            <div key={f.q} className="rounded-2xl panel">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-pretty">{f.q}</span>
                <span className="shrink-0 text-accent">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <p className="px-5 pb-4 text-sm text-muted-foreground text-pretty">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/blogs"
          className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground"
        >
          Start reading
        </Link>
        <Link
          to="/tools"
          className="rounded-full panel px-5 py-3 text-sm font-semibold text-brand-soft"
        >
          Open the toolkit
        </Link>
      </div>
    </div>
  );
}
