const express=require("express");
const { addTransaction, getAllTransaction } = require("../controllers/transactionController");

const router=express.Router();

router.post('/addTransaction',addTransaction);
router.post('/getAllTransactions',getAllTransaction)

module.exports=router;