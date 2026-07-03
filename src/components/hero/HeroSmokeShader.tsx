"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const VERTEX_SHADER = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uReducedMotion;
  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 rotate = mat2(0.82, -0.58, 0.58, 0.82);

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = rotate * p * 2.04 + 17.17;
      amplitude *= 0.52;
    }

    return value;
  }

  float ellipseMask(vec2 p, vec2 center, vec2 radius) {
    vec2 q = (p - center) / radius;
    float dist = dot(q, q);
    return smoothstep(1.24, 0.12, dist);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (uv * 2.0 - 1.0);
    p.x *= aspect;

    float time = mix(uTime, 0.0, uReducedMotion);
    vec2 leftCenter = vec2(-0.86 * aspect, -0.05);
    vec2 rightCenter = vec2(0.86 * aspect, -0.05);
    vec2 farLeftCenter = vec2(-1.16 * aspect, -0.02);
    vec2 farRightCenter = vec2(1.16 * aspect, -0.02);

    float leftMask = ellipseMask(p, leftCenter, vec2(0.78 * aspect, 0.72));
    float rightMask = ellipseMask(p, rightCenter, vec2(0.78 * aspect, 0.72));
    float farLeftMask = ellipseMask(p, farLeftCenter, vec2(0.62 * aspect, 0.82));
    float farRightMask = ellipseMask(p, farRightCenter, vec2(0.62 * aspect, 0.82));
    float centerCut = 1.0 - ellipseMask(p, vec2(0.0, -0.02), vec2(0.48 * aspect, 0.78));
    float sideMask = clamp((leftMask + rightMask + farLeftMask * 0.75 + farRightMask * 0.75) * centerCut, 0.0, 1.0);

    vec2 flow = vec2(
      fbm(p * 1.15 + vec2(time * 0.035, -time * 0.022)),
      fbm(p * 1.05 + vec2(-time * 0.028, time * 0.04) + 8.2)
    );
    vec2 warped = p;
    warped.x += (flow.x - 0.5) * 0.42;
    warped.y += (flow.y - 0.5) * 0.26;

    float broad = fbm(warped * 2.0 + vec2(time * 0.12, -time * 0.035));
    float detail = fbm(warped * 4.4 + vec2(-time * 0.18, time * 0.09));
    float strand = sin((warped.x * 5.4 + warped.y * 3.2) + broad * 4.8 + time * 0.42);
    float smoke = broad * 0.7 + detail * 0.34 + strand * 0.055;

    float lowerLift = smoothstep(0.8, -0.38, p.y);
    float upperFade = smoothstep(0.78, 0.1, p.y);
    float alpha = smoothstep(0.48, 0.84, smoke) * sideMask * lowerLift * upperFade;
    alpha *= 0.68;

    vec3 coolSmoke = vec3(0.56, 0.62, 0.62);
    vec3 warmSmoke = vec3(0.68, 0.63, 0.56);
    vec3 color = mix(coolSmoke, warmSmoke, smoothstep(-0.55, 0.25, p.y));
    color *= 0.52 + smoke * 0.56;

    gl_FragColor = vec4(color, alpha);
  }
`;

type HeroSmokeShaderProps = {
  className?: string;
};

export function HeroSmokeShader({ className = "hero-smoke-shader" }: HeroSmokeShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      canvas,
      powerPreference: "high-performance"
    });
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const clock = new THREE.Clock();
    let frameId = 0;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uReducedMotion: { value: reducedMotionQuery.matches ? 1 : 0 }
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.NormalBlending
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);
    renderer.setClearColor(0x000000, 0);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 760 ? 1 : 1.35));
      material.uniforms.uResolution.value.set(width, height);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const handleReducedMotionChange = () => {
      material.uniforms.uReducedMotion.value = reducedMotionQuery.matches ? 1 : 0;
    };

    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    const animate = () => {
      material.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
      resizeObserver.disconnect();
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
