"use client";

type Props = { startDate: string; endDate: string };

export function PosProgressBar({ startDate, endDate }: Props) {
  const start = new Date(startDate + "-01").getTime();
  const end = new Date(endDate + "-01").getTime();
  const now = Date.now();
  const total = end - start;
  const elapsed = now - start;
  const percent = total <= 0 ? 0 : Math.min(100, Math.max(0, (elapsed / total) * 100));

  return (
    <div className="flex items-center gap-3 min-w-0 flex-1">
      <div className="h-2.5 flex-1 min-w-[100px] max-w-[180px] overflow-hidden rounded-full bg-[var(--border)] border border-[var(--border)]">
        <div
          className="h-full min-w-0 rounded-full bg-[var(--accent)] transition-[width] duration-500 ease-out"
          style={{ width: `${Math.max(percent, 2)}%` }}
          aria-hidden
        />
      </div>
      <span className="text-xs tabular-nums text-[var(--muted)] shrink-0 w-9">
        {Math.round(percent)}%
      </span>
    </div>
  );
}
