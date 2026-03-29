"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ConfirmButtonProps {
  onClick?: () => void;
}

export default function ConfirmButton({ onClick }: ConfirmButtonProps) {
  return (
    <div className="relative group">
      {/* Contenedor del brillo exterior animado */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
      
      {/* Botón interactivo */}
      <motion.button
        onClick={onClick}
        whileHover="hover"
        whileTap={{ scale: 0.95 }}
        variants={{ hover: { scale: 1.05 } }}
        className="relative px-8 py-4 bg-black/80 backdrop-blur-sm rounded-full border border-cyan-500/50 flex items-center justify-center overflow-hidden"
      >
        {/* Capa de destello al hacer hover (framer motion) */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent skew-x-12 pointer-events-none"
          initial={{ x: '-150%' }}
          variants={{ hover: { x: '150%' } }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />

        {/* Texto del botón con gradiente */}
        <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 to-cyan-400 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-sm md:text-base drop-shadow-[0_0_10px_rgba(0,229,255,0.8)] pointer-events-none">
          Confirmar Asistencia
        </span>
      </motion.button>
    </div>
  );
}
