"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ShaderSmoke() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const timer = useMemo(() => new THREE.Timer(), []);

  useFrame(() => {
    timer.update();
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = timer.getElapsed();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />

      <shaderMaterial
        ref={materialRef}
        uniforms={{
          uTime: { value: 0 },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

/* =========================
   🎯 VERTEX
========================= */
const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

/* =========================
   🌫️ FRAGMENT (PRO)
========================= */
const fragmentShader = `
precision highp float;

uniform float uTime;
varying vec2 vUv;

// hash
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// noise
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
         (c - a) * u.y * (1.0 - u.x) +
         (d - b) * u.x * u.y;
}

// fbm
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;

  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }

  return v;
}

// flow field
vec2 flow(vec2 uv, float t) {
  float angle = fbm(uv * 2.0 + t) * 6.2831;
  return vec2(cos(angle), sin(angle));
}

void main() {
  vec2 uv = vUv;

  float t = uTime * 0.08;

  // --- MULTI LAYER (clave para profundidad)
  vec2 p1 = uv * 3.0;
  vec2 p2 = uv * 5.0;
  vec2 p3 = uv * 8.0;

  // flow dinámico
  p1 += flow(p1, t) * 0.3;
  p2 += flow(p2, t * 1.5) * 0.2;
  p3 += flow(p3, t * 2.0) * 0.1;

  float n1 = fbm(p1);
  float n2 = fbm(p2);
  float n3 = fbm(p3);

  // mezcla de capas
  float smoke = (n1 * 0.6 + n2 * 0.3 + n3 * 0.1);

  // suavizado
  smoke = smoothstep(0.4, 0.85, smoke);

  // 🎨 COLOR (red bug fix)
  vec3 bg = vec3(0.015, 0.02, 0.035);
  vec3 smokeCol = vec3(0.55, 0.65, 0.85);

  vec3 color = mix(bg, smokeCol, smoke);

  // 🔥 CORRECCIÓN PRO
  color.r *= 0.75;          // elimina rojo
  color = pow(color, vec3(0.9)); // gamma cool

  gl_FragColor = vec4(color, 1.0);
}
`;