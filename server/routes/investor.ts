import { Router } from "express";
import { InvestorInterest } from "../db/models/InvestorInterest";
import { sendInvestorAcknowledgeEmail } from "../services/emailService";
import { z } from "zod";

const router = Router();

const investorSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  organization: z.string().min(1),
  investorType: z.enum(['Angel', 'VC', 'Strategic', 'Other']),
  message: z.string().optional(),
});

router.post("/", async (req, res) => {
  try {
    const validatedData = investorSchema.parse(req.body);
    
    const investorInterest = new InvestorInterest({
      ...validatedData,
      tag: 'investor'
    });
    
    await investorInterest.save();
    
    // Send automatic acknowledgment
    await sendInvestorAcknowledgeEmail(validatedData.email, validatedData.fullName);
    
    res.status(201).json({ message: "Interest recorded successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid data", errors: error.errors });
    }
    console.error("Investor interest error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
