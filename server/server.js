import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import router from "./routes/todo.js";
import ConnectDB from "./connection/db.js";

dotenv.config();

const app = express();
const corsOptions = {
  origin: process.env.ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
const PORT = process.env.PORT || 8001;

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/todo", router);

ConnectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
