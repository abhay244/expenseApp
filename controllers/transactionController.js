const transactionModel=require("../models/transactionModel");

const addTransaction=async(req,res)=>{
try {
    const newTransaction=new transactionModel();
    await newTransaction.save();
    res.status(201).json({
        success:true,
        newTransaction
    })
} catch (error) {
    console.log(`${error}`);
    res.status(400).send(`${error}`);
}
}

const getAllTransaction=async(req,res)=>{
    try {
        const transactions=await transactionModel.find(req.body);
        if(transactions){
            return res.status(200).json({
                success:true,
                transactions,
            })
        }
        else{
            return res.status(200).json({
                success:true
            })
        }
    } catch (error) {
        console.log(`${error}`)
        res.status(400).send(`${error}`)
    }
}

module.exports={addTransaction,getAllTransaction};