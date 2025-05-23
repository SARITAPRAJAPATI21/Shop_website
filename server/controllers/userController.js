import userModel from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createtoken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY, { expiresIn: "1h"})
}
const loginUser = async(req,res)=>{
    try {
        const {email,password}=req.body;
        console.log("login user")
    
        const user= await userModel.findOne({email})
        if(!user){
            return res.json({success :false ,message:"user does not exists"})
            
         }
         const isMatch =await bcrypt.compare(password,user.password)
    
         if(isMatch){
            const token =createtoken(user._id);
            res.json({success:true,token,message:"Login Successfully"})
         }
         else{
            res.json({success:false,message:"Password not match"})
            
         }
        
    } catch (error) {
        console.log("Internal error",error)
        return res.json({ success:false,message:error.message})
        
    }
   

}

const registerUser = async(req,res)=>{
    try {
        
        const {name,email,password}=req.body;
         console.log("register user")
        //checking user exits already
        const exists= await userModel.findOne({email})
        if(exists){
           return res.json({success :false ,message:"user Already exists"})
        }

        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success :false ,message:"please enter valid email"})
        }
        if(password.length < 8){
            return res.json({success :false ,message:"please enter strong password"})
        }

        //hashing password
        const salt=await bcrypt.genSalt(10);
        const hassPassword =await bcrypt.hash(password,salt);

        const newUser =new userModel({
            name,
            email,
            password:hassPassword
        })
        const user = newUser.save();
       const token =createtoken(user._id);

      return res.json({success:true ,token,message:" successfully register"})

  

    } catch (error) {
        console.log("Internal error",error)
        return res.json({ success:false,message:error.message})
    }

}

const adminLogin = async(req,res)=>{
    try {
         console.log("admin permission")
        const {email,password}=req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS){
            const token= jwt.sign(email+password,process.env.JWT_SECRET_KEY)
            res.json({success:true,token,message:"Login successfully"})
        }
        else{
            res.json({success:false,message:"Invaild credentials"})
        }
        
    } catch (error) {
        console.log("Internal error",error)
        return res.json({ success:false,message:error.message})
        
    }

   

}

export {loginUser,registerUser,adminLogin}