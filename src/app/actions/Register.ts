// app/actions/register.ts
'use server'
import { prisma } from '@/app/utils/prisma' // Asegúrate de tener tu instancia de Prisma exportada aquí

export async function registerGuest(formData: FormData) {
    const email = formData.get('email') as string

    try {
        const newGuest = await prisma.registration.create({
            data: { email }
        })
        return { success: true, guest: newGuest }
    } catch (error) {
        return { success: false, error: 'Error al registrar' }
    }
}