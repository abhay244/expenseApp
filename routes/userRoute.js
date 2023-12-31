const express=require("express");
const { loginController, registerUserController } = require("../controllers/userController");

const router=express.Router();
//login route
router.post('/login',loginController);

//register route
router.post('/register',registerUserController);


module.exports=router;