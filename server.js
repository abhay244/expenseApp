const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const morgar=require("morgan");
const morgan = require("morgan");

dotenv.config();
const PORT=process.env.PORT;
//express app
const app=express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


//routes
app.get("/",(req,res)=>{
    res.send("server started running");
})

//listen server
app.listen(PORT,()=>{
    console.log("server started")
})