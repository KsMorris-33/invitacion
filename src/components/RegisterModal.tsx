"use client";

import { useState, useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { registerGuest } from "../app/actions/register";
import ConfirmButton from "./ConfirmButton";

export default function RegisterModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [state, formAction, isPending] = useActionState(registerGuest, null);

    // Cerrar el modal automáticamente tras un registro exitoso (opcional)
    if (state?.success && isOpen) {
        setTimeout(() => setIsOpen(false), 3000);
    }

    return (
        <>
            <ConfirmButton onClick={() => setIsOpen(true)} />

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
                                className="absolute right-4 top-4 text-white/50 hover:text-white transition-colors"
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

                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className={`w-full mt-4 rounded-xl p-4 font-bold uppercase tracking-widest transition-all ${isPending
                                        ? "bg-white/20 text-white/40 cursor-not-allowed"
                                        : "bg-white text-black hover:scale-[1.02] active:scale-[0.98]"
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
        </>
    );
}