const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = await User.findOne({name: req.body.name})
  if(user) return res.status(400).send('User name already exists.')

  user = await User.findOne({phone: req.body.phone})
  if(user) return res.status(400).send('Phone number already registered.')

  if(!req.body.passwordConfirmation) return res.status(400).send('Password confirmation is required.')

  if(req.body.password !== req.body.passwordConfirmation) return res.status(400).send('Passwords do not match')

  user = new User(_.pick(req.body, ["name", "email", "phone", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email", "phone"]));
};

const loggedInUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send(user);
};

module.exports = { registerUser, loggedInUser };
