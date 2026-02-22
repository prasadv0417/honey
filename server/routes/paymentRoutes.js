import express from 'express';
const router = express.Router();
import {
  generateToken,
  paymentCallback,
} from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/generate_token', protect, generateToken);
router.post('/callback', paymentCallback);

export default router;
