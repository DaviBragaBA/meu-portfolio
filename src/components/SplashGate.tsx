"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SplashScreen, setSplashSeen, SPLASH_STORAGE_KEY } from "./SplashScreen";

const SPLASH_ENABLED = true;

export function SplashGate() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!SPLASH_ENABLED || pathname !== "/") return;

    const run = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("intro") === "1") {
        sessionStorage.removeItem(SPLASH_STORAGE_KEY);
        window.history.replaceState({}, "", "/");
        setShow(true);
        return;
      }

      const nav = performance.getEntriesByType?.("navigation")?.[0] as PerformanceNavigationTiming | undefined;
      const isReload = nav?.type === "reload";
      if (isReload) sessionStorage.removeItem(SPLASH_STORAGE_KEY);
      const neverSeen = !sessionStorage.getItem(SPLASH_STORAGE_KEY);
      if (neverSeen) setShow(true);
    };

    const id = setTimeout(run, 0);
    return () => clearTimeout(id);
  }, [pathname]);

  const handleEnter = () => {
    setSplashSeen();
    setShow(false);
  };

  if (!SPLASH_ENABLED || !show) return null;

  return <SplashScreen onEnter={handleEnter} />;
}
