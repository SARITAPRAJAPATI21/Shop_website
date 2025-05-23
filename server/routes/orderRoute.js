import express from 'express'
import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrder,userOrder,updateStatus, verifyStripe} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import Userauth from '../middleware/auth.js'

const orderRoute = express.Router()

//admin featues
orderRoute.post('/list',adminAuth,allOrder)
orderRoute.post('/status',adminAuth,updateStatus)

//payment featues
orderRoute.post('/place',Userauth,placeOrder)
orderRoute.post('/stripe',Userauth,placeOrderStripe)
orderRoute.post('/razorpay',Userauth,placeOrderRazorpay)

//verify strip
orderRoute.post('/verifyStripe',Userauth,verifyStripe)

//user featues
orderRoute.post('/userorders',Userauth,userOrder)

export default orderRoute;
