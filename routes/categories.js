const { addCategory } = require('../controllers/categoryController');
const { getCategories } = require('../controllers/categoryController');
const auth = require('../middleware/auth')
const { Category, validate } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get("/", auth, getCategories);

router.post("/", auth, addCategory);

module.exports = router;
