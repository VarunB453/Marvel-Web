import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import Index from "./pages/Index";
import HeroesPage from "./pages/HeroesPage";
import VillainsPage from "./pages/VillainsPage";
import UniversePage from "./pages/UniversePage";
import SagaPage from "./pages/SagaPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const GlobalAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playAudio = (e: MouseEvent) => {
      // Don't prevent default for left clicks, only for right clicks if desired, 
      // but user only said "play audio" on both clicks.
      if (e.type === "contextmenu") {
        e.preventDefault();
      }

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(err => {
          console.warn("Audio playback failed (usually requires user interaction):", err);
        });
      }
    };

    window.addEventListener("contextmenu", playAudio);

    return () => {
      window.removeEventListener("contextmenu", playAudio);
    };
  }, []);

  return <audio ref={audioRef} src="/audio/iron-man.mp3" preload="auto" />;
};

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/heroes" element={<HeroesPage />} />
        <Route path="/villains" element={<VillainsPage />} />
        <Route path="/universe" element={<UniversePage />} />
        <Route path="/saga" element={<SagaPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <GlobalAudio />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
