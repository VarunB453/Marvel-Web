import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Heroes", path: "/heroes" },
    { label: "Universe", path: "/universe" },
    { label: "Saga", path: "/saga" },
    { label: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { label: "GitHub", href: "https://github.com/VarunB453" },
    { label: "Instagram", href: "https://www.instagram.com/varunn_b_/" },
    { label: "Twitter / X", href: "https://x.com/B__Varun453" },
    { label: "Discord", href: "https://discord.gg/Varunb453" },
  ];

  return (
    <footer ref={ref} className="relative z-[2] overflow-hidden">
      {/* Big CTA banner */}
      <div className="relative py-28 px-6 md:px-12 border-t border-border/10">
        {/* Glow backdrop */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <p className="font-tech text-[10px] tracking-[0.5em] text-primary uppercase mb-6">
            Join the Multiverse
          </p>
          <h2 className="font-display text-5xl sm:text-6xl md:text-[7rem] leading-[0.9] tracking-wider text-foreground">
            READY TO
            <br />
            <span className="text-gradient-marvel">ASSEMBLE</span>?
          </h2>
          <p className="font-body text-muted-foreground mt-6 max-w-md mx-auto leading-relaxed">
            Subscribe for transmissions from across the multiverse. New heroes, stories, and events — delivered.
          </p>

          {/* Email input */}
          {!subscribed ? (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 w-full sm:w-auto bg-muted/30 border border-border/40 px-5 py-3.5 font-body text-sm text-foreground outline-none focus:border-primary/60 transition-colors placeholder:text-muted-foreground/40"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 py-3.5 bg-primary/20 border border-primary/50 font-tech text-[10px] tracking-[0.3em] text-primary uppercase hover:bg-primary/30 transition-colors glow-red"
              >
                Subscribe
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10"
            >
              <p className="font-tech text-[11px] tracking-[0.3em] text-primary uppercase">
                ✦ Transmission Confirmed
              </p>
              <p className="font-body text-sm text-muted-foreground mt-2">
                Welcome to the universe, {email.split("@")[0]}.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Main footer grid */}
      <div className="border-t border-border/10 px-6 md:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
              {/* Brand */}
              <div className="col-span-2 md:col-span-1">
                <Link to="/" className="inline-block group">
                  <span className="font-display text-3xl tracking-wider text-foreground group-hover:text-primary transition-colors">
                    MARVEL
                  </span>
                </Link>
                <p className="font-body text-sm text-muted-foreground mt-4 max-w-[240px] leading-relaxed">
                  A cinematic web experience exploring the vast multiverse and its heroes.
                </p>
                {/* Decorative line */}
                <div className="w-12 h-[1px] bg-primary/30 mt-6" />
              </div>

              {/* Navigate */}
              <div>
                <p className="font-tech text-[9px] tracking-[0.4em] text-muted-foreground uppercase mb-5">
                  Navigate
                </p>
                <div className="flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="group flex items-center gap-2 font-body text-sm text-foreground/50 hover:text-foreground transition-colors"
                    >
                      <span className="w-0 group-hover:w-3 h-[1px] bg-primary transition-all duration-300" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div>
                <p className="font-tech text-[9px] tracking-[0.4em] text-muted-foreground uppercase mb-5">
                  Connect
                </p>
                <div className="flex flex-col gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="group flex items-center gap-2 font-body text-sm text-foreground/50 hover:text-foreground transition-colors"
                    >
                      <span className="w-0 group-hover:w-3 h-[1px] bg-secondary transition-all duration-300" />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="font-tech text-[9px] tracking-[0.4em] text-muted-foreground uppercase mb-5">
                  Status
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="font-tech text-[10px] tracking-wider text-foreground/60 uppercase">
                    All Systems Online
                  </span>
                </div>
                <p className="font-body text-xs text-muted-foreground/50 leading-relaxed">
                  Multiverse portals active.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/10 px-6 md:px-12 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <p className="font-display text-sm tracking-wider text-muted-foreground/40">
              MARVEL UNIVERSE
            </p>
            <span className="hidden sm:block w-[1px] h-3 bg-border/20" />
            <p className="font-body text-[10px] text-muted-foreground/30">
              © 2026 All rights reserved
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="font-body text-[10px] text-muted-foreground/30 hover:text-muted-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="font-body text-[10px] text-muted-foreground/30 hover:text-muted-foreground transition-colors">
              Terms
            </a>
            <span className="font-tech text-[9px] text-muted-foreground/20 tracking-wider">
              v1.0.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
