import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const phases = [
  {
    phase: "Phase One",
    year: "2008 — 2012",
    title: "ASSEMBLY",
    description: "The birth of the MCU. Tony Stark builds the Iron Man suit, Steve Rogers emerges from the ice, and Thor descends from Asgard. Six heroes unite to repel an alien invasion — and the Avengers are born.",
    films: ["Iron Man", "The Incredible Hulk", "Thor", "Captain America", "The Avengers"],
    accent: "primary",
  },
  {
    phase: "Phase Two",
    year: "2013 — 2015",
    title: "EXPANSION",
    description: "The universe deepens. The Dark World threatens reality, the Winter Soldier shatters SHIELD, and the Guardians defend the galaxy. Ultron rises and falls — but at a cost no one foresaw.",
    films: ["Iron Man 3", "Thor: The Dark World", "Winter Soldier", "Guardians of the Galaxy", "Age of Ultron", "Ant-Man"],
    accent: "secondary",
  },
  {
    phase: "Phase Three",
    year: "2016 — 2019",
    title: "INFINITY",
    description: "Civil war fractures the Avengers. New champions rise in Wakanda and the mystic arts. Then Thanos arrives, collects all six Infinity Stones, and snaps half the universe from existence. The surviving heroes mount one final, desperate time heist.",
    films: ["Civil War", "Doctor Strange", "Black Panther", "Infinity War", "Endgame", "Spider-Man: Far From Home"],
    accent: "primary",
  },
  {
    phase: "Phase Four",
    year: "2021 — 2022",
    title: "MULTIVERSE",
    description: "The multiverse cracks open. Variants, timelines, and alternate realities collide. New heroes emerge from the Eternals to Shang-Chi, while Wanda's grief rewrites reality and the Multiverse of Madness begins.",
    films: ["Shang-Chi", "Eternals", "No Way Home", "Multiverse of Madness", "Love and Thunder"],
    accent: "secondary",
  },
  {
    phase: "Phase Five & Six",
    year: "2023 — Present",
    title: "THE SAGA CONTINUES",
    description: "Kang's shadow looms across timelines. The Thunderbolts assemble in moral gray zones, the Fantastic Four arrive, and the stage is set for Secret Wars — the ultimate collision of every reality.",
    films: ["Quantumania", "Guardians Vol. 3", "The Marvels", "Deadpool & Wolverine", "Thunderbolts*"],
    accent: "primary",
  },
];

const TimelineSection = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-50px" });

  return (
    <section className="relative py-32 px-6 md:px-12 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/30 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="font-tech text-[11px] tracking-[0.5em] text-primary uppercase mb-4">
              The Complete Saga
            </p>
            <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground">
              THE TIMELINE
            </h2>
            <div className="w-24 h-[2px] bg-primary/60 mx-auto mt-4" />
          </motion.div>
        </div>

        <div className="space-y-6 lg:space-y-0">
          {phases.map((phase, i) => (
            <TimelineItem key={phase.title} phase={phase} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ phase, index }: { phase: typeof phases[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;
  const accentColor = phase.accent === "primary" ? "text-primary" : "text-secondary";
  const borderColor = phase.accent === "primary" ? "border-primary/20 hover:border-primary/40" : "border-secondary/20 hover:border-secondary/40";
  const dotColor = phase.accent === "primary" ? "bg-primary" : "bg-secondary";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`relative lg:grid lg:grid-cols-2 lg:gap-16 lg:py-12 ${isLeft ? "" : "lg:direction-rtl"}`}
    >
      {/* Timeline dot */}
      <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className={`w-4 h-4 rounded-full ${dotColor} shadow-lg`} />
        <div className={`absolute inset-0 w-4 h-4 rounded-full ${dotColor} animate-ping opacity-30`} />
      </div>

      <div className={`${isLeft ? "lg:pr-16 lg:text-right" : "lg:col-start-2 lg:pl-16 lg:text-left"}`}>
        <div className={`border ${borderColor} bg-card/30 backdrop-blur-sm p-8 transition-colors duration-500`}>
          <div className={`flex items-center gap-4 mb-4 ${isLeft ? "lg:justify-end" : "lg:justify-start"}`}>
            <span className="font-tech text-[9px] tracking-[0.3em] text-muted-foreground uppercase">
              {phase.phase}
            </span>
            <span className={`font-tech text-[9px] tracking-[0.2em] ${accentColor}`}>
              {phase.year}
            </span>
          </div>

          <h3 className={`font-display text-4xl md:text-5xl tracking-wider ${accentColor} mb-4`}>
            {phase.title}
          </h3>

          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
            {phase.description}
          </p>

          <div className={`flex flex-wrap gap-2 ${isLeft ? "lg:justify-end" : "lg:justify-start"}`}>
            {phase.films.map((film) => (
              <span
                key={film}
                className="font-tech text-[8px] tracking-[0.15em] text-muted-foreground/70 uppercase px-3 py-1.5 border border-border/30 bg-background/50"
              >
                {film}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineSection;
