"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Lista de tus imágenes (puedes automatizar esto si tienes muchas)
const DJ_IMAGES = [
    "/images/djs/dj1.png",
    "/images/djs/dj2.png",
    "/images/djs/dj3.png",
];

export default function DjCarousel() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Cambia la imagen cada 4 segundos
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % DJ_IMAGES.length);
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] flex justify-center items-center overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={DJ_IMAGES[index]}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="relative w-full h-full flex justify-center"
                >
                    <Image
                        src={DJ_IMAGES[index]}
                        alt="DJ Character"
                        fill
                        className="object-contain"
                        priority
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}