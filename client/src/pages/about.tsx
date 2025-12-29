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
      title: "Built on Facts",
      desc: "We use millions of images to make sure our AI understands exactly what materials are being used."
    },
    {
      icon: Lightbulb,
      title: "Always Learning",
      desc: "We stay ahead by constantly improving our technology to meet the needs of the building world."
    },
    {
      icon: Heart,
      title: "For the Planet",
      desc: "Our goal is simple: help builders reduce carbon emissions and save our environment."
    },
    {
      icon: Users,
      title: "Built with Experts",
      desc: "We work with builders and engineers to make sure our tools solve real-world problems."
    },
  ];

  const timeline = [
    { year: "2025", title: "The Idea", desc: "Our team saw that builders needed better data to choose greener materials." },
    { year: "2025", title: "Building the AI", desc: "Teaching our technology to recognize materials and calculate their impact." },
    { year: "Q1 2026", title: "Launch Day", desc: "Opening Carbioo AI to help everyone build more sustainably." },
    { year: "2026+", title: "Growing Together", desc: "Adding more materials and data to help builders everywhere." },
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
                <Building2 className="w-4 h-4" /> About Us
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                Helping the world <span className="text-primary">build greener</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Building accounts for nearly 40% of the world's carbon emissions. We believe that if builders have the right information, they can make better choices. Carbioo AI makes it easy to find and use sustainable materials.
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
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  Our Story
                </span>
                <h2 className="text-3xl font-display font-bold">Better tools for a better future</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  We started Carbioo AI because we saw that finding green building data was too slow and confusing.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We wanted to make sustainable building accessible to everyone. By combining AI with clear data, we give professionals the insights they need to build with the planet in mind.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                    <Globe className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm">Global Info</h4>
                      <p className="text-xs text-muted-foreground">Using data from verified sources worldwide.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                    <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm">Verified Facts</h4>
                      <p className="text-xs text-muted-foreground">Accurate information you can trust.</p>
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
              <h2 className="text-3xl font-display font-bold mb-4">What Guides Us</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These principles help us build a platform that truly helps the planet.
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
              <h2 className="text-3xl font-display font-bold mb-4">Our Journey</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 mb-8 last:mb-0"
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${i === 2 ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                      {i === 0 && <Lightbulb className="w-5 h-5" />}
                      {i === 1 && <Zap className="w-5 h-5" />}
                      {i === 2 && <Sparkles className="w-5 h-5" />}
                      {i === 3 && <Globe className="w-5 h-5" />}
                    </div>
                    {i < timeline.length - 1 && <div className="w-0.5 h-full bg-border mt-2" />}
                  </div>
                  <div className="flex-1 pb-8">
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
            <h2 className="text-3xl font-display font-bold mb-6">Join Us</h2>
            <p className="text-slate-300 mb-8 text-lg">
              Whether you build, design, or just care about the planet, we'd love for you to join us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="px-8"
                onClick={() => setShowWaitlistModal(true)}
              >
                <Calendar className="mr-2 w-4 h-4" />
                Join the Waitlist
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-slate-950 text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
            &copy; 2025 Carbioo AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}