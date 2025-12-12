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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { WaitlistModal } from "@/components/waitlist-modal";

export default function About() {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  const values = [
    {
      icon: Target,
      title: "Accuracy First",
      desc: "We're training our AI models on millions of images to achieve exceptional recognition accuracy, because decisions about materials shouldn't be based on guesswork."
    },
    {
      icon: Lightbulb,
      title: "Innovation Driven",
      desc: "We're constantly pushing the boundaries of what's possible with AI and sustainable technology, staying ahead of industry needs."
    },
    {
      icon: Heart,
      title: "Planet Focused",
      desc: "Every feature we build is measured by its potential to reduce carbon emissions. Our success will be measured in tons of CO2 saved."
    },
    {
      icon: Users,
      title: "Community Built",
      desc: "We collaborate with architects, engineers, and sustainability experts worldwide to ensure our platform serves real needs."
    },
  ];

  const timeline = [
    { year: "2023", title: "The Idea", desc: "Founded by a team of engineers and data scientists who saw the need for accessible environmental data in construction." },
    { year: "2024", title: "Development", desc: "Building our proprietary material recognition AI, training on construction images and EPD data." },
    { year: "Q1 2025", title: "Launch", desc: "Planned public launch of Carbioo AI platform with material analysis and alternative recommendation features." },
    { year: "2025+", title: "Growth", desc: "Expanding our database and partnerships to cover materials and standards worldwide." },
  ];

  const teamMembers = [
    { name: "Alex Chen", role: "CEO & Co-Founder", bio: "Engineer with 10+ years experience. Passionate about sustainable building solutions.", avatar: "AC" },
    { name: "Dr. Maya Patel", role: "CTO & Co-Founder", bio: "PhD in Computer Vision. Previously worked in AI research at leading tech companies.", avatar: "MP" },
    { name: "James Morrison", role: "Head of Sustainability", bio: "Sustainability expert with deep experience in green building standards and lifecycle assessment.", avatar: "JM" },
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
                Our Mission is to <span className="text-primary">Decarbonize Construction</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Construction is responsible for 39% of global carbon emissions. We believe that with the right tools, every architect, engineer, and builder can be part of the solution. Carbioo AI is building the first platform that makes sustainable material choices instant, accurate, and accessible.
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
                <h2 className="text-3xl font-display font-bold">Building for a Sustainable Future</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Carbioo AI was founded in 2024 by a team of engineers and data scientists who were frustrated by the lack of transparent environmental data in the construction industry.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We realized that while sustainable alternatives existed, they were often hard to find or difficult to compare against standard materials. We set out to change that by building a comprehensive material intelligence platform, powered by cutting-edge AI.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, we're developing the first platform that combines computer vision, lifecycle assessment data, and machine learning to give construction professionals instant, actionable insights about material sustainability.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                    <Globe className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm">Global Database</h4>
                      <p className="text-xs text-muted-foreground">Sourcing from certified EPDs worldwide.</p>
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
                A diverse team of engineers and technologists united by a common mission.
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
            <h2 className="text-3xl font-display font-bold mb-6">Join Us on This Journey</h2>
            <p className="text-slate-300 mb-8 text-lg">
              Whether you're a construction professional, sustainability enthusiast, or simply care about building a greener future, we'd love for you to be part of our community.
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
