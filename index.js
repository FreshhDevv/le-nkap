const error = require('./middleware/error')
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
  .connect(process.env.MONGODB_CONNECT_URI)
  .then(() => console.log("Connected to MongoDb..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());

app.use("/users", users);
app.use("/categories", categories);
app.use('/transactions', transactions)
app.use('/auth', auth)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Error middleware
app.use(error)

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
