"use client";

import { useState } from "react";

export function TestVsControl() {
  const [hover, setHover] = useState<"test" | "control" | null>(null);

  return (
    <div
      className="rounded-xl border border-(--border) bg-(--border)/10 p-4"
      onMouseLeave={() => setHover(null)}
    >
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-(--muted)">
        Test vs control
      </p>
      <div className="flex gap-2">
        <div
          className="flex-1"
          onMouseEnter={() => setHover("test")}
        >
          <div className="h-10 w-full rounded-lg bg-(--accent)/80 transition-[height] duration-300 ease-out" style={{ height: hover === "test" ? "2.5rem" : hover === "control" ? "1rem" : "1.75rem" }} />
          <p className="mt-1.5 text-xs text-(--muted)">Test</p>
        </div>
        <div
          className="flex-1"
          onMouseEnter={() => setHover("control")}
        >
          <div className="h-10 w-full rounded-lg bg-(--muted)/50 transition-[height] duration-300 ease-out" style={{ height: hover === "control" ? "2.5rem" : hover === "test" ? "1rem" : "1.75rem" }} />
          <p className="mt-1.5 text-xs text-(--muted)">Control</p>
        </div>
      </div>
    </div>
  );
}
