import express from 'express'
import {loginUser,registerUser,adminLogin} from '../controllers/userController.js'
import adminAuth from '../middleware/adminAuth.js';

const userRoute =express.Router();



userRoute.post('/register',registerUser)
userRoute.post('/login',loginUser);
userRoute.post('/admin',adminLogin)
userRoute.post('/adminpasswordmodify',(req,res)=>{
    process.env.ADMIN_PASS=req.body.password;
// console.log(process.env.ADMIN_PASS)
})

export default userRoute;