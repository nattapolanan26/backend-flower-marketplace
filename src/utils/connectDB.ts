import mongoose from 'mongoose';
import config from 'config';

const dbUrl = 'mongodb+srv://nattapola26:1234@cluster0.wim21nu.mongodb.net/?retryWrites=true&w=majority';
// const dbUrl = `mongodb://${config.get('dbName')}:${config.get('dbPass')}@localhost:6000/flower-marketplace?authSource=admin`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log('Database connected...');
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;

