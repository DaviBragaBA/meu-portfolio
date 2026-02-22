"use client";

type Props = { target: number };

export function ProjectsCountUp({ target }: Props) {
  return (
    <span className="tabular-nums text-[var(--accent)] font-semibold">
      {target} projetos
    </span>
  );
}
