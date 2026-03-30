// src/components/Register.tsx
'use client'

import { useActionState } from 'react'
import { registerGuest } from '@/app/actions/register'

export default function RegisterForm() {
    // state: el mensaje que devuelve el servidor
    // formAction: la función que vinculamos al formulario
    // isPending: true mientras se guarda en la base de datos
    const [state, formAction, isPending] = useActionState(registerGuest, null)

    return (
        <div className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Registro para la Ubicación Secreta</h2>

            <form action={formAction} className="space-y-4">
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="tu@correo.com"
                    className="w-full p-3 rounded-lg bg-black/50 border border-purple-500/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />

                <button
                    type="submit"
                    disabled={isPending}
                    className={`w-full p-3 rounded-lg font-bold transition-all ${isPending
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 active:scale-95 text-white shadow-lg shadow-purple-500/20'
                        }`}
                >
                    {isPending ? 'Procesando...' : 'Obtener Invitación'}
                </button>

                {/* Mensajes de feedback dinámicos */}
                {state?.message && (
                    <p className={`mt-4 text-center text-sm font-medium ${state.success ? 'text-green-400' : 'text-red-400'}`}>
                        {state.message}
                    </p>
                )}
            </form>
        </div>
    )
}