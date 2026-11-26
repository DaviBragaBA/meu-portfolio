import * as THREE from "three";
import { G, PALETTE as P, bone, clay, contactShadow, glow, mesh } from "./clay";

/**
 * Boneco de massinha do Davi — cara em geometria, cabelo em clumps, look-at no pescoço.
 * Frente do personagem = +Z. Na secretária ele vira ~60° para a câmara ver o 3/4.
 */

export type PuppetState = {
  seated: number;
  walk: number;
  look: number;
  facing: number;
  wave: number;
  lean: number;
};

const STAND_PELVIS_Y = 0.92;
const SEAT_PELVIS_Y = 0.58;
const THIGH = 0.42;
const SHIN = 0.4;
const UPPER_ARM = 0.32;
const FOREARM = 0.28;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export class DaviPuppet {
  root = new THREE.Group();
  pelvis = new THREE.Group();
  torso = new THREE.Group();
  neck = new THREE.Group();
  head = new THREE.Group();
  chest!: THREE.Mesh;
  shoulderL = new THREE.Group();
  shoulderR = new THREE.Group();
  elbowL = new THREE.Group();
  elbowR = new THREE.Group();
  hipL = new THREE.Group();
  hipR = new THREE.Group();
  kneeL = new THREE.Group();
  kneeR = new THREE.Group();
  eyeL = new THREE.Group();
  eyeR = new THREE.Group();
  shadow: THREE.Mesh;

  state: PuppetState = { seated: 1, walk: 0, look: 1, facing: 0, wave: 0, lean: 0 };
  lookTarget = { x: 0, y: 0 };

  private phase = 0;
  private lastPos = new THREE.Vector3();
  private blinkT = 0;
  private nextBlink = 2.4;

  constructor() {
    this.root.name = "davi";
    this.root.scale.setScalar(1.32);
    this.build();
    this.shadow = contactShadow(0.62, 0.38);
    this.root.add(this.shadow);
    this.lastPos.copy(this.root.position);
  }

  private build() {
    this.root.add(this.pelvis);

    const hips = mesh(G.sphere(0.22, 32), P.pants, 0, 0.04, 0);
    hips.scale.set(1.22, 0.85, 1.05);
    this.pelvis.add(hips);

    this.pelvis.add(this.torso);
    this.torso.position.y = 0.04;
    this.chest = new THREE.Mesh(G.capsule(0.24, 0.32), clay(P.shirt));
    this.chest.position.y = 0.32;
    this.chest.scale.set(1.18, 1, 0.86);
    this.torso.add(this.chest);

    this.neck.position.set(0, 0.6, 0.02);
    this.torso.add(this.neck);
    this.neck.add(bone(0.07, 0.1, P.skin).translateY(0.1));

    this.head.position.y = 0.11;
    this.neck.add(this.head);
    this.buildHead();

    const armSetup = (side: 1 | -1, shoulder: THREE.Group, elbow: THREE.Group) => {
      shoulder.position.set(side * 0.28, 0.54, 0.02);
      this.torso.add(shoulder);
      shoulder.add(bone(0.078, UPPER_ARM, P.shirt));
      elbow.position.y = -UPPER_ARM + 0.02;
      shoulder.add(elbow);
      elbow.add(bone(0.062, FOREARM, P.skin));
      const hand = mesh(G.sphere(0.072), P.skin, 0, -FOREARM - 0.01, 0.02);
      hand.scale.set(1.08, 1.12, 0.82);
      elbow.add(hand);
    };
    armSetup(1, this.shoulderL, this.elbowL);
    armSetup(-1, this.shoulderR, this.elbowR);

    const legSetup = (side: 1 | -1, hip: THREE.Group, knee: THREE.Group) => {
      hip.position.set(side * 0.13, -0.02, 0);
      this.pelvis.add(hip);
      hip.add(bone(0.095, THIGH, P.pants));
      knee.position.y = -THIGH + 0.02;
      hip.add(knee);
      knee.add(bone(0.08, SHIN, P.pants));
      const foot = new THREE.Group();
      foot.position.y = -SHIN;
      knee.add(foot);
      const shoe = mesh(G.capsule(0.082, 0.14), P.shoe, 0, -0.02, 0.07);
      shoe.rotation.x = Math.PI / 2;
      shoe.scale.set(1.05, 1, 0.78);
      foot.add(shoe);
    };
    legSetup(1, this.hipL, this.kneeL);
    legSetup(-1, this.hipR, this.kneeR);
  }

  private buildHead() {
    const h = this.head;

    const skull = mesh(G.sphere(0.23, 40), P.skin, 0, 0.16, 0.02);
    skull.scale.set(0.94, 1.08, 0.96);
    h.add(skull);

    for (const s of [1, -1] as const) {
      const ear = mesh(G.sphere(0.05, 16), P.skinShade, s * 0.205, 0.15, -0.02);
      ear.scale.set(0.5, 1.05, 0.78);
      h.add(ear);
    }

    const beard = mesh(G.sphere(0.12, 20), P.hair, 0, 0.05, 0.13);
    beard.scale.set(1.35, 0.62, 0.85);
    h.add(beard);

    const nose = mesh(G.sphere(0.034, 16), P.skinShade, 0, 0.145, 0.21);
    nose.scale.set(0.9, 0.72, 1.15);
    h.add(nose);

    const eyeSetup = (side: 1 | -1, grp: THREE.Group) => {
      grp.position.set(side * 0.078, 0.2, 0.178);
      h.add(grp);
      const white = mesh(G.sphere(0.048, 20), P.eyeWhite);
      white.scale.set(1, 1.02, 0.72);
      grp.add(white);
      grp.add(mesh(G.sphere(0.026, 14), P.iris, 0, 0, 0.028));
      grp.add(mesh(G.sphere(0.012, 10), P.pupil, 0, 0, 0.046));
      const catchL = new THREE.Mesh(G.sphere(0.007, 8), glow("#ffffff", 1.4));
      catchL.position.set(side * -0.01, 0.012, 0.052);
      grp.add(catchL);
      const brow = mesh(G.capsule(0.011, 0.055), P.hair, 0, 0.055, 0.01);
      brow.rotation.z = Math.PI / 2 + side * 0.16;
      grp.add(brow);
    };
    eyeSetup(1, this.eyeL);
    eyeSetup(-1, this.eyeR);

    const hair = mesh(G.sphere(0.24, 36), P.hair, 0, 0.25, -0.03);
    hair.scale.set(1.06, 0.82, 1.08);
    h.add(hair);
    const fringe = mesh(G.sphere(0.1, 18), P.hairHi, 0.02, 0.3, 0.16);
    fringe.scale.set(1.35, 0.55, 0.8);
    fringe.rotation.x = 0.45;
    h.add(fringe);
  }

  update(dt: number, elapsed: number) {
    const s = this.state;
    const seated = THREE.MathUtils.clamp(s.seated, 0, 1);
    const stand = 1 - seated;

    const dx = this.root.position.x - this.lastPos.x;
    const dz = this.root.position.z - this.lastPos.z;
    const dist = Math.hypot(dx, dz);
    if (dist > 1e-5) this.phase += (dist / 0.62) * Math.PI;
    this.lastPos.copy(this.root.position);
    const walk = THREE.MathUtils.clamp(s.walk, 0, 1) * stand;
    const sw = Math.sin(this.phase);
    const sw2 = Math.sin(this.phase * 2);

    this.root.rotation.y = s.facing;
    const bob = walk * Math.abs(sw2) * 0.038;
    this.pelvis.position.y = lerp(STAND_PELVIS_Y, SEAT_PELVIS_Y, seated) + bob;
    this.pelvis.rotation.z = walk * sw * 0.05;
    this.pelvis.rotation.y = walk * sw * 0.12;

    const breath = Math.sin(elapsed * 2.15) * 0.014;
    this.chest.scale.set(1.18 + breath, 1 + breath * 0.55, 0.86 + breath);
    // sentado: inclina para o teclado (local -Z se facing aponta para a mesa no +X… usamos -X lean via torso.x negativo quando a mesa está à direita)
    this.torso.rotation.x = lerp(0.04 + walk * 0.05, 0.12, seated) - s.lean * 0.35;
    this.torso.rotation.y = -this.pelvis.rotation.y * 0.55;
    this.torso.rotation.z = seated * -0.06;

    const seatHip = -Math.PI / 2 + 0.08;
    const seatKnee = Math.PI / 2 + 0.08;
    this.hipL.rotation.x = lerp(walk * sw * 0.65, seatHip, seated);
    this.hipR.rotation.x = lerp(-walk * sw * 0.65, seatHip, seated);
    this.hipL.rotation.z = 0.05 + seated * 0.14;
    this.hipR.rotation.z = -0.05 - seated * 0.14;
    this.kneeL.rotation.x = lerp(walk * Math.max(0, -sw) * 1.15, seatKnee, seated);
    this.kneeR.rotation.x = lerp(walk * Math.max(0, sw) * 1.15, seatKnee, seated);

    const wave = THREE.MathUtils.clamp(s.wave, 0, 1);
    const armSwing = walk * 0.48;
    this.shoulderL.rotation.x = lerp(-armSwing * sw + s.lean * -0.9, -1.05, seated);
    this.shoulderL.rotation.z = lerp(0.14, 0.42, seated) * (1 - s.lean) + s.lean * 0.2;
    this.elbowL.rotation.x = lerp(-0.28 - walk * 0.28 + s.lean * -0.9, -0.7, seated);

    const waveElbow = -1.15 + Math.sin(elapsed * 8) * 0.4;
    this.shoulderR.rotation.x = lerp(lerp(armSwing * sw + s.lean * -0.9, -0.35, wave), -1.05, seated);
    this.shoulderR.rotation.z = lerp(lerp(-0.14 * (1 - s.lean) - s.lean * 0.2, -2.35, wave), -0.42, seated);
    this.elbowR.rotation.x = lerp(lerp(-0.28 - walk * 0.28 + s.lean * -0.9, waveElbow, wave), -0.7, seated);
    this.elbowR.rotation.z = lerp(0, 0.45, wave);

    const look = THREE.MathUtils.clamp(s.look, 0, 1);
    const tx = THREE.MathUtils.clamp(this.lookTarget.x, -1, 1);
    const ty = THREE.MathUtils.clamp(this.lookTarget.y, -1, 1);
    const headYaw = -tx * 0.62 * look;
    const headPitch = -ty * 0.34 * look;
    this.head.rotation.y = headYaw + walk * sw * 0.04;
    this.head.rotation.x = headPitch - seated * 0.04;
    this.head.rotation.z = -tx * 0.07 * look;
    this.neck.rotation.y = headYaw * 0.42;
    this.neck.rotation.x = headPitch * 0.32;
    this.eyeL.rotation.set(-ty * 0.14 * look, -tx * 0.2 * look, 0);
    this.eyeR.rotation.set(-ty * 0.14 * look, -tx * 0.2 * look, 0);

    this.blinkT += dt;
    if (this.blinkT > this.nextBlink) {
      this.blinkT = 0;
      this.nextBlink = 2.1 + Math.random() * 2.8;
    }
    const blink = this.blinkT < 0.12 ? 1 - Math.abs(this.blinkT / 0.06 - 1) : 0;
    const eyeScale = 1 - blink * 0.92;
    this.eyeL.scale.y = eyeScale;
    this.eyeR.scale.y = eyeScale;

    (this.shadow.material as THREE.MeshBasicMaterial).opacity = 0.34 - bob * 2;
    this.shadow.scale.setScalar(1 - bob * 2.5);
  }
}

export class Banguela {
  root = new THREE.Group();
  private tail: THREE.Mesh;
  private head: THREE.Group;
  private earL: THREE.Mesh;
  private earR: THREE.Mesh;

  constructor() {
    const r = this.root;
    r.name = "banguela";
    r.scale.setScalar(1.15);
    const body = mesh(G.capsule(0.125, 0.22), P.dog, 0, 0.28, 0);
    body.rotation.x = Math.PI / 2;
    body.rotation.z = 0.28;
    r.add(body);
    const belly = mesh(G.sphere(0.1), P.dogLight, 0, 0.22, 0.09);
    belly.scale.set(1.05, 0.85, 0.75);
    r.add(belly);

    this.head = new THREE.Group();
    this.head.position.set(0, 0.46, 0.16);
    r.add(this.head);
    this.head.add(mesh(G.sphere(0.11, 22), P.dog));
    const snout = mesh(G.sphere(0.06, 16), P.dogLight, 0, -0.028, 0.095);
    snout.scale.set(1.15, 0.78, 1.05);
    this.head.add(snout);
    this.head.add(mesh(G.sphere(0.022), P.pupil, 0, -0.01, 0.15));
    for (const s of [1, -1] as const) {
      const eye = mesh(G.sphere(0.022, 12), P.pupil, s * 0.042, 0.032, 0.09);
      this.head.add(eye);
      const glint = new THREE.Mesh(G.sphere(0.007, 8), glow("#ffffff", 1.3));
      glint.position.set(s * 0.038, 0.04, 0.105);
      this.head.add(glint);
    }
    this.earL = mesh(G.capsule(0.032, 0.1), P.dogDark, 0.1, 0.04, -0.02);
    this.earR = mesh(G.capsule(0.032, 0.1), P.dogDark, -0.1, 0.04, -0.02);
    this.earL.rotation.z = 0.55;
    this.earR.rotation.z = -0.55;
    this.head.add(this.earL, this.earR);
    this.head.add(mesh(G.rbox(0.014, 0.024, 0.01, 0.004), P.shoe, 0.022, -0.055, 0.125));

    for (const [x, z] of [
      [0.075, 0.11],
      [-0.075, 0.11],
      [0.085, -0.13],
      [-0.085, -0.13],
    ]) {
      r.add(mesh(G.capsule(0.032, 0.13), P.dog, x, 0.11, z));
    }
    this.tail = mesh(G.capsule(0.024, 0.18), P.dogDark, 0, 0.34, -0.24);
    this.tail.rotation.x = -0.95;
    r.add(this.tail);
    r.add(contactShadow(0.36, 0.3));
  }

  update(elapsed: number) {
    this.tail.rotation.z = Math.sin(elapsed * 10) * 0.55;
    this.tail.rotation.x = -0.95 + Math.sin(elapsed * 5) * 0.12;
    this.head.rotation.z = Math.sin(elapsed * 1.4) * 0.1;
    this.head.rotation.y = Math.sin(elapsed * 0.8) * 0.28;
    this.earL.rotation.z = 0.55 + Math.sin(elapsed * 6) * 0.08;
    this.earR.rotation.z = -0.55 + Math.cos(elapsed * 6) * 0.08;
  }
}
