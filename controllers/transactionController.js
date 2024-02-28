const transactionModel=require("../models/transactionModel");
const moment=require("moment");
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
        const {frequency,selectedDateRange}=req.body;
        const transactions=await transactionModel.find({
            userId:req.body.userId,
            ...(frequency!=='custom'?{
                date:{
                    $gt:moment().subtract(Number(frequency),'d').toDate()
                }
            }:{
                date:{
                    $gte:selectedDateRange[0],
                    $lte:selectedDateRange[1]
                }
            })
            
        });
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