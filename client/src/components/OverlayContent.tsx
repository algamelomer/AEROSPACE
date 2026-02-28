import { motion } from "framer-motion";
import { Shield, Zap, Wind, ArrowRight } from "lucide-react";

export default function OverlayContent() {
  return (
    <div className="w-screen">
      {/* SECTION 1: HERO */}
      <section className="h-screen w-full flex items-center px-6 md:px-24">
        <motion.div 
          className="max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
            The Future of <br/>
            <span className="text-gradient">Aviation</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-8 font-light max-w-lg">
            Experience next-generation supersonic travel. Redefining speed, luxury, and the boundaries of engineering.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-white transition-all uppercase tracking-wider text-sm flex items-center gap-2">
              Explore Fleet <ArrowRight size={16} />
            </button>
            <button className="px-8 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all uppercase tracking-wider text-sm backdrop-blur-sm border border-white/20">
              Watch Video
            </button>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: FEATURES */}
      <section className="h-screen w-full flex items-center justify-end px-6 md:px-24" id="technology">
        <div className="max-w-xl w-full">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Next-Gen <span className="text-primary">Engineering</span>
            </h2>
            <p className="text-white/70 mb-12">
              Built from composite nanomaterials, our aerospace vehicles are lighter, stronger, and more efficient than anything in the sky.
            </p>

            <div className="grid gap-6">
              {[
                { icon: <Zap className="text-primary" />, title: "Supersonic Propulsion", desc: "Mach 2.4 cruising speed reduces trans-Atlantic flight times by half." },
                { icon: <Wind className="text-primary" />, title: "Advanced Aerodynamics", desc: "Sleek delta-wing configuration minimizes drag and sonic booms." },
                { icon: <Shield className="text-primary" />, title: "Quantum Shielding", desc: "Self-healing smart fuselage ensures absolute safety at any altitude." }
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  className="glass-panel p-6 rounded-2xl flex gap-4 items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.8 }}
                  transition={{ delay: idx * 0.2, duration: 0.5 }}
                >
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: STATS */}
      <section className="h-screen w-full flex items-center px-6 md:px-24" id="fleet">
        <motion.div 
          className="max-w-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-12">
            By The <span className="text-gradient">Numbers</span>
          </h2>
          
          <div className="grid grid-cols-2 gap-8 md:gap-12">
            {[
              { val: "2.4", label: "Mach Cruising Speed", prefix: "M" },
              { val: "8,500", label: "Nautical Mile Range", suffix: "nm" },
              { val: "65k", label: "Max Altitude", suffix: "ft" },
              { val: "Zero", label: "Carbon Emissions", prefix: "" }
            ].map((stat, idx) => (
              <div key={idx} className="border-l-2 border-primary/50 pl-6 py-2">
                <div className="text-4xl md:text-6xl font-display font-bold text-white mb-2 flex items-baseline">
                  {stat.prefix && <span className="text-2xl text-primary mr-1">{stat.prefix}</span>}
                  {stat.val}
                  {stat.suffix && <span className="text-2xl text-primary ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-sm uppercase tracking-widest text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 4: CTA */}
      <section className="h-screen w-full flex flex-col items-center justify-center text-center px-6" id="destinations">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl glass-panel p-12 md:p-20 rounded-3xl"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
            Ready for <span className="text-gradient">Takeoff?</span>
          </h2>
          <p className="text-lg text-white/70 mb-10 font-light">
            Join the exclusive list of early adopters. Reserve your seat on the maiden voyage of the A-X1 and experience the dawn of a new era.
          </p>
          <button className="px-10 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:bg-white hover:scale-105 transition-all uppercase tracking-widest text-lg shadow-[0_0_30px_rgba(0,210,255,0.4)]">
            Book Your Flight
          </button>
        </motion.div>
        
        <footer className="absolute bottom-6 text-white/40 text-sm tracking-widest uppercase">
          © 2026 AeroSpace Inc. | All Systems Nominal
        </footer>
      </section>
    </div>
  );
}