import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
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
      title: "The Future of Sustainable Construction",
      description: "Welcome to Carbioo AI, the world's first AI-powered platform designed to revolutionize how we choose construction materials.",
      highlight: "Industry First",
      color: "from-emerald-500 to-green-600",
    },
    {
      icon: Scan,
      title: "AI-Powered Material Recognition",
      description: "Upload a photo of any construction material, and our AI instantly identifies it and calculates its carbon footprint.",
      highlight: "Instant Analysis",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: BarChart3,
      title: "Smarter, Greener Alternatives",
      description: "Get intelligent recommendations for eco-friendly materials that meet your structural requirements.",
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

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      nextSlide();
    } else if (info.offset.x > threshold) {
      prevSlide();
    }
  };

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
    const interval = setInterval(nextSlide, 6000);
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
          <DialogDescription>Join the waitlist for the future of sustainable construction</DialogDescription>
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
          
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-emerald-500/10 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 overflow-y-auto max-h-[85vh]">
            <div className="p-4 sm:p-6 text-center">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs sm:text-sm font-medium mb-4"
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                Welcome to the Future
              </motion.div>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
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
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center cursor-grab active:cursor-grabbing touch-pan-y"
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${slides[currentSlide].color} p-0.5`}>
                  <div className="w-full h-full rounded-xl sm:rounded-2xl bg-slate-900 flex items-center justify-center">
                    {(() => {
                      const Icon = slides[currentSlide].icon;
                      return <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />;
                    })()}
                  </div>
                </div>
                
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3 bg-gradient-to-r ${slides[currentSlide].color} text-white`}>
                  {slides[currentSlide].highlight}
                </span>
                
                <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                  {slides[currentSlide].title}
                </h2>
                
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                  {slides[currentSlide].description}
                </p>
              </motion.div>
              
              <p className="text-center text-[10px] text-slate-500 mt-2 sm:hidden">
                Swipe to explore
              </p>
            </div>

            <div className="flex justify-center items-center gap-3 py-3">
              <button
                onClick={prevSlide}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                data-testid="button-carousel-prev"
              >
                <ChevronLeft className="w-4 h-4 text-white/70" />
              </button>
              
              <div className="flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-primary w-5"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                    data-testid={`button-carousel-dot-${index}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                data-testid="button-carousel-next"
              >
                <ChevronRight className="w-4 h-4 text-white/70" />
              </button>
            </div>

            <div className="p-4 sm:p-6 pt-2">
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                {[
                  { icon: Globe, label: "Global Database" },
                  { icon: Zap, label: "Instant Results" },
                  { icon: Leaf, label: "Carbon Neutral" },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5"
                  >
                    <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <span className="text-[10px] sm:text-xs text-slate-400 text-center leading-tight">{feature.label}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col gap-2"
              >
                <Button
                  onClick={handleJoinWaitlist}
                  size="lg"
                  className="w-full h-10 sm:h-11 text-base sm:text-lg bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 shadow-lg shadow-primary/30"
                >
                  Join the Waitlist <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleClose}
                  className="text-slate-400 hover:text-white text-sm"
                >
                  Maybe Later
                </Button>
              </motion.div>
              
              <p className="text-center text-[10px] sm:text-xs text-slate-500 mt-3">
                Be among the first to experience sustainable construction
              </p>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
