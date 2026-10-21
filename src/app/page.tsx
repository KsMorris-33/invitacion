import Countdown from '@/components/Countdown';
import CrimsonDiamondsRain from '@/components/background/CrimsonDiamondsRain';
import RegisterModal from '@/components/RegisterModal';
import SmokeBackground from "@/components/background/SmokeBackground";
import LocationButton from '@/components/LocationButton';
import { Nosifer } from 'next/font/google';

const nosifer = Nosifer({ weight: '400', subsets: ['latin'] });

const FIESTA_DATE = "2026-10-31T18:00:00";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* El fondo de humo (Client Component) */}
      <SmokeBackground />

      {/* Lluvia de diamantes carmesí */}
      <CrimsonDiamondsRain />

      {/* Título en la parte superior con tamaño de fuente grande */}
      <header className="fixed top-6 sm:top-8 md:top-10 left-0 right-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none select-none">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-[0.25em] sm:tracking-[0.35em] md:tracking-[0.45em] text-white/90 uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          Para:
          <span
            className={`${nosifer.className} block text-red-500 font-normal tracking-normal sm:tracking-wider mt-2 sm:mt-3`}
            style={{
              textShadow:
                "0 0 15px rgba(239,68,68,0.9), 0 0 35px rgba(220,38,38,0.7), 0 0 65px rgba(185,28,28,0.5)",
            }}
          >
            dulce o truco
          </span>
        </h1>
      </header>

      {/* Esqueleto y contador centrado en pantalla (especialmente en móviles) */}
      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4 pt-16 pb-28 sm:pt-20 sm:pb-24">
        <div className="pointer-events-auto flex items-center justify-center w-full">
          <Countdown targetDate={FIESTA_DATE} />
        </div>
      </div>

      {/* Botones inferiores de acción */}
      <div className="bottom-8 sm:bottom-12 fixed z-20 flex flex-col sm:flex-row gap-4 w-full max-w-xl justify-center items-center px-4">
        <RegisterModal targetDate={FIESTA_DATE} />
        <LocationButton targetDate={FIESTA_DATE} />
      </div>
    </main>
  );
}