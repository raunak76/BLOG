import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!value) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value)) {
      setError("That doesn't look like a valid email address.");
      return;
    }
    setError(null);
    setDone(true);
    setEmail("");
  }

  return (
    <div className="rounded-3xl panel-strong p-8 sm:p-10">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">Newsletter</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            One calm safety note, weekly.
          </h2>
          <p className="mt-3 max-w-[44ch] text-sm text-muted-foreground text-pretty">
            No noise, no fear. Just one practical tip and one article worth your time.
          </p>
        </div>
        <form className="flex flex-col gap-3" onSubmit={submit} noValidate>
          <label htmlFor="newsletter-email" className="text-sm font-medium text-muted-foreground">
            Email address
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-invalid={!!error}
              className="w-full rounded-full bg-surface-strong px-4 py-3 text-sm ring-1 ring-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-soft"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground"
            >
              Subscribe
            </button>
          </div>
          {error && <p className="text-xs font-medium text-danger">{error}</p>}
          {done && !error && (
            <p className="text-xs font-medium text-success">
              You're on the list. Look out for Friday's note.
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Unsubscribe anytime. We never share your address.
          </p>
        </form>
      </div>
    </div>
  );
}
