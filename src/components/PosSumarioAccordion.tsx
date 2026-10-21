"use client";

import { useState } from "react";
import type { ModuloPos } from "@/data/pos-sumario";

type Props = { modulos: ModuloPos[] };

export function PosSumarioAccordion({ modulos }: Props) {
  const [openId, setOpenId] = useState<string | null>(modulos[0]?.id ?? null);

  return (
    <div className="rounded-xl border border-(--border) overflow-hidden">
      {modulos.map((mod) => {
        const isOpen = openId === mod.id;
        return (
          <div
            key={mod.id}
            className="border-b border-(--border) last:border-b-0"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : mod.id)}
              className="w-full flex items-center gap-3 px-5 py-4 text-left font-medium text-(--text) transition-colors"
            >
              <span
                className="shrink-0 text-(--muted) transition-transform"
                aria-hidden
              >
                {isOpen ? "▼" : "▶"}
              </span>
              <span className="capitalize">{mod.titulo}</span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pl-[calc(0.75rem+1em+0.75rem)] sm:pl-12">
                <p className="text-(--muted) text-sm leading-relaxed">
                  {mod.descricao}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
