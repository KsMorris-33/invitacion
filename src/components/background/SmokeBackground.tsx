"use client";

import { Canvas } from "@react-three/fiber";
import ShaderSmoke from "./ShaderSmoke";

export default function SmokeBackground() {
    return (
        <div className="fixed inset-0 -z-10">
            <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
                <ShaderSmoke />
            </Canvas>
        </div>
    );
}