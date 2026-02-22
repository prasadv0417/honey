import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  getMe,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  addAddress,
  deleteAddress
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

router
  .route('/me')
  .get(protect, getMe)
  .put(protect, updateUserProfile);

router.post('/address', protect, addAddress);
router.delete('/address/:addressId', protect, deleteAddress);

export default router;
