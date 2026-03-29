"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function DetailedMagicCircle() {
    return (
        <div className="relative w-full h-full flex items-center justify-center bg-transparent pointer-events-none overflow-hidden p-10">

            {/* 1. CONTENEDOR PRINCIPAL: Escalado y Rotación */}
            <motion.div
                className="relative w-[85vw] h-[85vw] max-w-[900px] max-h-[900px] flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            >
                {/* 2. CONTENEDOR DEL FILTRO SVG (El secreto del brillo) */}
                {/* Usamos un SVG invisible para aplicar el filtro de resplandor */}
                <svg width="0" height="0">
                    <defs>
                        <filter id="neon-glow-large" x="-50%" y="-50%" width="200%" height="200%">
                            {/* Capa 1: Núcleo brillante (Cian claro) */}
                            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#b2ebf2" floodOpacity="0.9" />
                            {/* Capa 2: Brillo medio (Azul neón vibrante) */}
                            <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#00e5ff" floodOpacity="0.8" />
                            {/* Capa 3: Aura amplia (Azul profundo) */}
                            <feDropShadow dx="0" dy="0" stdDeviation="30" floodColor="#0066ff" floodOpacity="0.6" />
                            {/* Capa 4: Resplandor difuso de fondo */}
                            <feDropShadow dx="0" dy="0" stdDeviation="60" floodColor="#0033cc" floodOpacity="0.4" />
                        </filter>
                    </defs>
                </svg>

                {/* 3. LA IMAGEN CON EL FILTRO APLICADO */}
                <div
                    className="relative w-full h-full"
                    style={{
                        // Aplicamos el filtro SVG personalizado aquí
                        filter: "url(#neon-glow-large)",
                    }}
                >
                    <Image
                        src="/images/magic-circle.png" // Tu imagen rúnica compleja y detallada
                        alt="Círculo Mágico Rúnico Detallado"
                        fill
                        priority // Carga rápida para LCP
                        sizes="(max-w-768px) 85vw, 900px" // Informa el tamaño al navegador
                        className="object-contain opacity-95 mix-blend-screen"
                    />
                </div>

            </motion.div>

            {/* 4. RESPLANDOR AMBIENTAL DE FONDO (Colorización del humo) */}
            <div className="absolute w-[100vw] h-[100vw] max-w-[1000px] rounded-full bg-cyan-600/5 blur-[160px] -z-10" />

        </div>
    );
}