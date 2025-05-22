import jwt from 'jsonwebtoken'

const adminAuth = async(req,res,next)=>{

    try {
         const {token}=req.headers
         console.log("admitauth")
         
         if(!token){
            return res.json({success:false,message:"Not authrized to login"})
         }
         const token_decode =  jwt.verify(token, process.env.JWT_SECRET_KEY)

         if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASS){
           
            return res.json({success:false,message:"Not authrized to login"})

         }
         next()
      


    } catch (error) {
        console.log(error)
        res.json({succes:false ,error:error.message,message:"sever isssus admit"})
        
    }

}
export default adminAuth
