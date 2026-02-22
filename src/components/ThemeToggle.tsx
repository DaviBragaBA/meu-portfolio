"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";
type Theme = "light" | "dark" | "terminal";

const ORDER: Theme[] = ["dark", "light", "terminal"];

function applyTheme(value: Theme) {
  document.documentElement.setAttribute("data-theme", value);
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch (_) {}
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored && ORDER.includes(stored)) return stored;
  const fromDom = document.documentElement.getAttribute("data-theme") as Theme | null;
  if (fromDom && ORDER.includes(fromDom)) return fromDom;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const cycle = () => {
    const i = ORDER.indexOf(theme);
    const next = ORDER[(i + 1) % ORDER.length];
    setTheme(next);
  };

  const labels: Record<Theme, string> = {
    dark: "Usar tema claro",
    light: "Testar tema surpresa",
    terminal: "Usar tema escuro",
  };

  return (
    <button
      type="button"
      onClick={cycle}
      className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--border)]/50 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
      title={labels[theme]}
      aria-label={labels[theme]}
    >
      {theme === "dark" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      )}
      {theme === "terminal" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      )}
      {theme === "light" && (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
