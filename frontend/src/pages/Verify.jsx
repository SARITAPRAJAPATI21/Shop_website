import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {
  const {navigate,token,setCartItem,backendUrl}=useContext(ShopContext)
  const [searchParams,setSearchParams]=useSearchParams()
  
  const success=searchParams.get('success')
  const orderId = searchParams.get('orderId')
  //console.log("search",searchParams)
   //console.log(orderId)

  const verifyPayment=async()=>{
  try { 
    if(!token) return null
     
    const response= await axios.post(backendUrl+'api/order/verifyStripe',{success,orderId},{headers:{token}})
    console.log(response)
    if(response.data.success){
      toast.success("payment sucessfully completed")
      setCartItem({})
      navigate('/orders')
    }
    else{
       console.log("response - not success")
      navigate('/cart')
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
    
  }
  }
   useEffect(()=>{
 verifyPayment()
   },[token])
  return(
<div>
      verify
    </div>
  )
    
  
}

export default Verify
