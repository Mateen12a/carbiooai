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
        success: { type: 'success', message: 'Email verified. Welcome.' },
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
    "Buildings account for nearly 40 percent of global carbon emissions",
    "Most people do not know what materials they are really using",
    "Sustainable choices are hard to compare and understand",
    "Better decisions often come too late in the building process",
  ];

  const solutionPoints = [
    { title: "Clear Insight", desc: "Understand what materials are being used at a glance", icon: Zap },
    { title: "Smart Recognition", desc: "Materials identified automatically from images and data", icon: Sparkles },
    { title: "Greener Options", desc: "Discover better alternatives that fit real world needs", icon: Leaf },
    { title: "Trusted Sources", desc: "Built using reliable global sustainability data", icon: Globe },
  ];

  const features = [
    { icon: Zap, title: "See What You Are Building With", desc: "Get clarity on materials used across any project or space." },
    { icon: BarChart3, title: "Understand Environmental Impact", desc: "Visualise carbon impact in a way that is simple and clear." },
    { icon: Leaf, title: "Make Better Choices", desc: "Explore lower impact alternatives without the guesswork." }
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
          </div>
        </div>
      </nav>

      <main className="relative flex-grow">
        <section className="relative min-h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src={heroImage} alt="Construction Site" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70 md:to-transparent" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div className="max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase">
                <Building2 className="w-3 h-3" /> Coming Soon
              </div>

              <h1 className="text-4xl md:text-7xl font-display font-bold leading-tight">
                Build Smarter.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">
                  Build Greener.
                </span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg">
                Carbioo AI is building a new way to understand construction materials, their impact on the planet, and how we can make better choices from the start.
              </p>

              <div className="flex gap-4 pt-4">
                <Button size="lg" onClick={() => setShowWaitlistModal(true)}>
                  <Calendar className="mr-2 w-4 h-4" />
                  Join the Waitlist
                </Button>
                <Link href="/about">
                  <Button size="lg" variant="outline">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-muted-foreground">
                Launching Q1 2026. Early access available.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-display font-bold mb-6">
                The way we build affects the future
              </h2>
              <ul className="space-y-4 text-slate-300">
                {problemPoints.map((p, i) => (
                  <li key={i} className="flex gap-3">
                    <span>✕</span> {p}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-display font-bold mb-6">
                What Carbioo AI aims to change
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {solutionPoints.map((s, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-xl">
                    <s.icon className="w-6 h-6 text-primary mb-2" />
                    <h4 className="font-bold">{s.title}</h4>
                    <p className="text-sm text-slate-400">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold mb-4">
              What We Are Building
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {features.map((f, i) => (
                <Card key={i}>
                  <CardContent className="text-center pt-8">
                    <f.icon className="w-8 h-8 mx-auto text-primary mb-4" />
                    <h3 className="font-bold text-xl mb-2">{f.title}</h3>
                    <p className="text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-primary/10 text-center">
          <h2 className="text-4xl font-display font-bold mb-6">
            Join us early
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            We are building Carbioo AI openly. Join the waitlist and be part of what comes next.
          </p>
          <Button size="lg" onClick={() => setShowWaitlistModal(true)}>
            Join the Waitlist
          </Button>
        </section>
      </main>

      <footer className="py-12 bg-slate-950 text-center text-slate-500">
        © {currentYear} Carbioo AI. All rights reserved.
      </footer>
    </div>
  );
}
