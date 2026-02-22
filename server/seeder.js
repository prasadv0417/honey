import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

// NOTE: These are placeholder images using proper {url, public_id} structure.
// After seeding, go to Admin Panel > Products > Edit each product
// and upload real Cloudinary images using the image upload feature.
const products = [
  {
    name: 'Tulasi Honey',
    description: 'Infused with the essence of sacred Holy Basil (Tulasi), this honey is revered for its powerful antibacterial and immunity-boosting properties. A staple of Ayurvedic wellness.',
    price: 249,
    sizes: [
      { size: '250g', price: 249, stock: 50 },
      { size: '500g', price: 399, stock: 35 },
      { size: '1kg', price: 749, stock: 20 },
    ],
    stock: 105,
    images: [{ url: 'https://images.unsplash.com/photo-1601373405437-f8e0d80e02c0?auto=format&fit=crop&q=80&w=800', public_id: 'honey_ecommerce/tulasi_placeholder' }],
    category: 'Herbal Honey',
    ingredients: '100% Raw Honey, Tulasi (Holy Basil) Extract',
    healthBenefits: ['Boosts Immunity', 'Antibacterial Properties', 'Soothes Sore Throat', 'Promotes Respiratory Health'],
    isActive: true,
  },
  {
    name: 'Ashwagandha Honey',
    description: 'A powerful blend of pure raw honey with Ashwagandha root extract. Known to reduce stress, enhance vitality, and support hormonal balance.',
    price: 349,
    sizes: [
      { size: '250g', price: 349, stock: 40 },
      { size: '500g', price: 549, stock: 25 },
      { size: '1kg', price: 999, stock: 10 },
    ],
    stock: 75,
    images: [{ url: 'https://images.unsplash.com/photo-1587049352847-4d431cde70c2?auto=format&fit=crop&q=80&w=800', public_id: 'honey_ecommerce/ashwagandha_placeholder' }],
    category: 'Herbal Honey',
    ingredients: '100% Raw Honey, Ashwagandha Root Extract',
    healthBenefits: ['Reduces Stress & Anxiety', 'Boosts Stamina', 'Supports Hormonal Balance', 'Anti-inflammatory'],
    isActive: true,
  },
  {
    name: 'Jamun Honey',
    description: 'Harvested near Indian Blackberry (Jamun) orchards, this dark, distinctively flavored honey is prized for its blood-sugar regulating properties and rich mineral content.',
    price: 299,
    sizes: [
      { size: '250g', price: 299, stock: 45 },
      { size: '500g', price: 499, stock: 30 },
      { size: '1kg', price: 899, stock: 15 },
    ],
    stock: 90,
    images: [{ url: 'https://images.unsplash.com/photo-1471943311424-646960bdbcca?auto=format&fit=crop&q=80&w=800', public_id: 'honey_ecommerce/jamun_placeholder' }],
    category: 'Medicinal Honey',
    ingredients: '100% Raw Jamun Honey',
    healthBenefits: ['Regulates Blood Sugar', 'Rich in Iron & Minerals', 'Improves Digestion', 'Diabetic-Friendly'],
    isActive: true,
  },
  {
    name: 'Wild Forest Honey',
    description: 'Collected by native bee colonies deep within undisturbed forests, this unfiltered, raw honey captures the essence of hundreds of wild florals. Bold, complex, and completely natural.',
    price: 279,
    sizes: [
      { size: '250g', price: 279, stock: 60 },
      { size: '500g', price: 449, stock: 40 },
      { size: '1kg', price: 849, stock: 20 },
    ],
    stock: 120,
    images: [{ url: 'https://images.unsplash.com/photo-1557007559-0091494fd95c?auto=format&fit=crop&q=80&w=800', public_id: 'honey_ecommerce/wild_forest_placeholder' }],
    category: 'Raw Honey',
    ingredients: '100% Raw Wild Forest Honey',
    healthBenefits: ['Rich in Antioxidants', 'Natural Energy Booster', 'Anti-microbial', 'Supports Gut Health'],
    isActive: true,
  },
  {
    name: 'Eucalyptus Honey',
    description: 'Derived from eucalyptus groves, this light amber honey carries a distinct, pleasantly mentholated flavor. Widely used to support respiratory health and soothe coughs.',
    price: 249,
    sizes: [
      { size: '250g', price: 249, stock: 55 },
      { size: '500g', price: 399, stock: 35 },
      { size: '1kg', price: 749, stock: 15 },
    ],
    stock: 105,
    images: [{ url: 'https://images.unsplash.com/photo-1588691888914-9bf58df2b947?auto=format&fit=crop&q=80&w=800', public_id: 'honey_ecommerce/eucalyptus_placeholder' }],
    category: 'Medicinal Honey',
    ingredients: '100% Raw Eucalyptus Honey',
    healthBenefits: ['Clears Congestion', 'Soothes Cough & Cold', 'Anti-inflammatory', 'Natural Antiseptic'],
    isActive: true,
  },
  {
    name: 'Multiflora Honey',
    description: 'A beautifully balanced honey sourced from diverse wildflowers across the Indian subcontinent. Its complex floral sweetness and rich golden hue make it a kitchen and wellness staple.',
    price: 199,
    sizes: [
      { size: '250g', price: 199, stock: 70 },
      { size: '500g', price: 349, stock: 50 },
      { size: '1kg', price: 649, stock: 30 },
    ],
    stock: 150,
    images: [{ url: 'https://images.unsplash.com/photo-1601373405485-5ebcf39e6d72?auto=format&fit=crop&q=80&w=800', public_id: 'honey_ecommerce/multiflora_placeholder' }],
    category: 'Raw Honey',
    ingredients: '100% Raw Multiflora Honey',
    healthBenefits: ['Boosts Immunity', 'Rich in Vitamins', 'Natural Sweetener', 'Good for Skin'],
    isActive: true,
  },
  {
    name: 'Rosewood Honey',
    description: 'A rare and exotic premium honey sourced from Rosewood blossoms. It carries a subtle floral rose-like fragrance with a silky smooth texture. Perfect as a gourmet gift.',
    price: 449,
    sizes: [
      { size: '250g', price: 449, stock: 30 },
      { size: '500g', price: 699, stock: 20 },
      { size: '1kg', price: 1299, stock: 10 },
    ],
    stock: 60,
    images: [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800', public_id: 'honey_ecommerce/rosewood_placeholder' }],
    category: 'Premium Honey',
    ingredients: '100% Raw Rosewood Honey',
    healthBenefits: ['Reduces Inflammation', 'Promotes Heart Health', 'Antioxidant Rich', 'Enhances Mood'],
    isActive: true,
  },
];

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log('✓ Existing products cleared.');

    const inserted = await Product.insertMany(products);
    console.log(`✅ Successfully seeded ${inserted.length} honey products!`);
    console.log('\nProducts saved to MongoDB:');
    inserted.forEach(p => console.log(`  • ${p.name} (${p._id})`));
    console.log('\n💡 Tip: Upload real Cloudinary images via Admin Panel > Products > Edit');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
};

seedProducts();
