import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FooterSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer id="contact" ref={ref} className="relative py-32 px-6 md:px-12 border-t border-border/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="font-tech text-[10px] tracking-[0.5em] text-muted-foreground uppercase mb-6">
            Join the Universe
          </p>
          <h2 className="font-display text-6xl md:text-[8rem] leading-none tracking-wider text-foreground">
            ASSEMBLE
          </h2>
          <div className="w-16 h-[2px] bg-primary/60 mx-auto mt-8 mb-8" />
          <p className="font-body text-muted-foreground max-w-md mx-auto">
            The multiverse needs you. Step into the story.
          </p>

          {/* CTA button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 px-10 py-4 border border-primary/40 bg-primary/10 font-tech text-[11px] tracking-[0.3em] text-primary uppercase hover:bg-primary/20 transition-colors glow-red"
          >
            Enter the Multiverse
          </motion.button>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-32 pt-8 border-t border-border/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display text-lg tracking-wider text-muted-foreground">
            MARVEL UNIVERSE
          </p>
          <p className="font-body text-[11px] text-muted-foreground/50">
            A cinematic web experience • 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
