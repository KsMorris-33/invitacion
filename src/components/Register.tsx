"use server";

import { supabaseAdmin } from "@/app/utils/supabase";
import { revalidatePath } from "next/cache";

export async function registerGuest(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const nombre = formData.get("nombre") as string;

    if (!email || !nombre) {
        return { error: "Todos los campos son obligatorios." };
    }

    const { error } = await supabaseAdmin
        .from("invitados")
        .insert([{ email, nombre }]);

    if (error) {
        if (error.code === '23505') { // Error de duplicado en PostgreSQL
            return { error: "Este correo ya está en la lista de la fiesta." };
        }
        return { error: "Hubo un fallo en el sistema. Intenta de nuevo." };
    }

    revalidatePath("/"); // Limpia el cache para mostrar cambios si es necesario
    return { success: true, message: "¡Registro exitoso! Prepárate para el humo." };
}