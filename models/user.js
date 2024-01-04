const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require('jsonwebtoken')
const config = require('config')

// Define the user schema
const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
    unique: true,
  },
  join_date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey'))
  return token
}

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
