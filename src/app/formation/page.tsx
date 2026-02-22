import { education } from "@/data/education";
import { EducationCard } from "@/components/EducationCard";

export const metadata = {
  title: "Formação | Davi Braga",
  description:
    "Formação acadêmica de Davi Braga: graduação em Sistemas de Informação (UNIFEI), pós em Inteligência de Dados em Negócios (ESPM) e Engenharia de Software em IA.",
};

export default function FormationPage() {
  return (
    <div className="space-y-12">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--muted)]">
        Formação acadêmica
      </h1>

      <div className="space-y-10">
        {education.map((item) => (
          <EducationCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
