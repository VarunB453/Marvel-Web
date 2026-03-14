import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { number: "8,000+", label: "Characters Created" },
  { number: "35", label: "MCU Films" },
  { number: "∞", label: "Parallel Universes" },
  { number: "60+", label: "Years of Stories" },
  { number: "13", label: "Disney+ Series" },
  { number: "6", label: "Infinity Stones" },
];

const StatsStrip = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-20 px-6 md:px-12 border-y border-border/10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-center"
          >
            <p className="font-display text-4xl md:text-5xl text-gradient-marvel">{stat.number}</p>
            <p className="font-tech text-[8px] tracking-[0.3em] text-muted-foreground uppercase mt-2">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsStrip;
