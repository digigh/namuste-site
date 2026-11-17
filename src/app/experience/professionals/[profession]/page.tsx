import { notFound } from "next/navigation";
import { ExperienceShell } from "@/components/experience/ExperienceChrome";
import SimulationEngine from "@/components/experience/SimulationEngine";
import { PROFESSIONS, SIMULATIONS } from "@/lib/experienceSimulations";

export function generateStaticParams() {
  return PROFESSIONS.map((p) => ({ profession: p.slug }));
}

export default async function ProfessionPage({ params }: { params: Promise<{ profession: string }> }) {
  const { profession } = await params;
  const match = PROFESSIONS.find((p) => p.slug === profession);
  const config = match ? SIMULATIONS[match.experience] : undefined;
  if (!config) notFound();

  return (
    <ExperienceShell>
      <SimulationEngine config={config} />
    </ExperienceShell>
  );
}
