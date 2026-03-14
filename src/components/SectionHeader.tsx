import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  accentColor?: "primary" | "secondary";
}

const SectionHeader = ({ label, title, accentColor = "primary" }: SectionHeaderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const lineColor = accentColor === "primary" ? "bg-primary/60" : "bg-secondary/60";
  const labelColor = accentColor === "primary" ? "text-primary" : "text-secondary";

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className={`font-tech text-[11px] tracking-[0.5em] ${labelColor} uppercase mb-4`}>
          {label}
        </p>
        <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground">
          {title}
        </h2>
        <div className={`w-24 h-[2px] ${lineColor} mt-4`} />
      </motion.div>
    </div>
  );
};

export default SectionHeader;
