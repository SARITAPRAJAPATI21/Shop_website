import express from 'express'
import {addProduct,listProducts,removeProduct,singleProduct} from '../controllers/productController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js';

const productRoute =express.Router();

productRoute.post('/add',adminAuth,
upload.fields(
    [   {name:"image1",maxCount:9999},
        {name:"image2",maxCount:99999},
        {name:"image3",maxCount:9999},
        {name:"image4",maxCount:99999}])

        ,addProduct)

productRoute.post('/remove',adminAuth,removeProduct)
productRoute.post('/single',singleProduct)
productRoute.get('/list',listProducts)

export default productRoute;