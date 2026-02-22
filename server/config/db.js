import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected Success fully`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error('The server will continue to run without a Database Connection');
    // process.exit(1);
  }
};

export default connectDB;
