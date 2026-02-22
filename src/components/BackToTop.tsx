"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const SHOW_AFTER_PX = 150;

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const onScroll = () => {
      const y = window.scrollY ?? document.documentElement.scrollTop ?? 0;
      setVisible(y > SHOW_AFTER_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll);
    };
  }, [mounted]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.documentElement.scrollTo?.({ top: 0, behavior: "smooth" });
  };

  if (!mounted || !visible) return null;

  const button = (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-[9999] rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] p-3 text-[var(--accent)] shadow-lg hover:bg-[var(--accent)] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );

  if (typeof document !== "undefined" && document.body) {
    return createPortal(button, document.body);
  }
  return button;
}
