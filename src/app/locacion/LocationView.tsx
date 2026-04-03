"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import CyberMap from '@/components/Cybermap';

const Map = dynamic(
    () => import('./InteractiveMap'),
    { ssr: false }
);

interface LocationViewProps {
    lat: string;
    lng: string;
}

export default function LocationView({ lat, lng }: LocationViewProps) {
    // Cyberpunk frame styles from other components
    const cyberpunkClipPath = {
        clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))"
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white relative overflow-hidden flex flex-col items-center py-12 px-4 selection:bg-fuchsia-500 selection:text-white">
            {/* Overlay de Scanlines Global */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_25%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

            {/* Fondo y gradientes */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black -z-10" />

            <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-10 relative z-10">

                {/* Header con efecto Glitch y fade in */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center space-y-2"
                >
                    <div className="inline-block px-4 py-1 border border-cyan-500/30 bg-cyan-900/20 text-cyan-400 text-[10px] uppercase tracking-[0.5em] mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)_inset]" style={{ clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)" }}>
                        Acceso Nivel 5 Autorizado
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic relative">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 relative z-10">FARRA APOTEOSICA</span>
                        <span className="block text-fuchsia-500 drop-shadow-[0_0_15px_rgba(217,70,239,0.8)] animate-pulse">INICIADA</span>
                    </h1>
                </motion.div>

                {/* Contenedor del Mapa Animado */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative group w-full aspect-[16/10] md:aspect-video p-[2px] bg-gradient-to-br from-cyan-500/50 via-fuchsia-500/30 to-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                    style={{ ...cyberpunkClipPath }}
                >
                    <div className="relative w-full h-full bg-[#0a0a0a] overflow-hidden" style={{ ...cyberpunkClipPath }}>

                        {/* Corner Accents internal */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-fuchsia-400/50 z-30 pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-400/50 z-30 pointer-events-none" />

                        {/* Animación de escaneo vertical */}
                        <div className="absolute w-full h-[2px] bg-cyan-400/30 shadow-[0_0_15px_cyan] top-0 animate-[scan_4s_linear_infinite] z-40 pointer-events-none" />

                        <div className="absolute inset-0 z-10 opacity-70 hover:opacity-100 transition-opacity duration-300">
                            <Map lat={lat} lng={lng} />
                        </div>

                        {/* HUD Superior e Inferior */}
                        <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between pointer-events-none z-50">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 }}
                                className="flex justify-between items-start"
                            >
                                <div className="bg-black/60 backdrop-blur-md border-l-2 border-cyan-400 p-2 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                                    <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">Status: Online</p>
                                    <p className="text-[8px] text-white/50 font-mono">Sat_Link: Active_Node_24</p>
                                </div>
                                <div className="text-right font-mono text-[8px] text-cyan-400/60 bg-black/40 p-2 backdrop-blur-sm border-r-2 border-fuchsia-500">
                                    SYS_VER: 4.0.1<br />LOC_ID: Cra2 este 14-65
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                                className="flex justify-between items-end"
                            >
                                <div className="bg-black/60 backdrop-blur-sm p-2 border border-fuchsia-500/30">
                                    <CyberMap lat={lat} lng={lng} />
                                </div>
                                <div className="w-12 h-12 border border-fuchsia-500/50 bg-black/40 backdrop-blur-sm flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.3)_inset]">
                                    <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-ping shadow-[0_0_8px_rgba(217,70,239,1)]" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Acción Principal */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col items-center gap-6 w-full max-w-sm"
                >
                    <Link href={`https://www.google.com/maps?q=${lat},${lng}`} target="_blank" rel="noopener noreferrer" className="w-full">
                        <motion.div
                            whileHover="hover"
                            whileTap={{ scale: 0.95 }}
                            className="relative w-full px-8 py-5 bg-[#0a0a0a] border border-cyan-400/50 flex flex-col items-center justify-center overflow-hidden transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] group"
                            style={{ clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)" }}
                        >
                            {/* Expandable background on hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent skew-x-12 pointer-events-none"
                                initial={{ x: '-150%' }}
                                variants={{ hover: { x: '150%' } }}
                                transition={{ duration: 0.7, ease: "easeInOut" }}
                            />

                            <span className="relative z-10 flex items-center gap-4 text-cyan-400 font-bold uppercase tracking-[0.2em] group-hover:text-cyan-200 transition-colors drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                                <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Desplegar Navegación
                            </span>
                        </motion.div>
                    </Link>

                    <Link href="/" className="text-white/30 hover:text-fuchsia-400 font-mono text-xs uppercase tracking-[0.5em] transition-all relative group overflow-hidden">
                        <span className="relative z-10">[ Terminar Sesión ]</span>
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-fuchsia-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}
