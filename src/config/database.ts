import mongoose from "mongoose";
import { env } from "process";
import * as dotenv from "dotenv"
dotenv.config()
const MONGO_URL =
`mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@cluster0.r4adt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
// mongoose.Promise = Promise;
export const databaseConnection = () => {
  try {
    mongoose.connect(MONGO_URL).then(() => {
      console.log("connections db done");
    });
    mongoose.connection.on("error", (error: Error) => console.log(error));  
  } catch (error) {
    console.log(error.message);
  }
};
