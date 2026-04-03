import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LocationView from './LocationView';

export default async function LocationPage() {
    const cookieStore = await cookies();
    const hasAccess = cookieStore.get('locacion_access');

    if (!hasAccess) redirect('/');

    const targetDate = new Date('2026-04-01T00:00:00Z');
    const now = new Date();
    if (now < targetDate) redirect('/?error=too-early');

    const lat = "4.575368";
    const lng = "-74.214147";

    return <LocationView lat={lat} lng={lng} />;
}