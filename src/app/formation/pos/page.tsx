import Link from "next/link";
import { PosSumarioAccordion } from "@/components/PosSumarioAccordion";
import { modulosPos } from "@/data/pos-sumario";

export const metadata = {
  title: "Pós-Graduação – Programa completo | Davi Braga",
  description:
    "Programa completo e sumário da Pós-Graduação em Inteligência de Dados em Negócios (ESPM).",
};

export default function FormationPosPage() {
  return (
    <div className="space-y-14">
      <p className="text-sm text-[var(--muted)]">
        <Link href="/formation" className="hover:text-[var(--accent)]">
          ← Formação
        </Link>
      </p>

      <header className="border-b border-[var(--border)] pb-10">
        <p className="text-sm font-medium text-[var(--accent)] uppercase tracking-wider">
          ESPM
        </p>
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight mt-1">
          Pós-Graduação em Inteligência de Dados em Negócios
        </h1>
        <p className="text-[var(--muted)] mt-4 max-w-2xl leading-relaxed">
          Programa completo e sumário da formação: estrutura curricular,
          disciplinas, módulos, carga horária e ementas. O curso combina
          fundamentos de dados, analytics e decisão em negócios com aplicação
          prática e projeto de conclusão orientado por dados.
        </p>
      </header>

      <section>
        <h2 className="text-lg font-semibold text-[var(--text)] mb-4 border-b border-[var(--border)] pb-2">
          Sobre o programa
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 text-[var(--muted)] text-sm leading-relaxed">
          <div className="rounded-lg border border-[var(--border)] p-5 bg-[var(--border)]/10">
            <h3 className="font-medium text-[var(--text)] mb-2">Objetivo</h3>
            <p>
              Formar profissionais capazes de liderar a transformação baseada em
              dados nas organizações, desenhar estratégias de analytics e
              traduzir dados em decisão de negócios.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--border)] p-5 bg-[var(--border)]/10">
            <h3 className="font-medium text-[var(--text)] mb-2">Público</h3>
            <p>
              Gestores, analistas e profissionais de negócios e tecnologia que
              queiram aprofundar conhecimentos em inteligência de dados,
              analytics e cultura data-driven.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[var(--text)] mb-4 border-b border-[var(--border)] pb-2">
          Estrutura curricular e sumário
        </h2>
        <PosSumarioAccordion modulos={modulosPos} />
      </section>
    </div>
  );
}
