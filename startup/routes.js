const express = require("express");
const error = require("../middleware/error");
// const users = require("./routes/users");
const users = require('../routes/users')
const categories = require("../routes/categories");
const transactions = require("../routes/transactions");
const auth = require("../routes/auth");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDocument = YAML.load("./swagger.yaml");

module.exports = function (app) {
  app.use(express.json());

  app.use("/users", users);
  app.use("/categories", categories);
  app.use("/transactions", transactions);
  app.use("/auth", auth);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  //Error middleware
  app.use(error);
};
