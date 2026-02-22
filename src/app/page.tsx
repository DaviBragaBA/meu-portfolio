import type { Metadata } from "next";
import Link from "next/link";
import { personal } from "@/data/personal";
import { Age } from "@/components/Age";
import { HighlightPhrases } from "@/components/HighlightPhrases";
import { HeroCountUp } from "@/components/HeroCountUp";
import { ProjectsCountUp } from "@/components/ProjectsCountUp";
import { PosProgressBar } from "@/components/PosProgressBar";
import { projects } from "@/data/projects";
import { education } from "@/data/education";
import { agora } from "@/data/site";

const formacaoDestaques = [
  "Engenharia de Software em IA",
  "Inteligência de Dados em Negócios",
  "Sistemas de Informação",
  "UNIFEI",
  "ESPM",
];

export const metadata: Metadata = {
  title: "Davi Braga | Business Analyst · Core Limit Policies",
  description:
    "Business Analyst em políticas de limite de cartão. Métricas de cartão, experimentos, monitoria, Databricks, dashboards.",
};

export default function Home() {
  return (
    <div className="space-y-14">
      {/* Headline */}
      <div className="space-y-8">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Davi Braga
        </h1>
        <p className="text-lg font-medium text-[var(--text)] max-w-2xl">
          Business Analyst | <span className="text-[var(--accent)] font-medium">Core Limit Policies</span> (Excellence) | Limites de
          cartão, <span className="text-[var(--accent)] font-medium">métricas</span> e <span className="text-[var(--accent)] font-medium">experimentos</span> de crédito (BR/MX/COL)
        </p>
        <p className="text-[var(--muted)] max-w-xl">
          Banco digital · Cartões de crédito · Limites e políticas · <span className="text-[var(--accent)] font-medium">Pipelines</span> de dados · <span className="text-[var(--accent)] font-medium">Dashboards</span> de monitoria
        </p>
        <p className="text-sm text-[var(--muted)]">
          Atuação em <HeroCountUp /> · <ProjectsCountUp target={projects.length} />
        </p>
        {agora ? (
          <p className="text-sm text-[var(--muted)] italic">
            Agora: {agora}
          </p>
        ) : null}
        <div className="space-y-2">
          <p className="text-sm font-medium text-[var(--muted)]">Pós em andamento</p>
          <div className="flex flex-col gap-2 text-sm">
            {education
              .filter((e) => e.startDate && e.endDate)
              .map((e) => (
              <div key={e.id} className="flex flex-wrap items-center gap-2">
                <span className="text-[var(--muted)] shrink-0 min-w-[120px] sm:min-w-[140px]">
                  {e.degree}
                </span>
                <PosProgressBar startDate={e.startDate!} endDate={e.endDate!} />
              </div>
            ))}
          </div>
        </div>
        <div className="pt-4 flex flex-wrap gap-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[var(--accent)] font-medium hover:underline"
          >
            Experiência →
          </Link>
          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 text-[var(--accent)] font-medium hover:underline"
          >
            Projetos →
          </Link>
          <Link
            href="/formation"
            className="inline-flex items-center gap-2 text-[var(--accent)] font-medium hover:underline"
          >
            Formação →
          </Link>
        </div>
      </div>

      <hr className="border-[var(--border)]" />

      {/* Quem sou eu — texto à esquerda, foto eu e o cachorro à direita (no buraco) */}
      <section id="sobre" className="pb-8 border-b border-[var(--border)]">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
          <div className="space-y-5 flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-[var(--text)]">
              Quem sou eu
            </h2>
            <ul className="text-[var(--muted)] text-sm leading-relaxed space-y-2">
              <li><span className="text-[var(--text)] font-medium">{personal.fullName}</span> · <Age /></li>
              <li>
                <a href={`mailto:${personal.email}`} className="text-[var(--accent)] hover:underline">{personal.email}</a>
                {" · "}
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">LinkedIn</a>
              </li>
              <li>Nascido em {personal.birthCity} · Moro em {personal.currentCity}</li>
              <li>{personal.alunoDestaque}</li>
              <li><span className="text-[var(--text)] font-medium">Idiomas:</span> {personal.idiomas}</li>
              <li><span className="text-[var(--text)] font-medium">Formação:</span> <HighlightPhrases text={personal.formacaoEmUmaLinha} phrases={formacaoDestaques} /></li>
              <li><span className="text-[var(--text)] font-medium">Perfil:</span> {personal.personalidade}</li>
            </ul>
            <div>
              <h3 className="text-base font-medium text-[var(--text)] mb-2">O que me motiva</h3>
              <p className="text-[var(--muted)] text-base leading-relaxed italic">
                {personal.motivacao}
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-2 sm:gap-3 flex-shrink-0 items-start">
            <div className="flex flex-col gap-2 sm:gap-3">
              <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--border)]/20 flex-shrink-0">
                <img
                  src="/fotos/davi-cachorro.jpeg"
                  alt="Davi Braga e cachorro"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-[var(--muted)] italic">
                Esse sou eu.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3">
              <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--border)]/20 flex-shrink-0">
                <img
                  src="/fotos/cachorro.jpeg"
                  alt="Banguela, meu cachorro"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-[var(--muted)] italic">
                Esse é o Banguela,
                <br />
                meu fiel companheiro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre (profissional) */}
      <div className="space-y-6 text-[var(--muted)] leading-relaxed">
        <p>
          Sou <strong className="text-[var(--text)]">Business Analyst em <span className="text-[var(--accent)] font-medium">Core Limit Policies</span> (Excellence)</strong>, focado em políticas de limite de cartão de crédito em múltiplos países. No dia a dia, conecto <span className="text-[var(--accent)] font-medium">dados</span>, modelos de risco/receita e produto para desenhar, testar e monitorar políticas de aumento de limite com base em todas as métricas que envolvem cartão de crédito.
        </p>
        <p>
          Trabalho com <span className="text-[var(--accent)] font-medium">experimentos</span> de limite (teste vs. controle), analisando impacto em volume de compras, saldo médio diário que rende juros, saldo em aberto e risco. A partir disso, ajudo a ajustar caps, blocks e regras de elegibilidade, sempre olhando para o trade-off entre receita, perdas, capital e exposição.
        </p>
        <p>
          Construo pipelines de monitoria em <span className="text-[var(--accent)] font-medium">Databricks</span>, crio <span className="text-[var(--accent)] font-medium">dashboards</span> internos de budget e policy performance e participo da implementação de mudanças na política em produção (por exemplo, regras de bloqueio ligadas à conformidade bancária).
        </p>
      </div>

      <hr className="border-[var(--border)]" />

      <section className="space-y-4 text-[var(--muted)] leading-relaxed">
        <p className="text-sm uppercase tracking-wider text-[var(--muted)]/80">
          English
        </p>
        <p>
          I’m a <strong className="text-[var(--text)]">Business Analyst in <span className="text-[var(--accent)] font-medium">Core Limit Policies</span> (Excellence)</strong>, focused on credit card limit policies in multiple countries. I connect <span className="text-[var(--accent)] font-medium">data</span>, risk/revenue models, and product to design, test, and monitor limit-increase policies based on the full set of metrics that involve the credit card. I work with limit <span className="text-[var(--accent)] font-medium">experiments</span> (test vs control), adjust caps, blocks, and eligibility rules, build monitoring pipelines in <span className="text-[var(--accent)] font-medium">Databricks</span>, create internal <span className="text-[var(--accent)] font-medium">dashboards</span>, and participate in production policy changes.
        </p>
        <p className="text-sm">
          <Link href="/en" className="text-[var(--accent)] font-medium hover:underline">
            Full profile in English →
          </Link>
        </p>
      </section>

    </div>
  );
}
