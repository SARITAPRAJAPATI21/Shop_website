import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({token}) => {
  const [orders,setOrders]=useState([]);

  const onStatusHandler=async(event,orderId)=>{
    try {
       console.log(orderId,event.target.value)
      const response =await axios.post(backendUrl+'api/order/status',{orderId,status:event.target.value},{headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        await fetchallOrder()
        
      }
    } catch (error) {
      toast.error(error.message)
      console.log("Staus not updated")
      
    }
  }

  const fetchallOrder=async()=>{
    try {
      if(!token){
        return null;
      }
      else{
       console.log("Inside fetch order list")
         const response =await axios.post(backendUrl+'api/order/list',{},{headers:{token}})
         console.log(response)
         if(response.data.success){
          setOrders(response.data.orders)
         }
         else{
          toast.error(response.data.message)
         }
        
        
      }
      
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    fetchallOrder()
  },[token])
  return (
    <div>
    <h3>orders</h3>
     <div>
      {
        orders.map((orde,index)=>(
          <div className=" border border-black grid grid-cols-1 sm:gird-cols[0.5fr_2fr_1fr] lg:gird-cols[0.5fr_2fr_1fr_1fr_1fr] items-start p-5 md:p-8 my-3 md:my-4 text-sm" key={index}>
          <img className='w-12' src={assets.parcel_icon} alt="order"/>
          <div> 
          <div>
            {
              orde.items.map((item,index)=>{
                if(index==orde.items.length-1){
                  return <p className='py-0.8' key={index}> {item.name} x {item.quantity} <span>{item.size}</span></p>
                }
                else{
                  return <p className='py-0.8' key={index}> {item.name} x {item.quantity} <span>{item.size}</span>,</p>
                }
              })
            }
          </div>
          <p>{orde.address.firstName +" "+orde.address.lastName}</p>
          <div>
            <p>{orde.address.street+ ","}</p>
            <p>{orde.address.city + "," + orde.address.state+ ","+ orde.address.country+ "," + orde.address.zipcode}</p>
         </div>
         <p>{orde.address.phone+ ","}</p>

          </div>
          <div>
            <p>Itmes: {orde.items.length}</p>
            <p>Method: {orde.paymentMethod}</p>
            <p>payment : {orde.payment? "Done":"pending"}</p>
            <p>Date: {new Date(orde.date).toLocaleDateString()}</p>
          </div>
          <p>${orde.amount}</p>
          <select onChange={(event)=>onStatusHandler(event,orde._id)} value={orde.status}>
            <option value="Placed Order">Placed Order</option>
            <option value="Packing">Packing</option>
            <option value="Shiping">Shiping</option>
            <option value="Out of Delivery">Out of Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
          </div>
        

        ))
      }
     </div>
    </div>
  )
}

export default Orders
