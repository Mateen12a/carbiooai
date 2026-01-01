import { Router } from 'express';
import authRoutes from './auth';
import projectRoutes from './projects';
import materialRoutes from './materials';
import scanRoutes from './scans';
import reportRoutes from './reports';
import modelRoutes from './models';
import waitlistRoutes from './waitlist';
import contactRoutes from './contact';
import investorRoutes from './investor';

const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/materials', materialRoutes);
router.use('/scans', scanRoutes);
router.use('/reports', reportRoutes);
router.use('/models', modelRoutes);
router.use('/waitlist', waitlistRoutes);
router.use('/contact', contactRoutes);
router.use('/investor', investorRoutes);

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
