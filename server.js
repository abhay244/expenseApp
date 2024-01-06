const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const morgar=require("morgan");
const morgan = require("morgan");
const connectDb = require("./config/connectDb");

dotenv.config();
const PORT=process.env.PORT;


//database call
 connectDb();

//express app
const app=express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


//routes
app.use('/api/v1/users', require('./routes/userRoute'));
app.use('/api/v1/transactions',require('./routes/transactionRoutes'));

//listen server
app.listen(PORT,()=>{
    console.log("server started running")
})