import Link from "next/link";
import { PosIASumarioAccordion } from "@/components/PosIASumarioAccordion";
import { modulosPosIA } from "@/data/pos-ia-sumario";

export const metadata = {
  title: "Pós Engenharia de Software em IA Aplicada – Programa | Davi Braga",
  description:
    "Programa completo da Pós-Graduação em Engenharia de Software em IA Aplicada (EAD): matriz curricular, 480h, disciplinas em LLMs, agentes, MCP, RAG, MLOps e governança em IA.",
};

export default function FormationPosIAPage() {
  return (
    <div className="space-y-14">
      <p className="text-sm text-[var(--muted)]">
        <Link href="/formation" className="hover:text-[var(--accent)]">
          ← Formação
        </Link>
      </p>

      <header className="border-b border-[var(--border)] pb-10">
        <p className="text-sm font-medium text-[var(--accent)] uppercase tracking-wider">
          Pós-Graduação Lato Sensu (EAD)
        </p>
        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight mt-1">
          Engenharia de Software em IA Aplicada
        </h1>
        <p className="text-[var(--muted)] mt-4 max-w-2xl leading-relaxed">
          Especialização na integração entre Engenharia de Software e
          Inteligência Artificial: LLMs, agentes autônomos, MCP, RAG,
          fine-tuning (LoRA/PEFT), MLOps, APIs generativas e governança em IA.
          Programa completo com matriz curricular, carga horária e conteúdo
          programático de cada disciplina.
        </p>
      </header>

      <section>
        <h2 className="text-lg font-semibold text-[var(--text)] mb-4 border-b border-[var(--border)] pb-2">
          Sobre o programa
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 text-[var(--muted)] text-sm leading-relaxed">
          <div className="rounded-lg border border-[var(--border)] p-5 bg-[var(--border)]/10">
            <h3 className="font-medium text-[var(--text)] mb-2">
              Objetivo geral
            </h3>
            <p>
              Formar especialistas na integração entre Engenharia de Software e
              IA Aplicada, capazes de projetar, desenvolver e implementar
              soluções inteligentes com LLMs, agentes autônomos e pipelines de
              ML; com domínio de ferramentas de IA generativa, DevOps
              inteligente, governança algorítmica e práticas seguras e éticas.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--border)] p-5 bg-[var(--border)]/10">
            <h3 className="font-medium text-[var(--text)] mb-2">
              Público-alvo
            </h3>
            <p>
              Profissionais graduados em Ciência da Computação, Engenharia de
              Software, Sistemas de Informação, Engenharia da Computação,
              Matemática, Estatística e áreas correlatas; e também engenheiros,
              gestores de inovação, analistas de dados e profissionais de TI que
              queiram aplicar IA e automação inteligente em processos, produtos
              digitais e ambientes industriais.
            </p>
          </div>
        </div>
        <div className="mt-6 rounded-lg border border-[var(--border)] p-5 bg-[var(--border)]/10 text-[var(--muted)] text-sm leading-relaxed">
          <h3 className="font-medium text-[var(--text)] mb-2">Justificativa</h3>
          <p>
            A IA tornou-se pilar central da transformação digital. A integração
            entre engenharia de software e IA impulsiona automação industrial,
            análise preditiva, saúde digital e sistemas autônomos. O mercado
            demanda profissionais capazes de conceber, desenvolver e implantar
            soluções inteligentes, com rigor técnico e compreensão ética e
            regulatória (LGPD/GDPR). O curso prepara para arquiteturas
            AI-first, MLOps e atuação em equipes multidisciplinares.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[var(--text)] mb-4 border-b border-[var(--border)] pb-2">
          Conteúdo programático
        </h2>
        <p className="text-[var(--muted)] text-sm mb-4">
          Ementas e conteúdos programáticos de cada disciplina. Clique para
          expandir.
        </p>
        <PosIASumarioAccordion modulos={modulosPosIA} />
      </section>
    </div>
  );
}
