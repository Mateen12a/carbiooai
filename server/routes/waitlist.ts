import { Router } from 'express';
import crypto from 'crypto';
import Waitlist from '../db/models/Waitlist';
import { sendVerificationEmail, sendWelcomeEmail } from '../services/emailService';

const router = Router();

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return false;
  
  const disposableDomains = [
    'tempmail.com', 'throwaway.com', 'guerrillamail.com', 'mailinator.com',
    '10minutemail.com', 'temp-mail.org', 'fakeinbox.com', 'trashmail.com'
  ];
  const domain = email.split('@')[1]?.toLowerCase();
  if (disposableDomains.includes(domain)) return false;
  
  return true;
}

router.post('/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ valid: false, message: 'Please provide a valid email address' });
    }
    
    const existingEntry = await Waitlist.findOne({ email: email.toLowerCase() });
    
    if (existingEntry) {
      if (existingEntry.isVerified) {
        return res.json({ valid: false, exists: true, verified: true, message: 'This email is already on the waitlist' });
      } else {
        return res.json({ valid: true, exists: true, verified: false, message: 'Email pending verification' });
      }
    }
    
    return res.json({ valid: true, exists: false, message: 'Email is available' });
  } catch (error) {
    console.error('Email check error:', error);
    res.status(500).json({ valid: false, message: 'Failed to check email' });
  }
});

router.post('/', async (req, res) => {
  try {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({ message: 'Too many requests. Please try again later.' });
    }
    
    const { 
      email, 
      firstName, 
      lastName, 
      isConstructionProfessional,
      profession,
      professionOther,
      nonProfessionalRole,
      interestReason 
    } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }
    
    if (!firstName || !lastName) {
      return res.status(400).json({ message: 'Please provide your first and last name' });
    }
    
    if (firstName.length < 2 || lastName.length < 2) {
      return res.status(400).json({ message: 'Name must be at least 2 characters' });
    }
    
    if (typeof isConstructionProfessional !== 'boolean') {
      return res.status(400).json({ message: 'Please specify if you are a construction professional' });
    }
    
    if (isConstructionProfessional && !profession) {
      return res.status(400).json({ message: 'Please select your profession' });
    }
    
    if (profession === 'other' && !professionOther) {
      return res.status(400).json({ message: 'Please specify your profession' });
    }

    const existingEntry = await Waitlist.findOne({ email: email.toLowerCase() });
    
    if (existingEntry) {
      if (existingEntry.isVerified) {
        return res.status(200).json({ 
          message: 'You are already on the waitlist!', 
          alreadyExists: true,
          verified: true 
        });
      } else {
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
        
        existingEntry.verificationToken = verificationToken;
        existingEntry.verificationTokenExpiry = tokenExpiry;
        existingEntry.firstName = firstName;
        existingEntry.lastName = lastName;
        await existingEntry.save();
        
        const emailSent = await sendVerificationEmail(email.toLowerCase(), firstName, verificationToken);
        
        if (!emailSent) {
          return res.status(500).json({ message: 'Failed to send verification email. Please try again.' });
        }
        
        return res.status(200).json({ 
          message: 'We\'ve resent the verification email. Please check your inbox.',
          pendingVerification: true 
        });
      }
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const newEntry = new Waitlist({ 
      email: email.toLowerCase(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      isConstructionProfessional,
      profession: isConstructionProfessional ? profession : undefined,
      professionOther: profession === 'other' ? professionOther?.trim() : undefined,
      nonProfessionalRole: !isConstructionProfessional ? nonProfessionalRole?.trim() : undefined,
      interestReason: interestReason?.trim(),
      isVerified: false,
      verificationToken,
      verificationTokenExpiry: tokenExpiry
    });
    
    await newEntry.save();

    const emailSent = await sendVerificationEmail(email.toLowerCase(), firstName, verificationToken);
    
    if (!emailSent) {
      await Waitlist.deleteOne({ _id: newEntry._id });
      return res.status(500).json({ message: 'Failed to send verification email. Please try again.' });
    }

    res.status(201).json({ 
      message: 'Please check your email to verify and complete your registration!',
      pendingVerification: true,
      success: true 
    });
  } catch (error: any) {
    console.error('Waitlist error:', error);
    
    if (error.code === 11000) {
      return res.status(200).json({ message: 'You are already on the waitlist!', alreadyExists: true });
    }
    
    res.status(500).json({ message: 'Failed to join waitlist. Please try again.' });
  }
});

router.get('/verify', async (req, res) => {
  try {
    const { token } = req.query;
    
    if (!token || typeof token !== 'string') {
      return res.redirect('/?verification=invalid');
    }
    
    const entry = await Waitlist.findOne({ 
      verificationToken: token,
      verificationTokenExpiry: { $gt: new Date() }
    });
    
    if (!entry) {
      return res.redirect('/?verification=expired');
    }
    
    if (entry.isVerified) {
      return res.redirect('/?verification=already');
    }
    
    entry.isVerified = true;
    entry.verifiedAt = new Date();
    entry.verificationToken = undefined;
    entry.verificationTokenExpiry = undefined;
    await entry.save();
    
    await sendWelcomeEmail(entry.email, entry.firstName);
    
    return res.redirect('/?verification=success');
  } catch (error) {
    console.error('Verification error:', error);
    return res.redirect('/?verification=error');
  }
});

router.post('/verify-token', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token || typeof token !== 'string') {
      return res.status(400).json({ status: 'invalid', message: 'Invalid verification token' });
    }
    
    const entry = await Waitlist.findOne({ 
      verificationToken: token,
      verificationTokenExpiry: { $gt: new Date() }
    });
    
    if (!entry) {
      const expiredEntry = await Waitlist.findOne({ verificationToken: token });
      if (expiredEntry) {
        return res.status(400).json({ status: 'expired', message: 'Verification link has expired' });
      }
      return res.status(400).json({ status: 'invalid', message: 'Invalid verification token' });
    }
    
    if (entry.isVerified) {
      return res.json({ status: 'already', message: 'Email is already verified' });
    }
    
    entry.isVerified = true;
    entry.verifiedAt = new Date();
    entry.verificationToken = undefined;
    entry.verificationTokenExpiry = undefined;
    await entry.save();
    
    await sendWelcomeEmail(entry.email, entry.firstName);
    
    return res.json({ status: 'success', message: 'Email verified successfully' });
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ status: 'error', message: 'Something went wrong' });
  }
});

router.post('/resend-verification', async (req, res) => {
  try {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({ message: 'Too many requests. Please try again later.' });
    }
    
    const { email } = req.body;
    
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }
    
    const entry = await Waitlist.findOne({ email: email.toLowerCase() });
    
    if (!entry) {
      return res.status(404).json({ message: 'Email not found on waitlist' });
    }
    
    if (entry.isVerified) {
      return res.status(200).json({ message: 'Email is already verified', verified: true });
    }
    
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
    entry.verificationToken = verificationToken;
    entry.verificationTokenExpiry = tokenExpiry;
    await entry.save();
    
    const emailSent = await sendVerificationEmail(entry.email, entry.firstName, verificationToken);
    
    if (!emailSent) {
      return res.status(500).json({ message: 'Failed to send verification email. Please try again.' });
    }
    
    res.json({ message: 'Verification email sent successfully', success: true });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ message: 'Failed to resend verification email' });
  }
});

router.get('/count', async (req, res) => {
  try {
    const count = await Waitlist.countDocuments({ isVerified: true });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get waitlist count' });
  }
});

export default router;
