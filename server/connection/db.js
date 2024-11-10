const mongoose = require("mongoose");

const stringDB = process.env.MONGO_URI;

mongoose
  .connect(stringDB)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.error(err));
