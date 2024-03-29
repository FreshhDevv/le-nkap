const { Category } = require("../models/category");
const { Transaction, validate } = require("../models/transaction");

const getAllTransactions = async (req, res) => {
  const userId = req.user._id;
  const transactions = await Transaction.find({ userId: userId });
  res.send(transactions);
}

const addTransaction = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(404).send("Invalid category");

  const validTypes = ["expense", "income"];
  if (!validTypes.includes(req.body.type)) {
    return res
      .status(400)
      .send(
        "Invalid transaction type. It should be either 'expense' or 'income'."
      );
  }

  const userId = req.user._id;
  const transaction = new Transaction({
    name: req.body.name,
    type: req.body.type,
    amount: req.body.amount,
    category: {
      _id: category._id,
      name: category.name,
    },
    userId: userId,
  });
  await transaction.save();
  res.send(transaction);
}

const getTransaction = async (req, res) => {
  const transaction = await Transaction.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });
  if (!transaction)
    return res
      .status(404)
      .send("The transaction with the given ID was not found.");
  res.send(transaction);
}

const updateTransaction = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(404).send("Invalid category");

  const validTypes = ["expense", "income"];
  if (!validTypes.includes(req.body.type)) {
    return res
      .status(400)
      .send(
        "Invalid transaction type. It should be either 'expense' or 'income'."
      );
  }

  const transaction = await Transaction.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    {
      name: req.body.name,
      type: req.body.type,
      amount: req.body.amount,
      category: { _id: category._id, name: category.name },
    },
    { new: true }
  );
  if (!transaction)
    return res
      .status(404)
      .send("The transaction with the given ID was not found.");
  res.send(transaction);
}

const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
  });
  if (!transaction)
    return res
      .status(404)
      .send("The transaction with the given ID was not found.");

  res.send(transaction);
}

module.exports = {
  getAllTransactions,
  addTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
