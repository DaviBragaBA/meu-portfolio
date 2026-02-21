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
      <nav className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-6" aria-label="Menu">
        <ThemeToggle />
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
