"use client";

import React, { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// FireBorderEffect
// Renderiza partículas de fuego animadas sobre cada borde de la pantalla usando
// Canvas, más un overlay que simula el parpadeo de una luz/antorcha.
// ─────────────────────────────────────────────────────────────────────────────

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;       // 0..1 (1 = vivo, 0 = muerto)
    decay: number;      // velocidad de muerte
    size: number;
    hue: number;        // 0 = rojo, 30 = naranja-amarillo
    edge: "top" | "bottom" | "left" | "right";
}

function spawnParticle(
    canvas: HTMLCanvasElement,
    edge: Particle["edge"]
): Particle {
    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;

    const speed = 0.6 + Math.random() * 1.2;
    const spread = (Math.random() - 0.5) * 1.2;

    switch (edge) {
        case "bottom":
            x = Math.random() * canvas.width;
            y = canvas.height;
            vy = -(speed + Math.random() * 0.8);
            vx = spread;
            break;
        case "top":
            x = Math.random() * canvas.width;
            y = 0;
            vy = speed + Math.random() * 0.8;
            vx = spread;
            break;
        case "left":
            x = 0;
            y = Math.random() * canvas.height;
            vx = speed + Math.random() * 0.8;
            vy = spread - 0.5;
            break;
        case "right":
            x = canvas.width;
            y = Math.random() * canvas.height;
            vx = -(speed + Math.random() * 0.8);
            vy = spread - 0.5;
            break;
    }

    return {
        x,
        y,
        vx,
        vy,
        life: 1,
        decay: 0.008 + Math.random() * 0.014,
        size: 8 + Math.random() * 22,
        hue: Math.random() * 35,
        edge,
    };
}

const EDGES: Particle["edge"][] = ["bottom", "top", "left", "right"];
const SPAWN_RATES: Record<Particle["edge"], number> = {
    bottom: 5,
    top: 2,
    left: 3,
    right: 3,
};

export default function FireBorderEffect() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        const particles: Particle[] = [];

        // ── Flickering overlay state ──────────────────────────────────────────
        let flickerTarget = 0;
        let flickerCurrent = 0;
        let flickerTimer = 0;

        function scheduleFlicker() {
            flickerTarget = 0.04 + Math.random() * 0.18;
            flickerTimer = 60 + Math.random() * 90;
        }
        scheduleFlicker();

        // ── Resize ────────────────────────────────────────────────────────────
        function resize() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        // ── Animation loop ────────────────────────────────────────────────────
        function draw() {
            if (!canvas || !ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Spawn nuevas partículas
            for (const edge of EDGES) {
                const rate = SPAWN_RATES[edge];
                for (let i = 0; i < rate; i++) {
                    if (Math.random() < 0.9) {
                        particles.push(spawnParticle(canvas, edge));
                    }
                }
            }

            // Actualizar y dibujar
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];

                p.vx += (Math.random() - 0.5) * 0.08;
                p.vy -= 0.01;
                p.x += p.vx;
                p.y += p.vy;
                p.life -= p.decay;
                p.size *= 0.993;

                if (p.life <= 0 || p.size < 1) {
                    particles.splice(i, 1);
                    continue;
                }

                const alpha = Math.pow(p.life, 0.7);
                const gradient = ctx.createRadialGradient(
                    p.x, p.y, 0,
                    p.x, p.y, p.size
                );
                gradient.addColorStop(0, `hsla(${p.hue + 50}, 100%, 95%, ${alpha})`);
                gradient.addColorStop(0.3, `hsla(${p.hue + 20}, 100%, 65%, ${alpha * 0.85})`);
                gradient.addColorStop(0.7, `hsla(${p.hue}, 90%, 40%, ${alpha * 0.4})`);
                gradient.addColorStop(1, `hsla(${p.hue}, 80%, 20%, 0)`);

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.globalCompositeOperation = "lighter";
                ctx.fill();
                ctx.globalCompositeOperation = "source-over";
            }

            // Flickering overlay
            flickerTimer--;
            if (flickerTimer <= 0) scheduleFlicker();
            flickerCurrent += (flickerTarget - flickerCurrent) * 0.05;

            if (overlayRef.current) {
                overlayRef.current.style.opacity = flickerCurrent.toFixed(4);
            }

            animId = requestAnimationFrame(draw);
        }

        animId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <>
            {/* Canvas del fuego */}
            <canvas
                ref={canvasRef}
                className="pointer-events-none fixed inset-0"
                style={{ zIndex: 5 }}
            />

            {/* Overlay parpadeo antorcha */}
            <div
                ref={overlayRef}
                className="pointer-events-none fixed inset-0 bg-orange-950"
                style={{
                    zIndex: 6,
                    opacity: 0,
                    mixBlendMode: "multiply",
                }}
            />

            {/* Vignette: oscurece bordes, foco en el centro */}
            <div
                className="pointer-events-none fixed inset-0"
                style={{
                    zIndex: 7,
                    background:
                        "radial-gradient(ellipse 70% 65% at 50% 50%, transparent 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%)",
                }}
            />
        </>
    );
}
