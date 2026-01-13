import mongoose from 'mongoose';
import { config } from '../config/config.js';

//db 연결 오래걸림 비동기처리
export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('✅ MongoDB connected successfully.');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);//강종
  }
};

export const disconnectDB = async () => {
  await mongoose.connection.close();
};