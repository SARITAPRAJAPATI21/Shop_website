import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe'
//gorbal variable
const currency='inr'
const DeliveryCharges = 10

//getway intailize 
const stripe= new Stripe(process.env.STRIPE_SECRET_KEY)

//place order using cash on delivery
const placeOrder=async(req,res)=>{
    console.log("order placeing .... COD")
    try {
         const {userId,items,amount,address}=req.body
         const orderData={
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
         }
         console.log(orderData)

         const newOrder= new orderModel(orderData)
         await newOrder.save();

         await userModel.findByIdAndUpdate(userId,{cartData:{}})

         res.json({success:true,message:"Order Placed"})
    } catch (error) {
        console.log(error.message) 
         res.json({success:false,message:error.message})
        
    }

}

// Stripe
const placeOrderStripe=async(req,res)=>{
     console.log("place order through stripe...")
    try {
             const {userId,items,amount,address}=req.body
             const {origin} =req.headers
           // console.log(origin)
            const orderData={
            userId,
            items,
            amount,
            address,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()
         }
         const newOrder= new orderModel(orderData)
         await newOrder.save();

         const line_items =items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name: item.name
                },
                unit_amount :item.price*100
            },
            quantity:item.quantity
         }))
        line_items.push({ price_data:{
                currency:currency,
                product_data:{
                    name: 'Delivery Charges'
                },
                unit_amount :DeliveryCharges*100
            },
            quantity:1
        })
        const session =await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment'
        })
       // console.log(session.url)
        res.json({success:true, session_url:session.url})

        
    } catch (error) {
             console.log("error",error.message) 
         res.json({success:false,message:error.message})
        
    }
    
}

const verifyStripe=async(req,res)=>{
    try {  console.log("verifyStripe")
        const {orderId,success,userId}=req.body 
        //  console.log(orderId, typeof success,userId)
        if(success==="true"){
             console.log("sucess")
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true})
        }
        else{
              console.log("sucess false")
            await orderModel.findByIdAndDelete(orderId)
             res.json({success:false})
        }
    } catch (error) {
           console.log(error.message) 
         res.json({success:false,message:error.message})
        
    }
}

//Razorpay
const placeOrderRazorpay=async(req,res)=>{
    
}

// for Admin pane;
const allOrder=async(req,res)=>{
    try {
        console.log("order list....")
        const orders = await orderModel.find({})
        return res.json({success:true,orders})
        
    } catch (error) {
         console.log("error in order list")
         return res.json({success:false,error:error.message})
    }
    
}

//for fronted
const userOrder=async(req,res)=>{
    console.log("userOrder....")
    try {
         const {userId}=req.body;
         const orders= await orderModel.find({userId})
         return res.json({success:true,orders})

        
    } catch (error) {
        console.log(error.message) 
        res.json({success:false,message:error.message})
        
    }
    
}
//update stateus from admin panel
const updateStatus=async(req,res)=>{
    try { console.log("update statis")
         
         const{orderId,status}=req.body;

         console.log(orderId,status)
     
          const orders= await orderModel.findByIdAndUpdate(orderId,{status})
        
          return res.json({success:true,message:"Updateed Successfully"})
    } catch (error) {
        console.log(error.message) 
        res.json({success:false,message:error.message})
        
    }
    
}

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrder,userOrder,updateStatus,verifyStripe}