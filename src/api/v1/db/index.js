import mongoose from "mongoose";

export const dbInit = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    return true;
  } catch (error) {
    return false;
  }
};
