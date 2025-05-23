import mongoose from 'mongoose';
const DB= process.env.DATABASE;

const connectDB = async()=>{
    try {
        mongoose.connection.on('connected',()=>{
            console.log("DB Connected")
           })
        await mongoose.connect(DB)
  
        
    } catch (error) {
        console.log("Not conected",error)
        
    }
   
}


export default connectDB;