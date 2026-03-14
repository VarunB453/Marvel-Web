import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface HeroCardProps {
  image: string;
  name: string;
  role: string;
  colorClass?: string;
  index?: number;
  onClick?: () => void;
}

const HeroCard = ({ image, name, role, colorClass = "from-primary/60", index = 0, onClick }: HeroCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative overflow-hidden rounded-sm marvel-border cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${colorClass} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="font-tech text-[10px] tracking-[0.3em] text-primary uppercase mb-1">
            {role}
          </p>
          <h3 className="font-display text-3xl tracking-wider text-foreground">
            {name}
          </h3>
          <div className="w-0 group-hover:w-full h-[1px] bg-primary/60 transition-all duration-500 mt-3" />
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-6 h-6 border-r border-t border-primary/60" />
        </div>
      </div>
    </motion.div>
  );
};

export default HeroCard;
