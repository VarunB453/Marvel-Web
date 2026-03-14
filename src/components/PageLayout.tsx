import { ReactNode } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleField from "@/components/ParticleField";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeOut" as const } },
};

interface PageLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

const PageLayout = ({ children, showFooter = true }: PageLayoutProps) => {
  useSmoothScroll();

  return (
    <div className="relative min-h-screen bg-background">
      <ParticleField />
      <Navbar />
      <motion.main
        className="relative z-[2]"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.main>
      {showFooter && <Footer />}
    </div>
  );
};

export default PageLayout;
