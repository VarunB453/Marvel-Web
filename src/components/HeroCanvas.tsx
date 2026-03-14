import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Volume2, VolumeX, Eye, EyeOff } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const playerRef = useRef<any>(null);

  const [muted, setMuted] = useState(true);
  const [cinematicMode, setCinematicMode] = useState(false);

  const START_TIME = 70;
  const END_TIME = 142;

  const toggleMute = useCallback(() => {
    setMuted((prev) => !prev);
    
    if (playerRef.current && typeof playerRef.current.mute === 'function') {
      if (!muted) { // If it was unmuted, it will now be muted
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
      }
    }
  }, [muted]);

  /* GSAP SCROLL EFFECT */
  useEffect(() => {
    if (!containerRef.current || !overlayRef.current || !textRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
    });

    tl.to(overlayRef.current, { opacity: 0.8, ease: "none" }, 0);
    tl.to(textRef.current, { y: -120, opacity: 0, ease: "none" }, 0);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  /* YOUTUBE PLAYER */
  useEffect(() => {
  const START_TIME = 70;
  const END_TIME = 142;

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);

  let loopCheck: any;

  (window as any).onYouTubeIframeAPIReady = () => {
    playerRef.current = new (window as any).YT.Player("yt-player", {
      videoId: "gzwdOh7b9eg",
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        mute: 1,
        start: START_TIME,
        playsinline: 1,
      },
      events: {
        onReady: (event: any) => {
          event.target.setPlaybackQuality("hd2160"); // request 4K
          event.target.seekTo(START_TIME);
          event.target.playVideo();

          loopCheck = setInterval(() => {
            const time = event.target.getCurrentTime();

            if (time >= END_TIME) {
              event.target.seekTo(START_TIME, true);
            }
          }, 100); // fast check for smooth loop
        },
      },
    });
  };

  return () => {
    if (loopCheck) clearInterval(loopCheck);
  };
}, []);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* YouTube Background */}
        <div
          ref={videoRef}
          className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-700"
          style={{
            transform: "scale(1)",
            filter: cinematicMode
              ? "brightness(1.5) contrast(1.2) saturate(1.1)"
              : "brightness(1)",
          }}
        >
          <div
            id="yt-player"
            className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>

        {/* CINEMATIC OVERLAY */}
        <div
          className={`transition-all duration-1000 ${cinematicMode
            ? "opacity-0 invisible pointer-events-none scale-105"
            : "opacity-100 visible"
            }`}
        >
          <div ref={overlayRef} className="absolute inset-0 bg-background/50 z-[1]" />

          <div className="absolute inset-0 bg-primary/10 z-[2] mix-blend-multiply" />

          <div
            className="absolute inset-0 z-[3]"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, hsl(var(--background)) 100%)",
            }}
          />
        </div>

        {/* UI CONTROLS */}
        <div className="absolute bottom-8 right-8 z-20 flex gap-4">
          <button
            onClick={() => setCinematicMode(!cinematicMode)}
            className="p-2 rounded-full bg-background/60 backdrop-blur-sm border border-primary/30"
          >
            {cinematicMode ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5 text-primary" />
            )}
          </button>

          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-background/60 backdrop-blur-sm border border-primary/30"
          >
            {muted ? (
              <VolumeX className="w-5 h-5 text-primary" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* HERO TEXT */}
        <div
          ref={textRef}
          className={`absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none transition-all duration-700 ${cinematicMode
            ? "opacity-0 invisible scale-95"
            : "opacity-100 visible scale-100"
            }`}
        >
          <div className="text-center px-4">
            <p className="font-tech text-xs md:text-sm tracking-[0.5em] text-marvel-gold mb-4 glow-text-gold opacity-80 uppercase">
              The Multiverse Awaits
            </p>

            <h1 className="font-display text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem] leading-none tracking-wider text-foreground glow-text-red">
              MARVEL
            </h1>

            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl tracking-[0.3em] text-marvel-gold/80 mt-2">
              UNIVERSE
            </h2>

            <p className="font-body text-muted-foreground text-sm md:text-base mt-6 max-w-md mx-auto">
              Experience the cinematic saga like never before
            </p>
          </div>
        </div>

        {/* Corner UI elements */}
        <div className={`absolute top-6 left-6 z-10 transition-opacity duration-700 ${cinematicMode ? 'opacity-0' : 'opacity-100'}`}>
          <div className="w-8 h-8 border-l-2 border-t-2 border-primary/40" />
        </div>
        <div className={`absolute top-6 right-6 z-10 transition-opacity duration-700 ${cinematicMode ? 'opacity-0' : 'opacity-100'}`}>
          <div className="w-8 h-8 border-r-2 border-t-2 border-primary/40" />
        </div>
        <div className={`absolute bottom-6 left-6 z-10 transition-opacity duration-700 ${cinematicMode ? 'opacity-0' : 'opacity-100'}`}>
          <div className="w-8 h-8 border-l-2 border-b-2 border-primary/40" />
        </div>
        <div className={`absolute bottom-6 right-6 z-10 transition-opacity duration-700 ${cinematicMode ? 'opacity-0' : 'opacity-100'}`}>
          <div className="w-8 h-8 border-r-2 border-b-2 border-primary/40" />
        </div>
      </div>
    </div>
  );
};

export default HeroCanvas;