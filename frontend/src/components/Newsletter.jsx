import React from 'react'

const Newsletter = () => {
  return (
    <div className='text-center'>
    <p className='text-2xl font-medium text-gray-800'>SubScribe Now and get 20% off</p>
    <p className='text-gray-400 mt-3'>Tailwind CSS works by scanning all of your HTML files, JavaScript
    </p>
    <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none' type='email' placeholder='Enter you email'/>
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SubScribe</button>
    </form> 
    </div>
  )
}

export default Newsletter
