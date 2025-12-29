import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  Scan, 
  BarChart3, 
  ArrowRight, 
  Sparkles, 
  Building2,
  Globe,
  Zap,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface WelcomePopupProps {
  onJoinWaitlist: () => void;
}

const WELCOME_SHOWN_KEY = "carbioo_welcome_shown";

export function WelcomePopup({ onJoinWaitlist }: WelcomePopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Leaf,
      title: "Sustainable Building",
      description: "Carbioo AI helps you choose better construction materials for a greener planet.",
      highlight: "New Platform",
      color: "from-emerald-500 to-green-600",
    },
    {
      icon: Scan,
      title: "Smart Recognition",
      description: "Upload a photo and our AI identifies materials and their environmental impact instantly.",
      highlight: "Fast Results",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: BarChart3,
      title: "Better Alternatives",
      description: "Find eco-friendly materials that match your project's needs perfectly.",
      highlight: "Data-Driven",
      color: "from-violet-500 to-purple-600",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem(WELCOME_SHOWN_KEY);
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isOpen, nextSlide]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(WELCOME_SHOWN_KEY, "true");
  };

  const handleJoinWaitlist = () => {
    handleClose();
    onJoinWaitlist();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-[500px] max-h-[90vh] p-0 overflow-hidden border-0 bg-transparent shadow-2xl">
        <VisuallyHidden.Root>
          <DialogTitle>Welcome to Carbioo AI</DialogTitle>
          <DialogDescription>Join the waitlist for sustainable construction</DialogDescription>
        </VisuallyHidden.Root>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-2xl overflow-hidden"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          
          <div className="relative z-10 overflow-y-auto max-h-[85vh]">
            <div className="p-4 sm:p-6 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Carbioo<span className="text-primary">AI</span>
                </span>
              </motion.div>
            </div>

            <div className="px-4 sm:px-6 pb-2 relative">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center"
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${slides[currentSlide].color} p-0.5`}>
                  <div className="w-full h-full rounded-xl sm:rounded-2xl bg-slate-900 flex items-center justify-center">
                    {(() => {
                      const Icon = slides[currentSlide].icon;
                      return <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />;
                    })()}
                  </div>
                </div>
                
                <h2 className="text-lg sm:text-xl font-bold text-white mb-2 leading-tight">
                  {slides[currentSlide].title}
                </h2>
                
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                  {slides[currentSlide].description}
                </p>
              </motion.div>
            </div>

            <div className="flex justify-center items-center gap-3 py-3">
              <button onClick={prevSlide} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <ChevronLeft className="w-4 h-4 text-white/70" />
              </button>
              <div className="flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-primary w-5" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
              <button onClick={nextSlide} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <ChevronRight className="w-4 h-4 text-white/70" />
              </button>
            </div>

            <div className="p-4 sm:p-6 pt-2">
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                {[
                  { icon: Globe, label: "Global Info" },
                  { icon: Zap, label: "Fast Results" },
                  { icon: Leaf, label: "Eco Friendly" },
                ].map((feature, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-white/5">
                    <feature.icon className="w-4 h-4 text-primary" />
                    <span className="text-[10px] sm:text-xs text-slate-400 text-center leading-tight">{feature.label}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleJoinWaitlist}
                  size="lg"
                  className="w-full h-10 sm:h-11 text-base sm:text-lg bg-gradient-to-r from-primary to-emerald-600 shadow-lg shadow-primary/30"
                >
                  Join the Waitlist <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}