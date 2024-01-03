const mongoose = require("mongoose");
const Joi = require("joi");

const transactionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
  },
  type: {
    type: String,
    required: true,
    enum: ["expense", "income"],
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        trim: true,
      },
    }),
  },
  user: {
    type: new mongoose.Schema({
      user_name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
        trim: true,
      },
    }),
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

function validateTransaction(transaction) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    type: Joi.string().min(5).max(50).required(),
    amount: Joi.number().required(),
    categoryId: Joi.objectId().required(),
    userId: Joi.string().required(),
  });
  return schema.validate(user);
}

exports.Transaction = Transaction;
exports.validate = validateTransaction;
