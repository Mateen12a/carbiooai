import { useState, useEffect } from "react";
import { MaterialScanner } from "@/components/material-scanner";
import { CarbonStats } from "@/components/carbon-stats";
import { AlternativesGrid } from "@/components/alternatives";
import { WaitlistModal } from "@/components/waitlist-modal";
import { WelcomePopup } from "@/components/welcome-popup";
import heroImage from "@assets/generated_images/hero_image_for_sustainable_construction_app.png";
import { motion } from "framer-motion";
import type { ScanResult } from "@/lib/api";
import { 
  Building2, BarChart3, Menu, Scan, Leaf, LogIn, ArrowRight, Quote, Star, Users, 
  LayoutDashboard, User, Settings, LogOut, Clock, Target, Zap, Globe, Shield,
  TrendingDown, Award, CheckCircle2, Sparkles, Calendar
} from "lucide-react";
import { Logo, LogoText } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";

export default function Landing() {
  const [hasScanned, setHasScanned] = useState(false);
  const [scanCount, setScanCount] = useState(0);
  const [lastScanResult, setLastScanResult] = useState<ScanResult | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState<{type: string; message: string} | null>(null);
  const [_, setLocation] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const verification = params.get('verification');
    if (verification) {
      const messages: Record<string, {type: string; message: string}> = {
        success: { type: 'success', message: 'Email verified successfully! Welcome to the Carbioo AI waitlist.' },
        expired: { type: 'error', message: 'Verification link has expired. Please request a new one.' },
        invalid: { type: 'error', message: 'Invalid verification link.' },
        already: { type: 'info', message: 'Your email is already verified.' },
        error: { type: 'error', message: 'Something went wrong. Please try again.' },
      };
      setVerificationMessage(messages[verification] || null);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const handleScanComplete = (result?: ScanResult) => {
    if (result) setLastScanResult(result);
    if (scanCount >= 2) {
      setHasScanned(true);
      setScanCount(prev => prev + 1);
      setTimeout(() => {
        setShowLoginPrompt(true);
      }, 2000);
    } else {
      setHasScanned(true);
      setScanCount(prev => prev + 1);
    }
  };

  const testimonials = [
    {
        name: "Sarah Chen",
        role: "Lead Architect, BuildGreen",
        text: "Carbioo AI has completely transformed our material selection process. We've reduced our projects' embodied carbon by 30% on average.",
        avatar: "SC"
    },
    {
        name: "Marcus Thorne",
        role: "Structural Engineer",
        text: "The accuracy of the material recognition is impressive. It saves us hours of manual documentation during site audits.",
        avatar: "MT"
    },
    {
        name: "Elena Rodriguez",
        role: "Sustainability Consultant",
        text: "Finally, a tool that makes lifecycle assessment accessible. The alternative recommendations are always practical and structurally sound.",
        avatar: "ER"
    }
  ];

  const impactStats = [
    { value: "40%", label: "Average Carbon Reduction", icon: TrendingDown },
    { value: "2.4M+", label: "Materials Analyzed", icon: Scan },
    { value: "12K+", label: "Active Professionals", icon: Users },
    { value: "98%", label: "Recognition Accuracy", icon: Target },
  ];

  const problemPoints = [
    "Construction accounts for 39% of global carbon emissions",
    "Material data is scattered across thousands of sources",
    "Lifecycle assessments take weeks and cost thousands",
    "Green alternatives are hard to find and compare",
  ];

  const solutionPoints = [
    { title: "Instant Analysis", desc: "Upload a photo and get carbon data in seconds", icon: Zap },
    { title: "AI-Powered", desc: "Our models recognize materials with 98% accuracy", icon: Sparkles },
    { title: "Smart Alternatives", desc: "Get eco-friendly substitutes that meet specs", icon: Leaf },
    { title: "Global Database", desc: "Access EPD data from certified sources worldwide", icon: Globe },
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
            <Link href="/features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/">
                  <Button variant="ghost" className="hidden md:flex gap-2">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-9 w-9 border border-primary/20 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
                      <AvatarImage src={user?.avatar} alt={user?.firstName} />
                      <AvatarFallback>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setLocation("/")}>
                      <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setLocation("/profile")}>
                      <User className="mr-2 h-4 w-4" /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setLocation("/settings")}>
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/auth">
                    <Button variant="ghost" className="hidden md:flex">Sign In</Button>
                </Link>
                <Link href="/auth">
                    <Button>Get Started <ArrowRight className="ml-2 w-4 h-4" /></Button>
                </Link>
              </>
            )}
            <Button size="icon" variant="ghost" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="relative flex-grow">
        {!hasScanned && (
          <section className="relative h-[600px] flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img src={heroImage} alt="Construction Site" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-3 h-3" /> The First AI for Sustainable Construction
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight text-foreground">
                  Build Smarter.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">Build Greener.</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  The world's first AI platform that identifies construction materials, calculates their carbon footprint, and recommends sustainable alternatives in seconds.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                    <Button size="lg" className="h-12 px-8 text-lg shadow-lg shadow-primary/20" onClick={() => document.getElementById('scanner-section')?.scrollIntoView({behavior: 'smooth'})}>
                        Try Demo Scanner
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="h-12 px-8 text-lg group"
                      onClick={() => setShowWaitlistModal(true)}
                    >
                      <Calendar className="mr-2 w-4 h-4" />
                      <span>Launching Q1 2025</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        <div id="scanner-section" className={`container mx-auto px-4 ${hasScanned ? 'pt-8' : 'py-24'} relative z-20 pb-20`}>
            {!hasScanned && (
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-display font-bold mb-4">Experience the Power of AI</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Upload or drag and drop a material image to see our analysis engine in action. <br/>You have <span className="font-bold text-primary">{3 - scanCount} free scans</span> remaining.</p>
                </div>
            )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className={`lg:col-span-4 space-y-6 ${!hasScanned ? 'lg:col-start-5' : ''}`}>
              <motion.div layout>
                <MaterialScanner onScanComplete={handleScanComplete} />
              </motion.div>
              
              {hasScanned && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-lg p-6 shadow-sm border border-border"
                >
                  <h3 className="font-bold font-display text-lg mb-4">Detected Properties</h3>
                  {lastScanResult ? (
                    <ul className="space-y-3 text-sm">
                      <li className="flex justify-between py-2 border-b border-border/50 hover:bg-secondary/10 px-2 rounded transition-colors cursor-default group">
                        <span className="text-muted-foreground">Material Type</span>
                        <span className="font-medium group-hover:text-primary transition-colors">{lastScanResult.material.name}</span>
                      </li>
                      <li className="flex justify-between py-2 border-b border-border/50 hover:bg-secondary/10 px-2 rounded transition-colors cursor-default group">
                        <span className="text-muted-foreground">Density</span>
                        <span className="font-medium group-hover:text-primary transition-colors">{lastScanResult.material.density} kg/m³</span>
                      </li>
                      <li className="flex justify-between py-2 border-b border-border/50 hover:bg-secondary/10 px-2 rounded transition-colors cursor-default group">
                        <span className="text-muted-foreground">Thermal Conductivity</span>
                        <span className="font-medium group-hover:text-primary transition-colors">{lastScanResult.material.thermalConductivity ?? '—'}</span>
                      </li>
                      <li className="flex justify-between pt-2 hover:shadow-md p-2 rounded transition-all">
                        <span className="text-muted-foreground">Embodied Carbon</span>
                        <span className={`font-medium flex items-center gap-1 ${lastScanResult.material.embodiedCarbon > 200 ? 'text-destructive' : lastScanResult.material.embodiedCarbon > 100 ? 'text-amber-600' : 'text-green-600'}`}>
                          {lastScanResult.material.embodiedCarbon} kgCO2e/kg
                          {lastScanResult.material.embodiedCarbon > 200 && <AlertTriangleIcon className="w-4 h-4" />}
                        </span>
                      </li>
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">Scan complete — opening detailed results.</p>
                  )}
                </motion.div>
              )}
            </div>

            {hasScanned && (
                <div className="lg:col-span-8">
                    <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                    >
                    <div className="hover:scale-[1.01] transition-transform duration-300">
                      <CarbonStats scanResult={lastScanResult} />
                    </div>
                    <AlternativesGrid scanResult={lastScanResult} />
                    </motion.div>
                </div>
            )}
          </div>
        </div>

         {!hasScanned && (
            <>
                <section className="py-20 bg-slate-900 text-white">
                  <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
                          The Problem
                        </span>
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                          Construction is the World's Largest Carbon Emitter
                        </h2>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                          The built environment is responsible for nearly 40% of global carbon emissions. Yet architects and engineers lack the tools to make informed, data-driven decisions about material sustainability.
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
                          The Solution
                        </span>
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                          Carbioo AI Changes Everything
                        </h2>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                          We've built the world's first AI-powered platform that makes sustainable material selection instant, accurate, and accessible to everyone in construction.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
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

                <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
                  <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                        Real Impact
                      </span>
                      <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Making a Measurable Difference</h2>
                      <p className="text-muted-foreground max-w-2xl mx-auto">Join thousands of professionals already using Carbioo AI to reduce their environmental impact.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {impactStats.map((stat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
                        >
                          <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                          <h3 className="text-4xl font-bold text-primary mb-2">{stat.value}</h3>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>

                <section id="features" className="bg-secondary/20 py-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-display font-bold mb-4">Why Choose Carbioo AI?</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">Comprehensive tools for the modern sustainable architect.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: Scan, title: "Instant Recognition", desc: "Identify materials in seconds with 98% accuracy using our proprietary computer vision models trained on millions of construction images." },
                                { icon: BarChart3, title: "Carbon Analytics", desc: "Real-time footprint calculation and lifecycle analysis to ensure compliance with green building standards like LEED and BREEAM." },
                                { icon: Leaf, title: "Eco Alternatives", desc: "Get AI-recommended sustainable substitutes that match structural requirements but can reduce carbon impact by up to 40%." }
                            ].map((feature, i) => (
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

                <section className="py-16">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8">Trusted by forward-thinking teams at</p>
                        <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="text-2xl font-bold font-display">ARCH<span className="text-primary">STUDIO</span></div>
                            <div className="text-2xl font-bold font-display">BUILD<span className="text-primary">WORKS</span></div>
                            <div className="text-2xl font-bold font-display">GREEN<span className="text-primary">PLAN</span></div>
                            <div className="text-2xl font-bold font-display">URBAN<span className="text-primary">LAB</span></div>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-slate-900 text-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-display font-bold mb-4">What Architects Are Saying</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.map((t, i) => (
                                <Card key={i} className="bg-white/5 border-white/10 text-white">
                                    <CardContent className="pt-8">
                                        <Quote className="w-8 h-8 text-primary mb-4 opacity-50" />
                                        <p className="text-lg leading-relaxed mb-6 text-white/90">"{t.text}"</p>
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarFallback className="text-black font-bold bg-white">{t.avatar}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-bold">{t.name}</p>
                                                <p className="text-sm text-white/60">{t.role}</p>
                                            </div>
                                        </div>
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
                        Be Part of the Revolution
                      </h2>
                      <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                        Carbioo AI is launching in Q1 2025. Join our waitlist to get early access, exclusive updates, and help shape the future of sustainable construction.
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
                      <p className="text-sm text-muted-foreground mt-4">
                        Free early access for waitlist members
                      </p>
                    </motion.div>
                  </div>
                </section>
            </>
         )}

      </main>

      <footer className="bg-slate-950 text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div className="space-y-4">
                    <Logo showIcon={true} size="md" linkTo={undefined} />
                    <p className="text-slate-400 text-sm leading-relaxed">
                        The world's first AI platform for sustainable construction material analysis. Empowering architects to build a greener future.
                    </p>
                </div>
                
                <div>
                    <h4 className="font-bold mb-4">Product</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
                        <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                        <li><Link href="/api" className="hover:text-primary transition-colors">API</Link></li>
                        <li><Link href="/case-studies" className="hover:text-primary transition-colors">Case Studies</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        <li><Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
                    </ul>
                </div>
            </div>
            <div className="pt-8 border-t border-white/10 text-center text-slate-500 text-sm">
                &copy; 2025 Carbioo AI. All rights reserved.
            </div>
        </div>
      </footer>

      <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Free Scans Limit Reached</DialogTitle>
                <DialogDescription>
                    You've hit the limit of 3 free scans. Create a free account to continue analyzing materials and unlock full reports.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setShowLoginPrompt(false)}>Cancel</Button>
                <Link href="/auth">
                    <Button className="w-full sm:w-auto">Sign Up Free</Button>
                </Link>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AlertTriangleIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    )
  }
