import { useState, useEffect } from "react";
import { WaitlistModal } from "@/components/waitlist-modal";
import { WelcomePopup } from "@/components/welcome-popup";
import heroImage from "@assets/generated_images/hero_image_for_sustainable_construction_app.png";
import { motion } from "framer-motion";
import { 
  Building2, BarChart3, Menu, Leaf, ArrowRight,
  Zap, Globe, Sparkles, Calendar, CheckCircle2, Info
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Landing() {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState<{type: string; message: string} | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const verification = params.get('verification');
    if (verification) {
      const messages: Record<string, {type: string; message: string}> = {
        success: { type: 'success', message: 'Email verified! Welcome to the waitlist.' },
        expired: { type: 'error', message: 'Verification link expired. Please try again.' },
        invalid: { type: 'error', message: 'Invalid verification link.' },
        already: { type: 'info', message: 'Your email is already verified.' },
        error: { type: 'error', message: 'Something went wrong. Please try again.' },
      };
      setVerificationMessage(messages[verification] || null);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const problemPoints = [
    "Construction creates 39% of global carbon emissions",
    "Finding green material data is slow and difficult",
    "Comparing sustainable options often takes too much time",
    "Most builders lack easy tools to make better choices",
  ];

  const solutionPoints = [
    { title: "Fast Analysis", desc: "Know exactly what you're building with in seconds", icon: Zap },
    { title: "Smart Recognition", desc: "Our AI identifies materials automatically", icon: Sparkles },
    { title: "Green Choices", desc: "Find better alternatives that match your needs", icon: Leaf },
    { title: "Verified Data", desc: "Trust info from certified global sources", icon: Globe },
  ];

  const features = [
    { icon: Zap, title: "Know Your Materials", desc: "Identify what you use instantly with our smart scanning tool." },
    { icon: BarChart3, title: "Carbon Tracking", desc: "See your project's environmental footprint as you build." },
    { icon: Leaf, title: "Better Options", desc: "Get recommendations for sustainable materials that actually work." }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <WelcomePopup onJoinWaitlist={() => setShowWaitlistModal(true)} />
      <WaitlistModal open={showWaitlistModal} onOpenChange={setShowWaitlistModal} />

      {verificationMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-lg shadow-lg ${
            verificationMessage.type === 'success' ? 'bg-green-500 text-white' :
            verificationMessage.type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>{verificationMessage.message}</span>
            <button onClick={() => setVerificationMessage(null)} className="ml-2 hover:opacity-70">×</button>
          </div>
        </motion.div>
      )}

      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo linkTo="/" />
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          </div>

          <div className="flex items-center gap-4">
            <Button onClick={() => setShowWaitlistModal(true)} className="hidden sm:flex">
              Join Waitlist <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <SheetHeader className="text-left">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-6">
                  <Link 
                    href="/about" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover-elevate text-foreground"
                  >
                    <Info className="w-5 h-5 text-primary" />
                    <span className="font-medium">About</span>
                  </Link>
                  <div className="border-t my-2" />
                  <Button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowWaitlistModal(true);
                    }}
                    className="w-full"
                  >
                    Join Waitlist <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <main className="relative flex-grow">
        <section className="relative min-h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src={heroImage} alt="Construction Site" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70 md:via-background/90 md:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent md:hidden" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider shadow-sm">
                <Building2 className="w-3 h-3" /> Coming Soon
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold leading-tight text-foreground drop-shadow-sm">
                Build Smarter.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">Build Greener.</span>
              </h1>
              <p className="text-base sm:text-lg text-foreground/90 md:text-muted-foreground max-w-lg font-medium md:font-normal drop-shadow-sm">
                We're creating the first AI platform that helps you choose better construction materials, see their environmental impact, and find sustainable alternatives in seconds.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="h-11 sm:h-12 px-6 sm:px-8 text-base sm:text-lg shadow-lg shadow-primary/20 w-full sm:w-auto"
                  onClick={() => setShowWaitlistModal(true)}
                >
                  <Calendar className="mr-2 w-4 h-4" />
                  Join the Waitlist
                </Button>
                <Link href="/about" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-11 sm:h-12 px-6 sm:px-8 text-base sm:text-lg group w-full bg-background/50 backdrop-blur-sm"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-foreground/80 md:text-muted-foreground pt-2 font-medium md:font-normal drop-shadow-sm">
                Launching Q1 2026 - Get early access by joining the waitlist
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 sm:py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
                  The Challenge
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 sm:mb-6">
                  Construction creates massive carbon emissions
                </h2>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                  Building projects are responsible for nearly 40% of global carbon emissions. Today, it's too hard for professionals to make quick, informed choices about better materials.
                </p>
                <ul className="space-y-4">
                  {problemPoints.map((point, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-400 text-sm">✕</span>
                      </div>
                      <span className="text-slate-300">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                  Our Goal
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 sm:mb-6">
                  Carbioo AI is the solution
                </h2>
                <p className="text-slate-300 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                  We're building a platform that makes finding sustainable materials fast and clear for everyone in the construction world.
                </p>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {solutionPoints.map((point, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white/5 rounded-xl p-4 border border-white/10"
                    >
                      <point.icon className="w-8 h-8 text-primary mb-3" />
                      <h4 className="font-bold mb-1">{point.title}</h4>
                      <p className="text-sm text-slate-400">{point.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary/20 py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold mb-4">What We're Building</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Tools built to help you make better environmental choices on every project.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <Card key={i} className="bg-background border-none shadow-lg hover:-translate-y-2 transition-transform duration-300">
                  <CardContent className="pt-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary mx-auto">
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold font-display text-xl mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-r from-primary/10 via-primary/5 to-emerald-500/10">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-bold mb-6">
                <Sparkles className="w-4 h-4" /> Coming Soon
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Be part of the change
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Carbioo AI launches in early 2026. Join our waitlist to get early access and help us build a greener future for construction.
              </p>
              <Button 
                size="lg" 
                className="h-14 px-10 text-lg shadow-xl shadow-primary/30"
                onClick={() => setShowWaitlistModal(true)}
              >
                <Calendar className="mr-2 w-5 h-5" />
                Join the Waitlist
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-4">
              <Logo showIcon={true} size="md" linkTo={undefined} />
              <p className="text-slate-400 text-sm leading-relaxed">
                Building the first AI platform for sustainable construction materials.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-slate-500 text-sm">
            &copy; {currentYear} Carbioo AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}