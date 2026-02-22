import type { Experience } from "@/data/experience";
import { HighlightKeywords } from "@/components/HighlightKeywords";
import { TagWithTooltip } from "@/components/TagWithTooltip";

const KEYWORDS = [
  "métricas de cartão",
  "Databricks",
  "SQL",
  "experimentos",
  "dashboards",
  "Python",
  "Metabase",
  "HubSpot",
  "dados",
  "KPIs",
  "A/B Testing",
  "análise de dados",
  "relatórios",
  "funil de vendas",
  "Customer Success",
];

type Props = { experience: Experience };

export function ExperienceCard({ experience }: Props) {
  return (
    <article className="border-b border-[var(--border)] pb-10 last:border-0">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Logo: coloque imagens em public/ e use logo: "/nubank.png" no experience.ts */}
        {experience.logo ? (
          <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-[var(--border)]">
            <img
              src={experience.logo}
              alt={experience.company}
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--border)] flex items-center justify-center text-lg font-bold text-[var(--muted)]">
            {experience.company.charAt(0)}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold">{experience.company}</h2>
          {experience.period && (
            <p className="text-sm text-[var(--muted)] mt-0.5">
              {experience.period}
            </p>
          )}
          <p className="mt-2 text-[var(--muted)]">
            <HighlightKeywords text={experience.description} keywords={KEYWORDS} />
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {experience.tags.map((tag) => (
              <TagWithTooltip key={tag} tag={tag} />
            ))}
          </div>

          {experience.highlights.length > 0 && (
            <ul className="mt-4 space-y-2 list-disc list-inside text-sm text-[var(--muted)]">
              {experience.highlights.map((item, i) => (
                <li key={i} className="leading-relaxed">
                  <HighlightKeywords text={item} keywords={KEYWORDS} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}
