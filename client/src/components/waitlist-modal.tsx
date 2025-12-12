import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, CheckCircle2, Mail, Sparkles, Building2, User, ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const professionOptions = [
  { value: "architect", label: "Architect" },
  { value: "engineer", label: "Engineer" },
  { value: "contractor", label: "Contractor" },
  { value: "developer", label: "Real Estate Developer" },
  { value: "surveyor", label: "Surveyor" },
  { value: "project_manager", label: "Project Manager" },
  { value: "sustainability_consultant", label: "Sustainability Consultant" },
  { value: "other", label: "Other (Please Specify)" },
];

export function WaitlistModal({ open, onOpenChange }: WaitlistModalProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    isConstructionProfessional: "",
    profession: "",
    professionOther: "",
    nonProfessionalRole: "",
    interestReason: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const validateStep1 = () => {
    if (!formData.firstName.trim() || formData.firstName.length < 2) {
      setError("Please enter your first name (at least 2 characters)");
      return false;
    }
    if (!formData.lastName.trim() || formData.lastName.length < 2) {
      setError("Please enter your last name (at least 2 characters)");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.isConstructionProfessional) {
      setError("Please select an option");
      return false;
    }
    if (formData.isConstructionProfessional === "yes" && !formData.profession) {
      setError("Please select your profession");
      return false;
    }
    if (formData.profession === "other" && !formData.professionOther.trim()) {
      setError("Please specify your profession");
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE}/waitlist/check-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });
        
        if (!response.ok) {
          setError("Failed to validate email. Please try again.");
          setIsLoading(false);
          return;
        }
        
        const data = await response.json();
        
        if (!data.valid && data.verified) {
          setError("This email is already on the waitlist");
          setIsLoading(false);
          return;
        }
        setStep(3);
      } catch (err) {
        setError("Failed to validate email. Please try again.");
      }
      setIsLoading(false);
    } else if (step === 3 && validateStep3()) {
      setStep(4);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch(`${API_BASE}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          isConstructionProfessional: formData.isConstructionProfessional === "yes",
          profession: formData.isConstructionProfessional === "yes" ? formData.profession : undefined,
          professionOther: formData.profession === "other" ? formData.professionOther : undefined,
          nonProfessionalRole: formData.isConstructionProfessional === "no" ? formData.nonProfessionalRole : undefined,
          interestReason: formData.interestReason,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsSuccess(true);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to submit. Please check your connection and try again.");
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(1);
      setIsSuccess(false);
      setError("");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        isConstructionProfessional: "",
        profession: "",
        professionOther: "",
        nonProfessionalRole: "",
        interestReason: "",
      });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-gradient-to-b from-background to-secondary/20">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-8 text-center"
            >
              <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Mail className="w-10 h-10 text-primary" />
                </motion.div>
              </div>
              <h2 className="text-2xl font-bold mb-3">Check Your Email!</h2>
              <p className="text-muted-foreground mb-6">
                We've sent a verification link to <strong>{formData.email}</strong>. 
                Click the link to complete your registration and secure your spot on the waitlist.
              </p>
              <div className="bg-primary/5 rounded-lg p-4 text-sm text-muted-foreground mb-6">
                <p>Didn't receive the email? Check your spam folder or click below to resend.</p>
              </div>
              <Button onClick={handleClose} className="w-full">Done</Button>
            </motion.div>
          ) : (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 border-b">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl">Join the Waitlist</DialogTitle>
                    <DialogDescription className="text-sm">
                      Be first to experience Carbioo AI
                    </DialogDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        s <= step ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <User className="w-12 h-12 mx-auto text-primary/60 mb-3" />
                      <h3 className="text-lg font-semibold">Let's start with your name</h3>
                      <p className="text-sm text-muted-foreground">So we know who you are</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <Mail className="w-12 h-12 mx-auto text-primary/60 mb-3" />
                      <h3 className="text-lg font-semibold">What's your email?</h3>
                      <p className="text-sm text-muted-foreground">We'll send you a verification link</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <Building2 className="w-12 h-12 mx-auto text-primary/60 mb-3" />
                      <h3 className="text-lg font-semibold">Tell us about yourself</h3>
                      <p className="text-sm text-muted-foreground">Help us understand your background</p>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Are you a construction professional?</Label>
                      <RadioGroup
                        value={formData.isConstructionProfessional}
                        onValueChange={(value) => handleInputChange("isConstructionProfessional", value)}
                        className="grid grid-cols-2 gap-4"
                      >
                        <Label
                          htmlFor="yes"
                          className={`flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.isConstructionProfessional === "yes"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <RadioGroupItem value="yes" id="yes" className="sr-only" />
                          <span className="font-medium">Yes, I am</span>
                        </Label>
                        <Label
                          htmlFor="no"
                          className={`flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.isConstructionProfessional === "no"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <RadioGroupItem value="no" id="no" className="sr-only" />
                          <span className="font-medium">No, I'm not</span>
                        </Label>
                      </RadioGroup>
                    </div>

                    {formData.isConstructionProfessional === "yes" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-3"
                      >
                        <Label>What's your profession?</Label>
                        <Select
                          value={formData.profession}
                          onValueChange={(value) => handleInputChange("profession", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your profession" />
                          </SelectTrigger>
                          <SelectContent>
                            {professionOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        {formData.profession === "other" && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-2"
                          >
                            <Label htmlFor="professionOther">Please specify</Label>
                            <Input
                              id="professionOther"
                              placeholder="Your profession"
                              value={formData.professionOther}
                              onChange={(e) => handleInputChange("professionOther", e.target.value)}
                            />
                          </motion.div>
                        )}
                      </motion.div>
                    )}

                    {formData.isConstructionProfessional === "no" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-2"
                      >
                        <Label htmlFor="nonProfessionalRole">What brings you here?</Label>
                        <Select
                          value={formData.nonProfessionalRole}
                          onValueChange={(value) => handleInputChange("nonProfessionalRole", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="homeowner">Homeowner / DIY Enthusiast</SelectItem>
                            <SelectItem value="student">Student / Researcher</SelectItem>
                            <SelectItem value="investor">Investor / Business</SelectItem>
                            <SelectItem value="sustainability">Sustainability Advocate</SelectItem>
                            <SelectItem value="curious">Just Curious</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>
                    )}
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <Sparkles className="w-12 h-12 mx-auto text-primary/60 mb-3" />
                      <h3 className="text-lg font-semibold">Almost there!</h3>
                      <p className="text-sm text-muted-foreground">One last thing (optional)</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interestReason">Why are you interested in Carbioo AI?</Label>
                      <Textarea
                        id="interestReason"
                        placeholder="Tell us what excites you about sustainable construction..."
                        value={formData.interestReason}
                        onChange={(e) => handleInputChange("interestReason", e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-destructive text-center"
                  >
                    {error}
                  </motion.p>
                )}

                <div className="flex gap-3">
                  {step > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                      disabled={isLoading}
                      className="flex-1"
                    >
                      Back
                    </Button>
                  )}
                  {step < 4 ? (
                    <Button onClick={handleNext} disabled={isLoading} className="flex-1">
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          Continue <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} disabled={isLoading} className="flex-1">
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" /> Join Waitlist
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
