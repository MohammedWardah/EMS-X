import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToDatabase;
