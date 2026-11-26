import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const materialCache = new Map<string, THREE.MeshMatcapMaterial>();
const basicCache = new Map<string, THREE.MeshBasicMaterial>();

let clayMatcap: THREE.CanvasTexture | null = null;

function paintMatcap(): THREE.CanvasTexture {
  const s = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = s;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(s, s);
  const Lx = -0.28;
  const Ly = 0.62;
  const Lz = 0.72;
  const llen = Math.hypot(Lx, Ly, Lz);
  const lx = Lx / llen;
  const ly = Ly / llen;
  const lz = Lz / llen;
  for (let y = 0; y < s; y++) {
    for (let x = 0; x < s; x++) {
      const nx = (x / (s - 1)) * 2 - 1;
      const ny = 1 - (y / (s - 1)) * 2;
      const nz2 = 1 - nx * nx - ny * ny;
      const i = (y * s + x) * 4;
      if (nz2 < 0) {
        img.data[i] = 210;
        img.data[i + 1] = 196;
        img.data[i + 2] = 178;
        img.data[i + 3] = 255;
        continue;
      }
      const nz = Math.sqrt(nz2);
      const ndl = Math.max(0, nx * lx + ny * ly + nz * lz);
      const wrap = ndl * 0.42 + 0.58;
      const occlude = 0.82 + 0.18 * (ny * 0.5 + 0.5);
      const bounce = Math.max(0, -ny) * 0.07;
      const v = wrap * occlude + bounce;
      img.data[i] = Math.min(255, v * 255);
      img.data[i + 1] = Math.min(255, v * 248);
      img.data[i + 2] = Math.min(255, v * 236);
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.generateMipmaps = false;
  tex.minFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

function getClayMatcap() {
  if (!clayMatcap) clayMatcap = paintMatcap();
  return clayMatcap;
}

export function clay(hex: string): THREE.MeshMatcapMaterial {
  const hit = materialCache.get(hex);
  if (hit) return hit;
  const m = new THREE.MeshMatcapMaterial({
    color: hex,
    matcap: getClayMatcap(),
  });
  materialCache.set(hex, m);
  return m;
}

export function clayClone(hex: string): THREE.MeshMatcapMaterial {
  return clay(hex).clone();
}

export function glossy(hex: string): THREE.MeshMatcapMaterial {
  return clay(hex);
}

export function glow(hex: string, intensity = 1): THREE.MeshBasicMaterial {
  const key = `g${hex}|${intensity}`;
  const hit = basicCache.get(key);
  if (hit) return hit;
  const m = new THREE.MeshBasicMaterial({
    color: new THREE.Color(hex).multiplyScalar(intensity),
    toneMapped: false,
  });
  basicCache.set(key, m);
  return m;
}

export function disposeClayCaches() {
  materialCache.forEach((m) => m.dispose());
  basicCache.forEach((m) => m.dispose());
  materialCache.clear();
  basicCache.clear();
  clayMatcap?.dispose();
  clayMatcap = null;
}

const geoCache = new Map<string, THREE.BufferGeometry>();

function cached<T extends THREE.BufferGeometry>(key: string, make: () => T): T {
  const hit = geoCache.get(key);
  if (hit) return hit as T;
  const g = make();
  geoCache.set(key, g);
  return g;
}

export const G = {
  sphere: (r: number, seg = 32) => cached(`s${r}-${seg}`, () => new THREE.SphereGeometry(r, seg, seg)),
  box: (w: number, h: number, d: number) => cached(`b${w}-${h}-${d}`, () => new THREE.BoxGeometry(w, h, d)),
  rbox: (w: number, h: number, d: number, r = 0.12) =>
    cached(`rb${w}-${h}-${d}-${r}`, () => new RoundedBoxGeometry(w, h, d, 5, r)),
  capsule: (r: number, len: number, seg = 16) =>
    cached(`c${r}-${len}-${seg}`, () => new THREE.CapsuleGeometry(r, len, 8, seg)),
  cylinder: (rt: number, rb: number, h: number, seg = 28) =>
    cached(`y${rt}-${rb}-${h}-${seg}`, () => new THREE.CylinderGeometry(rt, rb, h, seg)),
  torus: (r: number, tube: number, arc = Math.PI * 2) =>
    cached(`t${r}-${tube}-${arc}`, () => new THREE.TorusGeometry(r, tube, 14, 32, arc)),
  plane: (w: number, h: number) => cached(`p${w}-${h}`, () => new THREE.PlaneGeometry(w, h)),
};

export function mesh(geo: THREE.BufferGeometry, hex: string, x = 0, y = 0, z = 0): THREE.Mesh {
  const m = new THREE.Mesh(geo, clay(hex));
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export function bone(radius: number, length: number, hex: string): THREE.Mesh {
  const mid = Math.max(0.001, length - radius * 2);
  const m = new THREE.Mesh(G.capsule(radius, mid), clay(hex));
  m.position.y = -length / 2;
  m.castShadow = true;
  return m;
}

export function contactShadow(radius: number, opacity = 0.32): THREE.Mesh {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 6, 64, 64, 64);
  g.addColorStop(0, `rgba(18,10,6,${opacity})`);
  g.addColorStop(0.55, `rgba(18,10,6,${opacity * 0.35})`);
  g.addColorStop(1, "rgba(18,10,6,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(canvas);
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
  const m = new THREE.Mesh(G.plane(radius * 2, radius * 2), mat);
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.006;
  m.renderOrder = 1;
  return m;
}

function softDisc(hex = "#ffe6c4"): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, hex);
  g.addColorStop(0.35, hex + "99");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function woodFloorTexture(): THREE.CanvasTexture {
  const s = 512;
  const canvas = document.createElement("canvas");
  canvas.width = s;
  canvas.height = s;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#cbb089";
  ctx.fillRect(0, 0, s, s);
  const plank = s / 8;
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = i % 2 ? "#c4a67a" : "#d2b48c";
    ctx.fillRect(i * plank, 0, plank - 2, s);
    ctx.fillStyle = "rgba(90,50,20,0.18)";
    ctx.fillRect((i + 1) * plank - 2, 0, 2, s);
    for (let y = 0; y < 18; y++) {
      ctx.strokeStyle = `rgba(90,50,20,${0.04 + Math.random() * 0.05})`;
      ctx.beginPath();
      ctx.moveTo(i * plank + 4, y * 30 + Math.random() * 20);
      ctx.quadraticCurveTo(i * plank + plank * 0.5, y * 30 + 40, i * plank + plank - 4, y * 30 + 10);
      ctx.stroke();
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(14, 4);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

export function wallTexture(hex: string): THREE.CanvasTexture {
  const s = 256;
  const canvas = document.createElement("canvas");
  canvas.width = s;
  canvas.height = s;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = hex;
  ctx.fillRect(0, 0, s, s);
  for (let i = 0; i < 900; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.045})`;
    ctx.fillRect(Math.random() * s, Math.random() * s, 2, 2);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 3);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function screenTexture(): THREE.CanvasTexture {
  const w = 512;
  const h = 288;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#0c1822");
  g.addColorStop(1, "#163044");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  const bars = [0.55, 0.72, 0.4, 0.88, 0.62, 0.5, 0.78];
  bars.forEach((v, i) => {
    const bh = v * 140;
    ctx.fillStyle = i % 2 ? "#7ee2c9" : "#e07d4a";
    ctx.fillRect(48 + i * 62, 200 - bh, 40, bh);
  });
  ctx.strokeStyle = "rgba(126,226,201,0.55)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(40, 70);
  for (let x = 0; x < 10; x++) ctx.lineTo(40 + x * 48, 70 + Math.sin(x * 0.9) * 22);
  ctx.stroke();
  ctx.fillStyle = "#7ee2c9";
  ctx.font = "600 22px ui-sans-serif, system-ui";
  ctx.fillText("LIMIT · BR  MX  COL", 36, 42);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function makeDust(count = 180): THREE.Points {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = Math.random() * 48;
    pos[i * 3 + 1] = 0.25 + Math.random() * 2.7;
    pos[i * 3 + 2] = -2.6 + Math.random() * 5.2;
  }
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({
    map: softDisc("#ffe8c8"),
    color: "#ffe6c4",
    size: 0.055,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
  });
  const p = new THREE.Points(geo, mat);
  p.name = "dust";
  return p;
}

export const PALETTE = {
  skin: "#e8b48a",
  skinShade: "#d49a70",
  hair: "#24140e",
  hairHi: "#3a2418",
  shirt: "#2a6a45",
  shirtDark: "#1e4d32",
  pants: "#2a3144",
  shoe: "#f4f0e6",
  shoeSole: "#d5d0c2",
  eyeWhite: "#fffaf3",
  iris: "#3d2416",
  pupil: "#0c0705",
  mouth: "#9a4540",
  wood: "#b57a48",
  woodDark: "#7a4e2e",
  floor: "#cbb089",
  wall: "#f3ece2",
  wallB: "#efe6da",
  cream: "#f5efe6",
  deskTop: "#f7f4ee",
  chair: "#f3efe8",
  rug: "#d45d3a",
  sofa: "#4e7f9e",
  sofaDark: "#3c6784",
  plant: "#4a9a52",
  pot: "#c05a38",
  screen: "#121820",
  screenGlow: "#7ee2c9",
  metal: "#9aa3b4",
  dog: "#e0bc8c",
  dogLight: "#f6ead4",
  dogDark: "#8a6238",
  accent: "#e07d4a",
  book1: "#c45c26",
  book2: "#3d6b8e",
  book3: "#7a4f8e",
  book4: "#3f7a58",
  city: "#2e3348",
  cityLit: "#4a5168",
  sky: "#ffb070",
  lamp: "#ffe2a8",
};
