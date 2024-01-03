const mongoose = require("mongoose");
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
require("dotenv").config();

const express = require("express");
const app = express();
const users = require("./routes/users");
const categories = require("./routes/categories");

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Connected to MongoDb..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());

app.use("/api/users", users);
app.use("/api/categories", categories);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
