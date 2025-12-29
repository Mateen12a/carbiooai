import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;
  
  if (!MONGODB_URI) {
    console.warn('MONGODB_URI environment variable is not set. Database features will be unavailable.');
    return;
  }
  
  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.warn('Continuing without database connection...');
  }
}

export default mongoose;
