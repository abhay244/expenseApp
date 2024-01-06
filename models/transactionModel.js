const mongoose=require("mongoose");

const transactionSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:[true,"user Id is required"]
    },
    amount:{
        type:Number,
       required:[true,"amount is requied"],
    },
    category:{
        type:String,
        required:[true,"category is required"],
    },
    description:{
        type:String,
        required:[true,"description is required"],
    },
    referance:{
        type:String,
    },
    date:{
        type:String,
        required:[true,"date of transaction id required"],
    }
})

const transactionModel=mongoose.model('transactions',transactionSchema);
module.exports=transactionModel;
