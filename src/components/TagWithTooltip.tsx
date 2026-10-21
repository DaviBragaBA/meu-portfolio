import { getTagTitle } from "@/data/tag-descriptions";

type Props = { tag: string };

export function TagWithTooltip({ tag }: Props) {
  const description = getTagTitle(tag);
  return (
    <span className="relative inline-block group">
      <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-md bg-(--border) text-(--muted)">
        {tag}
      </span>
      <span
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs rounded-lg bg-(--text) text-(--bg) opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150 z-50 max-w-[220px] text-center shadow-lg pointer-events-none whitespace-normal"
        role="tooltip"
      >
        {description}
      </span>
    </span>
  );
}
