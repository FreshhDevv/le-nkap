const mongoose = require("mongoose");
require("dotenv").config();

const express = require("express");
const app = express();
const users = require("./routes/users");

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Connected to MongoDb..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());

app.use("/api/users", users);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
