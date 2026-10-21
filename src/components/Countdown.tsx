"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function useCountdown(targetDate: string): TimeLeft | null {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const calc = () => {
      const diff = +new Date(targetDate) - +new Date();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  return timeLeft;
}

// ─── Single Digit Column (Container-Query Responsive) ─────────────────────────
function AnimatedDigit({
  value,
  label,
  isUrgent,
}: {
  value: number;
  label: string;
  isUrgent: boolean;
}) {
  const display = value.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center justify-center select-none" style={{ minWidth: "6.2cqw" }}>
      {/* Number */}
      <div className="relative flex items-center justify-center overflow-hidden" style={{ height: "5.4cqw" }}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ opacity: 0, y: -6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="font-black tabular-nums leading-none tracking-tight text-white"
            style={{
              fontSize: "4.9cqw",
              fontFamily: "'Geist', -apple-system, sans-serif",
              textShadow: isUrgent
                ? "0 0 10px #ff1a4a, 0 0 22px #ff003a, 0 0 35px rgba(255,0,60,0.85)"
                : "0 0 8px rgba(255,100,120,0.9), 0 0 18px rgba(220,20,50,0.7), 0 0 30px rgba(180,0,30,0.5)",
            }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Label */}
      <span
        className="uppercase font-bold tracking-widest text-red-200/80 leading-none"
        style={{
          fontSize: "1.45cqw",
          marginTop: "0.5cqw",
          letterSpacing: "0.14em",
          textShadow: "0 0 5px rgba(0,0,0,0.95)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Colon Separator ──────────────────────────────────────────────────────────
function Colon({ isUrgent }: { isUrgent: boolean }) {
  return (
    <motion.span
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      className="font-black text-red-300/80 select-none leading-none"
      style={{
        fontSize: "3.8cqw",
        marginBottom: "2cqw",
        textShadow: isUrgent
          ? "0 0 10px rgba(255,30,60,0.95)"
          : "0 0 8px rgba(255,80,100,0.75)",
      }}
    >
      :
    </motion.span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Countdown({ targetDate }: { targetDate: string }) {
  const timeLeft = useCountdown(targetDate);

  if (!timeLeft) return null;

  const isUrgent = timeLeft.days === 0 && timeLeft.hours === 0;

  return (
    <div
      className="relative flex items-center justify-center mx-auto"
      style={{
        // Define Container Query context so all inner units scale 100% proportionally with the image
        containerType: "inline-size",
        width: "min(94vw, 640px)",
        aspectRatio: "669 / 373",
      }}
    >
      {/* ── Skeleton with Stone Image ────────────────────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/countdown.png"
        alt="Esqueleto guardián con cronómetro"
        draggable={false}
        className="w-full h-full object-contain pointer-events-none select-none block"
        style={{
          filter: isUrgent
            ? "drop-shadow(0 0 25px rgba(255,20,50,0.8)) drop-shadow(0 0 50px rgba(200,0,35,0.5))"
            : "drop-shadow(0 0 16px rgba(220,20,40,0.55)) drop-shadow(0 0 35px rgba(160,0,30,0.35))",
        }}
      />

      {/* ── Ambient Pulsing Aura Behind Skeleton ─────────────────────────── */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: isUrgent ? [0.6, 1, 0.6] : [0.3, 0.65, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 60%, rgba(220,10,40,0.4) 0%, transparent 75%)",
          zIndex: -1,
        }}
      />

      {/* ── Exact Stone Tablet Inner Overlay ─────────────────────────────── */}
      <div
        className="absolute flex flex-col items-center justify-center pointer-events-none"
        style={{
          left: "32.2%",
          top: "49%",
          width: "35.8%",
          height: "27.5%",
        }}
      >
        {/* Subtle stone inner luminescence */}
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-xs pointer-events-none"
          animate={{
            opacity: isUrgent ? [0.5, 0.85, 0.5] : [0.25, 0.5, 0.25],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse 85% 65% at 50% 50%, rgba(220,20,50,0.22) 0%, transparent 80%)",
          }}
        />

        {/* Shimmer sweep across the engraved stone */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ mixBlendMode: "screen" }}
        >
          <motion.div
            className="absolute left-0 right-0"
            style={{
              height: "25%",
              background:
                "linear-gradient(to bottom, transparent, rgba(255,80,100,0.12) 50%, transparent)",
            }}
            animate={{ top: ["-30%", "130%"] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2,
            }}
          />
        </motion.div>

        {/* Digits Row perfectly positioned inside the stone slab */}
        <div className="relative z-10 flex items-center justify-center gap-[0.8cqw] w-full px-[0.5cqw]">
          <AnimatedDigit value={timeLeft.days} label="DÍAS" isUrgent={isUrgent} />
          <Colon isUrgent={isUrgent} />
          <AnimatedDigit value={timeLeft.hours} label="HRS" isUrgent={isUrgent} />
          <Colon isUrgent={isUrgent} />
          <AnimatedDigit value={timeLeft.minutes} label="MIN" isUrgent={isUrgent} />
          <Colon isUrgent={isUrgent} />
          <AnimatedDigit value={timeLeft.seconds} label="SEG" isUrgent={isUrgent} />
        </div>
      </div>
    </div>
  );
}