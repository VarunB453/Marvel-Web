import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Hero } from "@/data/heroes";

const StatBar = ({ label, value, delay }: { label: string; value: number; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="font-tech text-[8px] tracking-[0.2em] text-muted-foreground uppercase">{label}</span>
        <span className="font-tech text-[9px] text-foreground/80">{value}</span>
      </div>
      <div className="h-[3px] bg-muted/40 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.2, delay: delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
};

const HeroProfileCard = ({ hero, index }: { hero: Hero; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 6) * 0.08 }}
      layout
      className="group relative"
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative overflow-hidden rounded-sm marvel-border bg-card cursor-pointer transition-colors duration-300 hover:border-primary/40"
      >
        {/* Hero image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={hero.image}
            alt={hero.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${hero.accentColor} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

          {/* Team badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className={`font-tech text-[7px] tracking-[0.25em] uppercase px-2 py-1 border backdrop-blur-sm ${
              hero.team === "Eternals"
                ? "text-secondary border-secondary/50 bg-secondary/10"
                : "text-muted-foreground border-border/40 bg-card/80"
            }`}>
              {hero.team}
            </span>
            {hero.team === "Eternals" && (
              <span className="font-tech text-[7px] tracking-wider text-secondary px-1.5 py-1 border border-secondary/40 bg-secondary/10 backdrop-blur-sm" title="Eternal">
                ✦
              </span>
            )}
          </div>

          {/* Expand indicator */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-5 h-5 flex items-center justify-center"
            >
              <span className="text-primary font-tech text-lg">+</span>
            </motion.div>
          </div>
        </div>

        {/* Basic info */}
        <div className="p-4 pb-5">
          <p className="font-tech text-[8px] tracking-[0.35em] text-primary uppercase mb-1">
            {hero.alias}
          </p>
          <h3 className="font-display text-2xl md:text-3xl tracking-wider text-foreground leading-none mb-1">
            {hero.name}
          </h3>
          <p className="font-body text-[11px] text-muted-foreground">
            {hero.realName}
          </p>

          {/* Hover reveal line */}
          <div className="w-0 group-hover:w-full h-[1px] bg-primary/40 transition-all duration-500 mt-3" />
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-5 space-y-5 border-t border-border/20 pt-4">
                {/* Bio */}
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  {hero.bio}
                </p>

                {/* Powers */}
                <div>
                  <p className="font-tech text-[7px] tracking-[0.3em] text-muted-foreground uppercase mb-2">
                    Powers & Abilities
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {hero.powers.map((power) => (
                      <span
                        key={power}
                        className="font-tech text-[7px] tracking-wider text-foreground/70 px-2 py-1 border border-border/30 bg-muted/20 uppercase"
                      >
                        {power}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-2.5">
                  <p className="font-tech text-[7px] tracking-[0.3em] text-muted-foreground uppercase mb-1">
                    Power Metrics
                  </p>
                  <StatBar label="Strength" value={hero.stats.strength} delay={0} />
                  <StatBar label="Speed" value={hero.stats.speed} delay={0.05} />
                  <StatBar label="Durability" value={hero.stats.durability} delay={0.1} />
                  <StatBar label="Intelligence" value={hero.stats.intelligence} delay={0.15} />
                  <StatBar label="Combat" value={hero.stats.combat} delay={0.2} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default HeroProfileCard;
