"use client";

import { personal } from "@/data/personal";
import { splashHighlights } from "@/data/site";
import { Fireworks } from "./Fireworks";

export const SPLASH_STORAGE_KEY = "davi-braga-splash-seen";

export function setSplashSeen(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SPLASH_STORAGE_KEY, "1");
}

export function clearSplashSeen(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SPLASH_STORAGE_KEY);
}

export function SplashScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 py-12 bg-[var(--bg)]/95 backdrop-blur"
      role="dialog"
      aria-label="Bem-vindo"
    >
      <Fireworks />

      <div className="relative z-10 flex flex-col items-center text-center space-y-8 w-full max-w-2xl px-2">
        <div className="splash-fade-in opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text)]">
            {personal.fullName}
          </h1>
        </div>

        <ul className="flex flex-wrap justify-center gap-2 sm:gap-3 text-sm text-[var(--muted)] splash-fade-in opacity-0 w-full pt-8" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
          {splashHighlights.map((item) => (
            <li
              key={item.text}
              className="group/tag relative list-none"
            >
              <span
                className="inline-block px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)]/90 hover:border-[var(--accent)]/60 hover:text-[var(--text)] transition-colors cursor-default"
                title={`${item.text} : ${item.category}`}
              >
                {item.text}
              </span>
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-[var(--text)] text-[var(--bg)] opacity-0 pointer-events-none whitespace-nowrap transition-opacity duration-150 group-hover/tag:opacity-100 z-20 shadow-lg">
                {item.category}
              </span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onEnter}
          className="mt-4 px-8 py-3 rounded-full bg-[var(--accent)] text-white font-semibold text-sm hover:opacity-90 transition-opacity splash-fade-in opacity-0"
          style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export function hasSeenSplash(): boolean {
  if (typeof window === "undefined") return true;
  return !!sessionStorage.getItem(SPLASH_STORAGE_KEY);
}
