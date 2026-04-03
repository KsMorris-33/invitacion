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

    const cyberpunkIcon = L.divIcon({
        className: 'custom-icon',
        html: `<div style="width: 16px; height: 16px; background-color: #d946ef; border-radius: 50%; box-shadow: 0 0 15px #d946ef; border: 2px solid white; animation: pulse 2s infinite;"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
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
            {/* CartoDB Dark Matter Base Map */}
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            
            {/* Interactive Neon Marker */}
            <Marker position={[parsedLat, parsedLng]} icon={cyberpunkIcon} />

            <style jsx global>{`
                .leaflet-container {
                    background: #0a0a0a !important;
                }
            `}</style>
        </MapContainer>
    );
}
