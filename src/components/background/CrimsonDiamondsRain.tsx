"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Gem {
  id: number;
  x: number;       // % of viewport width
  initialY: number;// starting Y in px (some start mid-screen for immediate population)
  duration: number;// fall duration in seconds
  delay: number;   // animation delay (always 0 or small positive)
  size: number;    // px
  rotate: number;  // initial rotation degrees
  spinDeg: number; // total rotation during fall
  opacity: number;
  layer: number;   // 0=far 1=mid 2=near
  driftX: number;  // horizontal drift px
  glowColor: string;
  glowBlur: number;
  showSparkle: boolean;
  sparkleDelay: number;
}

const GLOWS = [
  "255,20,60",
  "220,0,35",
  "255,60,90",
  "200,0,25",
  "255,100,130",
];

function rng(seed: number) {
  const x = Math.sin(seed + 1.618) * 43758.5453;
  return x - Math.floor(x);
}

function buildGems(count: number, vh: number): Gem[] {
  return Array.from({ length: count }, (_, i) => {
    const r = rng(i * 7.3);
    const layer = r < 0.45 ? 0 : r < 0.80 ? 1 : 2;

    let size: number, opacity: number, duration: number;
    if (layer === 0) {
      size     = 28  + rng(i * 3.1)  * 28;
      opacity  = 0.28 + rng(i * 5.3) * 0.22;
      duration = 8   + rng(i * 11.7) * 7;
    } else if (layer === 1) {
      size     = 56  + rng(i * 3.1)  * 44;
      opacity  = 0.60 + rng(i * 5.3) * 0.28;
      duration = 5   + rng(i * 11.7) * 6;
    } else {
      size     = 100 + rng(i * 3.1)  * 60;
      opacity  = 0.78 + rng(i * 5.3) * 0.22;
      duration = 4   + rng(i * 11.7) * 4;
    }

    // Start either above the screen OR already mid-screen (for instant population on load)
    const startMidScreen = rng(i * 19.3) > 0.45;
    const initialY = startMidScreen
      ? -(size + rng(i * 23.1) * vh * 0.5)  // will start above, reaches screen quickly
      : -(size + rng(i * 23.1) * 200);

    const glowIdx = Math.floor(rng(i * 13.3) * GLOWS.length);
    const glowBlur = layer === 2 ? 28 + rng(i * 17) * 16
                   : layer === 1 ? 14 + rng(i * 17) * 10
                   :                6 + rng(i * 17) * 6;

    return {
      id: i,
      x:           rng(i * 2.7) * 100,
      initialY,
      duration,
      delay:       startMidScreen ? 0 : rng(i * 43.1) * 3,
      size,
      rotate:      rng(i * 29.3) * 360,
      spinDeg:     (rng(i * 31.7) > 0.5 ? 1 : -1) * (180 + rng(i * 37.1) * 360),
      opacity,
      layer,
      driftX:      (rng(i * 41.3) - 0.5) * 80,
      glowColor:   GLOWS[glowIdx],
      glowBlur,
      showSparkle: layer === 2 && rng(i * 53.1) > 0.35,
      sparkleDelay: rng(i * 59.1) * duration * 0.5,
    };
  });
}

// ─── SVG Sparkle (8-point star) ───────────────────────────────────────────────
function SparkleFlare({ size }: { size: number }) {
  const s = size * 0.7;
  return (
    <svg
      width={s} height={s}
      viewBox="-50 -50 100 100"
      style={{ overflow: "visible", position: "absolute", top: "50%", left: "50%",
               transform: "translate(-50%,-50%)", pointerEvents: "none" }}
    >
      {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((deg, i) => {
        const isMain = i % 2 === 0;
        const len = isMain ? 50 : 28;
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1="0" y1="0"
            x2={Math.cos(rad) * len} y2={Math.sin(rad) * len}
            stroke={isMain ? "rgba(255,255,255,0.95)" : "rgba(255,190,210,0.7)"}
            strokeWidth={isMain ? 2.2 : 1.1}
            strokeLinecap="round"
          />
        );
      })}
      <circle cx="0"   cy="0" r="4.5" fill="white" opacity={0.98} />
      <circle cx="-10" cy="0" r="2.8" fill="#ff4488" opacity={0.75} />
      <circle cx="10"  cy="0" r="2.2" fill="#88ccff" opacity={0.65} />
    </svg>
  );
}

// ─── Single Gem ───────────────────────────────────────────────────────────────
function FallingGem({
  gem, viewportH,
}: {
  gem: Gem;
  viewportH: number;
}) {
  const endY    = viewportH + gem.size + 60;
  const totalY  = endY - gem.initialY;

  const depthFilter = gem.layer === 0 ? "blur(1.5px) brightness(0.6)" : "";
  const glowFilter  = [
    `drop-shadow(0 0 ${gem.glowBlur}px rgba(${gem.glowColor},0.85))`,
    gem.layer === 2
      ? `drop-shadow(0 0 ${gem.glowBlur * 2}px rgba(${gem.glowColor},0.5))`
      : "",
    depthFilter,
  ].filter(Boolean).join(" ");

  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{
        top:    0,
        left:   `${gem.x}%`,
        width:  gem.size,
        height: gem.size,
        zIndex: gem.layer,
        willChange: "transform",
      }}
      animate={{
        y: [gem.initialY, gem.initialY + totalY],
        x: [0, gem.driftX, gem.driftX * -0.4, 0],
        rotate: [gem.rotate, gem.rotate + gem.spinDeg],
        opacity: [0, gem.opacity, gem.opacity, gem.opacity * 0.5, 0],
      }}
      transition={{
        y:       { duration: gem.duration, ease: "linear",   repeat: Infinity, delay: gem.delay },
        x:       { duration: gem.duration, ease: "easeInOut", repeat: Infinity, delay: gem.delay },
        rotate:  { duration: gem.duration, ease: "linear",   repeat: Infinity, delay: gem.delay },
        opacity: { duration: gem.duration, ease: "easeOut",  repeat: Infinity, delay: gem.delay,
                   times: [0, 0.07, 0.75, 0.9, 1] },
      }}
    >
      {/* The gem image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/diamond1.png"
        alt=""
        draggable={false}
        width={gem.size}
        height={gem.size}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          filter: glowFilter,
          display: "block",
        }}
      />

      {/* Sparkle burst for near gems */}
      {gem.showSparkle && (
        <motion.div
          style={{ position: "absolute", inset: 0, display: "flex",
                   alignItems: "center", justifyContent: "center" }}
          animate={{ opacity: [0, 0, 1, 0.8, 0], scale: [0.4, 0.9, 1.2, 1.6, 2.0] }}
          transition={{
            duration:    1.4,
            delay:       gem.delay + gem.sparkleDelay,
            repeat:      Infinity,
            repeatDelay: gem.duration * 0.6,
            ease:        "easeOut",
          }}
        >
          <SparkleFlare size={gem.size} />
        </motion.div>
      )}

      {/* Pulsing aura for large near gems */}
      {gem.layer === 2 && (
        <motion.div
          style={{
            position:    "absolute",
            inset:       -gem.size * 0.15,
            borderRadius: "50%",
            background:  `radial-gradient(circle, rgba(${gem.glowColor},0.18) 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CrimsonDiamondsRain() {
  const [viewportH, setViewportH] = useState(900);
  const [gems, setGems]           = useState<Gem[]>([]);

  useEffect(() => {
    const vh = window.innerHeight;
    const count = window.innerWidth < 768 ? 20 : 38;
    setViewportH(vh);
    setGems(buildGems(count, vh));

    const onResize = () => setViewportH(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Render far → near so near gems appear on top
  const sorted = [...gems].sort((a, b) => a.layer - b.layer);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {sorted.map((gem) => (
        <FallingGem key={gem.id} gem={gem} viewportH={viewportH} />
      ))}
    </div>
  );
}
