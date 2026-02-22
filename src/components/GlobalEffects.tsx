"use client";

import { ScrollProgress } from "./ScrollProgress";
import { EasterEgg } from "./EasterEgg";
import { BackToTop } from "./BackToTop";

export function GlobalEffects() {
  return (
    <>
      <ScrollProgress />
      <EasterEgg />
      <BackToTop />
    </>
  );
}
