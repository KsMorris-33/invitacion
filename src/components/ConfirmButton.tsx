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
      {/* Resplandor exterior rojo neón */}
      {!disabled && (
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 rounded-full blur-md opacity-45 group-hover:opacity-90 transition duration-500 group-hover:duration-200"></div>
      )}

      {/* Botón interactivo con Glassmorphism Rojo Neón */}
      <motion.button
        onClick={disabled ? undefined : onClick}
        whileHover={disabled ? {} : "hover"}
        whileTap={disabled ? {} : { scale: 0.96 }}
        variants={disabled ? {} : { hover: { scale: 1.05 } }}
        disabled={disabled}
        className={`relative px-8 py-4 bg-black/75 backdrop-blur-md rounded-full border border-red-600/80 shadow-[0_0_25px_rgba(239,68,68,0.7)] flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-red-950/40 hover:border-red-500 hover:shadow-[0_0_35px_rgba(239,68,68,0.95)] ${
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
      >
        {/* Capa de destello al hacer hover */}
        {!disabled && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/30 to-transparent skew-x-12 pointer-events-none"
            initial={{ x: '-150%' }}
            variants={{ hover: { x: '150%' } }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
        )}

        {/* Texto del botón: Blanco brillante / negrita sin serifa */}
        <span
          className={`relative z-10 font-bold uppercase tracking-wider text-white text-sm md:text-base pointer-events-none drop-shadow-[0_0_8px_rgba(255,255,255,0.75)] ${
            disabled ? 'text-gray-400' : ''
          }`}
        >
          {disabled ? 'Registro Cerrado' : 'Confirmar Asistencia'}
        </span>
      </motion.button>
    </div>
  );
}
