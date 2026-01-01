import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Building2, ArrowRight, ShieldCheck, Target, 
  TrendingUp, BarChart3, Users, Mail, CheckCircle2,
  Calendar, Info, Globe, Sparkles, Zap
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

export default function InvestorPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      organization: formData.get("organization") as string,
      investorType: formData.get("investorType") as 'Angel' | 'VC' | 'Strategic' | 'Other',
      message: formData.get("message") as string,
    };

    try {
      await api.request("/investor", {
        method: "POST",
        body: data
      });
      setSubmitted(true);
      toast({
        title: "Interest Registered",
        description: "We've received your details and will follow up personally.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo linkTo="/" />
          <div className="text-sm font-medium text-muted-foreground italic">
            Investor Relations
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]" />
          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
                The intelligence layer for sustainable building.
              </h1>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                We're using AI to help builders identify materials and understand their carbon impact instantly.
              </p>
              <Button size="lg" className="px-10 py-7 text-lg font-bold rounded-xl" onClick={() => document.getElementById('brief-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Request Investor Brief
              </Button>
            </motion.div>
          </div>
        </section>

        {/* The Problem */}
        <section className="py-24 border-b">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-6 text-center mb-16">
              <span className="text-primary font-bold uppercase tracking-wider text-sm">The Problem</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Manual work is slowing down green building.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-secondary/50 rounded-xl flex items-center justify-center mx-auto">
                  <TrendingUp className="w-6 h-6 text-primary rotate-45" />
                </div>
                <h4 className="font-bold">Slow & Expensive</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Current carbon assessments take weeks and require expensive specialist knowledge.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-secondary/50 rounded-xl flex items-center justify-center mx-auto">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold">Fragmented Data</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Material data is scattered across databases, making quick comparisons impossible.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-secondary/50 rounded-xl flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold">Late Decision Making</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Carbon insight often arrives after key design decisions are already finalized.</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Opportunity */}
        <section className="py-24 bg-secondary/10">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-6 text-center mb-16">
              <span className="text-primary font-bold uppercase tracking-wider text-sm">The Opportunity</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Construction is changing forever.</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                As rules get stricter and more people want green buildings, there is a huge need for better tools to help builders make the right choices.
              </p>
            </div>
            <div className="bg-background rounded-3xl p-8 md:p-12 border border-border shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold tracking-tight">What Carbioo does</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We're building a simple way for builders to take a photo of a material and see its carbon footprint instantly.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>Material identification from photos</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>Easy tools for builders</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>Instant carbon insights</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-8">
                  <div className="p-6 rounded-2xl bg-secondary/50 border border-border">
                    <h4 className="font-bold text-sm mb-2 uppercase tracking-wider opacity-60">Status</h4>
                    <p className="font-medium">MVP live, actively training models and engaging early practitioners.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
                    <h4 className="font-bold text-sm mb-2 uppercase tracking-wider text-primary">Founding</h4>
                    <p className="font-medium">Engineering-led team with deep experience in production systems and DevOps.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ask/Form Section */}
        <section id="brief-form" className="py-24">
          <div className="container mx-auto px-4 max-w-xl">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-12"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Request Received</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Thank you for your interest in Carbioo AI. We will review your details and follow up with you personally.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>Submit another request</Button>
              </motion.div>
            ) : (
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-display font-bold tracking-tight">Connect with us.</h2>
                  <p className="text-muted-foreground">
                    Request an investor brief or start a conversation about our pre-seed round.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" name="fullName" required placeholder="Jane Doe" className="bg-secondary/20" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" name="email" type="email" required placeholder="jane@example.com" className="bg-secondary/20" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization</Label>
                      <Input id="organization" name="organization" required placeholder="Organization Name" className="bg-secondary/20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="investorType">Investor Type</Label>
                    <Select name="investorType" required>
                      <SelectTrigger className="bg-secondary/20">
                        <SelectValue placeholder="Select type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Angel">Angel</SelectItem>
                        <SelectItem value="VC">VC</SelectItem>
                        <SelectItem value="Strategic">Strategic</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Optional Message</Label>
                    <Textarea id="message" name="message" placeholder="Tell us about your focus..." className="bg-secondary/20 min-h-[100px]" />
                  </div>
                  <Button type="submit" className="w-full py-6 font-bold text-lg" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Request Investor Brief"}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-white py-12 border-t border-white/5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo size="md" linkTo="/" />
          <div className="text-slate-500 text-sm">
            &copy; 2026 Carbioo AI. Engineering-led climate tech.
          </div>
        </div>
      </footer>
    </div>
  );
}
