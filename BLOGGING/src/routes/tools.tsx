import { createFileRoute } from "@tanstack/react-router";
import {
  Checklist,
  EmergencyContacts,
  PasswordStrength,
  PhishingQuiz,
  RiskAnalyzer,
  SafetyQuiz,
  SituationGuide,
  personalChecklist,
  preparednessChecklist,
} from "@/components/tools/safety-tools";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Safety Toolkit — SafeSphere" },
      {
        name: "description",
        content:
          "An interactive safety toolkit: emergency contacts, personal and preparedness checklists, a password strength checker, quizzes, a situation guide and a demo risk analyzer.",
      },
      { property: "og:title", content: "Safety Toolkit — SafeSphere" },
      {
        property: "og:description",
        content:
          "Checklists, quizzes, a password strength checker and a demo Safety Risk Analyzer — all running in your browser.",
      },
    ],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">Safety toolkit</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Tools that do the work
      </h1>
      <p className="mt-3 max-w-[60ch] text-base text-muted-foreground text-pretty">
        Seven interactive tools. Everything runs in your browser and your progress is remembered on
        this device only.
      </p>

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
        <RiskAnalyzer />
        <EmergencyContacts />
        <Checklist
          id="personal"
          title="Personal Safety Checklist"
          tag="Checklist"
          items={personalChecklist}
        />
        <Checklist
          id="preparedness"
          title="Emergency Preparedness Checklist"
          tag="Checklist"
          items={preparednessChecklist}
        />
        <PasswordStrength />
        <SituationGuide />
        <PhishingQuiz />
        <SafetyQuiz />
      </div>
    </div>
  );
}
