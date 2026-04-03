import Countdown from '@/components/Countdown';
import LedBanner from '@/components/LedBanner';
import Circle from '@/components/background/Circulo';
import RegisterModal from '@/components/RegisterModal';
import SmokeBackground from "@/components/background/SmokeBackground";
import LocationButton from '@/components/LocationButton';
import DjCarousel from '@/components/Djcarousel';




const FIESTA_DATE = "2026-04-03T18:00:00";


export default function Home() {
  return (

    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* El fondo de humo (Client Component) */}
      <SmokeBackground />
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center opacity-60 md:opacity-100 mix-blend-screen scale-[1.2] md:scale-100 mt-[-5%] md:mt-0">
          <Circle />
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-10 mt-[10%] md:mt-0">
          <div className="w-full max-w-[100vw] sm:max-w-md md:max-w-lg lg:max-w-xl">
            <DjCarousel />
          </div>
        </div>
      </div>


      {/* Contenido principal */}
      <div className="top-2 fixed z-10 flex flex-col items-center text-center px-4">
        <h2 className="mb-8 text-xl md:text-2xl font-light tracking-[0.5em] text-white/70 uppercase">
          Para la fiesta santa
        </h2>

        <Countdown targetDate={FIESTA_DATE} />



      </div>
      <div className="bottom-20 fixed z-10 flex flex-col md:flex-row gap-6 w-full max-w-2xl justify-center items-center">
        <RegisterModal />
        <LocationButton targetDate={FIESTA_DATE} />
      </div>


      {/* Banner LED inferior */}

      <div className="absolute bottom-0 w-full transparent">

        <LedBanner />
      </div>
    </main>
  );
}