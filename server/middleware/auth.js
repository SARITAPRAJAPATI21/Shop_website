import jwt from 'jsonwebtoken'

const Userauth= async(req,res,next)=>{

    const {token}=req.headers;
   //  console.log("userauth",token)
    if(!token){
        return res.json({success:false ,message:"Not authrozied Login again"})
    }
    try {
        const token_decode= jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.body.userId=token_decode.id
        next();
        
    } catch (error) {
        console.log("auth error")
        return res.json({success:false,message:error.message})
        
    }

}
export default Userauth;
