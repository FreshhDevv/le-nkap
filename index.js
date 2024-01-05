const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const users = require("./routes/users");
const categories = require("./routes/categories");
const transactions = require('./routes/transactions')
const auth = require('./routes/auth')
const config = require('config')

const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')

const swaggerDocument = YAML.load('./swagger.yaml')

if(!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1)
}

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Connected to MongoDb..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());

app.use("/api/users", users);
app.use("/api/categories", categories);
app.use('/api/transactions', transactions)
app.use('/api/auth', auth)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
