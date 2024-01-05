const { addCategory } = require("../controllers/categoryController");
const { getCategories } = require("../controllers/categoryController");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", auth, getCategories);

router.post("/", auth, addCategory);

module.exports = router;
