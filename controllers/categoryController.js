const asyncMiddleware = require("../middleware/async");
const { Category, validate } = require("../models/category");

const getCategories = asyncMiddleware(async (req, res, next) => {
  const userId = req.user._id;
  try {
    const categories = await Category.find({ userId: userId }).sort("name");
    res.send(categories);
  } catch (ex) {
    next(ex);
  }
});

const addCategory = asyncMiddleware(async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const validTypes = ["expense", "income"];
  if (!validTypes.includes(req.body.type)) {
    return res
      .status(400)
      .send(
        "Invalid category type. It should be either 'expense' or 'income'."
      );
  }

  const userId = req.user._id;
  const category = new Category({
    name: req.body.name,
    type: req.body.type,
    userId: userId,
  });
  await category.save();
  res.send(category);
});

module.exports = {
  getCategories,
  addCategory,
};
