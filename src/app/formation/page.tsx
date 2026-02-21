import { education } from "@/data/education";
import { EducationCard } from "@/components/EducationCard";

export const metadata = {
  title: "Formação | Davi Braga",
  description: "Formação acadêmica e cursos",
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

      <section className="pt-8 border-t border-[var(--border)]">
        <h2 className="text-lg font-semibold text-[var(--text)] mb-4">
          Cursos e aprendizado
        </h2>
        <p className="text-[var(--muted)] text-sm leading-relaxed">
          Cursos e materiais de estatística, <span className="text-[var(--accent)] font-medium">SQL</span>, <span className="text-[var(--accent)] font-medium">experimentos</span> (A/B testing),
          causalidade, <span className="text-[var(--accent)] font-medium">crédito</span> e <span className="text-[var(--accent)] font-medium">risco</span> — internos (Nubank) ou externos — que
          você concluiu ou está fazendo podem ser listados aqui. Ex.: treinamentos
          de <span className="text-[var(--accent)] font-medium">métricas de cartão</span>, documentação de modelos de risco, materiais de causal
          inference.
        </p>
      </section>
    </div>
  );
}
