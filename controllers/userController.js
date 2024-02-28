const userModel=require('../models/userModel');

const loginController=async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await userModel.findOne({email,password});
        if(!user){
            return res.status(404).send("user not found for these credentials");
        }
        res.status(200).json({
            success:true,
            user,
        })
    } catch(error){
        res.status(400).json({
            success:false,
            error,
        });
    }
};

const registerUserController=async (req,res)=>{
    try{
        const {email}=req.body;
        const user=await userModel.findOne({email});
        if(user){
            console.log("User with this email is alredy registered ")
        }
        const newUser=new userModel(req.body);
        await newUser.save();
        res.status(201).json({
            success:true,
            newUser,
        })
    }catch(error){
        res.status(400).json({
            success:false,
            error,
        })
        console.log(error);
    }
};

module.exports={loginController,registerUserController};