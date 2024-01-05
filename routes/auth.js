const _ = require("lodash");
const { User } = require("../models/user");
const express = require("express");
const Joi = require("joi");
const router = express.Router();
const bcrypt = require("bcrypt");
const { login } = require("../controllers/authController");

router.post("/", login);

module.exports = router;
