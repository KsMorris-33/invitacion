"use client";

import React from 'react';

const genres = [
    "AFROBEATS", "REGGAETON", "TECHNO", "DANCEHALL", "PERREO", "AFROBEATS", "REGGAETON", "TECHNO", "DANCEHALL", "PERREO"
];
const fullText = genres.join(" • ") + " • ";

export default function LedBanner() {
    return (
        <div className="w-full py-4 overflow-hidden flex justify-center bg-transparent">
            {/* Ventana del Banner */}
            <div className="relative w-[95%] h-14 border-y border-white/10 overflow-hidden flex items-center backdrop-blur-sm bg-black/40 shadow-[0_0_20px_rgba(0,0,0,0.5)]">

                {/* Track de movimiento */}
                <div className="flex whitespace-nowrap animate-led-scroll">
                    <span className="text-3xl font-mono font-black text-white/80 uppercase tracking-[0.2em] drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                        {fullText}
                    </span>
                    <span className="text-3xl font-mono font-black text-white/80 uppercase tracking-[0.2em] drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                        {fullText}
                    </span>
                </div>

                {/* Capa de textura de puntos (Matriz LED) */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #000 1.5px, transparent 1.5px)',
                        backgroundSize: '5px 5px'
                    }}
                />

                {/* Brillo de cristal sutil */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20 pointer-events-none" />
            </div>
        </div>
    );
}