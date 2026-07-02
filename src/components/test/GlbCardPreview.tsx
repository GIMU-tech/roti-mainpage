"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { CSS3DObject, CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";

type GlbCardPreviewProps = {
  modelPath: string;
};

type CardConfig = {
  id: string;
  name: string;
  title: string;
  copy: string;
  keywords: string;
  scene: "camp" | "homesys" | "leel";
};

type CardSlot = "center" | "left" | "right";

type CardRuntime = {
  body: THREE.Group;
  css: THREE.Group;
  hitArea: THREE.Mesh;
  index: number;
};

const CARD_CONFIGS: CardConfig[] = [
  {
    id: "roti-camp",
    name: "ROTI CAMP",
    title: "ROTI CAMP",
    copy: "밖으로 나가는 생활",
    keywords: "캠핑 · 이동 · 수납",
    scene: "camp"
  },
  {
    id: "roti-homesys",
    name: "ROTI HOMESYS",
    title: "ROTI HOMESYS",
    copy: "정리되는 집",
    keywords: "수납 · 이동 · 생활동선",
    scene: "homesys"
  },
  {
    id: "leel",
    name: "LEEL",
    title: "LEEL",
    copy: "차분한 주방과 리빙",
    keywords: "주방 · 소재 · 여백",
    scene: "leel"
  }
];

const CARD_WIDTH = 1.72;
const CARD_HEIGHT = 2.52;
const CARD_DEPTH = 0.105;
const CSS_CARD_WIDTH = 420;
const CSS_SCALE = CARD_WIDTH / CSS_CARD_WIDTH;

function createRoundedRectShape(width: number, height: number, radius: number) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  return shape;
}

function createCardGeometry(width: number, height: number, depth: number) {
  const geometry = new THREE.ExtrudeGeometry(createRoundedRectShape(width, height, 0.105), {
    bevelEnabled: true,
    bevelSegments: 12,
    bevelSize: 0.022,
    bevelThickness: 0.032,
    curveSegments: 22,
    depth,
    steps: 1
  });

  geometry.center();
  return geometry;
}

function createBlackGlassMaterial(isActive: boolean) {
  return new THREE.MeshPhysicalMaterial({
    color: isActive ? "#080a0a" : "#050606",
    metalness: 0.02,
    roughness: 0.11,
    transmission: 0.025,
    thickness: 0.12,
    ior: 1.45,
    attenuationColor: new THREE.Color("#080909"),
    attenuationDistance: 1.6,
    clearcoat: 1,
    clearcoatRoughness: 0.032,
    envMapIntensity: isActive ? 2.1 : 1.55,
    transparent: true,
    opacity: isActive ? 0.9 : 0.82,
    side: THREE.DoubleSide
  });
}

function createGlassHighlights(width: number, height: number, depth: number, isActive: boolean) {
  const group = new THREE.Group();
  const bright = new THREE.MeshBasicMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: isActive ? 0.2 : 0.11,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const muted = bright.clone();
  muted.opacity = isActive ? 0.09 : 0.045;

  const leftEdge = new THREE.Mesh(new THREE.BoxGeometry(0.011, height * 0.9, 0.01), bright);
  leftEdge.position.set(-width / 2 + 0.028, 0.01, depth / 2 + 0.024);
  group.add(leftEdge);

  const rightEdge = new THREE.Mesh(new THREE.BoxGeometry(0.011, height * 0.86, 0.01), muted);
  rightEdge.position.set(width / 2 - 0.028, -0.01, depth / 2 + 0.024);
  group.add(rightEdge);

  const topEdge = new THREE.Mesh(new THREE.BoxGeometry(width * 0.82, 0.01, 0.01), muted);
  topEdge.position.set(0.02, height / 2 - 0.032, depth / 2 + 0.026);
  group.add(topEdge);

  return group;
}

function createWebGlCard(isActive: boolean) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(createCardGeometry(CARD_WIDTH, CARD_HEIGHT, CARD_DEPTH), createBlackGlassMaterial(isActive));
  body.name = "thin black glass card body";
  group.add(body);

  const edge = new THREE.LineSegments(
    new THREE.EdgesGeometry(createCardGeometry(CARD_WIDTH * 1.004, CARD_HEIGHT * 1.004, CARD_DEPTH * 1.02), 16),
    new THREE.LineBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: isActive ? 0.21 : 0.11
    })
  );
  group.add(edge);
  group.add(createGlassHighlights(CARD_WIDTH, CARD_HEIGHT, CARD_DEPTH, isActive));

  const underLine = new THREE.Mesh(
    new THREE.BoxGeometry(CARD_WIDTH * 0.84, 0.018, 0.014),
    new THREE.MeshBasicMaterial({
      color: "#b41307",
      transparent: true,
      opacity: isActive ? 0.86 : 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  underLine.position.set(0, -CARD_HEIGHT / 2 - 0.018, CARD_DEPTH / 2 + 0.008);
  group.add(underLine);

  const underGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(CARD_WIDTH * 1.1, 0.18),
    new THREE.MeshBasicMaterial({
      color: "#b41307",
      transparent: true,
      opacity: isActive ? 0.2 : 0.045,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  underGlow.position.set(0, -CARD_HEIGHT / 2 - 0.06, CARD_DEPTH / 2 - 0.02);
  group.add(underGlow);

  const hitArea = new THREE.Mesh(
    new THREE.PlaneGeometry(CARD_WIDTH * 1.08, CARD_HEIGHT * 1.08),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
  );
  hitArea.name = "card hit area";
  hitArea.position.z = CARD_DEPTH / 2 + 0.04;
  hitArea.userData.cardGroup = group;
  group.add(hitArea);

  return { group, hitArea };
}

function createCardFaceElement(card: CardConfig, isActive: boolean) {
  const element = document.createElement("article");
  element.className = `glb-css-card-face glb-css-card-face--front glb-css-card-face--${card.scene}`;
  element.dataset.active = String(isActive);
  element.innerHTML = `
    <div class="glb-css-card-face__shine" aria-hidden="true"></div>
    <div class="glb-css-card-face__copy">
      <span>ROTI BRAND PORTAL</span>
      <strong>${card.title}</strong>
      <i aria-hidden="true"></i>
      <p>${card.copy}</p>
      <small>${card.keywords}</small>
    </div>
    <div class="glb-css-card-face__scene" aria-hidden="true">
      <span class="glb-css-card-face__mass"></span>
      <span class="glb-css-card-face__light"></span>
      <span class="glb-css-card-face__base"></span>
    </div>
  `;

  return element;
}

function createCardBackElement(card: CardConfig, isActive: boolean) {
  const element = document.createElement("article");
  element.className = `glb-css-card-face glb-css-card-face--back glb-css-card-face--${card.scene}`;
  element.dataset.active = String(isActive);
  element.innerHTML = `
    <div class="glb-css-card-face__copy glb-css-card-face__copy--back">
      <strong>${card.name}</strong>
      <i aria-hidden="true"></i>
      <p>BRAND PORTAL</p>
    </div>
  `;

  return element;
}

function createCardSideElement(card: CardConfig, side: "left" | "right", isActive: boolean) {
  const element = document.createElement("div");
  element.className = `glb-css-card-side glb-css-card-side--${side} glb-css-card-side--${card.scene}`;
  element.dataset.active = String(isActive);

  return element;
}

function createCssCard(card: CardConfig, isActive: boolean) {
  const group = new THREE.Group();
  const front = new CSS3DObject(createCardFaceElement(card, isActive));
  front.position.z = CARD_DEPTH / 2 + 0.014;
  front.scale.set(CSS_SCALE, CSS_SCALE, CSS_SCALE);
  group.add(front);

  const back = new CSS3DObject(createCardBackElement(card, isActive));
  back.position.z = -CARD_DEPTH / 2 - 0.014;
  back.rotation.y = Math.PI;
  back.scale.set(CSS_SCALE, CSS_SCALE, CSS_SCALE);
  group.add(back);

  const left = new CSS3DObject(createCardSideElement(card, "left", isActive));
  left.position.x = -CARD_WIDTH / 2;
  left.rotation.y = -Math.PI / 2;
  left.scale.set(CSS_SCALE, CSS_SCALE, CSS_SCALE);
  group.add(left);

  const right = new CSS3DObject(createCardSideElement(card, "right", isActive));
  right.position.x = CARD_WIDTH / 2;
  right.rotation.y = Math.PI / 2;
  right.scale.set(CSS_SCALE, CSS_SCALE, CSS_SCALE);
  group.add(right);

  return group;
}

function getSlot(index: number, activeIndex: number): CardSlot {
  const offset = (index - activeIndex + CARD_CONFIGS.length) % CARD_CONFIGS.length;

  if (offset === 0) return "center";
  if (offset === 1) return "right";
  return "left";
}

function getCardTransform(slot: CardSlot) {
  if (slot === "center") {
    return {
      position: new THREE.Vector3(0, -0.18, 0.36),
      rotationY: 0,
      scale: 1.12,
      opacity: 1
    };
  }

  if (slot === "left") {
    return {
      position: new THREE.Vector3(-2.05, -0.28, -0.44),
      rotationY: 0.34,
      scale: 0.82,
      opacity: 0.72
    };
  }

  return {
    position: new THREE.Vector3(2.05, -0.28, -0.44),
    rotationY: -0.34,
    scale: 0.82,
    opacity: 0.72
  };
}

function applyTransform(body: THREE.Group, css: THREE.Group, slot: CardSlot) {
  const transform = getCardTransform(slot);

  body.position.copy(transform.position);
  body.rotation.y = transform.rotationY;
  body.scale.setScalar(transform.scale);

  css.position.copy(transform.position);
  css.rotation.y = transform.rotationY;
  css.scale.setScalar(transform.scale);
}

function disposeObject(object: THREE.Object3D) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();

  object.traverse((child) => {
    const mesh = child as THREE.Mesh;

    if (!mesh.isMesh) {
      return;
    }

    geometries.add(mesh.geometry);

    const materialList = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

    materialList.forEach((material) => {
      materials.add(material);

      const mappedMaterial = material as THREE.Material & {
        map?: THREE.Texture | null;
        normalMap?: THREE.Texture | null;
        roughnessMap?: THREE.Texture | null;
        metalnessMap?: THREE.Texture | null;
        emissiveMap?: THREE.Texture | null;
      };

      if (mappedMaterial.map) textures.add(mappedMaterial.map);
      if (mappedMaterial.normalMap) textures.add(mappedMaterial.normalMap);
      if (mappedMaterial.roughnessMap) textures.add(mappedMaterial.roughnessMap);
      if (mappedMaterial.metalnessMap) textures.add(mappedMaterial.metalnessMap);
      if (mappedMaterial.emissiveMap) textures.add(mappedMaterial.emissiveMap);
    });
  });

  textures.forEach((texture) => texture.dispose());
  materials.forEach((material) => material.dispose());
  geometries.forEach((geometry) => geometry.dispose());
}

export function GlbCardPreview({ modelPath }: GlbCardPreviewProps) {
  const renderBoxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [status, setStatus] = useState("Three.js + 실제 폰트 3카드 스테이지 준비 중");

  useEffect(() => {
    const renderBox = renderBoxRef.current;
    const canvas = canvasRef.current;

    if (!renderBox || !canvas) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas,
      powerPreference: "high-performance"
    });
    const cssRenderer = new CSS3DRenderer();
    const scene = new THREE.Scene();
    const cssScene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    const cards: CardRuntime[] = CARD_CONFIGS.map((card, index) => {
      const isActive = index === activeIndex;
      const webgl = createWebGlCard(isActive);
      const css = createCssCard(card, isActive);
      const slot = getSlot(index, activeIndex);

      webgl.hitArea.userData.index = index;
      applyTransform(webgl.group, css, slot);
      scene.add(webgl.group);
      cssScene.add(css);

      return {
        body: webgl.group,
        css,
        hitArea: webgl.hitArea,
        index
      };
    });
    let frameId = 0;

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

    cssRenderer.domElement.className = "glb-preview__css-layer";
    cssRenderer.domElement.setAttribute("aria-hidden", "true");
    renderBox.appendChild(cssRenderer.domElement);

    scene.environment = environment;
    camera.position.set(0, 0.02, 6.45);

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(4.7, 128),
      new THREE.MeshBasicMaterial({
        color: "#b41307",
        transparent: true,
        opacity: 0.13,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    floor.position.y = -1.64;
    floor.position.z = 0.22;
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const keyLight = new THREE.SpotLight(0xffffff, 18, 18, 0.48, 0.78, 1.1);
    keyLight.position.set(0.8, 5.6, 4.5);
    scene.add(keyLight);

    const leftRim = new THREE.PointLight(0xffffff, 12, 10);
    leftRim.position.set(-3.4, 1.2, 3.1);
    scene.add(leftRim);

    const rightRim = new THREE.PointLight(0xdce8ff, 10, 10);
    rightRim.position.set(3.4, 1.7, 2.9);
    scene.add(rightRim);

    const redLight = new THREE.PointLight(0xb41307, 22, 9);
    redLight.position.set(0, -1.3, 2.4);
    scene.add(redLight);

    const resize = () => {
      const rect = renderBox.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));

      renderer.setSize(width, height, false);
      cssRenderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(renderBox);
    resize();

    const handlePointerUp = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const normalizedX = (event.clientX - rect.left) / rect.width;
      const targetSlot: CardSlot | null = normalizedX < 0.42 ? "left" : normalizedX > 0.58 ? "right" : null;

      if (!targetSlot) {
        return;
      }

      const nextIndex = CARD_CONFIGS.findIndex((_, index) => getSlot(index, activeIndex) === targetSlot);

      if (nextIndex >= 0 && nextIndex !== activeIndex) {
        setActiveIndex(nextIndex);
      }
    };

    canvas.addEventListener("pointerup", handlePointerUp);
    renderBox.addEventListener("pointerup", handlePointerUp);

    const animate = () => {
      cards.forEach((card) => {
        const slot = getSlot(card.index, activeIndex);
        const transform = getCardTransform(slot);

        card.body.position.lerp(transform.position, 0.12);
        card.css.position.lerp(transform.position, 0.12);
        card.body.rotation.y = THREE.MathUtils.lerp(card.body.rotation.y, transform.rotationY, 0.12);
        card.css.rotation.y = card.body.rotation.y;
        card.body.scale.lerp(new THREE.Vector3(transform.scale, transform.scale, transform.scale), 0.12);
        card.css.scale.lerp(new THREE.Vector3(transform.scale, transform.scale, transform.scale), 0.12);
      });

      renderer.render(scene, camera);
      cssRenderer.render(cssScene, camera);
      frameId = requestAnimationFrame(animate);
    };

    setStatus(`${modelPath} 대신 얇은 3D 유리 카드 3장으로 메인 Hero 구도 테스트 중`);
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerup", handlePointerUp);
      renderBox.removeEventListener("pointerup", handlePointerUp);
      cssRenderer.domElement.remove();
      disposeObject(scene);
      environment.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
    };
  }, [activeIndex, modelPath]);

  const activeCard = CARD_CONFIGS[activeIndex];

  return (
    <section className="glb-preview" aria-label="Three.js 블랙 글래스 카드 테스트">
      <div className="glb-preview__chrome" aria-label="테스트 페이지 상단">
        <a className="glb-preview__logo" href="/" aria-label="ROTI 메인으로 이동">
          ROTI
        </a>
        <span>THREE.JS BLACK GLASS CARD</span>
      </div>
      <div className="glb-preview__copy">
        <p className="glb-preview__eyebrow">ROTI 브랜드 포털</p>
        <h1>세 브랜드를 하나의 무대로</h1>
        <p>얇은 글래스 카드와 실제 폰트 표면으로 Hero 구도를 테스트합니다.</p>
      </div>
      <div className="glb-preview__meta" aria-live="polite">
        <span>BRAND PORTAL</span>
        <strong>
          {String(activeIndex + 1).padStart(2, "0")} / {String(CARD_CONFIGS.length).padStart(2, "0")}
        </strong>
        <em>{activeCard.name}</em>
      </div>
      <div className="glb-preview__stage">
        <div ref={renderBoxRef} className="glb-preview__renderbox">
          <canvas ref={canvasRef} className="glb-preview__canvas" aria-label="Three.js 블랙 글래스 카드" />
        </div>
        <p className="glb-preview__status" aria-live="polite">
          {status}
        </p>
      </div>
    </section>
  );
}
