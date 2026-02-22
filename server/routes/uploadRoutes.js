import express from 'express';
import { upload, cloudinary } from '../config/cloudinary.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// @desc    Upload image(s) to cloudinary
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, admin, upload.array('images', 5), (req, res) => {
  const fileUrls = req.files.map((file) => ({
    url: file.path, // The Cloudinary secure_url
    public_id: file.filename, // The Cloudinary public_id
  }));

  res.send(fileUrls);
});

// @desc    Delete image from cloudinary
// @route   DELETE /api/upload/:public_id
// @access  Private/Admin
router.delete(
  '/:public_id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    // Note: Cloudinary expects the full public_id, which often includes the folder name, 
    // replacing slash in url string if passed through query
    // e.g: honey_ecommerce/abc123xyz
    const result = await cloudinary.uploader.destroy(req.params.public_id);
    
    if (result.result === 'ok') {
      res.send({ message: 'Image deleted successfully' });
    } else {
      res.status(400);
      throw new Error('Image deletion failed');
    }
  })
);

export default router;
