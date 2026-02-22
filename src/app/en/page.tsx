import type { Metadata } from "next";
import Link from "next/link";
import { personal } from "@/data/personal";
import { Age } from "@/components/Age";
import { HighlightPhrases } from "@/components/HighlightPhrases";

export const metadata: Metadata = {
  title: "About (English) | Davi Braga",
  description:
    "Davi Braga – Business Analyst in Core Limit Policies (Excellence). Credit card limit policies, A/B experiments, metrics, Databricks, dashboards. Brazil and Mexico.",
};

export default function EnPage() {
  return (
    <div className="space-y-12">
      <p className="text-sm text-[var(--muted)]">
        <Link href="/" className="hover:text-[var(--accent)]">
          ← Português
        </Link>
      </p>

      <h1 className="text-2xl font-semibold tracking-tight text-[var(--muted)]">
        About (English)
      </h1>

      {/* Headline */}
      <section className="space-y-4">
        <p className="text-lg font-medium text-[var(--text)]">
          Business Analyst | <span className="text-[var(--accent)] font-medium">Core Limit Policies</span> (Excellence) | Credit card
          limits, <span className="text-[var(--accent)] font-medium">metrics</span> and limit <span className="text-[var(--accent)] font-medium">experiments</span> (BR/MX/COL)
        </p>
        <p className="text-[var(--muted)] max-w-xl">
          Digital bank · Credit cards · Limits and policies · <span className="text-[var(--accent)] font-medium">Data pipelines</span> · <span className="text-[var(--accent)] font-medium">Monitoring dashboards</span>
        </p>
        <div className="pt-2 flex flex-wrap gap-6">
          <Link href="/projects" className="inline-flex items-center gap-2 text-[var(--accent)] font-medium hover:underline">
            Experience →
          </Link>
          <Link href="/projetos" className="inline-flex items-center gap-2 text-[var(--accent)] font-medium hover:underline">
            Projects →
          </Link>
          <Link href="/formation" className="inline-flex items-center gap-2 text-[var(--accent)] font-medium hover:underline">
            Education →
          </Link>
        </div>
      </section>

      {/* About section (LinkedIn) */}
      <section className="space-y-4 text-[var(--muted)] leading-relaxed">
        <h2 className="text-lg font-semibold text-[var(--text)]">About</h2>
        <p>
          I am a{" "}
          <strong className="text-[var(--text)]">
            Business Analyst in <span className="text-[var(--accent)] font-medium">Core Limit Policies</span> (Excellence)
          </strong>
          , focused on credit card limit policies in multiple countries. Day-to-day, I connect <span className="text-[var(--accent)] font-medium">data</span>, risk/revenue models, and product to design, test,
          and monitor limit-increase policies based on the full set of metrics that involve the credit card.
        </p>
        <p>
          I work with limit <span className="text-[var(--accent)] font-medium">experiments</span> (test vs. control), analyzing impact on
          purchase volume, interest‑bearing average daily balance, outstanding
          balance and risk. From that, I help adjust caps, blocks, and eligibility
          rules, always looking at the trade‑off between revenue, losses,
          capital and exposure.
        </p>
        <p>
          I build monitoring pipelines in <span className="text-[var(--accent)] font-medium">Databricks</span>, create internal
          <span className="text-[var(--accent)] font-medium">dashboards</span> for budget and policy performance, and take part in
          implementing changes in the production policy (for example,
          compliance‑related blocking rules).
        </p>
      </section>

      {/* Who I am */}
      <section className="space-y-5 pb-8 border-b border-[var(--border)] text-[var(--muted)] leading-relaxed">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          Who I am
        </h2>
        <ul className="text-sm space-y-2">
          <li><span className="text-[var(--text)] font-medium">{personal.fullName}</span> · <Age /></li>
          <li>
            <a href={`mailto:${personal.email}`} className="text-[var(--accent)] hover:underline">{personal.email}</a>
            {" · "}
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">LinkedIn</a>
          </li>
          <li>Born in {personal.birthCity} · Living in {personal.currentCity}</li>
          <li>{personal.alunoDestaqueEn}</li>
          <li><span className="text-[var(--text)] font-medium">Languages:</span> {personal.idiomasEn}</li>
          <li>
            <span className="text-[var(--text)] font-medium">Formation:</span>{" "}
            <HighlightPhrases
              text={personal.formacaoEmUmaLinhaEn}
              phrases={[
                "Software Engineering in AI",
                "Business Data Intelligence",
                "Information Systems",
                "UNIFEI",
                "ESPM",
              ]}
            />
          </li>
          <li><span className="text-[var(--text)] font-medium">Personality:</span> {personal.personalidadeEn}</li>
        </ul>
        <div>
          <h3 className="text-base font-medium text-[var(--text)] mb-2">What motivates me</h3>
          <p className="text-base leading-relaxed italic">
            {personal.motivacaoEn}
          </p>
        </div>
      </section>

      {/* What I do day to day */}
      <section className="space-y-8 text-[var(--muted)] leading-relaxed">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          What I do day to day
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-[var(--text)] mb-2">
              1. Understanding how limit policies affect customer behavior
            </h3>
            <p className="mb-3">
              I analyze how credit limit changes affect customer behavior in
              terms of: purchase volume, interest‑bearing average daily balance,
              outstanding balance, and credit limit. I compare test and control
              groups, computing deltas and deriving metrics such as marginal
              utilization of purchase volume, marginal utilization of
              interest‑bearing balance, interest‑bearing balance over purchase
              volume, and marginal utilization of outstanding balance. These help
              me understand whether a limit increase drives healthy spend,
              increases interest revenues sustainably, or pushes customers into
              inadequate debt levels.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-[var(--text)] mb-2">
              2. Building and maintaining monitoring datasets
            </h3>
            <p>
              I work in Databricks and in monitoring pipelines to create and
              maintain datasets for policy monitoring — especially budget
              monitoring for limit increase experiments, aggregated by business
              month, risk band, policy and version. I write
              transformations to join and aggregate data, compute test vs control deltas, and generate
              tables for dashboards. I run validation runs and track them in job
              monitoring tools before changes go to production.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-[var(--text)] mb-2">
              3. Creating dashboards and visual narratives
            </h3>
            <p>
              I use internal dashboards as the main visualization for Core Limit
              Policies. I built the budget and performance dashboards by country
              (BR/MX/COL). I organize metrics by country, risk band, policy and
              version; display differences in purchase volume, interest‑bearing
              balance, outstanding balance and limit; and highlight marginal
              utilization and time evolution. These dashboards support decision
              forums, policy performance review, and adjustments in caps, blocks
              and eligibility rules.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-[var(--text)] mb-2">
              4. Bringing changes into the production policy
            </h3>
            <p>
              When data supports a policy change, I help implement it in the
              central policy and data systems: creating or adjusting policy
              blocks (e.g. bank compliance), adding input attributes,
              adjusting input datasets. I write business context, link changes to
              validation notebooks in Databricks, run ad‑hoc checks, and follow
              review with data teams, local teams and Core Limit Policies
              reviewers.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-[var(--text)] mb-2">
              5. Documenting, aligning and learning
            </h3>
            <p>
              I use documentation and collaboration tools for the credit card metrics framework,
              revenue and cost components, and experiment learnings. I align with
              engineers, data scientists and country teams on day‑to‑day work,
              and use internal search to find documents and dashboards. I study
              credit and risk glossaries, model documentation, and materials on
              experiments and causal inference.
            </p>
          </div>
        </div>
      </section>

      {/* Current experience */}
      <section className="space-y-4 text-[var(--muted)] leading-relaxed">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          Current experience
        </h2>
        <p className="font-medium text-[var(--text)]">
          Business Analyst – Core Limit Policies (Excellence)
        </p>
        <p className="text-sm">
          Nubank · Jun 2025 – Present · São Paulo (Remote)
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>
            Analyze credit card limit increase experiments
            by comparing test and control groups, measuring impact on purchase
            volume, interest‑bearing average daily balance, outstanding balance
            and credit limit.
          </li>
          <li>
            Compute metrics such as delta purchase volume, delta
            interest‑bearing average daily balance, delta outstanding balance
            and marginal utilization to understand whether the limit increase is
            healthy in terms of usage, revenues and risk.
          </li>
          <li>
            Develop monitoring pipelines in Databricks,
            aggregating budget metrics by business month, risk
            band, policy and version, aligned with FP&A views.
          </li>
          <li>
            Build and evolve internal dashboards for budget metrics to track, almost
            in real time, the performance of policies and limit experiments.
          </li>
          <li>
            Contribute to the implementation of production policy rules (e.g.
            compliance‑related blocking rules), adjusting input
            datasets and decision blocks in central data and policy
            repositories.
          </li>
          <li>
            Partner with data engineers and data scientists to align risk
            models, average balance models and metric curves with policy practice.
          </li>
          <li>
            Document analyses, decisions and learnings in documentation and
            presentation tools, translating risk, revenue and credit card metrics into
            clear narratives for technical and business stakeholders.
          </li>
        </ul>
      </section>

      {/* Tools I use daily */}
      <section className="space-y-4 text-[var(--muted)] leading-relaxed">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          Tools I use daily
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <strong className="text-[var(--text)]">Databricks</strong> –
            exploring data, validating monitoring datasets, testing calculation
            logic.
          </li>
          <li>
            <strong className="text-[var(--text)]">Monitoring pipelines</strong>{" "}
            – budget monitoring by country and risk band.
          </li>
          <li>
            <strong className="text-[var(--text)]">Internal dashboards</strong> –
            visual reports for Core Limit Policies and budget metrics.
          </li>
          <li>
            <strong className="text-[var(--text)]">Policy and data systems</strong> –
            implementing changes in blocks and policy input datasets in
            production.
          </li>
          <li>
            <strong className="text-[var(--text)]">Job orchestration and
            monitoring tools</strong> – running and tracking data jobs.
          </li>
          <li>
            <strong className="text-[var(--text)]">GitHub</strong> – Pull
            Requests related to policy, monitoring and dashboards.
          </li>
          <li>
            <strong className="text-[var(--text)]">Documentation and
            collaboration tools</strong> – documenting policies, models and
            decisions.
          </li>
          <li>
            <strong className="text-[var(--text)]">Communication tools</strong> –
            daily alignment with technical and business teams.
          </li>
          <li>
            <strong className="text-[var(--text)]">Internal search</strong> –
            finding docs, dashboards and metric definitions.
          </li>
        </ul>
      </section>
    </div>
  );
}
