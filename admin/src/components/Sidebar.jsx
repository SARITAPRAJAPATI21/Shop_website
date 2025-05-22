import React from 'react'
import {assets} from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen  border-r-2'>
       <div className='flex flex-col gap-4 pt-6 pl-[20%] text[15px]'>
       <NavLink to='/add' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2'>
        <img src={assets.order_icon} className='w-5 h-5'/>
        <p className='hidden md:block'>add item</p>
        </NavLink>
        <NavLink to='/list' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2'>
        <img src={assets.add_icon} className='w-5 h-5'/>
        <p className='hidden md:block'>List item</p>
        </NavLink>
        <NavLink to='/orders' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2'>
        <img src={assets.order_icon} className='w-5 h-5'/>
        <p className='hidden md:block'>orders item</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
