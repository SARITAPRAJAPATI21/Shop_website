import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const PlaceOrder = () => {
    const [method,setMethod]=useState('cod');
    const {navigate,backendUrl,token,cartItem,delivery_fee, setCartItem,getCartAmount,products}=useContext(ShopContext)
    const[formData,setFormData]=useState({
        firstName: '',
        lastName:'',
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:"",
    })
    const OnChangeHandler=async(event)=>{
        const name= event.target.name
        const value= event.target.value

        setFormData(data=>({...data,[name]:[value]}))

    }
    const onSubmitHandler=async(event)=>{
        event.preventDefault()
        console.log("submit")
        try {
            let orderItems=[]

            for( const items in  cartItem){
                for( const item in cartItem[items]){
                    if(cartItem[items][item]>0){
                     const itemIfo =structuredClone(products.find(products=>products._id===items))
                     if(itemIfo){
                        itemIfo.size=item
                        itemIfo.quantity=cartItem[items][item]
                        orderItems.push(itemIfo)
                     }
                    }
                }
            }
           // console.log(orderItmes)
           const orderData={
            address:formData,
            items:orderItems,
            amount:getCartAmount()+delivery_fee
           }
           console.log(orderItems)

           switch(method){
            case 'cod' : const response= await axios.post(backendUrl+'api/order/place',orderData,{headers:{token}})
                          if(response.data.success){
                            navigate('/orders')
                            setCartItem({})
                          }
                          else{
                             toast.error(response.data.message )
                          }
                          break;
            case 'stripe':  console.log("Stripe")
                        const responseStripe= await axios.post(backendUrl+'api/order/stripe',orderData,{headers:{token}})
                          if(responseStripe.data.success){
                            const {session_url}=responseStripe.data
                             console.log(session_url)
                            window.location.replace(session_url)
                           
                          }
                          else{
                             toast.error(responseStripe.data.message )
                          }
                         break
            default: break
                        
           }
        } catch (error) {
            console.log("not place ordered",error)
            
        }

    }

  return (
    <form  onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
    <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className='flex gap-3'>
            <input onChange={OnChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First name'/>
            <input onChange={OnChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last name'/>
        </div>
        <input onChange={OnChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='email'/>
        <input  onChange={OnChangeHandler} name='street' value={formData.street}className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='street'/>

        <div className='flex gap-3'>
            <input onChange={OnChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City '/>
            <input c onChange={OnChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State'/>
        </div>
        <div className='flex gap-3'>
            <input  onChange={OnChangeHandler} name='zipcode' value={formData.zipcode}className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='ZipCode '/>
            <input onChange={OnChangeHandler} name='country' value={formData.country}className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country'/>
        </div>
        <input onChange={OnChangeHandler} name='phone' value={formData.phone}className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Phone no'/>
    </div>
    {/*----------------Right side--------------*/}
    <div className='mt-8'>
        <div className='mt-8 min-w-80'>
            <CartTotal/>
        </div>
        <div className='mt-12'>
            <Title text1={"PAYMENT"} text2={'METHODS'}/>
            <div className='flex flex-col gap-3 lg:flex-row'>
                <div  onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                    <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe'? 'bg-green-400':''}` }></p>
                   <img src={assets.stripe_logo} className='h-5 mx-4'/>
                </div>
                <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                    <p className={`min-w-3.5 h-3.5 border rounded-full  ${method === 'razorpay'? 'bg-green-400':''}`}></p>
                   <img src={assets.razorpay_logo} className='h-5 mx-4'/>
                </div>
                <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                    <p className={`min-w-3.5 h-3.5 border rounded-full  ${method === 'cod'? 'bg-green-400':''}`}></p>
                   <p className='text-gray-500 text-sm font-medium mx-4'>CASH on delivery</p>
                </div>
            </div>
            <div className='w-full text-end mt-8'>
                <button type='submit' className='bg-black text-white text-sm py-3 px-16'>Place Order</button>
            </div>
        </div>
    </div>
      
    </form>
  )
}

export default PlaceOrder
