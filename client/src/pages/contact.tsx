import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Mail, Linkedin, CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsSuccess(true);
        toast({
          title: "Message sent",
          description: "We'll get back to you as soon as possible."
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans pb-20">
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

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-display font-bold mb-4">Get in touch</h1>
                    <p className="text-lg text-muted-foreground">
                        Have questions about Carbioo AI or want to share your thoughts? We'd love to hear from you.
                    </p>
                </div>

                <div className="space-y-6">
                    <Card className="border-none shadow-md bg-secondary/10">
                        <CardContent className="p-6 flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg text-primary">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold mb-1">Email Us</h3>
                                <p className="text-sm text-muted-foreground mb-1">Our team is here to help.</p>
                                <a href="mailto:hello@carbiooai.com" className="text-primary hover:underline font-medium">hello@carbiooai.com</a>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-md bg-secondary/10">
                        <CardContent className="p-6 flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg text-primary">
                                <Linkedin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold mb-1">Visit Us</h3>
                                <p className="text-sm text-muted-foreground mb-1">Follow our journey on LinkedIn.</p>
                                <a 
                                  href="https://www.linkedin.com/company/carbiooai/" 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-primary hover:underline font-medium"
                                >
                                  linkedin.com/company/carbiooai
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
                {isSuccess ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
                    <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                    <p className="text-muted-foreground mb-6">Thank you for reaching out. We'll be in touch soon.</p>
                    <Button onClick={() => setIsSuccess(false)} variant="outline">Send another message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First name</Label>
                            <Input 
                              id="firstName" 
                              placeholder="Jane" 
                              required 
                              value={formData.firstName}
                              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last name</Label>
                            <Input 
                              id="lastName" 
                              placeholder="Doe" 
                              required
                              value={formData.lastName}
                              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="jane@example.com" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <textarea 
                            id="message"
                            required
                            className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                            placeholder="How can we help you?"
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                    </div>
                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
            </div>
        </div>
      </main>
    </div>
  );
}