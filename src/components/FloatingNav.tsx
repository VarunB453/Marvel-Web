import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = ["Universe", "Heroes", "Saga", "Contact"];

const FloatingNav = () => {
  const [visible, setVisible] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setVisible(current > 300);
      setLastScroll(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <>
      {/* Top bar - always visible */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between mix-blend-difference">
        <div className="font-display text-2xl tracking-wider text-foreground">
          MARVEL
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-tech text-[11px] tracking-[0.2em] text-foreground/70 hover:text-foreground transition-colors uppercase"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Floating pill nav */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-marvel-dark/80 backdrop-blur-xl border border-primary/20 rounded-full px-6 py-3 flex items-center gap-6"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-tech text-[10px] tracking-[0.15em] text-foreground/60 hover:text-primary transition-colors uppercase"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNav;
