"use client";

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface InteractiveMapProps {
    lat: string;
    lng: string;
}

export default function InteractiveMap({ lat, lng }: InteractiveMapProps) {
    useEffect(() => {
        // Fix Leaflet's default icon missing issue
        delete (L.Icon.Default.prototype as any)._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });
    }, []);

    const bloodRedIcon = L.divIcon({
        className: 'custom-icon',
        html: `<div style="
            width: 18px; height: 18px;
            background: radial-gradient(circle at 40% 35%, #ff4444, #cc0000);
            border-radius: 50%;
            box-shadow: 0 0 12px rgba(220,38,38,0.9), 0 0 24px rgba(220,38,38,0.5);
            border: 2px solid rgba(255,255,255,0.8);
            animation: pulse 1.8s ease-in-out infinite;
        "></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
    });

    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);

    return (
        <MapContainer 
            center={[parsedLat, parsedLng]} 
            zoom={15} 
            scrollWheelZoom={true} 
            style={{ height: '100%', width: '100%', zIndex: 10, background: '#0a0a0a' }}
            zoomControl={false}
            attributionControl={false}
        >
            {/* CartoDB Dark Matter Base Map (autenticado con API key) */}
            <TileLayer
                url={`https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png?key=${process.env.NEXT_PUBLIC_CARTO_KEY}`}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                maxZoom={19}
            />
            
            {/* Interactive Neon Marker */}
            <Marker position={[parsedLat, parsedLng]} icon={bloodRedIcon} />

            <style jsx global>{`
                .leaflet-container {
                    background: #0a0a0a !important;
                }
            `}</style>
        </MapContainer>
    );
}
