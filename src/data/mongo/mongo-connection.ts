import mongoose from "mongoose";
import { envs } from "../../config";

export const mongoConnection = async () => {
  try {
    await mongoose.connect(envs.MONGO_DB_CONNECTION);
    console.log("MongoDB Online!!");
  } catch (error) {
    console.log(error);
    throw new Error("Error when initializing MongoDB!!");
  }
};
