const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes/todo");
PORT = 8000;

const app = express();

app.use(cors());
app.use(express.json());

require("./connection/db");

app.use("/api/todo", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
