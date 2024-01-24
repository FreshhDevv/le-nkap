const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const logger = require('./startup/logger')
require("./startup/routes")(app);
require('./startup/db')

const config = require("config");



if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}



app.use(cors())

app.use(express.json());


logger.info("Server started successfully.")

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
