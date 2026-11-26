"use client";

import { useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { buildApartment, roomAt, WALK_Z } from "./Apartment";
import { DaviPuppet, Banguela } from "./DaviPuppet";
import { disposeClayCaches } from "./clay";
import { ACTS } from "./StoryPanels";

gsap.registerPlugin(ScrollTrigger);

type CamState = { px: number; py: number; pz: number; tx: number; ty: number; tz: number };

export const ACT_TIMES: Record<(typeof ACTS)[number]["id"], number> = {
  desk: 0,
  living: 2.8,
  war: 4.5,
  corridor: 5.8,
  workshop: 7.5,
  studio: 9.0,
  balcony: 10.6,
};
export const STORY_DURATION = 11.6;

const CREAM = "#f5efe6";
const FOG: Record<string, string> = {
  desk: CREAM,
  living: "#f3ebe0",
  war: "#efe8e2",
  corridor: "#f2ebe3",
  workshop: "#f1e8dc",
  studio: "#efe6dc",
  balcony: "#f6e6d4",
};

function look(tx: number, ty: number, tz: number, back = 9.2, lift = 3.85, side = -1.15): CamState {
  return { px: tx + side, py: ty + lift, pz: tz + back, tx, ty, tz };
}

export function StoryScene() {
  useEffect(() => {
    const track = document.getElementById("story-track");
    const stage = document.getElementById("story-stage");
    const host = document.getElementById("story-canvas-host");
    if (!track || !stage || !host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = document.createElement("canvas");
    let renderer: THREE.WebGLRenderer;
    try {
      if (reduced) throw new Error("reduced-motion");
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
    } catch {
      track.classList.add("story--static");
      return;
    }
    track.classList.add("story--live");
    host.appendChild(canvas);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.setClearColor(CREAM, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.05, 80);

    const apt = buildApartment();
    scene.add(apt.group);

    const davi = new DaviPuppet();
    scene.add(davi.root);
    const dog = new Banguela();
    scene.add(dog.root);

    const desk = roomAt("desk");
    const living = roomAt("living");
    const war = roomAt("war");
    const corridor = roomAt("corridor");
    const workshop = roomAt("workshop");
    const studio = roomAt("studio");
    const balcony = roomAt("balcony");

    const chairPos = apt.chair.position.clone();
    davi.root.position.set(chairPos.x, 0, chairPos.z);
    davi.state = { seated: 1, walk: 0, look: 1, facing: 2.05, wave: 0, lean: 0 };

    dog.root.position.set(living.x + 0.55, 0, 0.45);
    dog.root.rotation.y = -0.45;

    const fogColor = new THREE.Color(FOG.desk);
    scene.background = fogColor;
    scene.fog = new THREE.Fog(fogColor, 16, 36);

    const cam: CamState = look(chairPos.x + 0.7, 1.05, chairPos.z - 0.25, 8.6, 3.7, -2.35);
    const camTarget = new THREE.Vector3();
    const camDir = new THREE.Vector3();
    let distScale = 1;

    const resize = () => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const a = camera.aspect;
      distScale = a < 1 ? THREE.MathUtils.clamp(Math.pow(1.25 / a, 0.9), 1, 2.3) : a < 1.4 ? 1.12 : 1;
    };
    resize();
    window.addEventListener("resize", resize);

    const lookX = gsap.quickTo(davi.lookTarget, "x", { duration: 0.42, ease: "power3.out" });
    const lookY = gsap.quickTo(davi.lookTarget, "y", { duration: 0.42, ease: "power3.out" });
    let lastPointer = -10;
    const onPointer = (e: PointerEvent) => {
      lastPointer = performance.now() / 1000;
      lookX((e.clientX / window.innerWidth) * 2 - 1);
      lookY(-((e.clientY / window.innerHeight) * 2 - 1));
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const fx = { corridor: 0, chairBack: 0, monitorGlow: 1 };
    const monitorMat = apt.monitorFront.material as THREE.MeshBasicMaterial;
    monitorMat.transparent = true;

    const panels = Array.from(track.querySelectorAll<HTMLElement>("[data-panel]"));
    const panelOf = (id: string) => panels.find((p) => p.dataset.panel === id)!;
    const dots = Array.from(track.querySelectorAll<HTMLElement>("[data-dot]"));
    const hint = track.querySelector<HTMLElement>("[data-scroll-hint]");

    gsap.set(panels, { autoAlpha: 0, y: 28 });
    gsap.set(panelOf("desk"), { autoAlpha: 1, y: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: stage,
          pinSpacing: false,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const t = self.progress * STORY_DURATION;
            let active = 0;
            let activeId: keyof typeof FOG = "desk";
            (Object.keys(ACT_TIMES) as (keyof typeof ACT_TIMES)[]).forEach((k, i) => {
              if (t >= ACT_TIMES[k] - 0.35) {
                active = i;
                activeId = k;
              }
            });
            dots.forEach((d, i) => d.classList.toggle("is-active", i === active));
            fogColor.lerp(new THREE.Color(FOG[activeId]), 0.08);
            scene.background = fogColor;
            if (scene.fog instanceof THREE.Fog) scene.fog.color.copy(fogColor);
          },
        },
      });

      const D = davi.state;
      const P = davi.root.position;
      const showPanel = (id: string, at: number) =>
        tl.to(panelOf(id), { autoAlpha: 1, y: 0, duration: 0.32, ease: "power2.out" }, at);
      const hidePanel = (id: string, at: number) =>
        tl.to(panelOf(id), { autoAlpha: 0, y: -20, duration: 0.26, ease: "power2.in" }, at);

      tl.addLabel("desk", 0);
      tl.to({}, { duration: 1 }, 0);
      if (hint) tl.to(hint, { autoAlpha: 0, duration: 0.18 }, 0.08);

      hidePanel("desk", 1.0);
      tl.to(fx, { monitorGlow: 0.12, duration: 0.55 }, 1.0);
      tl.to(D, { look: 0.15, duration: 0.45 }, 1.0);
      tl.to(fx, { chairBack: 1, duration: 0.45, ease: "power2.out" }, 1.05);
      tl.to(P, { z: chairPos.z + 0.15, duration: 0.4 }, 1.05);
      tl.to(D, { seated: 0, duration: 0.65, ease: "power2.inOut" }, 1.2);
      tl.to(cam, { ...look(chairPos.x + 1.1, 1.15, 0.35), duration: 1.0, ease: "power1.inOut" }, 1.0);
      tl.to(D, { facing: Math.PI / 2, duration: 0.28 }, 1.82);
      tl.to(D, { walk: 1, duration: 0.18 }, 1.88);
      tl.to(P, { x: desk.x + 2.55, z: WALK_Z, duration: 0.7, ease: "power1.inOut" }, 1.88);

      tl.to(P, { x: living.x - 1.0, duration: 1.0 }, 2.0);
      tl.to(cam, { ...look(living.x + 0.1, 1.05, -0.2), duration: 1.0, ease: "power1.inOut" }, 1.9);
      tl.to(D, { walk: 0, duration: 0.22 }, 2.75);
      tl.to(D, { facing: 0.25, look: 0.85, duration: 0.32, ease: "power2.out" }, 2.8);
      tl.addLabel("living", ACT_TIMES.living);
      showPanel("living", 2.7);
      tl.to({}, { duration: 1 }, 2.8);
      hidePanel("living", 3.8);

      tl.to(D, { facing: Math.PI / 2, look: 0.1, duration: 0.2 }, 3.85);
      tl.to(D, { walk: 1, duration: 0.14 }, 3.9);
      tl.to(P, { x: war.x - 0.45, z: WALK_Z - 0.55, duration: 0.62 }, 3.9);
      tl.to(cam, { ...look(war.x, 1.25, -0.7), duration: 0.8, ease: "power1.inOut" }, 3.8);
      tl.to(D, { walk: 0, duration: 0.14 }, 4.45);
      tl.to(D, { facing: 2.6, duration: 0.28, ease: "power2.out" }, 4.5);
      tl.addLabel("war", ACT_TIMES.war);
      showPanel("war", 4.45);
      tl.to({}, { duration: 1 }, 4.5);
      hidePanel("war", 5.5);

      const corStart = corridor.x - corridor.w / 2 + 0.6;
      const corEnd = corridor.x + corridor.w / 2 - 0.6;
      tl.to(D, { facing: Math.PI / 2, duration: 0.18 }, 5.55);
      tl.to(D, { walk: 1, duration: 0.14 }, 5.6);
      tl.to(P, { x: corStart, z: WALK_Z, duration: 0.38 }, 5.6);
      tl.to(P, { x: corEnd, duration: 1.4 }, 6.0);
      tl.to(fx, { corridor: 1, duration: 1.4 }, 6.0);
      tl.to(cam, { ...look(corStart + 0.4, 1.15, -0.15), duration: 0.48, ease: "power1.inOut" }, 5.55);
      tl.to(cam, { ...look(corEnd + 0.4, 1.15, -0.15), duration: 1.4 }, 6.0);
      tl.addLabel("corridor", ACT_TIMES.corridor);
      showPanel("corridor", 5.75);
      const items = Array.from(panelOf("corridor").querySelectorAll<HTMLElement>("[data-item]"));
      gsap.set(items, { opacity: 0.22, x: -12 });
      items.forEach((it, i) => {
        tl.to(it, { opacity: 1, x: 0, duration: 0.18, ease: "power2.out" }, 6.0 + (i / Math.max(1, items.length - 1)) * 1.2);
      });
      hidePanel("corridor", 7.35);

      tl.to(P, { x: workshop.x - 0.35, z: -0.15, duration: 0.58 }, 7.4);
      tl.to(cam, { ...look(workshop.x + 0.15, 1.2, -0.7), duration: 0.68, ease: "power1.inOut" }, 7.35);
      tl.to(D, { walk: 0, duration: 0.14 }, 7.95);
      tl.to(D, { facing: 2.45, duration: 0.28, ease: "power2.out" }, 8.0);
      tl.addLabel("workshop", ACT_TIMES.workshop);
      showPanel("workshop", 7.9);
      tl.to({}, { duration: 1 }, 8.0);
      hidePanel("workshop", 8.95);

      tl.to(D, { facing: Math.PI / 2, duration: 0.18 }, 9.0);
      tl.to(D, { walk: 1, duration: 0.14 }, 9.05);
      tl.to(P, { x: studio.x + 0.35, z: 0.25, duration: 0.58 }, 9.05);
      tl.to(cam, { ...look(studio.x + 0.15, 1.2, -0.7), duration: 0.68, ease: "power1.inOut" }, 8.95);
      tl.to(D, { walk: 0, duration: 0.14 }, 9.6);
      tl.to(D, { facing: -0.85, look: 0.7, duration: 0.28, ease: "power2.out" }, 9.65);
      tl.addLabel("studio", ACT_TIMES.studio);
      showPanel("studio", 9.55);
      tl.to({}, { duration: 1 }, 9.65);
      hidePanel("studio", 10.55);

      tl.to(D, { facing: Math.PI / 2, look: 0.2, duration: 0.18 }, 10.6);
      tl.to(D, { walk: 1, duration: 0.14 }, 10.65);
      tl.to(P, { x: balcony.x, z: -0.85, duration: 0.58 }, 10.65);
      tl.to(cam, { ...look(balcony.x + 0.15, 1.35, -2.4, 8.4, 3.4, -0.4), duration: 0.68, ease: "power1.inOut" }, 10.55);
      tl.to(D, { walk: 0, duration: 0.14 }, 11.2);
      tl.to(D, { facing: Math.PI, lean: 1, duration: 0.28, ease: "power2.out" }, 11.25);
      tl.addLabel("balcony", ACT_TIMES.balcony);
      showPanel("balcony", 11.15);
      tl.to(D, { facing: Math.PI * 2, lean: 0, duration: 0.32, ease: "power2.inOut" }, 11.28);
      tl.to(D, { wave: 1, look: 1, duration: 0.22 }, 11.35);
      tl.to(cam, { pz: cam.pz - 1.1, tz: -1.1, ty: 1.2, duration: 0.28 }, 11.3);
      tl.to({}, { duration: 0.01 }, STORY_DURATION - 0.01);

      dots.forEach((d, i) => {
        const id = ACTS[i].id;
        d.addEventListener("click", () => {
          const st = tl.scrollTrigger!;
          const p = ACT_TIMES[id] / STORY_DURATION;
          window.scrollTo({ top: st.start + (st.end - st.start) * p, behavior: "smooth" });
        });
      });
    }, track);

    const clock = new THREE.Clock();
    let running = true;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
      if (running && raf === 0) loop();
    });
    io.observe(stage);

    const loop = () => {
      if (!running) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      if (t - lastPointer > 3.2) {
        lookX(Math.sin(t * 0.45) * 0.5);
        lookY(Math.sin(t * 0.3) * 0.18);
      }

      davi.update(dt, t);
      dog.update(t);
      apt.update(t, fx.corridor);
      apt.chair.position.z = chairPos.z - fx.chairBack * 0.35;
      monitorMat.opacity = 0.25 + fx.monitorGlow * 0.75;

      camTarget.set(cam.tx, cam.ty, cam.tz);
      camDir.set(cam.px - cam.tx, cam.py - cam.ty, cam.pz - cam.tz).multiplyScalar(distScale);
      camera.position.copy(camTarget).add(camDir);
      camera.position.x += davi.lookTarget.x * 0.35;
      camera.position.y += davi.lookTarget.y * 0.18;
      camera.lookAt(camTarget);

      renderer.render(scene, camera);
    };
    loop();

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      window.clearTimeout(refreshId);
      cancelAnimationFrame(raf);
      running = false;
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      ctx.revert();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          const m = o.material as THREE.Material | THREE.Material[];
          if (Array.isArray(m)) m.forEach((x) => x.dispose());
          else m.dispose();
        }
      });
      disposeClayCaches();
      renderer.dispose();
      canvas.remove();
      track.classList.remove("story--live");
    };
  }, []);

  return null;
}
