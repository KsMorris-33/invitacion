"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import FireBorderEffect from '@/components/background/FireBorderEffect';

const Map = dynamic(
    () => import('./InteractiveMap'),
    { ssr: false }
);

interface LocationViewProps {
    lat: string;
    lng: string;
}

export default function LocationView({ lat, lng }: LocationViewProps) {
    return (
        <main className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden py-10 px-4 selection:bg-red-600 selection:text-white">

            {/* Fuego en los bordes + parpadeo de luz + vignette */}
            <FireBorderEffect />

            {/* Contenido principal */}
            <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center gap-8" style={{ zIndex: 20 }}>

                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="text-center space-y-3 pt-4"
                >
                    {/* Badge de evento */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-red-600/50 bg-black/60 backdrop-blur-md shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                    >
                        <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)] animate-pulse" />
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-red-400">
                            Locación Revelada
                        </span>
                    </motion.div>

                    {/* Título principal */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none">
                        <span
                            className="block"
                            style={{
                                textShadow: "0 0 20px rgba(239,68,68,0.7), 0 0 50px rgba(220,38,38,0.4)",
                            }}
                        >
                            Punto de
                        </span>
                        <span
                            className="block text-red-500"
                            style={{
                                textShadow: "0 0 15px rgba(239,68,68,0.9), 0 0 40px rgba(220,38,38,0.7), 0 0 80px rgba(185,28,28,0.5)",
                            }}
                        >
                            Encuentro
                        </span>
                    </h1>

                    <p className="text-white/40 text-sm tracking-widest uppercase font-light">
                        Soacha, Cundinamarca · 31 Oct
                    </p>
                </motion.header>

                {/* Tarjeta del mapa */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                    className="w-full relative group"
                >
                    {/* Resplandor exterior rojo */}
                    <div className="absolute -inset-[2px] bg-gradient-to-br from-red-700/60 via-rose-600/30 to-red-800/60 rounded-2xl blur-sm opacity-60 group-hover:opacity-90 transition duration-500" />

                    {/* Contenedor del mapa */}
                    <div className="relative w-full overflow-hidden rounded-2xl border border-red-600/30 bg-black/80 backdrop-blur-md shadow-[0_0_40px_rgba(220,38,38,0.2)] aspect-video">

                        {/* Mapa interactivo */}
                        <div className="absolute inset-0 opacity-80 hover:opacity-100 transition-opacity duration-500">
                            <Map lat={lat} lng={lng} />
                        </div>

                        {/* HUD overlay: esquina superior izquierda */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.0, duration: 0.6 }}
                            className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-2 rounded-lg border border-red-600/30 shadow-[0_0_10px_rgba(220,38,38,0.2)] pointer-events-none"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_6px_rgba(239,68,68,0.9)]" />
                            <span className="text-[9px] text-red-400 uppercase tracking-widest font-bold font-mono">En Vivo</span>
                        </motion.div>

                        {/* HUD overlay: esquina superior derecha */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.0, duration: 0.6 }}
                            className="absolute top-4 right-4 z-20 bg-black/70 backdrop-blur-md px-3 py-2 rounded-lg border border-red-600/30 text-right pointer-events-none"
                        >
                            <p className="text-[8px] text-white/40 font-mono uppercase tracking-widest">Carrera 2 Este #17 - 71</p>
                            <p className="text-[8px] text-red-400/70 font-mono">{lat}, {lng}</p>
                        </motion.div>

                        {/* Degradado inferior para suavizar */}
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

                        {/* Indicador de ubicación pulsante al pie */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                            className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-red-600/40 pointer-events-none"
                        >
                            <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                            <span className="text-[9px] text-red-300 uppercase tracking-widest font-bold font-mono">
                                Soacha, Cundinamarca
                            </span>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Tarjeta de dirección */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="w-full grid grid-cols-3 gap-3"
                >
                    {[
                        { icon: "📍", label: "Dirección", value: "Calle 18 #2 este 03" },
                        { icon: "🗺️", label: "Ciudad", value: "Soacha, Cund." },
                        { icon: "🕛", label: "Fecha", value: "31 Oct · Noche" },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                            className="relative group bg-black/60 backdrop-blur-md rounded-xl border border-red-600/20 p-3 text-center overflow-hidden hover:border-red-500/50 transition-all duration-300"
                        >
                            {/* Brillo hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/0 group-hover:from-red-600/10 group-hover:to-transparent transition-all duration-500 rounded-xl" />
                            <span className="text-xl block mb-1">{item.icon}</span>
                            <p className="text-[9px] text-red-400/70 uppercase tracking-widest font-bold mb-0.5">{item.label}</p>
                            <p className="text-[11px] text-white/80 font-mono leading-tight">{item.value}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Botones de acción */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                    className="flex flex-col items-center gap-4 w-full"
                >
                    {/* Botón principal: Abrir en Google Maps */}
                    <Link
                        href={`https://www.google.com/maps?q=${lat},${lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full max-w-sm"
                    >
                        <div className="relative group">
                            {/* Resplandor rojo neón */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 rounded-full blur-md opacity-45 group-hover:opacity-90 transition duration-500 group-hover:duration-200" />

                            <motion.div
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                className="relative w-full px-8 py-4 bg-black/75 backdrop-blur-md rounded-full border border-red-600/80 shadow-[0_0_25px_rgba(239,68,68,0.7)] flex items-center justify-center gap-3 overflow-hidden transition-all duration-300 hover:bg-red-950/40 hover:border-red-400 hover:shadow-[0_0_35px_rgba(239,68,68,0.95)] cursor-pointer"
                            >
                                {/* Destello en hover */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/20 to-transparent skew-x-12 pointer-events-none"
                                    initial={{ x: '-150%' }}
                                    whileHover={{ x: '150%' }}
                                    transition={{ duration: 0.7, ease: "easeInOut" }}
                                />
                                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="relative z-10 font-bold uppercase tracking-wider text-white text-sm md:text-base pointer-events-none drop-shadow-[0_0_8px_rgba(255,255,255,0.75)]">
                                    Abrir en Google Maps
                                </span>
                            </motion.div>
                        </div>
                    </Link>

                    {/* Enlace de regreso */}
                    <Link
                        href="/"
                        className="text-white/30 hover:text-red-400 font-mono text-xs uppercase tracking-[0.4em] transition-all relative group"
                    >
                        <span className="relative z-10">[ Volver al Inicio ]</span>
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}
