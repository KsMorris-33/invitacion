"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function Countdown({ targetDate }: { targetDate: string }) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // Ejecución inicial

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!timeLeft) return null;

    const isUrgent = timeLeft.days === 0 && timeLeft.hours === 0;

    return (
        <div className={`flex gap-4 md:gap-8 p-8 rounded-3xl border backdrop-blur-xl shadow-2xl transition-all ${isUrgent ? 'border-red-500/50 bg-red-900/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
            <TimeUnit value={timeLeft.days} label="Días" isUrgent={isUrgent} />
            <TimeUnit value={timeLeft.hours} label="Horas" isUrgent={isUrgent} />
            <TimeUnit value={timeLeft.minutes} label="Minutos" isUrgent={isUrgent} />
            <TimeUnit value={timeLeft.seconds} label="Segundos" isUrgent={isUrgent} />
        </div>
    );
}

function TimeUnit({ value, label, isUrgent }: { value: number; label: string; isUrgent?: boolean }) {
    return (
        <div className="flex flex-col items-center min-w-[70px] md:min-w-[100px]">
            <span className={`text-4xl md:text-6xl font-black ${isUrgent ? 'text-red-500 drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] animate-glitch' : 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]'}`}>
                {value.toString().padStart(2, '0')}
            </span>
            <span className={`text-xs md:text-sm uppercase tracking-[0.2em] mt-2 font-medium ${isUrgent ? 'text-red-400' : 'text-gray-400'}`}>
                {label}
            </span>
        </div>
    );
}