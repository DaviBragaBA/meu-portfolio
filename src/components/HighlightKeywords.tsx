const ACCENT_CLASS = "text-[var(--accent)] font-medium";

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Keywords que devem ser destacadas só quando forem palavra inteira (ex.: sigla "IA" e não "ia" em "Inteligência"). */
const WHOLE_WORD_KEYWORDS = ["IA"];

function regexPatternForKeyword(keyword: string): string {
  const escaped = escapeRegex(keyword);
  if (WHOLE_WORD_KEYWORDS.some((w) => w.toLowerCase() === keyword.toLowerCase()))
    return `(?<!\\p{L})${escaped}(?!\\p{L})`;
  return escaped;
}

type Props = {
  text: string;
  keywords: string[];
  className?: string;
};

/**
 * Quebra o texto e envolve as palavras-chave em <span> com a cor de destaque (laranja).
 * Keywords são ordenadas por tamanho (maior primeiro) para evitar submatches.
 * A sigla "IA" só é destacada quando for palavra sozinha (não no meio de "Inteligência", "especialização", etc.).
 */
export function HighlightKeywords({ text, keywords, className = "" }: Props) {
  if (keywords.length === 0) return <span className={className}>{text}</span>;

  const sorted = [...keywords].sort((a, b) => b.length - a.length);
  const re = new RegExp(
    `(${sorted.map(regexPatternForKeyword).join("|")})`,
    "giu"
  );
  const parts = text.split(re);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        const isKeyword = sorted.some(
          (k) => k.toLowerCase() === part.toLowerCase()
        );
        if (isKeyword)
          return (
            <span key={i} className={ACCENT_CLASS}>
              {part}
            </span>
          );
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
