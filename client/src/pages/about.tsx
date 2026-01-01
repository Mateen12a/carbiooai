import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  ArrowLeft, Globe, ShieldCheck, Target, Lightbulb, Heart, 
  Leaf, Building2, Sparkles, Zap, Calendar, TrendingDown
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@assets/generated_images/hero_image_for_sustainable_construction_app.png";
import { Logo } from "@/components/logo";
import { motion } from "framer-motion";
import { useState } from "react";
import { WaitlistModal } from "@/components/waitlist-modal";

export default function About() {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  const values = [
    {
      icon: Target,
      title: "Data-Driven Certainty",
      desc: "We replace guesswork with precision, ensuring every material choice is backed by global sustainability standards."
    },
    {
      icon: Zap,
      title: "Built for Velocity",
      desc: "Speed is the key to scaling green building. We provide instant insights so you can build better, faster."
    },
    {
      icon: Leaf,
      title: "Outcome Obsessed",
      desc: "We don't just track data; we drive lower carbon outcomes for every project, from retrofit to new build."
    },
    {
      icon: Globe,
      title: "The New Standard",
      desc: "Sustainable construction isn't a feature; it's the future. We're building the infrastructure to make it inevitable."
    },
  ];

  const timeline = [
    { year: "2025", title: "The Vision", desc: "Identified the critical data gap preventing the construction industry from reaching Net Zero." },
    { year: "2025", title: "Infrastructure Build", desc: "Developing the world's most comprehensive intelligence layer for building materials." },
    { year: "Q1 2026", title: "Global Launch", desc: "Carbioo AI becomes available to professionals ready to lead the sustainable transition." },
    { year: "2026+", title: "Industry Standard", desc: "Scaling across every project phase to make low-carbon building the default choice globally." },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <WaitlistModal open={showWaitlistModal} onOpenChange={setShowWaitlistModal} />
      
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo linkTo="/" />
          <Link href="/">
            <Button variant="ghost" className="text-muted-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      <main>
        <section className="relative py-24 overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 z-0 opacity-5 grayscale">
            <img src={heroImage} alt="Construction Site" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6">
                <Building2 className="w-4 h-4" /> The Mission
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
                Decarbonizing construction <br />
                <span className="text-primary italic">at scale.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-medium">
                Construction accounts for 40% of global emissions. We aren't just building a tool; we're building the intelligence layer that makes sustainable building inevitable.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200" 
                    alt="Strategic Planning" 
                    className="rounded-2xl shadow-2xl relative z-10"
                  />
                  <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary/20 rounded-2xl z-0" />
                </div>
              </div>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl font-display font-bold tracking-tight">From Complexity to Clarity</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    The path to Net Zero is currently blocked by fragmented data and manual processes. We solve this by providing a single, authoritative source for material intelligence.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    By empowering architects, surveyors, and developers with instant, verified carbon data, we're removing the friction from sustainable decision-making. This is the new standard for modern building.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-3 p-6 rounded-2xl bg-secondary/30 border border-border/50">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base">Authority</h4>
                      <p className="text-sm text-muted-foreground">Verified data you can bank on.</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 p-6 rounded-2xl bg-secondary/30 border border-border/50">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <TrendingDown className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base">Impact</h4>
                      <p className="text-sm text-muted-foreground">Direct path to lower carbon.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-display font-bold tracking-tight">Our Core Principles</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                The pillars of our commitment to the future of the built environment.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full bg-background border-border/50 hover:border-primary/50 transition-all shadow-sm">
                    <CardContent className="pt-8 p-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                        <value.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-bold text-xl mb-3">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-display font-bold tracking-tight">The Road to 2026</h2>
            </div>
            <div className="max-w-4xl mx-auto relative">
              <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-border hidden md:block" />
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col md:flex-row gap-8 mb-16 last:mb-0"
                >
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${i === 2 ? 'bg-primary text-white scale-110' : 'bg-background border-2 border-border text-primary'}`}>
                      {i === 0 && <Lightbulb className="w-5 h-5" />}
                      {i === 1 && <Zap className="w-5 h-5" />}
                      {i === 2 && <Sparkles className="w-5 h-5" />}
                      {i === 3 && <Globe className="w-5 h-5" />}
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <span className="text-sm font-bold text-primary uppercase tracking-widest">{item.year}</span>
                    <h3 className="text-2xl font-bold mt-2 mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.15),transparent_70%)]" />
          <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
            <Sparkles className="w-16 h-16 text-primary mx-auto mb-8" />
            <h2 className="text-5xl font-display font-bold mb-8 tracking-tight">Be part of the shift.</h2>
            <p className="text-slate-300 mb-12 text-xl font-light leading-relaxed">
              We are inviting the industry's leaders to join us. Secure your position on the waitlist for our Q1 2026 launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="px-12 py-7 text-lg font-bold rounded-xl shadow-xl shadow-primary/20"
                onClick={() => setShowWaitlistModal(true)}
              >
                <Calendar className="mr-3 w-5 h-5" />
                Join the Movement
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-slate-950 text-white py-16 border-t border-white/5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo size="md" linkTo="/" />
          <div className="text-slate-500 text-sm">
            &copy; 2025 Carbioo AI. Building the future of sustainable construction.
          </div>
        </div>
      </footer>
    </div>
  );
}