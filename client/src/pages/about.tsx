import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  ArrowLeft, Users, Globe, ShieldCheck, Target, Lightbulb, Heart, 
  Leaf, Building2, ArrowRight, Sparkles, Zap, Calendar
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
      title: "Built on Clarity",
      desc: "We focus on making complex information simple, clear, and easy to understand."
    },
    {
      icon: Lightbulb,
      title: "Designed for Real Life",
      desc: "Everything we build is shaped by how people actually build, plan, and make decisions."
    },
    {
      icon: Heart,
      title: "For the Planet",
      desc: "Every better material choice helps reduce impact and protect the future."
    },
    {
      icon: Users,
      title: "Built for Everyone",
      desc: "From professionals to everyday decision makers, sustainability should be accessible."
    },
  ];

  const timeline = [
    { year: "2025", title: "The Question", desc: "Why is it still so hard to understand the impact of building materials?" },
    { year: "2025", title: "The Vision", desc: "Create a simple way to see materials, impact, and better options clearly." },
    { year: "Q1 2026", title: "The Launch", desc: "Opening Carbioo AI to early users and partners." },
    { year: "Beyond", title: "The Future", desc: "Expanding materials, insights, and reach across the built world." },
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
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <img src={heroImage} alt="Construction Site" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6">
                <Building2 className="w-4 h-4" /> About Carbioo AI
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                Rethinking how the world builds
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                The way we build shapes our future. Carbioo AI exists to make material choices clearer, smarter, and more sustainable from the very beginning.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200" 
                  alt="Team working" 
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="space-y-6">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase">
                  Our Story
                </span>
                <h2 className="text-3xl font-display font-bold">
                  Making better building decisions possible
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Buildings account for a significant share of global emissions, yet understanding material impact remains confusing and fragmented.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Carbioo AI was created to change that. We are building a platform that brings clarity to materials, environmental impact, and better alternatives so decisions can be made earlier and with confidence.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                    <Globe className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm">Global Perspective</h4>
                      <p className="text-xs text-muted-foreground">
                        Built with widely trusted sustainability data sources.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                    <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm">Trust and Transparency</h4>
                      <p className="text-xs text-muted-foreground">
                        Clear insights without unnecessary complexity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold mb-4">
                What Guides Us
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These values shape everything we build and how we build it.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full bg-background hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <value.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold">
                Our Journey
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 mb-8"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    {i < timeline.length - 1 && <div className="w-0.5 h-full bg-border mt-2" />}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-primary">{item.year}</span>
                    <h3 className="text-xl font-bold mt-1 mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900 text-white text-center">
          <div className="container mx-auto px-4 max-w-2xl">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-display font-bold mb-6">
              Be part of what comes next
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              Whether you build, design, invest, or simply care about the future, Carbioo AI is being built for you.
            </p>
            <Button 
              size="lg" 
              className="px-8"
              onClick={() => setShowWaitlistModal(true)}
            >
              <Calendar className="mr-2 w-4 h-4" />
              Join the Waitlist
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="bg-slate-950 text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          © 2025 Carbioo AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
