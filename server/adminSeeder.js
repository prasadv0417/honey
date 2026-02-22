import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const adminUser = {
  name: 'Admin',
  email: 'admin@honeyshop.com',
  password: 'Admin@1234',
  role: 'admin',
  phone: '9999999999',
};

const seedAdmin = async () => {
  try {
    // Remove any existing admin
    await User.deleteOne({ email: adminUser.email });
    console.log('✓ Cleared existing admin user (if any).');

    // Create the admin — password is auto-hashed by User model's pre-save hook
    const admin = await User.create(adminUser);

    console.log('\n✅ Admin user seeded successfully!');
    console.log('─────────────────────────────────');
    console.log(`  📧 Email    : ${adminUser.email}`);
    console.log(`  🔑 Password : ${adminUser.password}`);
    console.log(`  👤 Role     : ${admin.role}`);
    console.log('─────────────────────────────────');
    console.log('\n🔗 Login at: http://localhost:5173/admin/login\n');

    process.exit(0);
  } catch (err) {
    console.error('❌ Admin seeding failed:', err.message);
    process.exit(1);
  }
};

seedAdmin();
