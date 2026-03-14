import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatCardProps {
  number: string;
  label: string;
  index?: number;
}

const StatCard = ({ number, label, index = 0 }: StatCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="marvel-border p-6 bg-background/30 backdrop-blur-sm"
    >
      <p className="font-display text-5xl md:text-6xl text-gradient-marvel">{number}</p>
      <p className="font-tech text-[10px] tracking-[0.3em] text-muted-foreground uppercase mt-2">
        {label}
      </p>
    </motion.div>
  );
};

export default StatCard;
