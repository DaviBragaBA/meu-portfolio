"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Início" },
  { href: "/en", label: "English" },
  { href: "/projects", label: "Work" },
  { href: "/projetos", label: "Projetos" },
  { href: "/formation", label: "Formação" },
  { href: "/tcc", label: "TCC" },
  { href: "/skills", label: "Competências" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[var(--border)] sticky top-0 z-10 bg-[var(--bg)]/95 backdrop-blur">
      <nav className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap items-center gap-2 sm:gap-6" aria-label="Menu">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            <span className="text-xs text-[var(--muted)] whitespace-nowrap">
              Experimente outro tema
            </span>
            <span
              className="inline-block text-[var(--accent)] text-xl sm:text-2xl font-bold arrow-point-theme"
              aria-hidden
            >
              →
            </span>
          </div>
          <ThemeToggle />
        </div>
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-sm font-medium transition-colors ${
              pathname === href
                ? "text-[var(--accent)]"
                : "text-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
