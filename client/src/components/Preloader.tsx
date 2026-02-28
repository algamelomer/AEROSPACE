import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { useEffect, useState } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // slight delay before unmounting
          return 100;
        }
        return p + 5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="mb-8 text-primary"
      >
        <Plane size={64} className="-rotate-45" />
      </motion.div>
      
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
        <motion.div
          className="absolute top-0 left-0 h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
      
      <div className="mt-4 font-display text-2xl font-light text-white tracking-widest">
        AEROS<span className="text-primary font-bold">PACE</span>
      </div>
      <div className="mt-2 text-sm text-white/50 tracking-widest uppercase">
        Initializing Flight Systems {progress}%
      </div>
    </motion.div>
  );
}