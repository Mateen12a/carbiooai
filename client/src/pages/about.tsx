import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  ArrowLeft, Users, Globe, ShieldCheck, Target, Lightbulb, Heart, 
  Leaf, Building2, ArrowRight, CheckCircle2, Sparkles, Award, 
  TrendingUp, Clock, Zap, BarChart3
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@assets/generated_images/hero_image_for_sustainable_construction_app.png";
import { Logo } from "@/components/logo";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Accuracy First",
      desc: "Our AI models are trained on millions of images to achieve 98% recognition accuracy, because decisions about materials shouldn't be based on guesswork."
    },
    {
      icon: Lightbulb,
      title: "Innovation Driven",
      desc: "We're constantly pushing the boundaries of what's possible with AI and sustainable technology, staying ahead of industry needs."
    },
    {
      icon: Heart,
      title: "Planet Focused",
      desc: "Every feature we build is measured by its potential to reduce carbon emissions. Our success is measured in tons of CO2 saved."
    },
    {
      icon: Users,
      title: "Community Built",
      desc: "We collaborate with architects, engineers, and sustainability experts worldwide to ensure our platform serves real needs."
    },
  ];

  const timeline = [
    { year: "2023", title: "The Idea", desc: "Founded by architects and AI researchers frustrated by the lack of accessible carbon data in construction." },
    { year: "2024", title: "Development", desc: "Built our proprietary material recognition AI, trained on 10M+ construction images and EPD data." },
    { year: "Q1 2025", title: "Launch", desc: "Public launch of Carbioo AI platform with full material analysis and alternative recommendation features." },
    { year: "2025+", title: "Global Expansion", desc: "Expanding our database and partnerships to cover materials and standards worldwide." },
  ];

  const teamMembers = [
    { name: "Alex Chen", role: "CEO & Co-Founder", bio: "Former architect with 15 years experience. Led sustainability initiatives at Foster + Partners.", avatar: "AC" },
    { name: "Dr. Maya Patel", role: "CTO & Co-Founder", bio: "PhD in Computer Vision from MIT. Previously led AI research at Google DeepMind.", avatar: "MP" },
    { name: "James Morrison", role: "Head of Sustainability", bio: "LEED Fellow and former sustainability director at Skidmore, Owings & Merrill.", avatar: "JM" },
  ];

  const whyFirst = [
    { stat: "First", label: "AI specifically designed for construction material carbon analysis" },
    { stat: "Only", label: "Platform combining visual recognition with EPD database" },
    { stat: "Fastest", label: "Material to carbon footprint in under 3 seconds" },
    { stat: "Most Comprehensive", label: "Database covering 50,000+ materials globally" },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
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
                    Our Mission is to <span className="text-primary">Decarbonize Construction</span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                    Construction is responsible for 39% of global carbon emissions. We believe that with the right tools, every architect, engineer, and builder can be part of the solution. Carbioo AI is the first platform that makes sustainable material choices instant, accurate, and accessible.
                  </p>
                </motion.div>
            </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-primary/5 via-primary/10 to-emerald-500/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                Why We're Different
              </span>
              <h2 className="text-3xl font-display font-bold mb-4">The First of Its Kind</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Carbioo AI isn't just another sustainability tool. It's the world's first AI platform purpose-built for construction carbon analysis.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyFirst.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg"
                >
                  <h3 className="text-3xl font-bold text-primary mb-2">{item.stat}</h3>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-secondary/20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <h3 className="text-4xl font-bold text-primary mb-2">2.4M+</h3>
                        <p className="text-sm text-muted-foreground">Materials Analyzed</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-primary mb-2">450k</h3>
                        <p className="text-sm text-muted-foreground">Tons CO2 Offset</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-primary mb-2">12k+</h3>
                        <p className="text-sm text-muted-foreground">Active Architects</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-primary mb-2">98%</h3>
                        <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                    </div>
                </div>
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
                        <h2 className="text-3xl font-display font-bold">Built by Architects, for Architects</h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            Carbioo AI was founded in 2024 by a team of structural engineers and data scientists who were frustrated by the lack of transparent environmental data in the construction industry.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            We realized that while sustainable alternatives existed, they were often hard to find or difficult to compare against standard materials. We set out to change that by building the world's most comprehensive material intelligence platform, powered by cutting-edge AI.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Today, Carbioo AI is the only platform that combines computer vision, lifecycle assessment data, and machine learning to give construction professionals instant, actionable insights about material sustainability.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                                <Globe className="w-6 h-6 text-primary shrink-0" />
                                <div>
                                    <h4 className="font-bold text-sm">Global Database</h4>
                                    <p className="text-xs text-muted-foreground">Sourced from certified EPDs worldwide.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                                <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                                <div>
                                    <h4 className="font-bold text-sm">Verified Data</h4>
                                    <p className="text-xs text-muted-foreground">ISO 14040 compliant lifecycle assessments.</p>
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
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                Our Values
              </span>
              <h2 className="text-3xl font-display font-bold mb-4">What Drives Us</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every decision we make is guided by these core principles.
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
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                Our Journey
              </span>
              <h2 className="text-3xl font-display font-bold mb-4">The Road to Launch</h2>
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

        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                Leadership
              </span>
              <h2 className="text-3xl font-display font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A diverse team of architects, engineers, and technologists united by a common mission.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="text-center bg-background">
                    <CardContent className="pt-8">
                      <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                        <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">{member.avatar}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-lg">{member.name}</h3>
                      <p className="text-sm text-primary mb-3">{member.role}</p>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-slate-900 text-white text-center">
            <div className="container mx-auto px-4 max-w-2xl">
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-display font-bold mb-6">Ready to Build the Future?</h2>
                <p className="text-slate-300 mb-8 text-lg">
                  Join the community of forward-thinking professionals who are transforming the construction industry. Be part of the solution.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/auth">
                      <Button size="lg" className="px-8">Get Started for Free</Button>
                  </Link>
                  <Link href="/features">
                      <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        Explore Features <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                  </Link>
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
