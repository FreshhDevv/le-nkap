const auth = require('../middleware/auth')
const express = require("express");
const router = express.Router();
const { registerUser, loggedInUser } = require('../controllers/userController');

// router.get("/", async (req, res) => {
//   const users = await User.find().sort("name");
//   res.send(users);
// });

router.post("/", registerUser);

// Get logged in user
router.get("/me", auth, loggedInUser);

// router.put("/me", auth, async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);
//   const user = await User.findByIdAndUpdate(
//     req.user._id,
//     { name: req.body.name, join_date: req.body.join_date },
//     { new: true }
//   );
//   if (!user)
//     return res.status(404).send("The user with the given ID was not found");
//   res.send(user);
// });

// router.delete("/:id", async (req, res) => {
//   const user = await User.findByIdAndDelete(req.params.id);
//   if (!user)
//     return res.status(404).send("The user with the given ID was not found.");
//   res.send(user);
// });

module.exports = router;