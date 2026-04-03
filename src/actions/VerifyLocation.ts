'use server'

import { prisma } from "../lib/prisma";
import { cookies } from "next/headers";

export type VerifyState = {
    success?: boolean
    error?: string
} | null

export async function verifyEmailLocation(
    prevState: VerifyState,
    formData: FormData
): Promise<VerifyState> {
    const email = formData.get('email') as string;

    if (!email) {
        return { error: 'El correo es obligatorio.' };
    }

    try {
        const guest = await prisma.asistentes.findFirst({
            where: { email }
        });

        if (!guest) {
            return { error: 'Acceso Denegado. Correo no encontrado en la base de datos.' };
        }

        // Access cookie expires in 24 hours
        (await cookies()).set('locacion_access', 'granted', { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 
        });

        return { success: true };
    } catch (error: any) {
        console.error('Verify error:', error);
        return { error: `Hubo un error al verificar: ${error.message}` };
    }
}
