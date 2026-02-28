import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Sky, Cloud, Environment, Float, Sparkles } from "@react-three/drei";
import { Suspense } from "react";
import PlaneModel from "./PlaneModel";
import OverlayContent from "./OverlayContent";

export default function Scene3D({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="w-full h-screen bg-[#020813]">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
        <color attach="background" args={["#020813"]} />
        <fog attach="fog" args={["#020813", 10, 30]} />
        
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={2} 
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -5]} color="#00d2ff" intensity={1} />
        
        <Environment preset="city" />

        <Suspense fallback={null}>
          {!reducedMotion && (
            <>
              <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                <Cloud position={[-4, 2, -10]} speed={0.2} opacity={0.5} />
                <Cloud position={[4, -2, -15]} speed={0.2} opacity={0.5} color="#00d2ff" />
                <Cloud position={[-8, -4, -20]} speed={0.2} opacity={0.3} />
              </Float>
              <Sparkles count={200} scale={20} size={2} speed={0.4} opacity={0.2} color="#ffffff" />
            </>
          )}

          <ScrollControls pages={4} damping={0.25} distance={1.5}>
            <PlaneModel reducedMotion={reducedMotion} />
            
            <Scroll html style={{ width: '100%', height: '100%' }}>
              <OverlayContent />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}