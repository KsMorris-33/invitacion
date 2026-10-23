"use client";

import { useState, useEffect, useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { registerGuest } from "../actions/Register";
import ConfirmButton from "./ConfirmButton";

export default function RegisterModal({ targetDate }: { targetDate?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [state, formAction, isPending] = useActionState(registerGuest, null);
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        if (!targetDate) return;
        const checkTime = () => {
            const difference = +new Date(targetDate) - +new Date();
            setIsExpired(difference <= 0);
        };
        const timer = setInterval(checkTime, 1000);
        checkTime();
        return () => clearInterval(timer);
    }, [targetDate]);

    // Cerrar el modal automáticamente tras un registro exitoso
    useEffect(() => {
        if (state?.success && isOpen) {
            const timer = setTimeout(() => {
                setIsOpen(false);
                setTermsAccepted(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [state?.success, isOpen]);

    return (
        <>
            <ConfirmButton onClick={() => setIsOpen(true)} disabled={isExpired} />

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Backdrop: Oscurece el fondo y añade blur extra */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Contenedor del Formulario */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute right-4 top-4 text-white/50 hover:text-white transition-colors cursor-pointer"
                                aria-label="Cerrar modal"
                            >
                                ✕
                            </button>

                            <div className="text-center">
                                <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                                    Únete a la lista
                                </h3>
                                <p className="mt-2 text-sm text-gray-400">
                                    Recibirás la ubicación exacta cuando el contador llegue a cero.
                                </p>
                            </div>

                            <form action={formAction} className="mt-8 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-white/60 ml-1">Nombre</label>
                                    <input
                                        name="nombre"
                                        type="text"
                                        required
                                        placeholder="Ej. Juan Pérez"
                                        className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-white/60 ml-1">Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="tu@correo.com"
                                        className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40 transition-all"
                                    />
                                </div>

                                {/* Casilla de verificación de Términos y Condiciones */}
                                <div className="pt-1">
                                    <label className="flex items-start gap-3 cursor-pointer group select-none text-left">
                                        <input
                                            name="terminos"
                                            type="checkbox"
                                            value="accepted"
                                            required
                                            checked={termsAccepted}
                                            onChange={(e) => setTermsAccepted(e.target.checked)}
                                            className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/10 text-red-600 focus:ring-red-500/50 cursor-pointer accent-red-600 transition-colors"
                                        />
                                        <span className="text-xs text-gray-300 leading-tight">
                                            Acepto{" "}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setShowTermsModal(true);
                                                }}
                                                className="text-red-400 font-semibold underline underline-offset-2 hover:text-red-300 transition-colors cursor-pointer"
                                            >
                                                Términos y Condiciones
                                            </button>
                                        </span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isPending || !termsAccepted}
                                    title={!termsAccepted ? "Debes aceptar los términos y condiciones" : undefined}
                                    className={`w-full mt-4 rounded-xl p-4 font-bold uppercase tracking-widest transition-all ${
                                        isPending || !termsAccepted
                                            ? "bg-white/15 text-white/35 cursor-not-allowed border border-white/5"
                                            : "bg-white text-black hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] cursor-pointer"
                                    }`}
                                >
                                    {isPending ? "Procesando..." : "Registrarme Ahora"}
                                </button>

                                {/* Mensajes de Estado */}
                                {state?.error && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mt-4 text-center text-sm font-medium text-red-400"
                                    >
                                        ⚠️ {state.error}
                                    </motion.p>
                                )}

                                {state?.success && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mt-4 rounded-lg bg-green-500/20 p-3 text-center text-sm font-medium text-green-400 border border-green-500/30"
                                    >
                                        ✅ {state.message}
                                    </motion.div>
                                )}
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Modal de Términos y Condiciones */}
            <AnimatePresence>
                {showTermsModal && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4 md:p-6">
                        {/* Backdrop con blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowTermsModal(false)}
                            className="absolute inset-0 bg-black/85 backdrop-blur-md"
                        />

                        {/* Contenedor del Modal de Términos */}
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0, y: 15 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.92, opacity: 0, y: 15 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl border border-red-500/30 bg-black/95 p-4 sm:p-5 md:p-6 shadow-[0_0_50px_rgba(239,68,68,0.3)] backdrop-blur-2xl overflow-hidden"
                        >
                            {/* Cabecera */}
                            <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
                                <div className="flex items-center gap-2.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.9)] animate-pulse" />
                                    <h4 className="text-base sm:text-lg md:text-xl font-black uppercase tracking-wider text-white">
                                        Términos y Condiciones
                                    </h4>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowTermsModal(false)}
                                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all text-sm font-bold cursor-pointer"
                                    title="Cerrar"
                                    aria-label="Cerrar términos"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* VISTA ESCRITORIO (md y superior): Muestra la imagen terminos.png */}
                            <div className="hidden md:flex my-4 flex-1 overflow-auto rounded-2xl border border-white/10 bg-neutral-950/60 p-2 md:p-4 items-center justify-center shadow-inner">
                                <img
                                    src="/images/terminos.png"
                                    alt="Términos y Condiciones"
                                    className="max-h-[60vh] w-auto max-w-full object-contain rounded-lg select-none shadow-lg"
                                />
                            </div>

                            {/* VISTA MÓVIL (menor a md): Muestra la información en texto estructurado y atractivo */}
                            <div className="flex md:hidden my-3 flex-1 overflow-y-auto max-h-[62vh] rounded-2xl border border-red-900/30 bg-neutral-950/80 p-3 sm:p-4 shadow-inner flex-col space-y-3 text-left">
                                {/* Header decorativo temático */}
                                <div className="text-center py-2 px-3 rounded-xl bg-gradient-to-r from-red-950/50 via-red-900/40 to-red-950/50 border border-red-500/20">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-red-400">
                                        Fiesta Oficial 31 de Octubre
                                    </span>
                                    <h5 className="text-xl font-black tracking-tight text-white uppercase italic drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]">
                                        Dulce o Truco
                                    </h5>
                                </div>

                                {/* Tarjeta 1: Dress Code */}
                                <div className="p-3 rounded-xl border border-red-500/20 bg-white/5 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-base">🎭</span>
                                        <span className="text-xs font-black uppercase tracking-wider text-red-400">
                                            Dress Code: Disfraz Obligatorio
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-300 leading-relaxed pl-6">
                                        El ingreso requiere disfraz. Los asistentes sin disfraz podrán ser rechazados o deberán pagar un recargo.
                                    </p>
                                </div>

                                {/* Tarjeta 2: Premio al mejor disfraz */}
                                <div className="p-3 rounded-xl border border-red-500/20 bg-white/5 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-base">🏆</span>
                                        <span className="text-xs font-black uppercase tracking-wider text-red-400">
                                            Premio al Mejor Disfraz
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-300 leading-relaxed pl-6">
                                        ¡Saca tu mejor versión! Habrá premios en efectivo y sorpresas para el mejor disfraz de la noche.
                                    </p>
                                </div>

                                {/* Tarjeta 3: Cover y Lista de Invitados */}
                                <div className="p-3 rounded-xl border border-red-500/20 bg-white/5 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-base">🎟️</span>
                                            <span className="text-xs font-black uppercase tracking-wider text-red-400">
                                                Cover y Lista de Invitados
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600/30 text-red-300 border border-red-500/30">
                                            LISTA FREE
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-300 leading-relaxed pl-6">
                                        Cover general: <span className="text-white font-semibold">$10.000 COP</span>. Las personas que se encuentren registradas previamente en la lista oficial ingresan gratis.
                                    </p>
                                </div>

                                {/* Tarjeta 4: Locación Secreta */}
                                <div className="p-3 rounded-xl border border-red-500/20 bg-white/5 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-base">📍</span>
                                        <span className="text-xs font-black uppercase tracking-wider text-red-400">
                                            Locación Secreta
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-300 leading-relaxed pl-6">
                                        La ubicación exacta en <span className="text-white font-medium">Soacha, Cundinamarca</span> se mantendrá en secreto y será revelada a los registrados el día del evento (31 de octubre).
                                    </p>
                                </div>

                                {/* Tarjeta 5: Reserva de Admisión */}
                                <div className="p-3 rounded-xl border border-red-500/20 bg-white/5 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-base">🔞</span>
                                        <span className="text-xs font-black uppercase tracking-wider text-red-400">
                                            Reserva de Admisión (+18)
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-300 leading-relaxed pl-6">
                                        Evento exclusivo para mayores de edad (+18). Nos reservamos el derecho de admisión y permanencia.
                                    </p>
                                </div>

                                {/* Footer informativo adicional */}
                                <div className="pt-2 pb-1 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-400 border-t border-white/5">
                                    <span className="flex items-center gap-1">
                                        📍 Soacha, Cundinamarca
                                    </span>
                                    <a
                                        href="https://wa.me/573025487292"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-red-400 hover:text-red-300 font-semibold"
                                    >
                                        💬 WhatsApp: 302 548 7292
                                    </a>
                                    <span className="w-full text-center text-[10px] uppercase font-bold tracking-widest text-red-500/80">
                                        ⚡ Cupos Limitados ⚡
                                    </span>
                                </div>
                            </div>

                            {/* Botones de acción para cerrar o aceptar y continuar */}
                            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 sm:gap-3 pt-2 border-t border-white/10 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setShowTermsModal(false)}
                                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/10 font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer"
                                >
                                    Cerrar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setTermsAccepted(true);
                                        setShowTermsModal(false);
                                    }}
                                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all cursor-pointer"
                                >
                                    Aceptar y Continuar
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}