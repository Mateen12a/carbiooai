import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  ArrowLeft, Scan, BarChart3, Leaf, Smartphone, Cloud, Lock, Zap, 
  ArrowRight, CheckCircle2, Globe, Shield, Clock, Target, TrendingDown,
  FileText, Users, Building2, Sparkles, Database, Code, RefreshCw
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { motion } from "framer-motion";

export default function Features() {
  const mainFeatures = [
    {
      icon: Scan,
      title: "Visual Material Recognition",
      desc: "Upload photos from site visits and let our AI identify materials instantly. Works on raw materials, surfaces, and construction elements with 98% accuracy.",
      highlights: ["98% recognition accuracy", "Works with any camera", "Processes in under 3 seconds"]
    },
    {
      icon: BarChart3,
      title: "Lifecycle Assessment (LCA)",
      desc: "Get instant calculations for Global Warming Potential (GWP), embodied energy, acidification potential, and more based on volume and application.",
      highlights: ["Full LCA metrics", "LEED/BREEAM compliant", "ISO 14040 certified data"]
    },
    {
      icon: Leaf,
      title: "Smart Alternative Recommendations",
      desc: "Don't just identify the problem, solve it. Our engine suggests structurally viable, low-carbon alternatives for every material scanned.",
      highlights: ["Up to 40% carbon reduction", "Structural compatibility check", "Cost comparison included"]
    },
  ];

  const additionalFeatures = [
    { icon: Smartphone, title: "Mobile Optimized", desc: "Designed for the job site. Use Carbioo AI on your tablet or phone to scan materials right where they are installed." },
    { icon: Cloud, title: "Cloud Sync", desc: "All your projects, scans, and reports are synced across devices in real-time. Collaborate with your team from anywhere." },
    { icon: Lock, title: "Enterprise Security", desc: "Bank-grade encryption and SOC2 compliant infrastructure ensure your proprietary project data stays safe." },
    { icon: Database, title: "Global Material Database", desc: "Access EPD data from over 50,000 materials worldwide, with new entries added daily from certified sources." },
    { icon: FileText, title: "Automated Reports", desc: "Generate professional sustainability reports for clients and stakeholders with a single click. Export to PDF or integrate with your tools." },
    { icon: Code, title: "Developer API", desc: "Integrate Carbioo AI directly into your existing workflows and software with our comprehensive REST API." },
    { icon: Users, title: "Team Collaboration", desc: "Invite team members, share projects, and collaborate on sustainability goals across your organization." },
    { icon: RefreshCw, title: "Real-time Updates", desc: "Our database is continuously updated with the latest EPD data and material specifications from around the world." },
  ];

  const comparisonData = [
    { feature: "Material Recognition", carbioo: true, traditional: false },
    { feature: "Instant Carbon Data", carbioo: true, traditional: false },
    { feature: "Alternative Suggestions", carbioo: true, traditional: false },
    { feature: "Mobile App Access", carbioo: true, traditional: false },
    { feature: "Time to Results", carbiooText: "3 seconds", traditionalText: "2-4 weeks" },
    { feature: "Cost per Assessment", carbiooText: "Included", traditionalText: "$500-2000" },
    { feature: "Database Size", carbiooText: "50,000+ materials", traditionalText: "Limited" },
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
        <section className="py-24 bg-gradient-to-b from-primary/5 to-transparent">
            <div className="container mx-auto px-4 text-center max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6">
                    <Sparkles className="w-4 h-4" /> Platform Features
                  </span>
                  <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Powerful Tools for Sustainable Design</h1>
                  <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                      Everything you need to measure, analyze, and reduce the carbon footprint of your construction projects. All powered by cutting-edge AI technology.
                  </p>
                  {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/auth">
                        <Button size="lg" className="px-8">Try for Free <ArrowRight className="ml-2 w-4 h-4" /></Button>
                    </Link>
                    <Link href="/pricing">
                        <Button size="lg" variant="outline" className="px-8">View Pricing</Button>
                    </Link>
                  </div> */}
                </motion.div>
            </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                Core Capabilities
              </span>
              <h2 className="text-3xl font-display font-bold mb-4">The Heart of Carbioo AI</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Three powerful features that work together to transform how you approach material sustainability.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {mainFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full bg-gradient-to-b from-background to-secondary/20 border-2 hover:border-primary/50 transition-all hover:shadow-xl">
                    <CardContent className="pt-8">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                        <feature.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-muted-foreground mb-6">{feature.desc}</p>
                      <ul className="space-y-2">
                        {feature.highlights.map((highlight, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                Comparison
              </span>
              <h2 className="text-3xl font-display font-bold mb-4">Carbioo AI vs Traditional Methods</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                See how Carbioo AI compares to traditional lifecycle assessment approaches.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <div className="grid grid-cols-3 bg-white/5 p-4 font-bold">
                  <div>Feature</div>
                  <div className="text-center text-primary">Carbioo AI</div>
                  <div className="text-center text-slate-400">Traditional LCA</div>
                </div>
                {comparisonData.map((row, i) => (
                  <div key={i} className="grid grid-cols-3 p-4 border-t border-white/10 items-center">
                    <div className="text-slate-300">{row.feature}</div>
                    <div className="text-center">
                      {row.carbioo !== undefined ? (
                        row.carbioo ? (
                          <CheckCircle2 className="w-5 h-5 text-primary mx-auto" />
                        ) : (
                          <span className="text-slate-500">—</span>
                        )
                      ) : (
                        <span className="text-primary font-medium">{row.carbiooText}</span>
                      )}
                    </div>
                    <div className="text-center">
                      {row.traditional !== undefined ? (
                        row.traditional ? (
                          <CheckCircle2 className="w-5 h-5 text-slate-400 mx-auto" />
                        ) : (
                          <span className="text-slate-500">—</span>
                        )
                      ) : (
                        <span className="text-slate-400">{row.traditionalText}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                    More Features
                  </span>
                  <h2 className="text-3xl font-display font-bold mb-4">Everything You Need</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Beyond our core features, Carbioo AI offers a comprehensive suite of tools for sustainable construction.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {additionalFeatures.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-6 rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg bg-card"
                      >
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                              <feature.icon className="w-6 h-6" />
                          </div>
                          <h3 className="font-bold mb-2">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </motion.div>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                How It Works
              </span>
              <h2 className="text-3xl font-display font-bold mb-4">Simple, Powerful, Fast</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get from material photo to sustainability insights in three easy steps.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: "1", title: "Capture", desc: "Take a photo of any construction material on-site or upload an existing image.", icon: Smartphone },
                { step: "2", title: "Analyze", desc: "Our AI identifies the material and calculates its full carbon footprint in seconds.", icon: Zap },
                { step: "3", title: "Optimize", desc: "Review eco-friendly alternatives and make data-driven decisions for your project.", icon: Target },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-primary text-white text-3xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-emerald-500/10">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-4xl font-display font-bold mb-6">
                Ready to Transform Your Workflow?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of architects and engineers already using Carbioo AI to build more sustainably.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button size="lg" className="px-8 h-12 text-lg shadow-lg shadow-primary/30">
                    Join waiting list <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="px-8 h-12 text-lg">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
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
