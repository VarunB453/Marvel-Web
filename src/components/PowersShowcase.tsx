import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const powers = [
  { name: "Cosmic Energy", level: 98, icon: "✦", description: "Harnessing the fundamental forces of the universe itself" },
  { name: "Vibranium Tech", level: 92, icon: "◆", description: "The most versatile and indestructible metal on Earth" },
  { name: "Mystic Arts", level: 88, icon: "⬡", description: "Bending reality through ancient sorcery and dimensional magic" },
  { name: "Super Soldier", level: 85, icon: "★", description: "Peak human potential elevated to superhuman perfection" },
  { name: "Infinity Stones", level: 100, icon: "◉", description: "Six singularities forged into concentrated ingots of power" },
  { name: "Pym Particles", level: 78, icon: "◎", description: "Shrinking and growing — manipulating the quantum realm" },
];

const PowersShowcase = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-50px" });

  return (
    <section className="relative py-32 px-6 md:px-12 overflow-hidden">
      {/* Faint bg pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="font-tech text-[11px] tracking-[0.5em] text-primary uppercase mb-4">
              The Source of Power
            </p>
            <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground">
              POWERS & ABILITIES
            </h2>
            <div className="w-24 h-[2px] bg-primary/60 mt-4" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {powers.map((power, i) => (
            <PowerCard key={power.name} power={power} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PowerCard = ({ power, index }: { power: typeof powers[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group border border-border/20 hover:border-primary/30 bg-card/20 p-8 transition-all duration-500"
    >
      {/* Icon */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-3xl text-primary/60 group-hover:text-primary transition-colors">{power.icon}</span>
        <span className="font-display text-4xl text-foreground/10 group-hover:text-foreground/20 transition-colors">
          {power.level}
        </span>
      </div>

      <h3 className="font-display text-2xl tracking-wider text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
        {power.name}
      </h3>

      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
        {power.description}
      </p>

      {/* Power bar */}
      <div className="relative h-1 bg-border/30 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${power.level}%` } : {}}
          transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/60"
        />
      </div>
      <p className="font-tech text-[8px] tracking-[0.3em] text-muted-foreground uppercase mt-2 text-right">
        Power Level: {power.level}/100
      </p>
    </motion.div>
  );
};

export default PowersShowcase;
