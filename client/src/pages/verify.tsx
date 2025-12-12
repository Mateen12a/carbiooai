import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

type VerificationStatus = "loading" | "success" | "expired" | "invalid" | "already" | "error";

export default function Verify() {
  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [, setLocation] = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        setStatus("invalid");
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/waitlist/verify-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus(data.status || "success");
        } else {
          setStatus(data.status || "error");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
      }
    };

    verifyEmail();
  }, []);

  const statusConfig: Record<VerificationStatus, { icon: React.ReactNode; title: string; message: string; color: string }> = {
    loading: {
      icon: <Loader2 className="w-16 h-16 text-primary animate-spin" />,
      title: "Verifying your email...",
      message: "Please wait while we confirm your email address.",
      color: "text-primary",
    },
    success: {
      icon: <CheckCircle2 className="w-16 h-16 text-green-500" />,
      title: "Email Verified!",
      message: "Welcome to the Carbioo AI waitlist! You'll receive updates about our launch and early access.",
      color: "text-green-500",
    },
    expired: {
      icon: <XCircle className="w-16 h-16 text-red-500" />,
      title: "Link Expired",
      message: "This verification link has expired. Please sign up again to receive a new verification email.",
      color: "text-red-500",
    },
    invalid: {
      icon: <XCircle className="w-16 h-16 text-red-500" />,
      title: "Invalid Link",
      message: "This verification link is invalid. Please check your email for the correct link.",
      color: "text-red-500",
    },
    already: {
      icon: <AlertCircle className="w-16 h-16 text-blue-500" />,
      title: "Already Verified",
      message: "Your email has already been verified. You're all set!",
      color: "text-blue-500",
    },
    error: {
      icon: <XCircle className="w-16 h-16 text-red-500" />,
      title: "Something Went Wrong",
      message: "We couldn't verify your email. Please try again or contact support.",
      color: "text-red-500",
    },
  };

  const currentStatus = statusConfig[status];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo linkTo="/" />
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="flex justify-center">{currentStatus.icon}</div>
          <h1 className={`text-2xl sm:text-3xl font-bold ${currentStatus.color}`}>
            {currentStatus.title}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            {currentStatus.message}
          </p>
          {status !== "loading" && (
            <Button onClick={() => setLocation("/")} size="lg" className="mt-4">
              Go to Homepage
            </Button>
          )}
        </motion.div>
      </main>
    </div>
  );
}
