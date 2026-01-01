import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth-context";
import Landing from "@/pages/landing";
import About from "@/pages/about";
import InvestorPage from "@/pages/investor";
import Pricing from "@/pages/pricing";
import Contact from "@/pages/contact";
import CaseStudies from "@/pages/case-studies";
import ApiDocs from "@/pages/api-docs";
import Verify from "@/pages/verify";
import NotFound from "@/pages/not-found";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

function useKeepBackendAwake() {
  useEffect(() => {
    const pingBackend = () => {
      fetch(`${API_BASE}/health`, { method: "GET" }).catch(() => {});
    };
    
    pingBackend();
    
    const interval = setInterval(pingBackend, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/about" component={About} />
      <Route path="/investor" component={InvestorPage} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/contact" component={Contact} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/api" component={ApiDocs} />
      <Route path="/verify" component={Verify} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useKeepBackendAwake();
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
