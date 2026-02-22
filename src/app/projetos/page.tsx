import Link from "next/link";
import { projects } from "@/data/projects";
import { personalProjects } from "@/data/personal-projects";
import { TagWithTooltip } from "@/components/TagWithTooltip";

export const metadata = {
  title: "Projetos | Davi Braga",
  description:
    "Projetos em Core Limit Policies (monitoria, dashboards, compliance) e projetos pessoais: guias em HTML, diagramas de fluxo, documentação e materiais de estudo.",
};

export default function ProjetosPage() {
  return (
    <div className="space-y-14">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--muted)]">
        Projetos
      </h1>

      <section>
        <h2 className="text-lg font-semibold text-[var(--text)] mb-6 border-b border-[var(--border)] pb-2">
          Trabalho (Core Limit Policies)
        </h2>
        <div className="space-y-10">
          {projects.map((project) => (
            <article
              key={project.id}
              className="border-b border-[var(--border)] pb-10 last:border-0"
            >
              <p className="text-sm text-[var(--muted)] mb-1">{project.context}</p>
              <h3 className="text-xl font-semibold text-[var(--text)] mb-2">
                {project.title}
              </h3>
              <p className="text-[var(--muted)] leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <TagWithTooltip key={tag} tag={tag} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[var(--text)] mb-6 border-b border-[var(--border)] pb-2">
          Projetos pessoais
        </h2>
        <p className="text-sm text-[var(--muted)] mb-6">
          Guias, diagramas, templates e conteúdos de estudo em HTML que criei e
          disponibilizo nos links abaixo.
        </p>
        <div className="space-y-8">
          {personalProjects.map((proj) => (
            <article
              key={proj.id}
              className="border-b border-[var(--border)] pb-8 last:border-0"
            >
              <h3 className="text-lg font-semibold text-[var(--text)] mb-2">
                {proj.url ? (
                  <Link
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] hover:underline"
                  >
                    {proj.title} →
                  </Link>
                ) : (
                  proj.title
                )}
              </h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed mb-3">
                {proj.description}
              </p>
              {Array.from(new Set(proj.tags)).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(proj.tags)).map((tag) => (
                    <TagWithTooltip key={tag} tag={tag} />
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
