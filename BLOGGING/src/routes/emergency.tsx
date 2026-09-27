import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/emergency")({
  head: () => ({
    meta: [
      { title: "Emergency Help — SafeSphere" },
      {
        name: "description",
        content:
          "Emergency services, police, ambulance, fire, women and child safety helplines, and cybercrime reporting — with guidance on what to say when you call.",
      },
      { property: "og:title", content: "Emergency Help — SafeSphere" },
      {
        property: "og:description",
        content:
          "Key emergency numbers and reporting channels, plus what to say when you make the call.",
      },
    ],
  }),
  component: EmergencyPage,
});

const services = [
  {
    group: "All emergencies",
    items: [
      { name: "National emergency number (India)", value: "112", note: "Police, fire and ambulance in one number." },
      { name: "Police", value: "100", note: "Crime in progress, threats, or a missing person." },
    ],
  },
  {
    group: "Medical and fire",
    items: [
      { name: "Ambulance", value: "102 / 108", note: "Medical emergencies and accident response." },
      { name: "Fire services", value: "101", note: "Fire, smoke, gas leak or rescue." },
      { name: "Disaster management helpline", value: "1078", note: "Floods, earthquakes and extreme weather." },
    ],
  },
  {
    group: "Women and child safety",
    items: [
      { name: "Women's helpline", value: "1091", note: "Harassment, stalking, or immediate danger." },
      { name: "Domestic abuse helpline", value: "181", note: "Support, shelter and counselling." },
      { name: "Childline", value: "1098", note: "Any child in need of care or protection." },
    ],
  },
  {
    group: "Cyber and financial crime",
    items: [
      { name: "Cybercrime helpline", value: "1930", note: "Online fraud — call within the first hours." },
      {
        name: "National cybercrime portal",
        value: "cybercrime.gov.in",
        note: "File a written complaint with evidence.",
      },
    ],
  },
];

export function EmergencyPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <div className="rounded-3xl bg-brand px-6 py-8 text-brand-foreground sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">Emergency help</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          If someone is in danger right now, call first and read later.
        </h1>
        <p className="mt-3 max-w-[60ch] text-sm text-brand-foreground/75 text-pretty">
          The numbers below are national helplines for India. Numbers differ by country — if you are
          elsewhere, use your own local emergency number. SafeSphere is an awareness project and cannot
          dispatch help.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {services.map((group) => (
          <section key={group.group} className="rounded-3xl panel p-6">
            <h2 className="font-display text-xl font-semibold tracking-tight">{group.group}</h2>
            <ul className="mt-4 space-y-3">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="flex flex-wrap items-baseline justify-between gap-2 rounded-xl bg-surface-strong px-4 py-3"
                >
                  <span>
                    <span className="text-sm font-semibold">{item.name}</span>
                    <span className="block text-xs text-muted-foreground text-pretty">{item.note}</span>
                  </span>
                  <span className="font-display text-lg font-semibold text-accent">{item.value}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="mt-6 rounded-3xl panel p-6">
        <h2 className="font-display text-xl font-semibold tracking-tight">What to say when you call</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            "Where you are — street, landmark, floor or room number first.",
            "What has happened, in one sentence.",
            "How many people are involved and whether anyone is injured.",
            "Your name and a number they can call back on.",
            "Any hazard at the scene: fire, gas, water, traffic, live wires.",
            "Stay on the line until the operator says you can hang up.",
          ].map((step, i) => (
            <li key={step} className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-soft/15 text-xs font-bold text-brand-soft">
                {i + 1}
              </span>
              <span className="text-pretty">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/tools"
          className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground"
        >
          Build your personal contact list
        </Link>
        <Link
          to="/categories/$category"
          params={{ category: "emergency-preparedness" }}
          className="rounded-full panel px-5 py-3 text-sm font-semibold text-brand-soft"
        >
          Read preparedness articles
        </Link>
      </div>
    </div>
  );
}
