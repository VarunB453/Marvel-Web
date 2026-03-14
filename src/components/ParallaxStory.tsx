import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import parallaxBg from "@/assets/parallax-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const ParallaxStory = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current) return;

    gsap.to(imageRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="saga" ref={sectionRef} className="relative overflow-hidden py-0">
      {/* Parallax background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src={parallaxBg}
          alt="Epic battle scene"
          className="w-full h-[140%] object-cover will-change-transform"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - big text */}
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="font-tech text-[11px] tracking-[0.5em] text-secondary uppercase mb-6">
              The Infinity Saga
            </p>
            <h2 className="font-display text-6xl md:text-8xl leading-none tracking-wider text-foreground mb-6">
              EVERY
              <br />
              <span className="text-gradient-marvel">LEGEND</span>
              <br />
              HAS A STORY
            </h2>
            <p className="font-body text-muted-foreground max-w-md leading-relaxed">
              From the dawn of creation to the edges of the multiverse, 
              heroes rise to protect what matters most. Their stories 
              intertwine across time and space.
            </p>
          </motion.div>

          {/* Right - stats */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-8"
          >
            {[
              { number: "8,000+", label: "Characters" },
              { number: "35", label: "Films Released" },
              { number: "∞", label: "Universes" },
            ].map((stat, i) => (
              <div key={stat.label} className="marvel-border p-6 bg-background/30 backdrop-blur-sm">
                <p className="font-display text-5xl md:text-6xl text-gradient-marvel">{stat.number}</p>
                <p className="font-tech text-[10px] tracking-[0.3em] text-muted-foreground uppercase mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxStory;
