import process from "process";   // require does not work here causes error
import mongoose from "mongoose";
const DB_URI = process.env.DB_URI;

if (!DB_URI) {
  throw new Error("Please define mongodb URL inside .evn");
}

export const  connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to database .... `);
  } catch (e) {
    console.log("Error connecting to database...", e);

    process.exit(1);
  }
};


