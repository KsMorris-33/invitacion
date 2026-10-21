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
  const [shake, setShake] = useState(false);

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
    return <div className="relative h-[58px] min-w-[200px] opacity-0" />;
  }

  const handleLockedClick = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const openModal = () => {
    if (isUnlocked) {
      setIsModalOpen(true);
    } else {
      handleLockedClick();
    }
  };

  return (
    <>
      <div className="relative flex items-center justify-center">
        {!isUnlocked ? (
          // ── Botón Bloqueado usando button_locked.png ──
          <motion.button
            type="button"
            onClick={handleLockedClick}
            animate={
              shake
                ? { x: [0, -6, 6, -4, 4, -2, 2, 0], rotate: [0, -1, 1, -1, 1, 0] }
                : {}
            }
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="relative cursor-not-allowed select-none focus:outline-none flex items-center justify-center"
            style={{
              width: "min(75vw, 255px)",
              aspectRatio: "512 / 215",
            }}
            title="Locación Bloqueada hasta el evento"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/button_locked.png"
              alt="Locación Bloqueada"
              draggable={false}
              className="w-full h-full object-contain pointer-events-none brightness-110 contrast-105 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] drop-shadow-[0_0_12px_rgba(220,20,40,0.35)] hover:drop-shadow-[0_0_22px_rgba(239,68,68,0.65)] transition-all duration-300"
            />
          </motion.button>
        ) : (
          // ── Botón Desbloqueado "Ver Locación" ──
          <div className="relative group w-full md:w-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 rounded-full blur-md opacity-45 group-hover:opacity-90 transition duration-500 group-hover:duration-200" />
            <motion.button
              onClick={openModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="relative px-8 py-4 bg-black/75 backdrop-blur-md rounded-full border border-red-500/80 shadow-[0_0_25px_rgba(239,68,68,0.7)] flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-red-950/40 hover:border-red-400 hover:shadow-[0_0_35px_rgba(239,68,68,0.95)] cursor-pointer"
            >
              <span className="mr-3 text-red-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span className="relative z-10 font-bold uppercase tracking-wider text-white text-sm md:text-base pointer-events-none drop-shadow-[0_0_8px_rgba(255,255,255,0.75)]">
                Ver Locación
              </span>
            </motion.button>
          </div>
        )}
      </div>

      {/* Modal de verificación */}
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
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-red-600/40 p-8 flex flex-col items-center justify-center overflow-hidden rounded-2xl shadow-[0_0_35px_rgba(220,38,38,0.25)]"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold text-red-500 uppercase tracking-widest mb-6 drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]">
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
                  className="w-full bg-black/60 border border-red-600/40 p-4 font-mono text-red-200 placeholder:text-red-900 focus:outline-none focus:border-red-500 transition-all uppercase tracking-wider rounded-lg"
                />

                <button
                  type="submit"
                  disabled={isPending || state?.success}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-bold tracking-[0.2em] uppercase p-4 mt-2 transition-all disabled:opacity-50 flex justify-center rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.5)]"
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
