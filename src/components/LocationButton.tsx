"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface LocationButtonProps {
  targetDate: string;
}

export default function LocationButton({ targetDate }: LocationButtonProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      setIsUnlocked(difference <= 0);
    };

    const timer = setInterval(checkTime, 1000);
    checkTime(); // Initial check

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="relative group h-[58px] min-w-[200px] opacity-0"></div>
    );
  }

  const buttonContent = (
    <motion.button
      whileHover={isUnlocked ? "hover" : ""}
      whileTap={isUnlocked ? { scale: 0.95 } : {}}
      variants={isUnlocked ? { hover: { scale: 1.05 } } : {}}
      disabled={!isUnlocked}
      className={`relative px-8 py-4 bg-black/80 backdrop-blur-sm rounded-full border flex items-center justify-center overflow-hidden transition-all duration-500 w-full ${
        isUnlocked 
          ? 'border-fuchsia-500/50 cursor-pointer shadow-[0_0_15px_rgba(217,70,239,0.4)]' 
          : 'border-white/10 opacity-60 cursor-not-allowed'
      }`}
    >
      {/* Capa de destello al hacer hover (framer motion) */}
      {isUnlocked && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-400/20 to-transparent skew-x-12 pointer-events-none"
          initial={{ x: '-150%' }}
          variants={{ hover: { x: '150%' } }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
      )}

      {/* Ícono dinámico */}
      <span className={`mr-3 transition-colors ${isUnlocked ? 'text-fuchsia-400' : 'text-white/40'}`}>
        {isUnlocked ? (
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        ) : (
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        )}
      </span>

      {/* Texto del botón */}
      <span className={`relative z-10 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-sm md:text-base pointer-events-none transition-all duration-500 whitespace-nowrap ${
        isUnlocked 
          ? 'text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-100 to-fuchsia-400 drop-shadow-[0_0_10px_rgba(217,70,239,0.8)]' 
          : 'text-white/40'
      }`}>
        {isUnlocked ? "Ver Locación" : "Locación Bloqueada"}
      </span>
    </motion.button>
  );

  return (
    <div className="relative group w-full md:w-auto">
      {/* Contenedor del brillo exterior animado (solo si está desbloqueado) */}
      {isUnlocked && (
        <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-fuchsia-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
      )}
      
      {isUnlocked ? (
        <Link href="/locacion" className="block w-full">
          {buttonContent}
        </Link>
      ) : (
        buttonContent
      )}
    </div>
  );
}
