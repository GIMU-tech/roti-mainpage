"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import type { Brand, BrandId } from "@/types/brand";
import type { HeroCardSlot } from "@/lib/animations/heroAnimations";

type ThreeTextureCardStageProps = {
  brands: Brand[];
  activeBrandId: BrandId | undefined;
  cardStates: Array<{
    brandId: BrandId;
    slot: HeroCardSlot;
  }>;
  onSelectBrand: (brandId: BrandId) => void;
};

type LabCardRuntime = {
  brand: Brand;
  group: THREE.Group;
  hitArea: THREE.Mesh;
  texture: THREE.CanvasTexture;
  sideTextures: THREE.CanvasTexture[];
  frontMaterial: THREE.MeshBasicMaterial;
  sideWrapMaterials: THREE.MeshBasicMaterial[];
  sideMaterial: THREE.MeshPhysicalMaterial;
  shellMaterial: THREE.MeshPhysicalMaterial;
  edgeMaterial: THREE.LineBasicMaterial;
  activeState: boolean;
};

type CoverSourceRect = {
  sourceX: number;
  sourceY: number;
  sourceWidth: number;
  sourceHeight: number;
};

const CARD_WIDTH = 1.72;
const CARD_HEIGHT = 2.52;
const CARD_DEPTH = 0.16;
const CARD_RADIUS = 0.045;
const FACE_WIDTH = CARD_WIDTH * 1.002;
const FACE_HEIGHT = CARD_HEIGHT * 1.002;
const FACE_Z = CARD_DEPTH / 2 + 0.038;
const WRAP_DEPTH = CARD_DEPTH + 0.06;
const WRAP_Z = 0.018;
const VERTICAL_WRAP_HEIGHT = CARD_HEIGHT - CARD_RADIUS * 5.2;
const HORIZONTAL_WRAP_WIDTH = CARD_WIDTH - CARD_RADIUS * 5.2;

const BRAND_COPY: Record<BrandId, { line: string; keywords: string; scene: "camp" | "homesys" | "leel" }> = {
  "roti-camp": {
    line: "밖으로 나가는 생활",
    keywords: "캠핑 · 이동 · 수납",
    scene: "camp"
  },
  "roti-homesys": {
    line: "정리되는 집",
    keywords: "수납 · 이동 · 생활동선",
    scene: "homesys"
  },
  leel: {
    line: "차분한 주방과 리빙",
    keywords: "주방 · 소재 · 여백",
    scene: "leel"
  }
};

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
  const geometry = new THREE.ExtrudeGeometry(createRoundedRectShape(CARD_WIDTH, CARD_HEIGHT, CARD_RADIUS), {
    bevelEnabled: true,
    bevelSegments: 14,
    bevelSize: 0.018,
    bevelThickness: 0.026,
    curveSegments: 24,
    depth: CARD_DEPTH,
    steps: 1
  });

  geometry.center();
  return geometry;
}

function createCardFaceGeometry() {
  const width = FACE_WIDTH;
  const height = FACE_HEIGHT;
  const geometry = new THREE.ShapeGeometry(createRoundedRectShape(width, height, CARD_RADIUS * 1.04), 28);
  const position = geometry.attributes.position;
  const uvs: number[] = [];

  for (let index = 0; index < position.count; index += 1) {
    const x = position.getX(index);
    const y = position.getY(index);
    uvs.push((x + width / 2) / width, (y + height / 2) / height);
  }

  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  return geometry;
}

function drawRoundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  words.forEach((word, index) => {
    const testLine = line ? `${line} ${word}` : word;
    const isLast = index === words.length - 1;

    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = word;
      currentY += lineHeight;
    } else {
      line = testLine;
    }

    if (isLast) {
      ctx.fillText(line, x, currentY);
    }
  });
}

function drawSceneSilhouette(ctx: CanvasRenderingContext2D, scene: "camp" | "homesys" | "leel", width: number, height: number) {
  ctx.save();
  ctx.globalAlpha = 0.92;

  if (scene === "camp") {
    const mountain = ctx.createLinearGradient(0, height * 0.48, 0, height * 0.86);
    mountain.addColorStop(0, "rgba(61, 68, 66, 0.55)");
    mountain.addColorStop(1, "rgba(0, 0, 0, 0.76)");
    ctx.fillStyle = mountain;
    ctx.beginPath();
    ctx.moveTo(width * 0.08, height * 0.82);
    ctx.lineTo(width * 0.34, height * 0.52);
    ctx.lineTo(width * 0.46, height * 0.68);
    ctx.lineTo(width * 0.64, height * 0.45);
    ctx.lineTo(width * 0.92, height * 0.82);
    ctx.closePath();
    ctx.fill();
  }

  if (scene === "homesys") {
    const building = ctx.createLinearGradient(0, height * 0.48, 0, height * 0.86);
    building.addColorStop(0, "rgba(86, 77, 66, 0.48)");
    building.addColorStop(1, "rgba(0, 0, 0, 0.8)");
    ctx.fillStyle = building;
    ctx.beginPath();
    ctx.moveTo(width * 0.36, height * 0.58);
    ctx.lineTo(width * 0.86, height * 0.46);
    ctx.lineTo(width * 0.86, height * 0.83);
    ctx.lineTo(width * 0.36, height * 0.83);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(255, 224, 184, 0.18)";
    ctx.fillRect(width * 0.46, height * 0.69, width * 0.28, 3);
  }

  if (scene === "leel") {
    const kitchen = ctx.createLinearGradient(0, height * 0.56, 0, height * 0.88);
    kitchen.addColorStop(0, "rgba(78, 70, 64, 0.48)");
    kitchen.addColorStop(1, "rgba(0, 0, 0, 0.82)");
    ctx.fillStyle = kitchen;
    ctx.fillRect(width * 0.38, height * 0.65, width * 0.45, height * 0.16);
    ctx.fillStyle = "rgba(255, 232, 206, 0.22)";
    ctx.fillRect(width * 0.44, height * 0.61, width * 0.34, 3);
    ctx.strokeStyle = "rgba(255, 236, 216, 0.22)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(width * 0.63, height * 0.59, 28, Math.PI, 0);
    ctx.stroke();
  }

  ctx.restore();
}

function getCoverSourceRect(image: HTMLImageElement, width: number, height: number): CoverSourceRect | undefined {
  const imageWidth = image.naturalWidth || image.width;
  const imageHeight = image.naturalHeight || image.height;

  if (!imageWidth || !imageHeight) return undefined;

  const sourceRatio = imageWidth / imageHeight;
  const targetRatio = width / height;
  let sourceWidth = imageWidth;
  let sourceHeight = imageHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (sourceRatio > targetRatio) {
    sourceWidth = imageHeight * targetRatio;
    sourceX = (imageWidth - sourceWidth) / 2;
  } else {
    sourceHeight = imageWidth / targetRatio;
    sourceY = (imageHeight - sourceHeight) / 2;
  }

  return { sourceX, sourceY, sourceWidth, sourceHeight };
}

function drawCoverImage(ctx: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number) {
  const sourceRect = getCoverSourceRect(image, width, height);

  if (!sourceRect) return;

  ctx.save();
  ctx.globalAlpha = 0.82;
  ctx.drawImage(
    image,
    sourceRect.sourceX,
    sourceRect.sourceY,
    sourceRect.sourceWidth,
    sourceRect.sourceHeight,
    0,
    0,
    width,
    height
  );
  ctx.restore();

  const imageShade = ctx.createLinearGradient(0, 0, 0, height);
  imageShade.addColorStop(0, "rgba(0, 0, 0, 0.16)");
  imageShade.addColorStop(0.38, "rgba(0, 0, 0, 0.26)");
  imageShade.addColorStop(0.72, "rgba(0, 0, 0, 0.68)");
  imageShade.addColorStop(1, "rgba(0, 0, 0, 0.9)");
  ctx.fillStyle = imageShade;
  ctx.fillRect(0, 0, width, height);

  const sideBlend = ctx.createLinearGradient(0, 0, width, 0);
  sideBlend.addColorStop(0, "rgba(0, 0, 0, 0.52)");
  sideBlend.addColorStop(0.2, "rgba(0, 0, 0, 0)");
  sideBlend.addColorStop(0.8, "rgba(0, 0, 0, 0)");
  sideBlend.addColorStop(1, "rgba(0, 0, 0, 0.46)");
  ctx.fillStyle = sideBlend;
  ctx.fillRect(0, 0, width, height);
}

function drawSideCoverImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  side: "left" | "right" | "top" | "bottom",
  width: number,
  height: number
) {
  const sourceRect = getCoverSourceRect(image, 1024, 1500);

  if (!sourceRect) return;

  const edgeThickness = side === "left" || side === "right" ? sourceRect.sourceWidth * 0.16 : sourceRect.sourceHeight * 0.16;
  let sx = sourceRect.sourceX;
  let sy = sourceRect.sourceY;
  let sw = sourceRect.sourceWidth;
  let sh = sourceRect.sourceHeight;

  if (side === "left") {
    sw = edgeThickness;
  }

  if (side === "right") {
    sx = sourceRect.sourceX + sourceRect.sourceWidth - edgeThickness;
    sw = edgeThickness;
  }

  if (side === "top") {
    sh = edgeThickness;
  }

  if (side === "bottom") {
    sy = sourceRect.sourceY + sourceRect.sourceHeight - edgeThickness;
    sh = edgeThickness;
  }

  ctx.save();
  ctx.globalAlpha = side === "bottom" ? 0.72 : 0.82;
  ctx.drawImage(image, sx, sy, sw, sh, 0, 0, width, height);
  ctx.restore();
}

function createSideTexture(brand: Brand, side: "left" | "right" | "top" | "bottom", isActive: boolean, image?: HTMLImageElement) {
  const canvas = document.createElement("canvas");
  const isVertical = side === "left" || side === "right";
  canvas.width = isVertical ? 160 : 1024;
  canvas.height = isVertical ? 1500 : 160;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas 2D context is not available.");
  }

  const copy = BRAND_COPY[brand.id];
  const base = ctx.createLinearGradient(0, 0, isVertical ? canvas.width : 0, isVertical ? 0 : canvas.height);
  base.addColorStop(0, copy.scene === "camp" ? "#151817" : "#171717");
  base.addColorStop(0.5, "#070808");
  base.addColorStop(1, "#020202");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (image) {
    drawSideCoverImage(ctx, image, side, canvas.width, canvas.height);
  }

  const shade = ctx.createLinearGradient(0, 0, isVertical ? canvas.width : 0, isVertical ? 0 : canvas.height);
  shade.addColorStop(0, "rgba(255, 255, 255, 0.18)");
  shade.addColorStop(0.22, "rgba(255, 255, 255, 0.04)");
  shade.addColorStop(0.68, "rgba(0, 0, 0, 0.34)");
  shade.addColorStop(1, "rgba(0, 0, 0, 0.74)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (isActive) {
    const rim = ctx.createLinearGradient(0, 0, isVertical ? canvas.width : 0, isVertical ? 0 : canvas.height);
    rim.addColorStop(0, "rgba(255, 255, 255, 0.22)");
    rim.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = rim;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;

  return texture;
}

function createCardTexture(brand: Brand, isActive: boolean, image?: HTMLImageElement) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1500;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas 2D context is not available.");
  }

  const copy = BRAND_COPY[brand.id];
  const radius = 34;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoundedRectPath(ctx, 0, 0, canvas.width, canvas.height, radius);
  ctx.clip();

  const base = ctx.createLinearGradient(0, 0, 0, canvas.height);
  base.addColorStop(0, copy.scene === "homesys" ? "#252828" : "#1d2020");
  base.addColorStop(0.42, "#080909");
  base.addColorStop(1, "#000000");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (image) {
    drawCoverImage(ctx, image, canvas.width, canvas.height);
  }

  const leftEdge = ctx.createLinearGradient(0, 0, canvas.width, 0);
  leftEdge.addColorStop(0, "rgba(255, 255, 255, 0.22)");
  leftEdge.addColorStop(0.07, "rgba(255, 255, 255, 0.045)");
  leftEdge.addColorStop(0.92, "rgba(255, 255, 255, 0.025)");
  leftEdge.addColorStop(1, "rgba(255, 255, 255, 0.14)");
  ctx.fillStyle = leftEdge;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const spotlight = ctx.createRadialGradient(canvas.width * 0.58, canvas.height * 0.17, 20, canvas.width * 0.58, canvas.height * 0.17, 420);
  spotlight.addColorStop(0, "rgba(255, 255, 255, 0.035)");
  spotlight.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = spotlight;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (!image) {
    drawSceneSilhouette(ctx, copy.scene, canvas.width, canvas.height);
  }

  const lowerShade = ctx.createLinearGradient(0, canvas.height * 0.48, 0, canvas.height);
  lowerShade.addColorStop(0, "rgba(0, 0, 0, 0.05)");
  lowerShade.addColorStop(0.72, "rgba(0, 0, 0, 0.68)");
  lowerShade.addColorStop(1, "rgba(0, 0, 0, 0.9)");
  ctx.fillStyle = lowerShade;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255, 255, 255, 0.58)";
  ctx.font = "700 34px Pretendard, Inter, Arial, sans-serif";
  ctx.letterSpacing = "1px";
  ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
  ctx.shadowBlur = 18;
  ctx.fillText("ROTI BRAND PORTAL", 150, 312);

  ctx.fillStyle = "rgba(255, 255, 255, 0.96)";
  ctx.font = brand.name.length > 6 ? "850 82px Pretendard, Inter, Arial, sans-serif" : "850 98px Pretendard, Inter, Arial, sans-serif";
  wrapText(ctx, brand.name, 150, 455, 620, 92);

  ctx.fillStyle = "#B41307";
  ctx.shadowColor = "rgba(180, 19, 7, 0.45)";
  ctx.shadowBlur = isActive ? 18 : 10;
  ctx.fillRect(150, 602, 76, 7);
  ctx.shadowBlur = 0;

  ctx.fillStyle = "rgba(255, 255, 255, 0.86)";
  ctx.font = "720 38px Pretendard, Inter, Arial, sans-serif";
  ctx.fillText(copy.line, 150, 690);

  ctx.fillStyle = "rgba(255, 255, 255, 0.56)";
  ctx.font = "650 28px Pretendard, Inter, Arial, sans-serif";
  ctx.fillText(copy.keywords, 150, 752);
  ctx.shadowBlur = 0;

  const glass = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  glass.addColorStop(0, "rgba(255, 255, 255, 0.045)");
  glass.addColorStop(0.18, "rgba(255, 255, 255, 0.012)");
  glass.addColorStop(0.74, "rgba(255, 255, 255, 0)");
  glass.addColorStop(1, "rgba(255, 255, 255, 0.04)");
  ctx.fillStyle = glass;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = isActive ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.34)";
  ctx.lineWidth = 4;
  drawRoundedRectPath(ctx, 4, 4, canvas.width - 8, canvas.height - 8, radius - 2);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;

  return texture;
}

function createShellMaterial(isActive: boolean) {
  return new THREE.MeshPhysicalMaterial({
    color: isActive ? "#111414" : "#0b0c0c",
    metalness: 0.02,
    roughness: 0.08,
    transmission: 0.08,
    thickness: 0.18,
    ior: 1.48,
    attenuationColor: new THREE.Color("#070808"),
    attenuationDistance: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.025,
    envMapIntensity: isActive ? 1.2 : 0.95,
    transparent: true,
    opacity: isActive ? 0.09 : 0.065,
    side: THREE.DoubleSide
  });
}

function createSideMaterial(isActive: boolean) {
  return new THREE.MeshPhysicalMaterial({
    color: isActive ? "#151818" : "#111313",
    metalness: 0.03,
    roughness: 0.16,
    clearcoat: 1,
    clearcoatRoughness: 0.035,
    envMapIntensity: isActive ? 2.2 : 1.8,
    side: THREE.DoubleSide
  });
}

function createCard(brand: Brand, isActive: boolean, image?: HTMLImageElement) {
  const group = new THREE.Group();
  const geometry = createCardGeometry();
  const frontTexture = createCardTexture(brand, isActive, image);
  const sideTextures = [
    createSideTexture(brand, "left", isActive, image),
    createSideTexture(brand, "right", isActive, image),
    createSideTexture(brand, "top", isActive, image),
    createSideTexture(brand, "bottom", isActive, image)
  ];
  const frontMaterial = new THREE.MeshBasicMaterial({
    map: frontTexture,
    side: THREE.DoubleSide,
    toneMapped: false
  });
  const sideWrapMaterials = sideTextures.map(
    (texture) =>
      new THREE.MeshBasicMaterial({
        map: texture,
        opacity: isActive ? 0.96 : 0.84,
        side: THREE.DoubleSide,
        toneMapped: false,
        transparent: true
      })
  );
  const sideMaterial = createSideMaterial(isActive);
  const cardBody = new THREE.Mesh(geometry, sideMaterial);
  cardBody.name = `${brand.name} integrated glass card body`;
  cardBody.renderOrder = 1;
  group.add(cardBody);

  const front = new THREE.Mesh(createCardFaceGeometry(), frontMaterial);
  front.name = `${brand.name} integrated card face`;
  front.position.z = FACE_Z;
  front.renderOrder = 3;
  group.add(front);

  const leftSide = new THREE.Mesh(new THREE.PlaneGeometry(WRAP_DEPTH, VERTICAL_WRAP_HEIGHT), sideWrapMaterials[0]);
  leftSide.name = `${brand.name} left wrapped card edge`;
  leftSide.position.set(-CARD_WIDTH / 2 - 0.004, 0, WRAP_Z);
  leftSide.rotation.y = Math.PI / 2;
  leftSide.renderOrder = 3;
  group.add(leftSide);

  const rightSide = new THREE.Mesh(new THREE.PlaneGeometry(WRAP_DEPTH, VERTICAL_WRAP_HEIGHT), sideWrapMaterials[1]);
  rightSide.name = `${brand.name} right wrapped card edge`;
  rightSide.position.set(CARD_WIDTH / 2 + 0.004, 0, WRAP_Z);
  rightSide.rotation.y = -Math.PI / 2;
  rightSide.renderOrder = 3;
  group.add(rightSide);

  const topSide = new THREE.Mesh(new THREE.PlaneGeometry(HORIZONTAL_WRAP_WIDTH, WRAP_DEPTH), sideWrapMaterials[2]);
  topSide.name = `${brand.name} top wrapped card edge`;
  topSide.position.set(0, CARD_HEIGHT / 2 + 0.004, WRAP_Z);
  topSide.rotation.x = Math.PI / 2;
  topSide.renderOrder = 3;
  group.add(topSide);

  const bottomSide = new THREE.Mesh(new THREE.PlaneGeometry(HORIZONTAL_WRAP_WIDTH, WRAP_DEPTH), sideWrapMaterials[3]);
  bottomSide.name = `${brand.name} bottom wrapped card edge`;
  bottomSide.position.set(0, -CARD_HEIGHT / 2 - 0.004, WRAP_Z);
  bottomSide.rotation.x = -Math.PI / 2;
  bottomSide.renderOrder = 3;
  group.add(bottomSide);

  const shellMaterial = createShellMaterial(isActive);
  shellMaterial.depthWrite = false;
  const shell = new THREE.Mesh(geometry, shellMaterial);
  shell.name = `${brand.name} integrated glass shell`;
  shell.renderOrder = 2;
  group.add(shell);

  const edgeMaterial = new THREE.LineBasicMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: isActive ? 0.36 : 0.24
  });
  const edge = new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 14), edgeMaterial);
  edge.renderOrder = 4;
  group.add(edge);

  const hitArea = new THREE.Mesh(
    new THREE.PlaneGeometry(CARD_WIDTH * 1.12, CARD_HEIGHT * 1.12),
    new THREE.MeshBasicMaterial({ depthWrite: false, opacity: 0, transparent: true })
  );
  hitArea.position.z = CARD_DEPTH / 2 + 0.08;
  hitArea.userData.brandId = brand.id;
  group.add(hitArea);

  return {
    group,
    hitArea,
    texture: frontTexture,
    sideTextures,
    frontMaterial,
    sideWrapMaterials,
    sideMaterial,
    shellMaterial,
    edgeMaterial,
    activeState: isActive
  };
}

function getCardTransform(slot: HeroCardSlot, isCompact = false) {
  if (isCompact) {
    if (slot === "center") {
      return {
        position: new THREE.Vector3(0, -0.02, 0.36),
        rotationY: 0,
        scale: 1.16
      };
    }

    if (slot === "left") {
      return {
        position: new THREE.Vector3(-1.26, -0.06, -0.12),
        rotationY: 0.6,
        scale: 0.9
      };
    }

    return {
      position: new THREE.Vector3(1.26, -0.06, -0.12),
      rotationY: -0.6,
      scale: 0.9
    };
  }

  if (slot === "center") {
    return {
      position: new THREE.Vector3(0, 0.04, 0.36),
      rotationY: 0,
      scale: 1.24
    };
  }

  if (slot === "left") {
    return {
      position: new THREE.Vector3(-2.18, -0.12, -0.48),
      rotationY: 0.62,
      scale: 0.94
    };
  }

  return {
    position: new THREE.Vector3(2.18, -0.12, -0.48),
    rotationY: -0.62,
    scale: 0.94
  };
}

function disposeGroup(object: THREE.Object3D) {
  object.traverse((child) => {
    const mesh = child as THREE.Mesh;

    if (!mesh.isMesh) return;

    mesh.geometry?.dispose();
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    materials.forEach((material) => {
      const map = (material as THREE.MeshBasicMaterial).map;
      map?.dispose();
      material.dispose();
    });
  });
}

export function ThreeTextureCardStage({ brands, activeBrandId, cardStates, onSelectBrand }: ThreeTextureCardStageProps) {
  const renderBoxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const brandsRef = useRef(brands);
  const cardStatesRef = useRef(cardStates);
  const activeBrandIdRef = useRef(activeBrandId);
  const onSelectBrandRef = useRef(onSelectBrand);
  const labImageRef = useRef<Partial<Record<BrandId, HTMLImageElement>>>({});

  brandsRef.current = brands;
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
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const targetScale = new THREE.Vector3();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    let isCompact = renderBox.getBoundingClientRect().width < 640 || window.innerWidth < 640;
    let frameId = 0;
    let isDisposed = false;

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.02;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    scene.environment = environment;
    scene.add(new THREE.AmbientLight(0xffffff, 0.48));

    const keyLight = new THREE.SpotLight(0xffffff, 18, 18, 0.48, 0.72, 1.1);
    keyLight.position.set(0.7, 5.4, 4.4);
    scene.add(keyLight);

    const leftRim = new THREE.PointLight(0xffffff, 14, 10);
    leftRim.position.set(-3.1, 1.4, 3.2);
    scene.add(leftRim);

    const rightRim = new THREE.PointLight(0xdce8ff, 12, 10);
    rightRim.position.set(3.1, 1.6, 3.1);
    scene.add(rightRim);

    const cards: LabCardRuntime[] = brandsRef.current.map((brand) => {
      const isActive = brand.id === activeBrandIdRef.current;
      const card = createCard(brand, isActive, labImageRef.current[brand.id]);
      const slot = cardStatesRef.current.find((state) => state.brandId === brand.id)?.slot ?? "center";
      const transform = getCardTransform(slot, isCompact);

      card.group.position.copy(transform.position);
      card.group.rotation.y = transform.rotationY;
      card.group.scale.setScalar(transform.scale);
      scene.add(card.group);

      return {
        brand,
        ...card
      };
    });

    const replaceCardTexture = (card: LabCardRuntime, isActive: boolean) => {
      card.texture.dispose();
      card.sideTextures.forEach((texture) => texture.dispose());
      const nextTexture = createCardTexture(card.brand, isActive, labImageRef.current[card.brand.id]);
      const nextSideTextures = [
        createSideTexture(card.brand, "left", isActive, labImageRef.current[card.brand.id]),
        createSideTexture(card.brand, "right", isActive, labImageRef.current[card.brand.id]),
        createSideTexture(card.brand, "top", isActive, labImageRef.current[card.brand.id]),
        createSideTexture(card.brand, "bottom", isActive, labImageRef.current[card.brand.id])
      ];
      card.texture = nextTexture;
      card.sideTextures = nextSideTextures;
      card.frontMaterial.map = nextTexture;
      card.frontMaterial.needsUpdate = true;
      card.sideWrapMaterials.forEach((material, index) => {
        material.map = nextSideTextures[index];
        material.opacity = isActive ? 0.96 : 0.84;
        material.needsUpdate = true;
      });
    };

    const testImage = new Image();
    testImage.decoding = "async";
    testImage.onload = () => {
      if (isDisposed) return;

      brandsRef.current.forEach((brand) => {
        labImageRef.current[brand.id] = testImage;
      });
      cards.forEach((card) => {
        replaceCardTexture(card, card.brand.id === activeBrandIdRef.current);
      });
    };
    testImage.src = "/images/test/roti-camp-landscape-test.png";

    const resize = () => {
      const rect = renderBox.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      isCompact = width < 640 || window.innerWidth < 640;

      renderer.setSize(width, height, false);
      camera.fov = isCompact ? 36 : 32;
      camera.aspect = width / height;
      camera.position.set(0, isCompact ? 0.04 : 0.02, isCompact ? 6.8 : 6.35);
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

    const updateCardActiveState = (card: LabCardRuntime, isActive: boolean) => {
      if (card.activeState === isActive) return;

      card.activeState = isActive;
      replaceCardTexture(card, isActive);
      card.sideMaterial.color.set(isActive ? "#151818" : "#111313");
      card.sideMaterial.envMapIntensity = isActive ? 2.2 : 1.8;
      card.shellMaterial.color.set(isActive ? "#111414" : "#0b0c0c");
      card.shellMaterial.opacity = isActive ? 0.09 : 0.065;
      card.shellMaterial.envMapIntensity = isActive ? 1.2 : 0.95;
      card.edgeMaterial.opacity = isActive ? 0.36 : 0.24;
    };

    const animate = () => {
      cards.forEach((card) => {
        const slot = cardStatesRef.current.find((state) => state.brandId === card.brand.id)?.slot ?? "center";
        const isActive = card.brand.id === activeBrandIdRef.current;
        const transform = getCardTransform(slot, isCompact);
        const ease = prefersReducedMotion ? 1 : 0.12;

        updateCardActiveState(card, isActive);
        card.group.position.lerp(transform.position, ease);
        card.group.rotation.y = THREE.MathUtils.lerp(card.group.rotation.y, transform.rotationY, ease);
        targetScale.setScalar(transform.scale);
        card.group.scale.lerp(targetScale, ease);
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerup", handlePointerUp);
      disposeGroup(scene);
      environment.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={renderBoxRef} className="hero-card-lab-stage" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-card-lab-stage__canvas" />
    </div>
  );
}
