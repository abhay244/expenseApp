const transactionModel=require("../models/transactionModel");

const addTransaction=async(req,res)=>{
try {
    const newTransaction=new transactionModel(req.body);
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
        const transactions=await transactionModel.find({userId:req.body.userId});
        if(transactions){
            return res.status(200).json({
                success:true,
                transactions:transactions,
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