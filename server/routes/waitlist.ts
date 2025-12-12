import { Router } from 'express';
import Waitlist from '../db/models/Waitlist';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const existingEntry = await Waitlist.findOne({ email: email.toLowerCase() });
    
    if (existingEntry) {
      return res.status(200).json({ message: 'You are already on the waitlist!', alreadyExists: true });
    }

    const newEntry = new Waitlist({ email: email.toLowerCase() });
    await newEntry.save();

    res.status(201).json({ message: 'Successfully joined the waitlist!', success: true });
  } catch (error: any) {
    console.error('Waitlist error:', error);
    
    if (error.code === 11000) {
      return res.status(200).json({ message: 'You are already on the waitlist!', alreadyExists: true });
    }
    
    res.status(500).json({ message: 'Failed to join waitlist. Please try again.' });
  }
});

router.get('/count', async (req, res) => {
  try {
    const count = await Waitlist.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get waitlist count' });
  }
});

export default router;
