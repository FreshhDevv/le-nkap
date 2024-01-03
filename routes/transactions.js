const { Category } = require("../models/category");
const { Transaction, validate } = require("../models/transaction");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const transactions = await Transaction.find();
  res.send(transactions);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(404).send("Invalid category");

  const transaction = new Transaction({
    name: req.body.name,
    type: req.body.type,
    amount: req.body.amount,
    category: {
      _id: category._id,
      name: category.name,
    },
  });
  await transaction.save();
  res.send(transaction);
});

router.get("/:id", async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction)
    return res
      .status(404)
      .send("The transaction with the given ID was not found.");
  res.send(transaction);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(404).send("Invalid category");

  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
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
});

router.delete("/:id", async (req, res) => {
  const transaction = await Transaction.findByIdAndDelete(req.params.id);
  if (!transaction)
    return res
      .status(404)
      .send("The transaction with the given ID was not found.");

  res.send(transaction);
});

module.exports = router;
