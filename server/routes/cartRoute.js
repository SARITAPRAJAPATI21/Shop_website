import express from 'express'
import Userauth from '../middleware/auth.js';
import { addToCart,updateCart,getUserCart } from '../controllers/cartController.js'

const cartRouter =express.Router();

cartRouter.post('/get',Userauth,getUserCart)
cartRouter.post('/update',Userauth,updateCart)
cartRouter.post('/add',Userauth,addToCart)

export default cartRouter;