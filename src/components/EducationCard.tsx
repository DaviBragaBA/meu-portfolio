import Link from "next/link";
import type { Education } from "@/data/education";
import { HighlightKeywords } from "@/components/HighlightKeywords";
import { TagWithTooltip } from "@/components/TagWithTooltip";
import { PosProgressBar } from "@/components/PosProgressBar";

const KEYWORDS = [
  "dados",
  "inteligência de dados",
  "Tableau",
  "Data storytelling",
  "modelos preditivos",
  "KPIs",
  "OKRs",
  "LLMs",
  "IA",
  "Inteligência Artificial",
  "MLOps",
  "Python",
  "agentes autônomos",
  "RAG",
  "fine-tuning",
  "APIs generativas",
  "governança",
  "DevOps",
  "Sistemas de Informação",
  "data driven",
  "jornada analítica",
  "Capstone Project",
];

type Props = { item: Education };

export function EducationCard({ item }: Props) {
  return (
    <article className="border-b border-[var(--border)] pb-10 last:border-0">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--border)] flex items-center justify-center text-lg font-bold text-[var(--muted)]">
          {item.institution.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold">{item.institution}</h2>
          <p className="text-[var(--accent)] font-medium mt-0.5">{item.degree}</p>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <p className="text-sm text-[var(--muted)]">{item.period}</p>
            {item.startDate && item.endDate && (
              <PosProgressBar startDate={item.startDate} endDate={item.endDate} />
            )}
          </div>

          {item.description && (
            <p className="mt-3 text-[var(--muted)] text-sm leading-relaxed">
              <HighlightKeywords text={item.description} keywords={KEYWORDS} />
            </p>
          )}

          {item.activities && (
            <p className="mt-2 text-[var(--muted)] text-sm leading-relaxed italic">
              <HighlightKeywords text={item.activities} keywords={KEYWORDS} />
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-3">
            {item.tags.map((tag) => (
              <TagWithTooltip key={tag} tag={tag} />
            ))}
          </div>

          {(item.detailUrl || item.tccUrl) && (
            <p className="mt-4 flex flex-wrap gap-4">
              {item.detailUrl && (
                <Link
                  href={item.detailUrl}
                  className="inline-flex items-center gap-2 text-[var(--accent)] font-medium hover:underline"
                >
                  Ver programa completo (sumário) →
                </Link>
              )}
              {item.tccUrl && (
                <Link
                  href={item.tccUrl}
                  className="inline-flex items-center gap-2 text-[var(--accent)] font-medium hover:underline"
                >
                  Ver TCC →
                </Link>
              )}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
