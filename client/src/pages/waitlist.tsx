import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Leaf, BarChart3, Scan, ArrowRight, CheckCircle2, Sparkles, Users, Target, Mail } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@assets/generated_images/hero_image_for_sustainable_construction_app.png";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "You're on the list!",
          description: "We'll notify you when Carbioo AI launches in February 2026.",
        });
      } else {
        const data = await response.json();
        toast({
          title: "Couldn't join waitlist",
          description: data.message || "Please try again later.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    { 
      icon: Scan, 
      title: "AI Material Recognition", 
      desc: "Instantly identify construction materials using advanced computer vision and get detailed carbon footprint data." 
    },
    { 
      icon: BarChart3, 
      title: "Carbon Analytics", 
      desc: "Real-time embodied carbon calculations and lifecycle assessments to meet green building standards." 
    },
    { 
      icon: Leaf, 
      title: "Eco Alternatives", 
      desc: "AI-powered recommendations for sustainable material substitutes that maintain structural integrity." 
    }
  ];

  const benefits = [
    "Free early access when we launch",
    "Priority onboarding support",
    "Exclusive beta features",
    "Direct feedback channel to our team"
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo linkTo="/" />
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="w-3 h-3" /> Coming February 2026
          </Badge>
        </div>
      </nav>

      <main className="flex-grow">
        <section className="relative min-h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src={heroImage} alt="Sustainable Construction" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-3 h-3" /> Intelligent Construction Platform
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight text-foreground">
                  Build Smarter.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">Build Greener.</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  Carbioo AI is your intelligent partner for sustainable construction. 
                  Scan materials, analyze carbon footprints, and discover eco-friendly alternatives instantly.
                </p>
                
                <div className="flex flex-wrap gap-3 pt-2">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="border-primary/20 shadow-xl bg-card/95 backdrop-blur-sm">
                  <CardContent className="p-8">
                    {isSubmitted ? (
                      <div className="text-center space-y-4 py-8">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-display font-bold">You're on the list!</h3>
                        <p className="text-muted-foreground">
                          Thanks for joining. We'll send you an email when Carbioo AI launches in February 2026.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="text-center mb-6">
                          <h3 className="text-2xl font-display font-bold mb-2">Join the Waitlist</h3>
                          <p className="text-muted-foreground text-sm">
                            Be among the first to experience AI-powered sustainable construction.
                          </p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              type="email"
                              placeholder="Enter your email address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="pl-10 h-12"
                              data-testid="input-waitlist-email"
                              disabled={isSubmitting}
                            />
                          </div>
                          <Button 
                            type="submit" 
                            className="w-full h-12 text-lg"
                            disabled={isSubmitting}
                            data-testid="button-join-waitlist"
                          >
                            {isSubmitting ? (
                              "Joining..."
                            ) : (
                              <>
                                Join Waitlist <ArrowRight className="ml-2 w-5 h-5" />
                              </>
                            )}
                          </Button>
                        </form>
                        
                        <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-border">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>500+ on waitlist</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Target className="w-4 h-4" />
                            <span>February 2026</span>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold mb-4">Why Carbioo AI?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive tools for sustainable construction professionals.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-background border-none shadow-lg h-full">
                    <CardContent className="pt-8 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary mx-auto">
                        <feature.icon className="w-8 h-8" />
                      </div>
                      <h3 className="font-bold font-display text-xl mb-4">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground mb-12">
                Three simple steps to reduce your project's carbon footprint.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { step: "1", title: "Scan", desc: "Upload or capture an image of any construction material." },
                  { step: "2", title: "Analyze", desc: "Get instant carbon footprint data and material properties." },
                  { step: "3", title: "Optimize", desc: "Receive AI-powered eco-friendly alternative recommendations." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="text-6xl font-display font-bold text-primary/10 absolute -top-4 left-1/2 -translate-x-1/2">
                      {item.step}
                    </div>
                    <div className="pt-8">
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Ready to Build a Sustainable Future?
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Join hundreds of architects, engineers, and construction professionals 
              waiting for Carbioo AI.
            </p>
            <Button 
              size="lg" 
              className="h-12 px-8"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              data-testid="button-cta-join"
            >
              Join the Waitlist <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <Logo showIcon={true} size="md" linkTo={undefined} />
            <p className="text-slate-400 text-sm">
              Empowering architects to build a sustainable future through intelligent material analysis.
            </p>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-slate-500 text-sm">
            &copy; 2025 Carbioo AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
