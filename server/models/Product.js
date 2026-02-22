import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a base price'],
      default: 0,
    },
    sizes: [
      {
        size: { type: String, required: true }, // e.g., '250g', '500g', '1kg'
        price: { type: Number, required: true },
        stock: { type: Number, required: true, default: 0 }
      }
    ],
    stock: { // Total stock or default variant stock
      type: Number,
      required: true,
      default: 0,
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true }
      }
    ],
    category: {
      type: String,
      default: 'Honey',
    },
    ingredients: String,
    healthBenefits: [String],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
