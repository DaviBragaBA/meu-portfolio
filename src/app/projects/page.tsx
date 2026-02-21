import { experiences } from "@/data/experience";
import { ExperienceCard } from "@/components/ExperienceCard";

export const metadata = {
  title: "Work | Davi Braga",
  description: "Lugares que trabalhei",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-12">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--muted)]">
        Lugares que trabalhei
      </h1>

      <div className="space-y-10">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>
    </div>
  );
}
