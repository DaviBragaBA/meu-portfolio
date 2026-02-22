"use client";

const PAISES = 3;

export function HeroCountUp() {
  return (
    <span className="tabular-nums text-[var(--accent)] font-semibold">
      {PAISES} países
    </span>
  );
}
