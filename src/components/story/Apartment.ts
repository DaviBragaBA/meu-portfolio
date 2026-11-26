import * as THREE from "three";
import {
  G,
  PALETTE as P,
  clayClone,
  glow,
  mesh,
  screenTexture,
  wallTexture,
  woodFloorTexture,
} from "./clay";

export const ROOM_W = 6;
export const ROOM_D = 6;
export const WALL_H = 3.15;

export type RoomId = "desk" | "living" | "war" | "corridor" | "workshop" | "studio" | "balcony";
export type Room = { id: RoomId; x: number; w: number };

export const ROOMS: Room[] = (() => {
  const widths: [RoomId, number][] = [
    ["desk", ROOM_W],
    ["living", ROOM_W],
    ["war", ROOM_W],
    ["corridor", 9],
    ["workshop", ROOM_W],
    ["studio", ROOM_W],
    ["balcony", ROOM_W],
  ];
  let x = 0;
  return widths.map(([id, w]) => {
    const room = { id, x: x + w / 2, w };
    x += w;
    return room;
  });
})();

export const roomAt = (id: RoomId) => ROOMS.find((r) => r.id === id)!;
export const WALK_Z = 1.15;

export type ApartmentHandles = {
  group: THREE.Group;
  doorLamps: THREE.Mesh[];
  screens: THREE.Mesh[];
  agents: THREE.Mesh[];
  monitorFront: THREE.Mesh;
  chair: THREE.Group;
  update: (elapsed: number, corridorProgress: number) => void;
};

function plant(x: number, z: number, scale = 1) {
  const g = new THREE.Group();
  g.add(mesh(G.cylinder(0.16 * scale, 0.12 * scale, 0.28 * scale, 16), P.pot, x, 0.14 * scale, z));
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const leaf = mesh(
      G.sphere(0.11 * scale, 12),
      P.plant,
      x + Math.cos(a) * 0.12 * scale,
      0.42 * scale + (i % 2) * 0.1 * scale,
      z + Math.sin(a) * 0.12 * scale
    );
    leaf.scale.set(1, 1.6, 0.7);
    g.add(leaf);
  }
  return g;
}

function hangingLamp(x: number, z: number) {
  const g = new THREE.Group();
  g.add(mesh(G.cylinder(0.012, 0.012, 0.35), P.metal, x, WALL_H - 0.22, z));
  const shade = mesh(G.cylinder(0.16, 0.22, 0.16, 20), P.lamp, x, WALL_H - 0.48, z);
  g.add(shade);
  const bulb = new THREE.Mesh(G.sphere(0.07, 12), glow(P.lamp, 1.15));
  bulb.position.set(x, WALL_H - 0.52, z);
  g.add(bulb);
  return g;
}

function pictureWindow(x: number, y: number, w: number, h: number) {
  const g = new THREE.Group();
  g.add(mesh(G.rbox(w + 0.14, h + 0.14, 0.07, 0.03), P.woodDark, x, y, -ROOM_D / 2 + 0.04));
  const glass = new THREE.Mesh(G.plane(w, h), glow("#f2ddc4", 0.7));
  glass.position.set(x, y, -ROOM_D / 2 + 0.08);
  g.add(glass);
  g.add(mesh(G.rbox(0.04, h, 0.03, 0.01), P.woodDark, x, y, -ROOM_D / 2 + 0.09));
  g.add(mesh(G.rbox(w, 0.04, 0.03, 0.01), P.woodDark, x, y, -ROOM_D / 2 + 0.09));
  const rayMat = new THREE.MeshBasicMaterial({
    color: "#f6e6d0",
    transparent: true,
    opacity: 0.06,
    depthWrite: false,
    side: THREE.DoubleSide,
    toneMapped: false,
  });
  const ray = new THREE.Mesh(G.plane(w * 0.95, 2.6), rayMat);
  ray.position.set(x, 1.15, -0.15);
  ray.rotation.x = 0.62;
  g.add(ray);
  const ray2 = new THREE.Mesh(G.plane(w * 0.55, 2.2), rayMat.clone());
  (ray2.material as THREE.MeshBasicMaterial).opacity = 0.08;
  ray2.position.set(x + 0.12, 1.05, 0.35);
  ray2.rotation.x = 0.72;
  g.add(ray2);
  return g;
}

export function buildApartment(): ApartmentHandles {
  const g = new THREE.Group();
  g.name = "apartment";
  const totalW = ROOMS.reduce((a, r) => a + r.w, 0);

  const floorMat = clayClone(P.floor);
  floorMat.map = woodFloorTexture();
  const floor = new THREE.Mesh(G.box(totalW + 8, 0.18, ROOM_D + 2), floorMat);
  floor.position.set(totalW / 2, -0.09, 0);
  floor.receiveShadow = true;
  g.add(floor);

  const lastRoom = ROOMS[ROOMS.length - 1];
  const wallW = totalW - lastRoom.w;
  const backMat = clayClone(P.wall);
  backMat.map = wallTexture(P.wall);
  const back = new THREE.Mesh(G.box(wallW + 3, WALL_H, 0.28), backMat);
  back.position.set(wallW / 2 - 1.5, WALL_H / 2, -ROOM_D / 2 - 0.14);
  back.receiveShadow = true;
  g.add(back);
  g.add(mesh(G.rbox(wallW + 3, 0.14, 0.08, 0.02), P.woodDark, wallW / 2 - 1.5, 0.07, -ROOM_D / 2 + 0.04));

  for (let i = 1; i < ROOMS.length; i++) {
    const x = ROOMS[i].x - ROOMS[i].w / 2;
    const depth = ROOMS[i].id === "balcony" ? ROOM_D : ROOM_D * 0.52;
    const z = -ROOM_D / 2 + depth / 2;
    g.add(mesh(G.box(0.16, WALL_H, depth), P.wallB, x, WALL_H / 2, z));
    if (ROOMS[i].id !== "balcony") {
      g.add(mesh(G.box(0.16, 0.45, ROOM_D - depth), P.wallB, x, WALL_H - 0.22, z + depth / 2 + (ROOM_D - depth) / 2));
    }
  }

  const doorLamps: THREE.Mesh[] = [];
  const screens: THREE.Mesh[] = [];
  const agents: THREE.Mesh[] = [];
  let monitorFront!: THREE.Mesh;
  const chair = new THREE.Group();

  // ================= DESK — 3/4 para a câmara ver a cara =================
  const desk = roomAt("desk");
  {
    const sitX = desk.x + 0.15;
    const sitZ = 1.2;
    const dx = sitX + 0.95;
    const dz = 0.75;
    g.add(hangingLamp(dx, dz));
    g.add(pictureWindow(desk.x - 1.55, 1.95, 1.5, 1.15));

    g.add(mesh(G.rbox(1.85, 0.1, 0.92, 0.08), P.deskTop, dx, 0.74, dz));
    for (const [sx, sz] of [
      [-0.72, -0.32],
      [0.72, -0.32],
      [-0.72, 0.32],
      [0.72, 0.32],
    ])
      g.add(mesh(G.cylinder(0.055, 0.05, 0.7, 16), P.wood, dx + sx, 0.35, dz + sz));

    g.add(mesh(G.cylinder(0.05, 0.1, 0.12, 16), P.metal, dx + 0.15, 0.84, dz + 0.08));
    g.add(mesh(G.rbox(0.92, 0.58, 0.06, 0.03), P.screen, dx + 0.15, 1.22, dz + 0.1));
    monitorFront = new THREE.Mesh(G.plane(0.82, 0.48), new THREE.MeshBasicMaterial({ map: screenTexture(), toneMapped: false }));
    monitorFront.position.set(dx + 0.15, 1.22, dz + 0.14);
    g.add(monitorFront);
    const halo = new THREE.Mesh(
      G.plane(1.15, 0.7),
      new THREE.MeshBasicMaterial({ color: "#7ee2c9", transparent: true, opacity: 0.12, depthWrite: false, toneMapped: false })
    );
    halo.position.set(dx + 0.15, 1.22, dz + 0.16);
    g.add(halo);

    g.add(mesh(G.rbox(0.46, 0.03, 0.16, 0.02), P.metal, dx - 0.15, 0.79, dz - 0.18));
    g.add(mesh(G.cylinder(0.055, 0.048, 0.11, 16), P.accent, dx + 0.55, 0.84, dz - 0.16));
    g.add(mesh(G.cylinder(0.04, 0.05, 0.08, 14), P.woodDark, dx - 0.52, 0.82, dz - 0.12));
    g.add(mesh(G.sphere(0.055, 16), P.accent, dx - 0.52, 0.9, dz - 0.12));
    g.add(plant(sitX - 1.35, sitZ - 0.15, 0.7));

    chair.position.set(sitX, 0, sitZ);
    chair.add(mesh(G.rbox(0.56, 0.08, 0.56, 0.06), P.chair, 0, 0.5, 0));
    chair.add(mesh(G.rbox(0.54, 0.62, 0.1, 0.05), P.chair, 0, 0.86, -0.22));
    chair.add(mesh(G.cylinder(0.04, 0.04, 0.46, 12), P.metal, 0, 0.25, 0));
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const leg = mesh(G.rbox(0.32, 0.03, 0.05, 0.01), P.metal, Math.cos(a) * 0.16, 0.04, Math.sin(a) * 0.16);
      leg.rotation.y = -a;
      chair.add(leg);
    }
    g.add(chair);
    g.add(mesh(G.cylinder(1.35, 1.35, 0.03, 48), P.rug, sitX + 0.35, 0.012, 0.7));
    g.add(mesh(G.cylinder(0.95, 0.95, 0.032, 48), "#e8a15a", sitX + 0.35, 0.018, 0.7));
    g.add(mesh(G.cylinder(0.52, 0.52, 0.034, 40), "#f0c56e", sitX + 0.35, 0.024, 0.7));
    g.add(plant(desk.x - 2.15, -1.7, 1.15));
  }

  // ================= LIVING =================
  const living = roomAt("living");
  {
    const cx = living.x;
    g.add(hangingLamp(cx, -0.2));
    g.add(pictureWindow(cx + 0.4, 1.95, 1.9, 1.25));
    const sofa = new THREE.Group();
    sofa.position.set(cx - 0.35, 0, -1.45);
    sofa.add(mesh(G.rbox(2.15, 0.48, 0.95, 0.1), P.sofa, 0, 0.32, 0));
    sofa.add(mesh(G.rbox(2.15, 0.62, 0.28, 0.08), P.sofaDark, 0, 0.78, -0.34));
    sofa.add(mesh(G.rbox(0.28, 0.38, 0.95, 0.08), P.sofaDark, -0.98, 0.68, 0));
    sofa.add(mesh(G.rbox(0.28, 0.38, 0.95, 0.08), P.sofaDark, 0.98, 0.68, 0));
    sofa.add(mesh(G.rbox(0.42, 0.28, 0.18, 0.06), P.accent, -0.5, 0.72, -0.05));
    sofa.add(mesh(G.rbox(0.42, 0.28, 0.18, 0.06), P.book2, 0.45, 0.72, -0.08));
    g.add(sofa);
    g.add(mesh(G.cylinder(1.35, 1.35, 0.025, 48), P.rug, cx - 0.2, 0.012, 0.15));
    g.add(mesh(G.cylinder(0.48, 0.48, 0.07, 28), P.wood, cx - 0.25, 0.42, 0.15));
    g.add(mesh(G.cylinder(0.05, 0.08, 0.38, 12), P.woodDark, cx - 0.25, 0.2, 0.15));
    g.add(mesh(G.rbox(0.24, 0.04, 0.18, 0.02), P.book1, cx - 0.38, 0.48, 0.1));
    g.add(mesh(G.cylinder(0.025, 0.025, 1.55, 10), P.metal, cx + 1.75, 0.78, -1.55));
    const shade = new THREE.Mesh(G.cylinder(0.28, 0.34, 0.32, 20), glow(P.lamp, 0.9));
    shade.position.set(cx + 1.75, 1.68, -1.55);
    g.add(shade);
    g.add(plant(cx - 2.25, -1.75, 1.2));
  }

  // ================= WAR ROOM =================
  const war = roomAt("war");
  {
    const cx = war.x;
    const z = -ROOM_D / 2 + 0.06;
    g.add(hangingLamp(cx, -0.6));
    const cols = [-1.5, 0, 1.5];
    const rows = [2.28, 1.32];
    const hues = [P.screenGlow, P.accent, P.book2, P.book4, P.sky, P.book3];
    let k = 0;
    for (const ry of rows)
      for (const rx of cols) {
        g.add(mesh(G.rbox(1.38, 0.8, 0.07, 0.03), P.screen, cx + rx, ry, z));
        const scr = new THREE.Mesh(G.plane(1.24, 0.68), glow(hues[k % hues.length], 0.9));
        scr.position.set(cx + rx, ry, z + 0.05);
        screens.push(scr);
        g.add(scr);
        k++;
      }
    g.add(mesh(G.rbox(1.5, 0.07, 0.62, 0.04), P.wood, cx, 1.0, -0.85));
    g.add(mesh(G.rbox(0.08, 1.0, 0.08, 0.02), P.metal, cx - 0.62, 0.5, -0.85));
    g.add(mesh(G.rbox(0.08, 1.0, 0.08, 0.02), P.metal, cx + 0.62, 0.5, -0.85));
    const lid = new THREE.Mesh(G.rbox(0.42, 0.26, 0.02, 0.01), glow(P.screenGlow, 0.55));
    lid.position.set(cx, 1.18, -0.98);
    lid.rotation.x = -0.25;
    g.add(lid);
  }

  // ================= CORRIDOR =================
  const corridor = roomAt("corridor");
  {
    const n = 7;
    const start = corridor.x - corridor.w / 2 + 0.9;
    const step = (corridor.w - 1.8) / (n - 1);
    const z = -ROOM_D / 2 + 0.03;
    for (let i = 0; i < n; i++) {
      const x = start + i * step;
      g.add(mesh(G.rbox(0.9, 2.18, 0.1, 0.03), P.woodDark, x, 1.09, z));
      g.add(mesh(G.rbox(0.78, 2.06, 0.06, 0.03), i % 2 ? P.wood : P.sofa, x, 1.04, z + 0.05));
      g.add(mesh(G.sphere(0.032), P.metal, x + 0.28, 1.02, z + 0.1));
      const lamp = new THREE.Mesh(G.sphere(0.1, 16), glow(P.woodDark, 0.4));
      lamp.position.set(x, 2.48, z + 0.14);
      doorLamps.push(lamp);
      g.add(lamp);
    }
    g.add(mesh(G.rbox(corridor.w - 1, 0.03, 1.45, 0.02), P.rug, corridor.x, 0.015, WALK_Z));
    g.add(hangingLamp(corridor.x - 2, 0.2));
    g.add(hangingLamp(corridor.x + 2, 0.2));
  }

  // ================= WORKSHOP =================
  const workshop = roomAt("workshop");
  {
    const cx = workshop.x;
    const z = -ROOM_D / 2 + 0.05;
    g.add(hangingLamp(cx, -0.8));
    g.add(mesh(G.rbox(2.7, 0.1, 0.82, 0.04), P.wood, cx, 0.9, -1.15));
    g.add(mesh(G.rbox(2.5, 0.8, 0.72, 0.04), P.woodDark, cx, 0.45, -1.15));
    const boards: [number, number][] = [
      [-1.55, 2.05],
      [0.15, 2.18],
      [1.75, 1.95],
    ];
    boards.forEach(([bx, by], bi) => {
      g.add(mesh(G.rbox(1.28, 0.88, 0.05, 0.03), P.woodDark, cx + bx, by, z));
      g.add(mesh(G.rbox(1.16, 0.76, 0.03, 0.02), P.wall, cx + bx, by, z + 0.03));
      const cols = [P.accent, P.book2, P.book4, P.screenGlow];
      for (let i = 0; i < 4; i++) {
        g.add(
          mesh(
            G.rbox(0.28, 0.15, 0.03, 0.02),
            cols[(i + bi) % 4],
            cx + bx - 0.38 + (i % 2) * 0.52,
            by + 0.2 - Math.floor(i / 2) * 0.38,
            z + 0.05
          )
        );
      }
    });
    g.add(mesh(G.rbox(0.5, 0.38, 0.5, 0.05), P.wood, cx + 2.15, 0.22, -2.15));
  }

  // ================= STUDIO =================
  const studio = roomAt("studio");
  {
    const cx = studio.x;
    const z = -ROOM_D / 2 + 0.28;
    g.add(hangingLamp(cx + 1.2, -0.4));
    g.add(mesh(G.rbox(2.55, 2.55, 0.42, 0.05), P.woodDark, cx - 0.55, 1.28, z));
    const books = [P.book1, P.book2, P.book3, P.book4, P.accent, P.sky, P.screenGlow];
    for (let shelf = 0; shelf < 4; shelf++) {
      const sy = 0.36 + shelf * 0.6;
      g.add(mesh(G.rbox(2.45, 0.05, 0.4, 0.02), P.wood, cx - 0.55, sy, z));
      let bx = cx - 1.7;
      let i = 0;
      while (bx < cx + 0.55) {
        const w = 0.08 + ((i * 7 + shelf * 3) % 5) * 0.02;
        const h = 0.3 + ((i * 5 + shelf) % 4) * 0.05;
        const b = mesh(G.rbox(w, h, 0.26, 0.01), books[(i + shelf) % books.length], bx + w / 2, sy + h / 2 + 0.03, z + 0.02);
        if ((i + shelf) % 6 === 5) b.rotation.z = 0.22;
        g.add(b);
        bx += w + 0.014;
        i++;
      }
    }
    for (let i = 0; i < 3; i++) {
      g.add(mesh(G.rbox(0.52, 0.4, 0.04, 0.02), P.woodDark, cx + 1.45, 2.22 - i * 0.52, -ROOM_D / 2 + 0.04));
      g.add(mesh(G.rbox(0.44, 0.32, 0.02, 0.01), P.wall, cx + 1.45, 2.22 - i * 0.52, -ROOM_D / 2 + 0.07));
    }
    for (let i = 0; i < 3; i++) {
      const a = new THREE.Mesh(G.rbox(0.24, 0.24, 0.24, 0.04), glow([P.accent, P.screenGlow, P.book3][i], 0.7));
      a.position.set(cx + 1.05 + i * 0.52, 1.12 + (i % 2) * 0.32, -0.55 + i * 0.22);
      agents.push(a);
      g.add(a);
    }
    g.add(mesh(G.rbox(0.82, 0.46, 0.82, 0.08), P.sofa, cx + 1.85, 0.28, -1.55));
    g.add(mesh(G.rbox(0.82, 0.58, 0.22, 0.06), P.sofaDark, cx + 1.85, 0.74, -1.9));
  }

  // ================= BALCONY =================
  const balcony = roomAt("balcony");
  {
    const cx = balcony.x;
    const railZ = -1.55;
    g.add(mesh(G.rbox(balcony.w - 0.35, 0.06, 0.06, 0.02), P.metal, cx, 1.05, railZ));
    for (let i = 0; i < 12; i++)
      g.add(mesh(G.cylinder(0.018, 0.018, 1.0, 8), P.metal, cx - balcony.w / 2 + 0.4 + i * 0.47, 0.52, railZ));
    for (const px of [-2.15, 2.15]) {
      g.add(mesh(G.cylinder(0.2, 0.15, 0.34, 16), P.pot, cx + px, 0.18, -1.15));
      g.add(mesh(G.sphere(0.3, 16), P.plant, cx + px, 0.58, -1.15));
    }
    for (let i = 0; i < 28; i++) {
      const w = 0.55 + ((i * 7) % 5) * 0.22;
      const h = 1.3 + ((i * 13) % 9) * 0.52;
      const x = cx - 9 + i * 0.7;
      const zz = -7.2 - ((i * 5) % 4) * 1.35;
      g.add(mesh(G.rbox(w, h, w, 0.04), i % 3 ? P.city : P.cityLit, x, h / 2 - 0.55, zz));
      if (i % 2) {
        const lit = new THREE.Mesh(G.plane(w * 0.45, 0.12), glow(i % 4 ? P.lamp : P.screenGlow, 1.1));
        lit.position.set(x, h - 0.45, zz + w * 0.52);
        g.add(lit);
      }
    }
    const sun = new THREE.Mesh(G.sphere(1.8, 24), glow(P.sky, 1.4));
    sun.position.set(cx + 3.5, 4.0, -15);
    g.add(sun);
    const skyGlow = new THREE.Mesh(
      G.plane(28, 10),
      new THREE.MeshBasicMaterial({
        color: "#ff8a4a",
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
        toneMapped: false,
        side: THREE.DoubleSide,
      })
    );
    skyGlow.position.set(cx, 3.2, -12);
    g.add(skyGlow);
  }

  const lampOn = new THREE.Color(P.lamp);
  const lampOff = new THREE.Color("#3a2a20");
  const update = (elapsed: number, corridorProgress: number) => {
    doorLamps.forEach((lamp, i) => {
      const on = corridorProgress > (i + 0.35) / doorLamps.length ? 1 : 0;
      (lamp.material as THREE.MeshBasicMaterial).color.lerpColors(lampOff, lampOn, on);
      lamp.scale.setScalar(1 + on * 0.35 * (0.55 + 0.45 * Math.sin(elapsed * 5 + i)));
    });
    screens.forEach((s, i) => {
      s.position.y += Math.sin(elapsed * 2.2 + i) * 0.00015;
    });
    agents.forEach((a, i) => {
      a.rotation.y = elapsed * (0.7 + i * 0.22);
      a.rotation.x = elapsed * 0.28;
      a.position.y = 1.12 + (i % 2) * 0.32 + Math.sin(elapsed * 1.5 + i) * 0.09;
    });
  };

  return { group: g, doorLamps, screens, agents, monitorFront, chair, update };
}
