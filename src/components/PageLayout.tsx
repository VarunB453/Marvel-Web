import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";   // ← ADD AnimatePresence
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleField from "@/components/ParticleField";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeOut" } },
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
      <AnimatePresence mode="wait">                        
        <motion.main
          key="page-main"                                    
          className="relative z-[2]"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.main>
      </AnimatePresence>                                     
      {showFooter && <Footer />}
    </div>
  );
};

export default PageLayout;
