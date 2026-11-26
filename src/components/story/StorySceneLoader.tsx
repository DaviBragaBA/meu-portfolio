"use client";

import dynamic from "next/dynamic";

/** Three.js/GSAP só no browser. */
export const StorySceneLoader = dynamic(() => import("./StoryScene").then((m) => m.StoryScene), {
  ssr: false,
});
