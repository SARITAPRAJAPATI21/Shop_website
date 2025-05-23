import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudnary.js';
import userRoute from './routes/userRoutes.js'
import productRoute from './routes/productroute.js';
import cartRouter from './routes/cartRoute.js';
import orderRoute from './routes/orderRoute.js';

const app = express();
const port=process.env.PORT || 4000;

connectDB();
connectCloudinary();

//middleware
app.use(express.json())
app.use(cors())
 
// api endpoint
app.use('/api/user',userRoute)
app.use('/api/product',productRoute)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRoute)


app.get('/', function (req, res) {
   
    res.send('GeeksforGeeks 34');
});
 
app.listen(port, function () {
    console.log('Listening.....',port);
});