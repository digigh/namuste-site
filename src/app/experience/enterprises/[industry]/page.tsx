import { notFound } from "next/navigation";
import { ExperienceShell } from "@/components/experience/ExperienceChrome";
import SimulationEngine from "@/components/experience/SimulationEngine";
import { INDUSTRIES, SIMULATIONS } from "@/lib/experienceSimulations";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ industry: i.slug }));
}

export default async function IndustryPage({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const match = INDUSTRIES.find((i) => i.slug === industry);
  const config = match ? SIMULATIONS[match.experience] : undefined;
  if (!config) notFound();

  return (
    <ExperienceShell>
      <SimulationEngine config={config} />
    </ExperienceShell>
  );
}
