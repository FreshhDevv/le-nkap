const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let user = new User({
    user_name: req.body.user_name,
    join_date: req.body.join_date,
  });
  user = await user.save();
  res.send(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");
  res.send(user);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { user_name: req.body.user_name, join_date: req.body.join_date },
    { new: true }
  );
  if (!user)
    return res.status(404).send("The user with the given ID was not found");
  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");
  res.send(user);
});

module.exports = router;
