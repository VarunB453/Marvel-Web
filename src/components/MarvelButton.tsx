import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MarvelButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

const variantStyles = {
  primary: "border border-primary bg-primary/20 text-primary hover:bg-primary/30 glow-red",
  outline: "border border-primary/40 bg-transparent text-primary hover:bg-primary/10",
  ghost: "border border-border/30 bg-transparent text-foreground/70 hover:text-foreground hover:border-primary/30",
};

const sizeStyles = {
  sm: "px-5 py-2 text-[9px]",
  md: "px-8 py-3 text-[10px]",
  lg: "px-10 py-4 text-[11px]",
};

const MarvelButton = ({ children, variant = "outline", size = "md", className = "", onClick }: MarvelButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`font-tech tracking-[0.3em] uppercase transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default MarvelButton;
