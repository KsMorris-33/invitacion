// app/location/page.tsx
import { createClient } from '@/app/utils/supabase';
import { redirect } from 'next/navigation';

export default async function LocationPage() {
    const supabase = await createClient();

    // 1. Verificar sesión del usuario
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    // 2. Verificar tiempo en el servidor
    const targetDate = new Date('2026-04-01T00:00:00Z');
    const now = new Date();

    if (now < targetDate) {
        redirect('/countdown?error=too-early');
    }

    return (
        <main>
            <h1>¡Llegaste a la ubicación secreta!</h1>
            {/* El mapa solo se renderiza si las condiciones anteriores pasaron */}
        </main>
    );
}