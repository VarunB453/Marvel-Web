import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const moments = [
  {
    quote: "I am Iron Man.",
    character: "Tony Stark",
    film: "Avengers: Endgame",
    year: "2019",
    context: "The snap that saved the universe — and cost a hero everything.",
  },
  {
    quote: "I can do this all day.",
    character: "Steve Rogers",
    film: "Captain America: The First Avenger",
    year: "2011",
    context: "The defiant spirit of a man too stubborn to stay down, no matter the odds.",
  },
  {
    quote: "We have a Hulk.",
    character: "Tony Stark",
    film: "The Avengers",
    year: "2012",
    context: "A warning to the God of Mischief — Earth's mightiest trump card.",
  },
  {
    quote: "Wakanda Forever.",
    character: "T'Challa",
    film: "Black Panther",
    year: "2018",
    context: "A king's battle cry that became a symbol of pride, power, and legacy.",
  },
  {
    quote: "You should have gone for the head.",
    character: "Thanos",
    film: "Avengers: Infinity War",
    year: "2018",
    context: "The moment the heroes realized they had already lost.",
  },
  {
    quote: "Avengers… Assemble.",
    character: "Steve Rogers",
    film: "Avengers: Endgame",
    year: "2019",
    context: "Two words, whispered on the battlefield, that united every hero across the universe.",
  },
];

const IconicMomentsSection = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-50px" });

  return (
    <section className="relative py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="font-tech text-[11px] tracking-[0.5em] text-secondary uppercase mb-4">
              Words That Echo
            </p>
            <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground">
              ICONIC MOMENTS
            </h2>
            <div className="w-24 h-[2px] bg-secondary/60 mt-4" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {moments.map((moment, i) => (
            <MomentCard key={moment.quote} moment={moment} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const MomentCard = ({ moment, index }: { moment: typeof moments[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative border border-border/20 hover:border-primary/30 bg-card/20 backdrop-blur-sm p-8 md:p-10 transition-all duration-500"
    >
      {/* Quote mark */}
      <div className="absolute top-4 right-6 font-display text-8xl text-primary/10 leading-none select-none pointer-events-none">
        "
      </div>

      <div className="relative z-10">
        <p className="font-display text-3xl md:text-4xl tracking-wider text-foreground leading-tight mb-6 group-hover:text-primary transition-colors duration-500">
          "{moment.quote}"
        </p>

        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
          {moment.context}
        </p>

        <div className="flex items-center justify-between border-t border-border/20 pt-4">
          <div>
            <p className="font-tech text-[10px] tracking-[0.2em] text-foreground/80 uppercase">
              {moment.character}
            </p>
            <p className="font-tech text-[8px] tracking-[0.2em] text-muted-foreground uppercase mt-1">
              {moment.film}
            </p>
          </div>
          <span className="font-tech text-[9px] tracking-[0.2em] text-primary/60">
            {moment.year}
          </span>
        </div>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default IconicMomentsSection;
