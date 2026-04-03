"use client";

import React, { useState, useEffect, useActionState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { verifyEmailLocation } from '@/actions/VerifyLocation';

interface LocationButtonProps {
  targetDate: string;
}

export default function LocationButton({ targetDate }: LocationButtonProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [state, formAction, isPending] = useActionState(verifyEmailLocation, null);

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

  // Redirigir cuando se verifica con éxito
  useEffect(() => {
    if (state?.success) {
      window.location.href = '/locacion';
    }
  }, [state]);

  if (!mounted) {
    return <div className="relative group h-[58px] min-w-[200px] opacity-0"></div>;
  }

  const openModal = () => {
    if (isUnlocked) setIsModalOpen(true);
  };

  const buttonContent = (
    <motion.button
      onClick={openModal}
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
      {isUnlocked && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-400/20 to-transparent skew-x-12 pointer-events-none"
          initial={{ x: '-150%' }}
          variants={{ hover: { x: '150%' } }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
      )}

      <span className={`mr-3 transition-colors ${isUnlocked ? 'text-fuchsia-400' : 'text-white/40'}`}>
        {isUnlocked ? (
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        ) : (
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        )}
      </span>

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
    <>
      <div className="relative group w-full md:w-auto">
        {isUnlocked && (
          <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-fuchsia-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
        )}
        {buttonContent}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-fuchsia-500/30 p-8 flex flex-col items-center justify-center overflow-hidden"
              // Diseño Cyberpunk recortado en esquinas
              style={{
                clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
                boxShadow: "0 0 30px rgba(217, 70, 239, 0.15) inset"
              }}
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-fuchsia-400 opacity-50" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 opacity-50" />

              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 uppercase tracking-widest mb-6">
                Verificar Acceso
              </h2>

              <p className="text-white/60 mb-6 text-center text-sm md:text-base">
                Ingresa el correo con el que te inscribiste para revelar las coordenadas del evento.
              </p>

              <form action={formAction} className="w-full flex flex-col gap-4">
                <input
                  name="email"
                  type="email"
                  placeholder="CORREO IDENTIFICADOR"
                  required
                  className="w-full bg-black/50 border border-fuchsia-500/30 p-4 font-mono text-cyan-300 placeholder:text-cyan-800 focus:outline-none focus:border-cyan-400 transition-all uppercase tracking-wider"
                />
                
                <button
                  type="submit"
                  disabled={isPending || state?.success}
                  className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold tracking-[0.2em] uppercase p-4 mt-2 transition-all disabled:opacity-50 flex justify-center"
                >
                  {isPending ? "Procesando..." : state?.success ? "Acceso Concedido" : "Autenticar"}
                </button>

                {state?.error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm font-mono mt-2 text-center animate-pulse"
                  >
                    {state.error}
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
