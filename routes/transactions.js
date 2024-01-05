const { getAllTransactions, addTransaction, getTransaction, updateTransaction, deleteTransaction } = require('../controllers/transactionController');
const auth = require('../middleware/auth')
const express = require("express");
const router = express.Router();

router.get("/", auth, getAllTransactions);

router.post("/", auth, addTransaction);

router.get("/:id", auth, getTransaction);

router.put("/:id", auth, updateTransaction);

router.delete("/:id", auth, deleteTransaction);

module.exports = router;
