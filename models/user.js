const mongoose = require("mongoose");
const Joi = require("joi");

// Define the user schema
const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
    unique: true
  },
  join_date: {
    type: Date,
    default: Date.now,
  },
});

// Initialize the user model
const User = mongoose.model("User", userSchema);

// Validation rules using Joi
function validateUser(user) {
  const schema = Joi.object({
    user_name: Joi.string().min(5).max(50).required(),
    join_date: Joi.date(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
