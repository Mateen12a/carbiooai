import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  X
} from "lucide-react";

interface WelcomePopupProps {
  onJoinWaitlist: () => void;
}

const WELCOME_SHOWN_KEY = "carbioo_welcome_shown";

export function WelcomePopup({ onJoinWaitlist }: WelcomePopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem(WELCOME_SHOWN_KEY);
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(WELCOME_SHOWN_KEY, "true");
  };

  const handleJoinWaitlist = () => {
    handleClose();
    onJoinWaitlist();
  };

  const slides = [
    {
      icon: Leaf,
      title: "The Future of Sustainable Construction",
      description: "Welcome to Carbioo AI, the world's first AI-powered platform designed to revolutionize how we choose construction materials. We're making sustainable building accessible to everyone.",
      highlight: "Industry First",
      color: "from-emerald-500 to-green-600",
    },
    {
      icon: Scan,
      title: "AI-Powered Material Recognition",
      description: "Simply upload a photo of any construction material, and our advanced AI instantly identifies it, calculates its carbon footprint, and provides detailed environmental data.",
      highlight: "Instant Analysis",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: BarChart3,
      title: "Smarter, Greener Alternatives",
      description: "Get intelligent recommendations for eco-friendly materials that meet your structural requirements while significantly reducing your project's carbon impact.",
      highlight: "Data-Driven Decisions",
      color: "from-violet-500 to-purple-600",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-0 bg-transparent shadow-2xl">
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

          <div className="relative z-10">
            <div className="p-8 text-center">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                Welcome to the Future
              </motion.div>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-3 mb-8"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-bold text-white tracking-tight">
                  Carbioo<span className="text-primary">AI</span>
                </span>
              </motion.div>
            </div>

            <div className="px-8 pb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${slides[currentSlide].color} p-0.5`}>
                    <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
                      {(() => {
                        const Icon = slides[currentSlide].icon;
                        return <Icon className="w-10 h-10 text-white" />;
                      })()}
                    </div>
                  </div>
                  
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-gradient-to-r ${slides[currentSlide].color} text-white`}>
                    {slides[currentSlide].highlight}
                  </span>
                  
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {slides[currentSlide].title}
                  </h2>
                  
                  <p className="text-slate-400 leading-relaxed max-w-md mx-auto">
                    {slides[currentSlide].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-2 py-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-primary w-6"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <div className="p-8 pt-4">
              <div className="grid grid-cols-3 gap-4 mb-6">
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
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5"
                  >
                    <feature.icon className="w-5 h-5 text-primary" />
                    <span className="text-xs text-slate-400">{feature.label}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col gap-3"
              >
                <Button
                  onClick={handleJoinWaitlist}
                  size="lg"
                  className="w-full h-12 text-lg bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 shadow-lg shadow-primary/30"
                >
                  Join the Waitlist <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleClose}
                  className="text-slate-400 hover:text-white"
                >
                  Maybe Later
                </Button>
              </motion.div>
              
              <p className="text-center text-xs text-slate-500 mt-4">
                Be among the first to experience the future of sustainable construction
              </p>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
