import { useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Scene3D from "@/components/Scene3D";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-background">
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <Navbar 
            soundEnabled={soundEnabled} 
            setSoundEnabled={setSoundEnabled}
            reducedMotion={reducedMotion}
            setReducedMotion={setReducedMotion}
          />
          <Scene3D reducedMotion={reducedMotion} />
        </>
      )}
    </main>
  );
}