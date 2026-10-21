"use client";

type Props = { target: number };

export function ProjectsCountUp({ target }: Props) {
  return (
    <span className="tabular-nums text-(--accent) font-semibold">
      {target} projetos
    </span>
  );
}
