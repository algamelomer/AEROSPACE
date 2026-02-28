import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Menu, X, Settings2, Plane } from "lucide-react";

export default function Navbar({
  soundEnabled,
  setSoundEnabled,
  reducedMotion,
  setReducedMotion
}: {
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "glass-panel py-3" : "bg-transparent py-6"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <Plane className="text-primary group-hover:rotate-12 transition-transform" />
            <span className="font-display text-xl font-bold tracking-wider text-white">
              AERO<span className="text-primary">SPACE</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Fleet", "Technology", "Destinations", "About"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm uppercase tracking-wider text-white/70 hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Controls & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`p-2 rounded-full transition-colors ${
                reducedMotion ? "text-primary bg-primary/20" : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
              title="Reduced Motion"
            >
              <Settings2 size={20} />
            </button>
            <button className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-white transition-colors uppercase tracking-wider text-sm">
              Book Flight
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col p-6"
          >
            <div className="flex justify-end">
              <button
                className="p-2 text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={32} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {["Fleet", "Technology", "Destinations", "About"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-display font-light text-white hover:text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
              
              <div className="flex gap-6 mt-8">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-4 rounded-full glass-panel text-white"
                >
                  {soundEnabled ? <Volume2 /> : <VolumeX />}
                </button>
                <button
                  onClick={() => setReducedMotion(!reducedMotion)}
                  className={`p-4 rounded-full glass-panel ${
                    reducedMotion ? "text-primary border-primary/50" : "text-white"
                  }`}
                >
                  <Settings2 />
                </button>
              </div>
              
              <button className="mt-8 w-full max-w-xs py-4 bg-primary text-primary-foreground font-bold rounded-full text-lg uppercase tracking-widest">
                Book Flight
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}