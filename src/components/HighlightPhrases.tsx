"use client";

/**
 * Renderiza um texto destacando as frases indicadas com a cor de destaque (accent).
 * Uso: formação, palavras-chave, etc. em PT e EN.
 */
export function HighlightPhrases({
  text,
  phrases,
}: {
  text: string;
  phrases: string[];
}) {
  const parts: React.ReactNode[] = [];
  let rest = text;
  while (rest.length > 0) {
    const matching = phrases
      .filter((p) => rest.includes(p))
      .map((p) => ({ p, i: rest.indexOf(p) }))
      .filter((x) => x.i >= 0)
      .sort((a, b) => a.i - b.i)[0];
    if (!matching) {
      parts.push(rest);
      break;
    }
    const { p: match, i } = matching;
    if (i > 0) parts.push(rest.slice(0, i));
    parts.push(
      <span key={`${match}-${parts.length}`} className="text-[var(--accent)] font-medium">
        {match}
      </span>
    );
    rest = rest.slice(i + match.length);
  }
  return <>{parts}</>;
}
