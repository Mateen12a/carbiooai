import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The hero scene: the Carbioo AI container ship on a dark ocean grid.
 * `progress` (0..1, driven by scroll) turns the ship from a glowing wireframe
 * (unverified records) into a solid, lit vessel (verified), while scanning rings
 * pulse around it in the colour of its CII grade.
 */
export default function ShipScene({ progress }: { progress: React.MutableRefObject<number> }) {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 760;

    const renderer = new THREE.WebGLRenderer({ antialias: !small, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = !small;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x06131b, 26, 60);
    const camera = new THREE.PerspectiveCamera(small ? 42 : 32, 1, 0.1, 200);

    scene.add(new THREE.HemisphereLight(0xcfe9ff, 0x0b2230, 1.4));
    const key = new THREE.DirectionalLight(0xfff1dc, 2.6);
    key.position.set(-6, 14, 9);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    Object.assign(key.shadow.camera, { left: -14, right: 14, top: 14, bottom: -14 });
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x6ad07a, 2.4);
    rim.position.set(8, 5, -12);
    scene.add(rim);

    // Ocean: a fading grid and a shadow catcher.
    const grid = new THREE.GridHelper(120, 96, 0x1f5a4a, 0x10303a);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.55;
    grid.position.y = -0.02;
    scene.add(grid);
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.ShadowMaterial({ color: 0x000000, opacity: 0.35 }));
    shadow.rotation.x = -Math.PI / 2;
    shadow.receiveShadow = true;
    scene.add(shadow);

    // Ship
    const ship = new THREE.Group();
    scene.add(ship);
    const solids: THREE.MeshStandardMaterial[] = [];
    const mat = (c: number, r = 0.5, m = 0.08, e = 0) => {
      const x = new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m, emissive: e ? c : 0x000000, emissiveIntensity: e, transparent: true, opacity: 0 });
      solids.push(x);
      return x;
    };
    const white = mat(0xeef3ee), green = mat(0x44a04d, 0.35, 0.1, 0.1), sage = mat(0x6f9c86), hullM = mat(0x2e5363, 0.4, 0.25), glass = mat(0x7fd1ff, 0.2, 0.3, 0.4), steel = mat(0xa9b8b0, 0.4, 0.4);
    const wire = new THREE.LineBasicMaterial({ color: 0x6ad07a, transparent: true, opacity: 1 });
    const meshes: THREE.Mesh[] = [];
    const addEdges = (m: THREE.Mesh) => { const l = new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry, 25), wire); m.add(l); };
    const box = (w: number, h: number, d: number, x: number, y: number, z: number, m: THREE.Material, p: THREE.Object3D) => {
      const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
      o.position.set(x, y, z);
      o.castShadow = o.receiveShadow = true;
      p.add(o); meshes.push(o); addEdges(o);
      return o;
    };
    const sections: [number, number][] = [[-6, 0.28], [-5.4, 1.1], [-3.8, 1.35], [3.8, 1.35], [5.2, 0.9], [6.1, 0.02]];
    const pos: number[] = [], idx: number[] = [];
    for (const [x, w] of sections) pos.push(x, 1.3, -w, x, 0.48, -w * 0.77, x, 0.28, 0, x, 0.48, w * 0.77, x, 1.3, w);
    for (let i = 0; i < sections.length - 1; i++) for (let j = 0; j < 5; j++) {
      const a = i * 5 + j, b = i * 5 + ((j + 1) % 5), c = (i + 1) * 5 + j, d = (i + 1) * 5 + ((j + 1) % 5);
      idx.push(a, b, c, b, d, c);
    }
    idx.push(0, 1, 2, 0, 2, 3, 0, 3, 4, 25, 27, 26, 25, 28, 27, 25, 29, 28);
    const hg = new THREE.BufferGeometry();
    hg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    hg.setIndex(idx);
    hg.computeVertexNormals();
    const hull = new THREE.Mesh(hg, hullM);
    hull.castShadow = true;
    ship.add(hull); meshes.push(hull); addEdges(hull);
    const outline = new THREE.Shape();
    outline.moveTo(-6, -0.28);
    for (const [x, w] of sections.slice(1)) outline.lineTo(x, -w);
    for (const [x, w] of [...sections].reverse()) outline.lineTo(x, w);
    outline.closePath();
    const deck = new THREE.Mesh(new THREE.ExtrudeGeometry(outline, { depth: 0.12, bevelEnabled: false }), white);
    deck.rotation.x = Math.PI / 2;
    deck.position.y = 1.38;
    ship.add(deck); meshes.push(deck); addEdges(deck);
    const cargo: { mesh: THREE.Mesh; base: number; i: number }[] = [];
    const palette = [green, sage, white, hullM];
    for (let col = 0; col < 5; col++) for (let row = 0; row < 3; row++) for (let lv = 0; lv < (col === 0 ? 2 : 3); lv++) {
      const y = 1.7 + lv * 0.59;
      const c = box(1.32, 0.54, 0.68, -2.85 + col * 1.42, y, (row - 1) * 0.76, palette[(col + row + lv) % 4], ship);
      cargo.push({ mesh: c, base: y, i: col + row + lv });
    }
    box(1.55, 1.6, 2.15, -4.57, 2.18, 0, white, ship);
    box(1.65, 0.38, 2.33, -4.57, 3.13, 0, white, ship);
    box(0.9, 0.65, 1.25, -4.9, 3.53, 0, white, ship);
    box(0.54, 0.58, 0.62, -4.9, 4.16, 0, green, ship);
    for (const s of [-1, 1]) for (let i = 0; i < 5; i++) box(0.21, 0.22, 0.03, -5.22 + i * 0.29, 3.12, s * 1.18, glass, ship);
    for (let i = 0; i < 3; i++) box(0.035, 1.25, 0.035, -5.25 + i * 0.28, 4.45, 0, steel, ship);

    // Scanning rings in the grade colour.
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x6ad07a, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
    const rings = [0, 1, 2].map(() => {
      const r = new THREE.Mesh(new THREE.RingGeometry(0.98, 1, 128), ringMat.clone());
      r.rotation.x = -Math.PI / 2;
      r.position.y = 0.01;
      scene.add(r);
      return r;
    });

    const resize = () => {
      const w = host.clientWidth, h = host.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Frame the ship clear of the copy: right half on wide screens, top half on phones.
      if (w / h > 1.1) camera.setViewOffset(w, h, -Math.round(w * 0.2), Math.round(h * 0.04), w, h);
      else camera.setViewOffset(w, h, 0, Math.round(h * 0.2), w, h);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let visible = true, raf = 0;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(tick); }, { threshold: 0 });
    io.observe(host);
    const clock = new THREE.Clock();
    const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
    let shown = 0;

    function frame(t: number) {
      const p = reduce ? 1 : progress.current;
      shown += (p - shown) * 0.08;
      const solid = ease(shown * 1.6);
      for (const m of solids) m.opacity = solid;
      wire.opacity = 1 - solid * 0.85;
      (grid.material as THREE.Material).opacity = 0.55 - solid * 0.2;
      // grade colour: amber while unverified, logo green once verified
      const col = new THREE.Color(0xf2b441).lerp(new THREE.Color(0x6ad07a), solid);
      wire.color.copy(new THREE.Color(0x6ad07a).lerp(new THREE.Color(0xa8f0b4), 1 - solid));
      // camera: slow orbit and a gentle dolly with scroll
      const orbit = reduce ? 0.5 : t * 0.06;
      const dist = (small ? 44 : 23) - shown * (small ? 4 : 3);
      camera.position.set(Math.cos(orbit + 0.6) * dist * 0.62, (small ? 9 : 7.5) - shown * 1.5, Math.sin(orbit + 0.6) * dist * 0.62 + 6);
      camera.lookAt(0, small ? 2.4 : 1.8, 0);
      ship.position.y = Math.sin(t * 0.8) * 0.05;
      ship.rotation.z = Math.sin(t * 0.6) * 0.008;
      for (const { mesh, base, i } of cargo) mesh.position.y = base + Math.max(0, 1 - ease((solid * 1.4) - i * 0.04)) * 0.9;
      rings.forEach((r, i) => {
        const ph = reduce ? 0.3 + i * 0.25 : (t * 0.28 + i / 3) % 1;
        r.scale.setScalar(4 + ph * 12);
        const m = r.material as THREE.MeshBasicMaterial;
        m.opacity = (1 - ph) * 0.45;
        m.color.copy(col);
      });
      renderer.render(scene, camera);
    }
    function tick() {
      raf = 0;
      if (!visible || document.hidden) return;
      frame(clock.getElapsedTime());
      if (!reduce) raf = requestAnimationFrame(tick);
    }
    const onVis = () => { if (!document.hidden && visible && !raf) raf = requestAnimationFrame(tick); };
    document.addEventListener("visibilitychange", onVis);
    frame(0);
    raf = requestAnimationFrame(tick);
    if (reduce) {
      const onScroll = () => frame(0);
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      renderer.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mm = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mm)) mm.forEach((x) => x.dispose()); else mm?.dispose?.();
      });
      host.removeChild(renderer.domElement);
    };
  }, [progress]);

  return <div ref={mount} className="ship-scene" aria-hidden="true" />;
}
