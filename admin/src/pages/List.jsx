import React, { useEffect, useState } from 'react'
import axios from "axios";
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
const List = ({token}) => {
  const [List,setList] =useState([]);

   const fetchList =async()=>{
    try {
      const response= await axios.get(backendUrl + 'api/product/list')
      //console.log(response.data)
     if(response.data.success){
      setList(response.data.products)
      console.log(List)
     }else{
      toast.error(response.data.message)
     }
     
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
   }

   const removeProduc =async(id)=>{
    try {
      const response= await axios.post(backendUrl + 'api/product/remove',{id},{headers: {token}})
       console.log(id)
      if(response.data.success){
       toast.success(response.data.message)
       await fetchList()
      }
      else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      
      console.log(error)
      toast.error(error.message)
    }

}
  useEffect(
     ()=>{
      fetchList()

},[])
  return (
<>
  <p>All Products</p>
  <div className='flex flex-col gap-2'>
    {/* List table itme */}

    <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-1 text-sm border bg-gray-100'>
      <b>Image</b>
      <b>Name </b>
      <b> Category</b>
      <b>Price </b>
      <b className='text-center'>Action</b>
      </div>

  {/* List of products */}
    {
      List.map((item,index)=>(
        <div className=' grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2' key={index}>
        <img className='w-12' src={item.image[0]}  />
        <p>{item.name}</p>
        <p>{item.category}</p>
        <p>${item.price}</p>
        <p onClick={()=>removeProduc(item._id)} className='text-lg text-right md:text-center cursor-pointer'>X</p>
      </div>
      )
      )
     

}
    
      

  </div>
</>
  )
}

export default List
