"use client";
import { useState, useEffect } from 'react';

export default function CyberMap({ lat, lng }: { lat: string, lng: string }) {
    const [displayCoords, setDisplayCoords] = useState("0.000000, 0.000000");

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayCoords(
                `${(Math.random() * 10).toFixed(6)}, ${(Math.random() * -80).toFixed(6)}`
            );
            iteration++;
            if (iteration > 20) {
                clearInterval(interval);
                setDisplayCoords(`${lat}, ${lng}`);
            }
        }, 50);
        return () => clearInterval(interval);
    }, [lat, lng]);

    return (
        <div className="font-mono text-fuchsia-400/90 text-[10px] md:text-sm tracking-[0.2em]">
            CORE_LOC: <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">{displayCoords}</span>
        </div>
    );
}