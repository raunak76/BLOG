import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLocalStorage } from "@/lib/use-local-storage";

function ToolCard({
  title,
  tag,
  accent = false,
  children,
}: {
  title: string;
  tag: string;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl panel p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-semibold tracking-tight">{title}</h2>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
            accent ? "bg-accent/15 text-accent" : "bg-brand-soft/15 text-brand-soft"
          }`}
        >
          {tag}
        </span>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

/* ---------------------------------------------------------------- Checklist */

export function Checklist({
  id,
  title,
  tag,
  items,
}: {
  id: string;
  title: string;
  tag: string;
  items: string[];
}) {
  const { value, setValue, reset } = useLocalStorage<Record<string, boolean>>(
    `safesphere-checklist-${id}`,
    {},
  );
  const done = items.filter((i) => value[i]).length;

  return (
    <ToolCard title={title} tag={tag}>
      <p className="text-sm text-muted-foreground">
        {done} of {items.length} complete — your ticks stay in this browser.
      </p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-brand-soft transition-[width]"
          style={{ width: `${(done / items.length) * 100}%` }}
        />
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item}>
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={!!value[item]}
                onChange={() => setValue((prev) => ({ ...prev, [item]: !prev[item] }))}
                className="mt-0.5 size-4 accent-[var(--brand-soft)]"
              />
              <span className={value[item] ? "text-muted-foreground line-through" : "text-pretty"}>
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={reset}
        className="mt-4 text-xs font-semibold text-muted-foreground hover:text-accent"
      >
        Reset checklist
      </button>
    </ToolCard>
  );
}

/* --------------------------------------------------- Emergency contact card */

type Contact = { name: string; relation: string; phone: string };

export function EmergencyContacts() {
  const { value: contacts, setValue } = useLocalStorage<Contact[]>("safesphere-contacts", []);
  const [draft, setDraft] = useState<Contact>({ name: "", relation: "", phone: "" });
  const [error, setError] = useState<string | null>(null);

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (draft.name.trim().length < 2) {
      setError("Enter a name.");
      return;
    }
    if (!/^[+\d][\d\s-]{5,}$/.test(draft.phone.trim())) {
      setError("Enter a valid phone number (digits, spaces or dashes).");
      return;
    }
    setError(null);
    setValue((prev) => [...prev, { ...draft, name: draft.name.trim(), phone: draft.phone.trim() }]);
    setDraft({ name: "", relation: "", phone: "" });
  }

  return (
    <ToolCard title="Emergency Contact List" tag="Personal">
      <p className="text-sm text-muted-foreground text-pretty">
        Keep three people you would call first. Saved in your browser — print or copy them onto paper
        too.
      </p>
      <form onSubmit={add} className="mt-4 grid gap-2 sm:grid-cols-3" noValidate>
        <input
          aria-label="Contact name"
          placeholder="Name"
          value={draft.name}
          onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          className="rounded-xl bg-surface-strong px-3 py-2 text-sm ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-brand-soft"
        />
        <input
          aria-label="Relationship"
          placeholder="Relation"
          value={draft.relation}
          onChange={(e) => setDraft({ ...draft, relation: e.target.value })}
          className="rounded-xl bg-surface-strong px-3 py-2 text-sm ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-brand-soft"
        />
        <input
          aria-label="Phone number"
          placeholder="Phone"
          value={draft.phone}
          onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
          className="rounded-xl bg-surface-strong px-3 py-2 text-sm ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-brand-soft"
        />
        {error && <p className="text-xs font-medium text-danger sm:col-span-3">{error}</p>}
        <button
          type="submit"
          className="rounded-full bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground sm:col-span-3 sm:justify-self-start"
        >
          Add contact
        </button>
      </form>

      <ul className="mt-4 space-y-2">
        {contacts.map((c, i) => (
          <li
            key={`${c.name}-${c.phone}`}
            className="flex items-center justify-between gap-3 rounded-xl bg-surface-strong px-4 py-3 text-sm"
          >
            <span>
              <span className="font-semibold">{c.name}</span>
              {c.relation && <span className="text-muted-foreground"> · {c.relation}</span>}
              <span className="block text-muted-foreground">{c.phone}</span>
            </span>
            <button
              type="button"
              onClick={() => setValue((prev) => prev.filter((_, idx) => idx !== i))}
              className="text-xs font-semibold text-muted-foreground hover:text-danger"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <Link to="/emergency" className="mt-4 inline-block text-xs font-semibold text-brand-soft">
        See public emergency services →
      </Link>
    </ToolCard>
  );
}

/* -------------------------------------------------- Password strength check */

export function PasswordStrength() {
  const [pw, setPw] = useState("");

  const result = useMemo(() => {
    const checks = [
      { label: "At least 12 characters", pass: pw.length >= 12 },
      { label: "Upper and lower case letters", pass: /[a-z]/.test(pw) && /[A-Z]/.test(pw) },
      { label: "At least one number", pass: /\d/.test(pw) },
      { label: "At least one symbol", pass: /[^A-Za-z0-9]/.test(pw) },
      { label: "No obvious word or repeat", pass: !/(password|1234|qwerty|admin|(.)\2{2,})/i.test(pw) },
    ];
    const score = checks.filter((c) => c.pass).length;
    const verdict =
      pw.length === 0
        ? { label: "Type a password to test", tone: "text-muted-foreground", width: 0 }
        : score <= 2
          ? { label: "Weak — easy to guess", tone: "text-danger", width: 33 }
          : score <= 4
            ? { label: "Fair — add length or a symbol", tone: "text-warning", width: 66 }
            : { label: "Strong — good passphrase", tone: "text-success", width: 100 };
    return { checks, verdict };
  }, [pw]);

  return (
    <ToolCard title="Password Strength Checker" tag="Tool">
      <p className="text-sm text-muted-foreground text-pretty">
        Runs entirely in your browser. Nothing is sent anywhere — still, test a variation rather than
        your real password.
      </p>
      <input
        type="text"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        placeholder="try: purple-otter-lamp-42"
        aria-label="Password to test"
        className="mt-4 w-full rounded-xl bg-surface-strong px-4 py-2.5 text-sm ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-brand-soft"
      />
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-brand-soft transition-[width]"
          style={{ width: `${result.verdict.width}%` }}
        />
      </div>
      <p className={`mt-2 text-sm font-semibold ${result.verdict.tone}`}>{result.verdict.label}</p>
      <ul className="mt-4 space-y-1.5 text-sm">
        {result.checks.map((c) => (
          <li key={c.label} className="flex items-center gap-2">
            <span className={c.pass ? "text-success" : "text-muted-foreground"}>
              {c.pass ? "✓" : "○"}
            </span>
            <span className={c.pass ? "" : "text-muted-foreground"}>{c.label}</span>
          </li>
        ))}
      </ul>
    </ToolCard>
  );
}

/* ------------------------------------------------------------------- Quizzes */

type Question = { q: string; options: string[]; answer: number; why: string };

function Quiz({ title, tag, questions }: { title: string; tag: string; questions: Question[] }) {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = questions.filter((q, i) => picked[i] === q.answer).length;

  return (
    <ToolCard title={title} tag={tag}>
      <ol className="space-y-5">
        {questions.map((q, i) => (
          <li key={q.q}>
            <p className="text-sm font-semibold text-pretty">
              {i + 1}. {q.q}
            </p>
            <div className="mt-2 space-y-1.5">
              {q.options.map((opt, oi) => (
                <label key={opt} className="flex cursor-pointer items-start gap-2 text-sm">
                  <input
                    type="radio"
                    name={`${title}-${i}`}
                    checked={picked[i] === oi}
                    onChange={() => setPicked((p) => ({ ...p, [i]: oi }))}
                    className="mt-0.5 size-4 accent-[var(--brand-soft)]"
                  />
                  <span className="text-pretty">{opt}</span>
                </label>
              ))}
            </div>
            {submitted && (
              <p
                className={`mt-2 text-xs font-medium ${
                  picked[i] === q.answer ? "text-success" : "text-danger"
                }`}
              >
                {picked[i] === q.answer ? "Correct. " : "Not quite. "}
                {q.why}
              </p>
            )}
          </li>
        ))}
      </ol>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground"
        >
          Check my score
        </button>
        {submitted && (
          <>
            <p className="text-sm font-semibold">
              {score} / {questions.length} correct
            </p>
            <button
              type="button"
              onClick={() => {
                setPicked({});
                setSubmitted(false);
              }}
              className="text-xs font-semibold text-muted-foreground hover:text-accent"
            >
              Try again
            </button>
          </>
        )}
      </div>
    </ToolCard>
  );
}

export function PhishingQuiz() {
  return (
    <Quiz
      title="Phishing Awareness Quiz"
      tag="Quiz"
      questions={[
        {
          q: "An email says your university account closes in 30 minutes unless you verify it. What is the strongest signal here?",
          options: [
            "The subject line is in capitals",
            "The manufactured urgency",
            "It arrived in the evening",
          ],
          answer: 1,
          why: "Real institutions rarely give you minutes to act; urgency is the core phishing lever.",
        },
        {
          q: "Which part of a link decides where you actually land?",
          options: [
            "The visible link text",
            "The domain before the first single slash",
            "The words after the question mark",
          ],
          answer: 1,
          why: "Only the domain before the first single slash determines the destination.",
        },
        {
          q: "Someone claiming to be bank support asks for the one-time code you just received. You should:",
          options: [
            "Share it — support staff need it to verify you",
            "Share only the last three digits",
            "Never share it and end the call",
          ],
          answer: 2,
          why: "No legitimate support process needs your one-time code. Sharing it authorises a transaction.",
        },
      ]}
    />
  );
}

export function SafetyQuiz() {
  return (
    <Quiz
      title="General Safety Quiz"
      tag="Quiz"
      questions={[
        {
          q: "During an earthquake you should:",
          options: ["Run outside immediately", "Drop, cover and hold on", "Stand in a doorway"],
          answer: 1,
          why: "Moving during shaking causes most injuries; sturdy cover is safer.",
        },
        {
          q: "The safe following distance in dry conditions is about:",
          options: ["One second", "Three seconds", "Half a car length"],
          answer: 1,
          why: "Three seconds in the dry, and double it in rain.",
        },
        {
          q: "In a house fire you should:",
          options: [
            "Stay low, close doors behind you and get out",
            "Take the lift down quickly",
            "Go back for your documents",
          ],
          answer: 0,
          why: "Smoke rises, closed doors buy minutes, and you never re-enter.",
        },
        {
          q: "Walking home late, the most useful habit is:",
          options: [
            "Holding your phone up to light the way",
            "Both earphones in to stay calm",
            "A lit route plus one person who knows it",
          ],
          answer: 2,
          why: "Planning and a known route beat any single gadget.",
        },
      ]}
    />
  );
}

/* ----------------------------------------------------- What should I do? */

const situations = [
  {
    key: "followed",
    label: "I think someone is following me",
    steps: [
      "Cross the road or change direction to confirm without confronting anyone.",
      "Move towards light and people — an open shop, petrol station or busy street.",
      "Call someone and say your location out loud while you keep walking.",
      "If it continues, contact local emergency services or campus security.",
    ],
  },
  {
    key: "fire",
    label: "There is smoke or a fire alarm in my building",
    steps: [
      "Leave immediately by the stairs; never use a lift.",
      "Stay low, below the smoke, and close doors behind you.",
      "Do not go back for belongings.",
      "Call the fire service from outside and wait at the meeting point.",
    ],
  },
  {
    key: "accident",
    label: "I have witnessed a road accident",
    steps: [
      "Check your own safety first, then make the scene visible to other traffic.",
      "Call emergency services with the location and number of people involved.",
      "Do not move an injured person unless there is an immediate further danger.",
      "Stay until help arrives if you can; you may be the only witness.",
    ],
  },
  {
    key: "hacked",
    label: "I think my account has been hacked",
    steps: [
      "Change the password from a device you trust, and end all other sessions.",
      "Turn on two-factor authentication if it was off.",
      "Check recovery email and phone for entries you did not add.",
      "Warn contacts if messages were sent from your account, and report it to the platform.",
    ],
  },
  {
    key: "flood",
    label: "Water is rising near my home",
    steps: [
      "Move up and away early rather than waiting for certainty.",
      "Switch off electricity at the mains if it is safe to reach.",
      "Take your go-bag, documents and medicine.",
      "Never walk or drive through moving water.",
    ],
  },
];

export function SituationGuide() {
  const [key, setKey] = useState(situations[0]!.key);
  const current = situations.find((s) => s.key === key)!;

  return (
    <ToolCard title='"What Should I Do?" Guide' tag="Guide">
      <label htmlFor="situation" className="text-sm text-muted-foreground">
        Pick a situation
      </label>
      <select
        id="situation"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        className="mt-2 w-full rounded-xl bg-surface-strong px-4 py-2.5 text-sm font-semibold ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-brand-soft"
      >
        {situations.map((s) => (
          <option key={s.key} value={s.key}>
            {s.label}
          </option>
        ))}
      </select>
      <ol className="mt-4 space-y-2">
        {current.steps.map((step, i) => (
          <li key={step} className="flex items-start gap-3 text-sm">
            <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-soft/15 text-xs font-bold text-brand-soft">
              {i + 1}
            </span>
            <span className="text-pretty">{step}</span>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs text-muted-foreground">
        General awareness guidance only — always follow instructions from local emergency services.
      </p>
    </ToolCard>
  );
}

/* --------------------------------------------------------- Risk analyzer */

const weights: Array<[RegExp, number]> = [
  [/\balone\b/, 2],
  [/\bnight\b|\bdark\b|\bmidnight\b|\blate\b/, 2],
  [/\bunfamiliar\b|\bstrange\b|\bunknown\b|\bnew area\b/, 2],
  [/\bfollow(ed|ing)?\b|\bstalk/, 3],
  [/\bempty\b|\bdeserted\b|\bisolated\b|\bno one\b/, 2],
  [/\bthreat|\bweapon|\battack|\bviolen/, 4],
  [/\bfire\b|\bsmoke\b|\bflood\b|\bearthquake\b/, 4],
  [/\bdrunk\b|\balcohol\b|\bintoxicat/, 2],
  [/\bphish|\bscam\b|\botp\b|\bone[- ]time code\b|\bpassword\b/, 2],
  [/\bno (phone|network|signal|charge|battery)\b|\bdead battery\b/, 2],
  [/\bspeed(ing)?\b|\bhelmet\b|\bseat ?belt\b|\bdriving\b/, 1],
  [/\bwith (friends|family|a friend)\b|\bgroup\b|\bsomeone with me\b/, -2],
  [/\bdaylight\b|\bdaytime\b|\bmorning\b|\bafternoon\b/, -2],
  [/\bbusy\b|\bcrowd(ed)?\b|\blit\b|\bwell[- ]lit\b/, -2],
  [/\bhome\b|\bcampus security\b|\bpolice nearby\b/, -1],
];

const suggestionsFor: Record<string, string[]> = {
  High: [
    "Move towards light, people and an open business as your first action.",
    "Call someone you trust and stay on the line while you move.",
    "Contact local emergency services or campus security now if anyone is threatened.",
    "Do not confront anyone; putting distance between you and the situation is the priority.",
  ],
  Moderate: [
    "Share your live location with one trusted contact for the next hour.",
    "Switch to a busier, better-lit route even if it is longer.",
    "Keep both ears free and your phone in your pocket, not your hand.",
    "Decide now what you would do if the situation worsens.",
  ],
  Low: [
    "Keep your usual habits: known route, charged phone, one person who knows your plan.",
    "Take a minute to check your emergency contacts are current.",
    "Read a short article in the matching category to stay sharp.",
  ],
};

export function RiskAnalyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ level: string; score: number; hits: string[] } | null>(null);

  function analyze(e: React.FormEvent) {
    e.preventDefault();
    const input = text.toLowerCase();
    if (input.trim().length < 10) {
      setResult(null);
      return;
    }
    let score = 0;
    const hits: string[] = [];
    for (const [pattern, weight] of weights) {
      const match = input.match(pattern);
      if (match) {
        score += weight;
        hits.push(match[0]);
      }
    }
    const level = score >= 6 ? "High" : score >= 3 ? "Moderate" : "Low";
    setResult({ level, score, hits });
  }

  const tone =
    result?.level === "High"
      ? "bg-danger/15 text-danger"
      : result?.level === "Moderate"
        ? "bg-accent/15 text-accent"
        : "bg-success/15 text-success";

  return (
    <ToolCard title="Safety Risk Analyzer" tag="Demo · Interactive" accent>
      <p className="text-sm text-muted-foreground text-pretty">
        Describe a situation in your own words. A small keyword-weighting model, running in your
        browser, sorts it into Low, Moderate or High risk and offers general awareness suggestions.
      </p>
      <form onSubmit={analyze} className="mt-4">
        <label htmlFor="risk-input" className="sr-only">
          Describe the situation
        </label>
        <textarea
          id="risk-input"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="I am walking alone at night in an unfamiliar area."
          className="w-full rounded-xl bg-surface-strong px-4 py-3 text-sm ring-1 ring-border focus:outline-none focus:ring-2 focus:ring-brand-soft"
        />
        <button
          type="submit"
          className="mt-3 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
        >
          Analyze situation
        </button>
      </form>

      {result && (
        <div className="mt-5 rounded-2xl bg-surface-strong p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>
              {result.level} risk
            </span>
            <span className="text-xs text-muted-foreground">Signal score {result.score}</span>
          </div>
          {result.hits.length > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              Signals detected: {result.hits.join(", ")}
            </p>
          )}
          <ul className="mt-3 space-y-2">
            {(suggestionsFor[result.level] ?? []).map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-pretty">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4 rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground text-pretty">
        Educational demo only. This does not predict real-world danger and must never replace your own
        judgement or a call to local emergency services.
      </p>
    </ToolCard>
  );
}

export const personalChecklist = [
  "Local emergency number saved and written on paper",
  "One trusted contact knows my usual routes and timings",
  "Live location sharing set up with one person",
  "Phone charged above 40% before going out late",
  "A charged power bank in my bag",
  "Campus security or workplace security number saved",
  "I know which route home is best lit",
];

export const preparednessChecklist = [
  "Three days of water stored (3 litres per person per day)",
  "Non-perishable food that needs no cooking",
  "One torch per person plus spare batteries",
  "First-aid pouch checked in the last six months",
  "A week of prescription medicine set aside",
  "Copies of ID and insurance documents, offline and printed",
  "Small cash notes in the kit",
  "Smoke alarms tested this month",
  "Household meeting point agreed out loud",
];
