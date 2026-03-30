'use server'

import { prisma } from "../lib/prisma";

export type RegisterState = {
    success?: boolean
    message?: string
    error?: string
} | null

export async function registerGuest(
    prevState: RegisterState,
    formData: FormData
): Promise<RegisterState> {
    const email = formData.get('email') as string
    const nombre = formData.get('nombre') as string

    if (!email || !nombre) {
        return { error: 'Todos los campos son obligatorios.' }
    }

    try {
        await prisma.asistentes.create({
            data: { email, nombre }
        })
        return { success: true, message: '¡Registro exitoso! Vuelve vuando el contador termine para saber la locación.' }
    } catch (error: any) {
        console.error('Prisma error:', error)
        // Duplicate email (unique constraint)
        if (error.code === 'P2002') {
            return { error: 'Este correo ya está en la lista de la fiesta.' }
        }
        return { error: `Hubo un fallo en el sistema: ${error.message}` }
    }
}