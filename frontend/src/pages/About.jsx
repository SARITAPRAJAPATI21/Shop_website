import React from 'react'
import Title from '../components/Title'
import Newsletter from '../components/Newsletter'
import { assets} from '../assets/assets';

const About = () => {
  return (
    <div>
    <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
    </div>
    <div className='my-10 flex flex-col md:flex-row gap-16' >
      <img className='w-full md:max-w-[450px]' src={assets.about_img} alt=''/>
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gary-600'>
        <p>When someone wants to learn more about you or your business, the About Us page is what they’re most likely going to seek out. It may go by different labels—About, Story, Mission—but these types of pages serve the same key purpose: to be the page for a brand to say, “This is who we are.”</p>
        <p>When someone wants to learn more about you or your business,
         the About Us page is what they’re most</p>
        <b className='text-gary-800'>Our Mission</b>
        <p>When someone wants to learn more about you or your business,
        the About Us page is what they’re most</p>
      </div>
    </div>
    <div className='text-2xl py-4'>
    <Title text1={'Why'} text2={'CHOOSE US'}/>
    </div>
    <div className='flex md:flex-row text-sm mb-20 gap-4'>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Quality Assurance:</b>
        <p className='text-gary-700'>When someone wants to learn more about you or your business,
        the About Us page is what they’re most</p>
       
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Convience:</b>
        <p className='text-gary-700'>When someone wants to learn more about you or your business,
        the About Us page is what they’re most</p>
       
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Exceptional Customer Service</b>
        <p className='text-gary-700'>When someone wants to learn more about you or your business,
        the About Us page is what they’re most</p>
       
      </div>
    </div>
    <Newsletter/>
    </div>
  )
}

export default About
