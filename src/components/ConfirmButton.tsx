"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ConfirmButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export default function ConfirmButton({ onClick, disabled }: ConfirmButtonProps) {
  return (
    <div className={`relative group ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {/* Contenedor del brillo exterior animado (se oculta si está desactivado) */}
      {!disabled && (
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
      )}
      
      {/* Botón interactivo */}
      <motion.button
        onClick={disabled ? undefined : onClick}
        whileHover={disabled ? {} : "hover"}
        whileTap={disabled ? {} : { scale: 0.95 }}
        variants={disabled ? {} : { hover: { scale: 1.05 } }}
        disabled={disabled}
        className={`relative px-8 py-4 bg-black/80 backdrop-blur-sm rounded-full border border-cyan-500/50 flex items-center justify-center overflow-hidden ${disabled ? 'cursor-not-allowed' : ''}`}
      >
        {/* Capa de destello al hacer hover (framer motion) */}
        {!disabled && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent skew-x-12 pointer-events-none"
            initial={{ x: '-150%' }}
            variants={{ hover: { x: '150%' } }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
        )}

        {/* Texto del botón con gradiente o inactivo */}
        <span className={`relative z-10 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-sm md:text-base pointer-events-none ${disabled ? 'text-gray-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 to-cyan-400 drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]'}`}>
          {disabled ? 'Registro Cerrado' : 'Confirmar Asistencia'}
        </span>
      </motion.button>
    </div>
  );
}
