import Link from "next/link";
import { tcc } from "@/data/tcc";
import { HighlightPhrases } from "@/components/HighlightPhrases";

const tccDestaques = [
  "Teoria dos Jogos",
  "Design de Mecanismos",
  "leilão da mochila",
  "problema da mochila",
  "equilíbrio de Nash",
  "estratégias dominantes",
  "Lema de Myerson",
  "Paradoxo de Braess",
  "leilões de primeiro e segundo preço",
  "busca patrocinada",
  "programação dinâmica",
  "programação linear inteira",
  "algoritmo guloso",
  "bem-estar social",
  "0/1 Knapsack",
  "CPLEX",
];

export const metadata = {
  title: "TCC | Davi Braga",
  description: `Trabalho de Conclusão de Curso – ${tcc.title}. Teoria dos Jogos, Design de Mecanismos, problema da mochila. ${tcc.institution}, ${tcc.course}, ${tcc.year}.`,
};

export default function TCCPage() {
  return (
    <div className="space-y-16">
      <p className="text-sm text-[var(--muted)]">
        <Link href="/formation" className="hover:text-[var(--accent)]">
          ← Formação
        </Link>
      </p>

      {/* Cabeçalho — direto e simples */}
      <header className="border-b border-[var(--border)] pb-8">
        <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
          TCC
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl md:text-4xl leading-tight">
          {tcc.title.includes("Leilão da Mochila") ? (
            <>
              Uma Introdução ao{" "}
              <span className="text-[var(--accent)]">Leilão da Mochila</span>
            </>
          ) : (
            tcc.title
          )}
        </h1>
        {"emUmaFrase" in tcc && tcc.emUmaFrase && (
          <p className="mt-4 text-lg text-[var(--muted)] leading-relaxed max-w-2xl">
            {(tcc.emUmaFrase as string).split(/(\*[^*]+\*)/g).map((part, i) =>
              part.startsWith("*") && part.endsWith("*") ? (
                <em key={i} className="text-[var(--text)] font-medium">
                  {part.slice(1, -1)}
                </em>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </p>
        )}
        {tcc.subtitle && (
          <p className="mt-4 text-sm text-[var(--muted)]">
            {tcc.subtitle}
          </p>
        )}
        <p className="mt-4 text-sm text-[var(--muted)]">
          {tcc.institution} · {tcc.course} · {tcc.year}
        </p>
      </header>

      {/* Resumo */}
      <section>
        <h2 className="text-lg font-semibold text-[var(--text)] mb-4 border-b border-[var(--border)] pb-2">
          Resumo
        </h2>
        <p className="text-[var(--muted)] leading-relaxed">
          <HighlightPhrases text={tcc.abstract} phrases={tccDestaques} />
        </p>
        {"keywords" in tcc && tcc.keywords && (
          <p className="mt-4 text-sm text-[var(--muted)]">
            <span className="font-medium text-[var(--text)]">Palavras-chave: </span>
            {(tcc.keywords as string).split(";").map((kw, i) => (
              <span key={i}>
                {i > 0 && " · "}
                <span className="text-[var(--accent)] font-medium">{kw.trim()}</span>
              </span>
            ))}
          </p>
        )}
      </section>

      {/* Seções (Objetivo, Metodologia, Resultados) */}
      <section className="space-y-8">
        {tcc.sections.map((sec) => (
          <div key={sec.title}>
            <h2 className="text-lg font-semibold text-[var(--text)] mb-3 border-b border-[var(--border)] pb-2">
              {sec.title}
            </h2>
            <p className="text-[var(--muted)] leading-relaxed">
              <HighlightPhrases text={sec.content} phrases={tccDestaques} />
            </p>
          </div>
        ))}
      </section>

      {/* Tecnologias */}
      <section>
        <h2 className="text-lg font-semibold text-[var(--text)] mb-4 border-b border-[var(--border)] pb-2">
          Tecnologias
        </h2>
        <div className="flex flex-wrap gap-2">
          {tcc.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-block px-3 py-1.5 text-sm font-medium rounded-lg bg-[var(--border)] text-[var(--text)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Galeria de imagens */}
      {tcc.images.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-[var(--text)] mb-6 border-b border-[var(--border)] pb-2">
            Imagens do trabalho
          </h2>
          <div className="space-y-10">
            {tcc.images.map((img, i) => (
            <figure key={i} className="space-y-3">
              <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)]/20 aspect-video max-w-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-contain object-center"
                />
              </div>
              {img.caption && (
                <figcaption className="text-sm text-[var(--muted)] italic">
                  {img.caption}
                </figcaption>
              )}
            </figure>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
