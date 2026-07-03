"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { CSS3DObject, CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import type { Brand, BrandId } from "@/types/brand";
import type { HeroCardSlot } from "@/lib/animations/heroAnimations";

type HeroGlassStageProps = {
  brands: Brand[];
  activeBrandId: BrandId | undefined;
  cardStates: Array<{
    brandId: BrandId;
    slot: HeroCardSlot;
  }>;
  onSelectBrand: (brandId: BrandId) => void;
};

type CardRuntime = {
  brandId: BrandId;
  body: THREE.Group;
  css: THREE.Group;
  shadow: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  reflection: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  hitArea: THREE.Mesh;
  faceElements: HTMLElement[];
};

const CARD_WIDTH = 1.72;
const CARD_HEIGHT = 2.52;
const CARD_DEPTH = 0.105;
const CSS_CARD_WIDTH = 420;
const CSS_SCALE = CARD_WIDTH / CSS_CARD_WIDTH;
const CARD_CORNER_RADIUS = 0.042;

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

function createCardGeometry() {
  const geometry = new THREE.ExtrudeGeometry(createRoundedRectShape(CARD_WIDTH, CARD_HEIGHT, CARD_CORNER_RADIUS), {
    bevelEnabled: true,
    bevelSegments: 12,
    bevelSize: 0.014,
    bevelThickness: 0.024,
    curveSegments: 22,
    depth: CARD_DEPTH,
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

function createGlassHighlights(isActive: boolean) {
  const group = new THREE.Group();
  const bright = new THREE.MeshBasicMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: isActive ? 0.22 : 0.17,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const muted = bright.clone();
  muted.opacity = isActive ? 0.11 : 0.075;

  const leftEdge = new THREE.Mesh(new THREE.BoxGeometry(0.011, CARD_HEIGHT * 0.9, 0.01), bright);
  leftEdge.position.set(-CARD_WIDTH / 2 + 0.028, 0.01, CARD_DEPTH / 2 + 0.024);
  group.add(leftEdge);

  const rightEdge = new THREE.Mesh(new THREE.BoxGeometry(0.011, CARD_HEIGHT * 0.86, 0.01), muted);
  rightEdge.position.set(CARD_WIDTH / 2 - 0.028, -0.01, CARD_DEPTH / 2 + 0.024);
  group.add(rightEdge);

  const topEdge = new THREE.Mesh(new THREE.BoxGeometry(CARD_WIDTH * 0.82, 0.01, 0.01), muted);
  topEdge.position.set(0.02, CARD_HEIGHT / 2 - 0.032, CARD_DEPTH / 2 + 0.026);
  group.add(topEdge);

  const bottomEdge = new THREE.Mesh(new THREE.BoxGeometry(CARD_WIDTH * 0.78, 0.01, 0.01), muted);
  bottomEdge.position.set(0, -CARD_HEIGHT / 2 + 0.032, CARD_DEPTH / 2 + 0.026);
  group.add(bottomEdge);

  return group;
}

function createWebGlCard(isActive: boolean) {
  const group = new THREE.Group();
  const geometry = createCardGeometry();
  const body = new THREE.Mesh(geometry, createBlackGlassMaterial(isActive));
  body.name = "ROTI thin black glass card body";
  group.add(body);

  const edge = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry, 16),
    new THREE.LineBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: isActive ? 0.24 : 0.17
    })
  );
  group.add(edge);
  group.add(createGlassHighlights(isActive));

  const hitArea = new THREE.Mesh(
    new THREE.PlaneGeometry(CARD_WIDTH * 1.08, CARD_HEIGHT * 1.08),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
  );
  hitArea.name = "ROTI card hit area";
  hitArea.position.z = CARD_DEPTH / 2 + 0.04;
  group.add(hitArea);

  return { group, hitArea };
}

function createSoftEllipseTexture({
  size = 512,
  innerAlpha,
  midAlpha,
  outerAlpha
}: {
  size?: number;
  innerAlpha: number;
  midAlpha: number;
  outerAlpha: number;
}) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  context.clearRect(0, 0, size, size);
  context.scale(1, 0.34);
  const centerY = size / 0.68;
  const gradient = context.createRadialGradient(size / 2, centerY, size * 0.03, size / 2, centerY, size * 0.48);
  gradient.addColorStop(0, `rgba(255, 255, 255, ${innerAlpha})`);
  gradient.addColorStop(0.36, `rgba(255, 255, 255, ${midAlpha})`);
  gradient.addColorStop(1, `rgba(255, 255, 255, ${outerAlpha})`);
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size / 0.34);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

function createFloorMesh(texture: THREE.Texture, color: string, opacity: number, blending?: THREE.Blending) {
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    depthTest: false,
    blending,
    toneMapped: false
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  mesh.renderOrder = -10;
  return mesh;
}

function createTextElement(tagName: keyof HTMLElementTagNameMap, className: string, text: string) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function getSceneName(brandId: BrandId) {
  if (brandId === "roti-camp") return "camp";
  if (brandId === "roti-homesys") return "homesys";
  return "leel";
}

function createCardFaceElement(brand: Brand, isActive: boolean) {
  const element = document.createElement("article");
  element.className = `glb-css-card-face glb-css-card-face--front glb-css-card-face--${getSceneName(brand.id)}`;
  element.dataset.active = String(isActive);

  const shine = document.createElement("div");
  shine.className = "glb-css-card-face__shine";
  shine.setAttribute("aria-hidden", "true");

  const copy = document.createElement("div");
  copy.className = "glb-css-card-face__copy";
  copy.append(
    createTextElement("span", "", "ROTI BRAND PORTAL"),
    createTextElement("strong", "", brand.name),
    createTextElement("i", "", ""),
    createTextElement("p", "", brand.visualTagline),
    createTextElement("small", "", brand.visualScene)
  );
  copy.querySelector("i")?.setAttribute("aria-hidden", "true");

  element.append(shine, copy);
  return element;
}

function createCardBackElement(brand: Brand, isActive: boolean) {
  const element = document.createElement("article");
  element.className = `glb-css-card-face glb-css-card-face--back glb-css-card-face--${getSceneName(brand.id)}`;
  element.dataset.active = String(isActive);

  const copy = document.createElement("div");
  copy.className = "glb-css-card-face__copy glb-css-card-face__copy--back";
  copy.append(createTextElement("strong", "", brand.name), createTextElement("i", "", ""), createTextElement("p", "", "BRAND PORTAL"));
  copy.querySelector("i")?.setAttribute("aria-hidden", "true");

  element.append(copy);
  return element;
}

function createCardSideElement(brand: Brand, side: "left" | "right", isActive: boolean) {
  const element = document.createElement("div");
  element.className = `glb-css-card-side glb-css-card-side--${side} glb-css-card-side--${getSceneName(brand.id)}`;
  element.dataset.active = String(isActive);
  return element;
}

function createCssCard(brand: Brand, isActive: boolean) {
  const group = new THREE.Group();
  const elements: HTMLElement[] = [];
  const frontElement = createCardFaceElement(brand, isActive);
  const backElement = createCardBackElement(brand, isActive);
  const leftElement = createCardSideElement(brand, "left", isActive);
  const rightElement = createCardSideElement(brand, "right", isActive);

  const front = new CSS3DObject(frontElement);
  front.position.z = CARD_DEPTH / 2 + 0.014;
  front.scale.set(CSS_SCALE, CSS_SCALE, CSS_SCALE);
  group.add(front);

  const back = new CSS3DObject(backElement);
  back.position.z = -CARD_DEPTH / 2 - 0.014;
  back.rotation.y = Math.PI;
  back.scale.set(CSS_SCALE, CSS_SCALE, CSS_SCALE);
  group.add(back);

  const left = new CSS3DObject(leftElement);
  left.position.x = -CARD_WIDTH / 2;
  left.rotation.y = -Math.PI / 2;
  left.scale.set(CSS_SCALE, CSS_SCALE, CSS_SCALE);
  group.add(left);

  const right = new CSS3DObject(rightElement);
  right.position.x = CARD_WIDTH / 2;
  right.rotation.y = Math.PI / 2;
  right.scale.set(CSS_SCALE, CSS_SCALE, CSS_SCALE);
  group.add(right);

  elements.push(frontElement, backElement, leftElement, rightElement);
  return { group, elements };
}

function getCardTransform(slot: HeroCardSlot, isCompact = false, isShortViewport = false) {
  if (isCompact) {
    if (slot === "center") {
      return {
        position: new THREE.Vector3(0, -0.02, 0.34),
        rotationY: 0,
        scale: 1.16
      };
    }

    if (slot === "left") {
      return {
        position: new THREE.Vector3(-1.28, -0.05, -0.1),
        rotationY: 0.58,
        scale: 0.92
      };
    }

    return {
      position: new THREE.Vector3(1.28, -0.05, -0.1),
      rotationY: -0.58,
      scale: 0.92
    };
  }

  if (isShortViewport) {
    if (slot === "center") {
      return {
        position: new THREE.Vector3(0, 0.08, 0.34),
        rotationY: 0,
        scale: 1.02
      };
    }

    if (slot === "left") {
      return {
        position: new THREE.Vector3(-2.04, -0.03, -0.58),
        rotationY: 0.62,
        scale: 0.8
      };
    }

    return {
      position: new THREE.Vector3(2.04, -0.03, -0.58),
      rotationY: -0.62,
      scale: 0.8
    };
  }

  if (slot === "center") {
    return {
      position: new THREE.Vector3(0, 0.04, 0.36),
      rotationY: 0,
      scale: 1.28
    };
  }

  if (slot === "left") {
    return {
      position: new THREE.Vector3(-2.22, -0.12, -0.58),
      rotationY: 0.62,
      scale: 0.96
    };
  }

  return {
    position: new THREE.Vector3(2.22, -0.12, -0.58),
    rotationY: -0.62,
    scale: 0.96
  };
}

function disposeObject(object: THREE.Object3D) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();

  object.traverse((child) => {
    const mesh = child as THREE.Mesh;

    if (!mesh.isMesh) return;

    geometries.add(mesh.geometry);
    const materialList = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    materialList.forEach((material) => materials.add(material));
  });

  materials.forEach((material) => material.dispose());
  geometries.forEach((geometry) => geometry.dispose());
}

export function HeroGlassStage({ brands, activeBrandId, cardStates, onSelectBrand }: HeroGlassStageProps) {
  const renderBoxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardStatesRef = useRef(cardStates);
  const activeBrandIdRef = useRef(activeBrandId);
  const onSelectBrandRef = useRef(onSelectBrand);

  cardStatesRef.current = cardStates;
  activeBrandIdRef.current = activeBrandId;
  onSelectBrandRef.current = onSelectBrand;

  useEffect(() => {
    const renderBox = renderBoxRef.current;
    const canvas = canvasRef.current;

    if (!renderBox || !canvas) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    const shadowTexture = createSoftEllipseTexture({ innerAlpha: 0.96, midAlpha: 0.5, outerAlpha: 0 });
    const reflectionTexture = createSoftEllipseTexture({ innerAlpha: 0.48, midAlpha: 0.18, outerAlpha: 0 });
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const targetPosition = new THREE.Vector3();
    const targetScale = new THREE.Vector3();
    const targetFloorScale = new THREE.Vector3();
    let isCompact = renderBox.getBoundingClientRect().width < 640 || window.innerWidth < 640;
    let isShortViewport = window.innerHeight < 780;
    const cards: CardRuntime[] = brands.map((brand) => {
      const isActive = brand.id === activeBrandIdRef.current;
      const webgl = createWebGlCard(isActive);
      const css = createCssCard(brand, isActive);
      const shadow = createFloorMesh(shadowTexture, "#030303", isActive ? 0.5 : 0.24);
      const reflection = createFloorMesh(reflectionTexture, "#b9c1c1", isActive ? 0.2 : 0.075, THREE.AdditiveBlending);
      const slot = cardStatesRef.current.find((state) => state.brandId === brand.id)?.slot ?? "center";
      const transform = getCardTransform(slot, isCompact, isShortViewport);
      const floorY = transform.position.y - CARD_HEIGHT * transform.scale * 0.48;

      webgl.group.position.copy(transform.position);
      webgl.group.rotation.y = transform.rotationY;
      webgl.group.scale.setScalar(transform.scale);
      webgl.hitArea.userData.brandId = brand.id;
      css.group.position.copy(transform.position);
      css.group.rotation.y = transform.rotationY;
      css.group.scale.setScalar(transform.scale);
      shadow.position.set(transform.position.x, floorY - 0.08, transform.position.z - 0.18);
      reflection.position.set(transform.position.x, floorY + 0.02, transform.position.z - 0.16);
      shadow.scale.set(isActive ? 2.74 : 1.76, isActive ? 0.5 : 0.32, 1);
      reflection.scale.set(isActive ? 2.32 : 1.42, isActive ? 0.36 : 0.2, 1);
      shadow.rotation.z = slot === "left" ? -0.08 : slot === "right" ? 0.08 : 0;
      reflection.rotation.z = shadow.rotation.z;

      scene.add(shadow);
      scene.add(reflection);
      scene.add(webgl.group);
      cssScene.add(css.group);

      return {
        brandId: brand.id,
        body: webgl.group,
        css: css.group,
        shadow,
        reflection,
        hitArea: webgl.hitArea,
        faceElements: css.elements
      };
    });
    let frameId = 0;

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isCompact ? 1.25 : 1.5));

    cssRenderer.domElement.className = "hero-glass-stage__css-layer";
    cssRenderer.domElement.setAttribute("aria-hidden", "true");
    renderBox.appendChild(cssRenderer.domElement);

    scene.environment = environment;
    camera.position.set(0, 0.02, 6.45);
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

    const resize = () => {
      const rect = renderBox.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      isCompact = width < 640 || window.innerWidth < 640;
      isShortViewport = !isCompact && window.innerHeight < 780;

      renderer.setSize(width, height, false);
      cssRenderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isCompact ? 1.25 : 1.5));
      camera.fov = isCompact ? 36 : 32;
      camera.aspect = width / height;
      camera.position.set(0, isCompact ? 0.04 : 0.02, isCompact ? 6.85 : 6.45);
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(renderBox);
    resize();

    const handlePointerUp = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);

      const intersections = raycaster.intersectObjects(
        cards.map((card) => card.hitArea),
        false
      );
      const brandId = intersections[0]?.object.userData.brandId as BrandId | undefined;

      if (brandId) {
        onSelectBrandRef.current(brandId);
      }
    };

    canvas.addEventListener("pointerup", handlePointerUp);

    const animate = () => {
      cards.forEach((card) => {
        const slot = cardStatesRef.current.find((state) => state.brandId === card.brandId)?.slot ?? "center";
        const isActive = card.brandId === activeBrandIdRef.current;
        const transform = getCardTransform(slot, isCompact, isShortViewport);
        const ease = prefersReducedMotion ? 1 : 0.12;
        const floorY = transform.position.y - CARD_HEIGHT * transform.scale * (isCompact ? 0.485 : 0.49);
        const shadowWidth = (slot === "center" ? 3.46 : 2.36) * transform.scale;
        const shadowHeight = (slot === "center" ? 0.76 : 0.48) * transform.scale;
        const reflectionWidth = (slot === "center" ? 3.06 : 1.88) * transform.scale;
        const reflectionHeight = (slot === "center" ? 0.56 : 0.32) * transform.scale;
        const shadowOpacity = isActive ? (isCompact ? 0.56 : 0.84) : isCompact ? 0.28 : 0.46;
        const reflectionOpacity = isActive ? (isCompact ? 0.18 : 0.36) : isCompact ? 0.08 : 0.16;
        const floorRotation = slot === "left" ? -0.1 : slot === "right" ? 0.1 : 0;

        card.body.position.lerp(transform.position, ease);
        card.css.position.lerp(transform.position, ease);
        card.body.rotation.y = THREE.MathUtils.lerp(card.body.rotation.y, transform.rotationY, ease);
        card.css.rotation.y = card.body.rotation.y;
        targetScale.setScalar(transform.scale);
        card.body.scale.lerp(targetScale, ease);
        card.css.scale.lerp(targetScale, ease);
        targetPosition.set(transform.position.x, floorY - 0.07, transform.position.z - 0.2);
        card.shadow.position.lerp(targetPosition, ease);
        targetFloorScale.set(shadowWidth, shadowHeight, 1);
        card.shadow.scale.lerp(targetFloorScale, ease);
        card.shadow.rotation.z = THREE.MathUtils.lerp(card.shadow.rotation.z, floorRotation, ease);
        card.shadow.material.opacity = THREE.MathUtils.lerp(card.shadow.material.opacity, shadowOpacity, ease);
        targetPosition.set(transform.position.x, floorY + 0.065, transform.position.z - 0.18);
        card.reflection.position.lerp(targetPosition, ease);
        targetFloorScale.set(reflectionWidth, reflectionHeight, 1);
        card.reflection.scale.lerp(targetFloorScale, ease);
        card.reflection.rotation.z = card.shadow.rotation.z;
        card.reflection.material.opacity = THREE.MathUtils.lerp(card.reflection.material.opacity, reflectionOpacity, ease);
        card.faceElements.forEach((element) => {
          element.dataset.active = String(isActive);
        });
      });

      renderer.render(scene, camera);
      cssRenderer.render(cssScene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerup", handlePointerUp);
      cssRenderer.domElement.remove();
      disposeObject(scene);
      shadowTexture.dispose();
      reflectionTexture.dispose();
      environment.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
    };
  }, [brands]);

  return (
    <div ref={renderBoxRef} className="hero-glass-stage" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-glass-stage__canvas" />
    </div>
  );
}
