import { Router } from 'express';
import { Contact } from '../db/models/Contact';
import { sendContactNotification } from '../services/emailService';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;
    
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newContact = new Contact({
      firstName,
      lastName,
      email,
      message
    });

    await newContact.save();
    
    // Send email notification
    await sendContactNotification({ firstName, lastName, email, message });

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
