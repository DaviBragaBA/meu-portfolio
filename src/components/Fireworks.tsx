"use client";

import { useEffect, useState } from "react";

const BURST_COUNT = 6;
const PARTICLES_PER_BURST = 14;
const COLORS = ["var(--accent)", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4", "#10b981"];

function Burst({ delay, x, y }: { delay: number; x: number; y: number }) {
  const particles = Array.from({ length: PARTICLES_PER_BURST }, (_, i) => {
    const angle = (360 / PARTICLES_PER_BURST) * i + Math.random() * 15;
    const dist = 90 + Math.random() * 40;
    const endX = Math.cos((angle * Math.PI) / 180) * dist;
    const endY = Math.sin((angle * Math.PI) / 180) * dist;
    return {
      key: i,
      endX,
      endY,
      color: COLORS[i % COLORS.length],
      size: 4 + Math.floor(Math.random() * 5),
    };
  });

  return (
    <div
      className="absolute w-px h-px overflow-visible"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {particles.map(({ key, endX, endY, color, size }) => (
        <span
          key={key}
          className="absolute left-0 top-0 rounded-full opacity-0 animate-firework-particle"
          style={{
            width: size,
            height: size,
            marginLeft: -size / 2,
            marginTop: -size / 2,
            background: color,
            ["--end-x" as string]: `${endX}px`,
            ["--end-y" as string]: `${endY}px`,
            animationDelay: `${delay}ms`,
          }}
        />
      ))}
    </div>
  );
}

export function Fireworks() {
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    setBursts(
      Array.from({ length: BURST_COUNT }, (_, i) => ({
        id: i,
        x: 15 + Math.random() * 70,
        y: 10 + Math.random() * 60,
        delay: i * 350 + Math.random() * 200,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bursts.map(({ id, x, y, delay }) => (
        <Burst key={id} x={x} y={y} delay={delay} />
      ))}
    </div>
  );
}
