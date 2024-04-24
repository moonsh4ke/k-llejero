import { app } from "./app";
import mongoose from "mongoose";

const startMongo = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("Mongo URI not found");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongodb");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startMongo();

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});
