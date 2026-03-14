import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import imgIronMan from "@/assets/heroes/iron-man.jpg";
import imgThor from "@/assets/heroes/thor.jpg";
import imgBlackWidow from "@/assets/heroes/black-widow.jpg";
import imgDoctorStrange from "@/assets/heroes/doctor-strange.jpg";
import imgSpiderMan from "@/assets/heroes/spider-man.jpg";
import imgBlackPanther from "@/assets/heroes/black-panther.jpg";
import imgCaptainAmerica from "@/assets/heroes/captain-america.jpg";
import imgScarletWitch from "@/assets/heroes/scarlet-witch.jpg";

const characters = [
  { name: "Iron Man", role: "Tech Genius", image: imgIronMan, color: "from-primary/60" },
  { name: "Thor", role: "God of Thunder", image: imgThor, color: "from-glow-blue/60" },
  { name: "Black Widow", role: "Master Spy", image: imgBlackWidow, color: "from-accent/60" },
  { name: "Doctor Strange", role: "Sorcerer Supreme", image: imgDoctorStrange, color: "from-secondary/60" },
  { name: "Spider-Man", role: "Friendly Neighbor", image: imgSpiderMan, color: "from-primary/60" },
  { name: "Black Panther", role: "King of Wakanda", image: imgBlackPanther, color: "from-secondary/60" },
  { name: "Captain America", role: "First Avenger", image: imgCaptainAmerica, color: "from-glow-blue/60" },
  { name: "Scarlet Witch", role: "Reality Warper", image: imgScarletWitch, color: "from-primary/60" },
];

const CharacterCard = ({ character, index }: { character: typeof characters[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative overflow-hidden rounded-sm marvel-border cursor-pointer"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="eager"
          decoding="async"
          fetchPriority={index < 2 ? "high" : "auto"}
        />
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${character.color} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="font-tech text-[10px] tracking-[0.3em] text-primary uppercase mb-1">
            {character.role}
          </p>
          <h3 className="font-display text-3xl tracking-wider text-foreground">
            {character.name}
          </h3>
          {/* Reveal line */}
          <div className="w-0 group-hover:w-full h-[1px] bg-primary/60 transition-all duration-500 mt-3" />
        </div>

        {/* Corner accent */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-6 h-6 border-r border-t border-primary/60" />
        </div>
      </div>
    </motion.div>
  );
};

const CharacterShowcase = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-50px" });

  return (
    <section id="heroes" className="relative py-32 px-6 md:px-12">
      {/* Section header */}
      <div ref={titleRef} className="max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-tech text-[11px] tracking-[0.5em] text-primary uppercase mb-4">
            Earth's Mightiest
          </p>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground">
            THE HEROES
          </h2>
          <div className="w-24 h-[2px] bg-primary/60 mt-4" />
        </motion.div>
      </div>

      {/* Character grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {characters.map((character, index) => (
          <CharacterCard key={character.name} character={character} index={index} />
        ))}
      </div>
    </section>
  );
};

export default CharacterShowcase;
