import { motion } from "framer-motion";
import type { HeroTeam } from "@/data/heroes";
import { teams } from "@/data/heroes";

interface HeroFilterProps {
  activeTeam: HeroTeam | "All";
  onSelect: (team: HeroTeam | "All") => void;
}

const HeroFilter = ({ activeTeam, onSelect }: HeroFilterProps) => {
  const allFilters: (HeroTeam | "All")[] = ["All", ...teams];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {allFilters.map((team) => (
        <button
          key={team}
          onClick={() => onSelect(team)}
          className="relative font-tech text-[9px] tracking-[0.25em] uppercase px-4 py-2 transition-colors duration-300"
        >
          {activeTeam === team && (
            <motion.div
              layoutId="hero-filter-active"
              className="absolute inset-0 border border-primary/60 bg-primary/10"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className={`relative z-10 ${activeTeam === team ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
            {team}
          </span>
        </button>
      ))}
    </div>
  );
};

export default HeroFilter;
