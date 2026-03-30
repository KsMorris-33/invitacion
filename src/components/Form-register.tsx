"use client";

import { useActionState } from "react";
import { registerGuest } from "@/app/actions/register";

export default function RegisterForm() {
    const [state, formAction, isPending] = useActionState(registerGuest, null);

    return (
        <form action={formAction} className="mt-8 flex flex-col gap-4 w-full max-w-md">
            <div className="flex flex-col gap-2">
                <input
                    name="nombre"
                    type="text"
                    placeholder="Tu Nombre"
                    required
                    className="bg-white/5 border border-white/10 p-3 rounded-lg text-white backdrop-blur-md focus:outline-none focus:border-white/30 transition-all"
                />
                <input
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    required
                    className="bg-white/5 border border-white/10 p-3 rounded-lg text-white backdrop-blur-md focus:outline-none focus:border-white/30 transition-all"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="bg-white text-black font-bold p-3 rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50"
            >
                {isPending ? "Registrando..." : "Asegurar mi cupo"}
            </button>

            {state?.error && (
                <p className="text-red-400 text-sm animate-pulse">{state.error}</p>
            )}
            {state?.success && (
                <p className="text-green-400 text-sm">{state?.message}</p>
            )}
        </form>
    );
}