"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

const SECRET = "banguela";
const ALT_SECRETS = ["limite", "nubank"];

export function EasterEgg() {
  const [buffer, setBuffer] = useState("");
  const [show, setShow] = useState(false);

  const check = useCallback((str: string) => {
    const lower = str.toLowerCase();
    const match =
      lower.endsWith(SECRET) ||
      ALT_SECRETS.some((s) => lower.endsWith(s));
    if (match) {
      setShow(true);
      setBuffer("");
      setTimeout(() => setShow(false), 4000);
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const next = (buffer + e.key).slice(-20);
        setBuffer(next);
        check(next);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [buffer, check]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300"
      role="dialog"
      aria-label="Easter egg"
      onClick={() => setShow(false)}
    >
      <div
        className="mx-4 max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-xl transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)]/20">
          <Image
            src="/fotos/cachorro.jpeg"
            alt="Banguela"
            fill
            className="object-cover"
            sizes="320px"
          />
        </div>
        <p className="mt-4 text-center text-sm font-medium text-[var(--text)]">
          Esse é o Banguela, meu fiel companheiro. 🐕
        </p>
        <p className="mt-1 text-center text-xs text-[var(--muted)]">
          (você achou o easter egg!)
        </p>
      </div>
    </div>
  );
}
