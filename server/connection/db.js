import mongoose from "mongoose";

const ConnectDB = async () => {
  const stringDB = process.env.MONGO_URI;

  if (!stringDB) {
    console.log("No String");
    throw new Error("No String");
  }
  if (typeof stringDB !== "string") console.log("Not String URL");

  await mongoose.connect(stringDB);
};

export default ConnectDB;
