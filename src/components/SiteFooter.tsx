import Link from "next/link";
import { lastUpdated } from "@/data/site";
import { personal } from "@/data/personal";

const footerLinks = [
  { href: "/", label: "Início" },
  { href: "/en", label: "English" },
  { href: "/projects", label: "Work" },
  { href: "/projetos", label: "Projetos" },
  { href: "/formation", label: "Formação" },
  { href: "/tcc", label: "TCC" },
  { href: "/skills", label: "Competências" },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 pt-10 pb-6 border-t border-[var(--border)]">
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
        {/* Marca + contato */}
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-[var(--text)]">
              {personal.fullName}
            </p>
            <p className="text-xs text-[var(--muted)] mt-0.5">
              Business Analyst · Core Limit Policies
            </p>
          </div>
          <div className="flex flex-col gap-1.5 text-sm text-[var(--muted)]">
            <a
              href={`mailto:${personal.email}`}
              className="text-[var(--accent)] hover:underline w-fit"
            >
              {personal.email}
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline w-fit"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Navegação */}
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
            Navegação
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {footerLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-[var(--muted)] hover:text-[var(--accent)] hover:underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[var(--border)]/60 text-center text-xs text-[var(--muted)]/80">
        Última atualização: {lastUpdated}
      </div>
    </footer>
  );
}
