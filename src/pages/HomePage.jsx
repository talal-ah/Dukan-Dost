import React,{useRef } from 'react'
import Typewriter from "typewriter-effect";
import Navbar from '../components/Navbar'
import Cardui from '../components/Cardui'
import img from '../assets/vizacrd.JPG'
import headerimg from '../assets/header3.png'
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import easypay from '../assets/easypay.jpg'
import chat from '../assets/chatg.JPG'
import notify from '../assets/notification.jpg'
import inventry from '../assets/inventerymanage.jpg'
import deliverprsn from '../assets/delivperson.png'
import deliverprsn2 from '../assets/delivperson2.png'
import deliverprsn3 from '../assets/delivperson3.png'
import bghrd from '../assets/bghrd.jpg'
import Button from '@mui/material/Button';

import deliverprsn4 from '../assets/delivperson4.png'
import  Services from '../components/servises'
import ServicesImg from'../components/serviseimg'
import { motion } from "framer-motion"
import { GetToken } from '../services/storetoken';
import { useEffect ,useState} from 'react';
import { Link } from 'react-router-dom';
function HomePage() {
  const [token,setToken]=useState({})
  const [isLogged,setIsLogged]=useState('login')
useEffect(()=>{
  const token = GetToken()
  if (token.access_token) {

    setIsLogged('dashboard')
    console.log(isLogged)



  }


},[])



  const mayarry=['Home','About us','Contact us']

  const aboutUsRef = useRef(null); 
  const handleClicksc = () => {
    if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <>
   <div className=' w-full      h-full '>
 

   
<div className='  w-full h-[70%] flex-col flex bg-gradient-to-r from-emerald-900 to-green-700   ' style={{   backgroundSize: "cover",backgroundRepeat: "no-repeat", height: "100vh", }}>

<Navbar navbaritem='Rider' userstatus={isLogged} sectionId={aboutUsRef?.current?.id} handleClicksc={handleClicksc}  />
<div className='  space-x-[200px]   flex       w-full '  > 

<div className='ml-[200px]  items-center justify-center flex flex-col '>
  
<motion.div  initial={{opacity:0}} animate={{ opacity:1 }} transition={{ delay: 0.6, type:"just", stiffness: 100 }} className=' col-span-2'> 
    <p className='  font-bold  flex   text-[80px] text-white'>Dukaan Dost</p>
    <p className=' text-[#F24535]  font-serif flex items-start jus  text-[30px]'>

    <Typewriter 
                onInit={(typewriter) => {
                    typewriter 
                        .typeString(" Welcome ")
                        .pauseFor(0.1)
                        .deleteAll()
                        .typeString("Grow Your Business With us")
                        .start();
                }}
            />
      
     
      
      
      </p></motion.div>

      <div>
<Link to='/login'>
<Button  variant="contained" className='  mt-6 mx-auto   bg-gradient-to-r from-orange-600 to-orange-800  w-[100%]  h-10 p-3'  >Let`s Start</Button>
</Link>
  
  </div>
</div>
          
 
  <div className='   flex  place-items-center justify-items-center '>
<img className=' h-[500px]  flex mb-[120px]' src={headerimg} alt="" />
</div>
</div>

</div>
<section id='services'>
<div className='flex   mt-7z  place-content-center justify-items-center  '>
    <h1 className=' mt-7 flex items-center justify-center  text-5xl font-serif font-bold '>
Services</h1>
    </div>
<div className='  h-[50%]  mt-10     grid grid-cols-2 place-content-center justify-items-center mx-auto   ' >
 <Services text="ATM Payments: Secure and swift, allowing you to make transactions anytime, anywhere.
EasyPaisa Convenience: Effortless mobile payments with just a few taps on your phone.
24/7 Accessibility: Both methods offer round-the-clock access for all your payment needs.
Seamless Integration: Compatible with various services, making your financial transactions hassle-free."/>
 <Cardui  image={easypay}   text="Easy Payment"  />
</div>

<div className=' h-[50%]  mt-10    grid grid-cols-2 place-content-center justify-items-center mx-auto   ' >
<Cardui  image={inventry}   text="Inventory Management"  />
 <Services text="Efficient Tracking: Maintain accurate stock levels and minimize shortages or overstocking.
Real-Time Updates: Get instant insights into inventory status, helping you make informed decisions.
Cost Savings: Reduce storage costs and prevent loss with optimized inventory control.
Improved Operations: Streamline supply chain processes, ensuring timely restocking and better customer service."/>
</div>
<div className=' h-[50%]  mt-10    grid grid-cols-2 place-content-center justify-items-center mx-auto   ' >
 <Services text="  Receive real-time notifications the moment your order status changes.
Stay Informed: Get alerts for order confirmations, shipping details, and delivery updates.
Enhanced Tracking: Keep track of your order every step of the way with timely push notifications.
Customer Convenience: Enjoy peace of mind knowing your order information is always at your fingertips."/>
 <Cardui  image={notify}   text="Instant Notification"  />
</div>
<div className=' h-[50%]  mt-10    grid grid-cols-2 place-content-center justify-items-center mx-auto   ' >
<Cardui  image={chat}   text="Chat with Customer"  />
 <Services text="Direct Human Interaction: Offer real-time support with a live representative for a personal touch.
Immediate Assistance: Quickly address customer inquiries and issues without automated delays.
Personalized Service: Tailor responses to individual customer needs, enhancing their experience.
Stronger Connections: Build trust and loyalty through meaningful and direct customer communication."/>
</div>
</section>
<hr />

<section id='AboutUs' ref={aboutUsRef}>
<div className='flex items-center justify-center'>

<h1 className=' text-5xl mt-8  font-thin font-serif  '> About Us</h1>

</div>
<div className=' h-[50%]  mt-10    grid grid-cols-2 place-content-center justify-items-center mx-auto   ' >

 <Services about='aboutus' text="Dukaan Dost is a mobile app that revolutionizes local grocery shopping and delivery. Our platform connects nearby grocery stores, delivery persons, and customers, addressing real-world challenges along the way. For local businesses, Dukaan Dost offers an avenue to expand their reach, compete with larger chains, and efficiently manage inventory. By integrating multiple shop fronts into a single platform, we provide customers the convenience of exploring and purchasing from various nearby stores through a single, user-friendly interface. Join us in transforming the local grocery shopping experience and supporting your neighborhood businesses."/>
<ServicesImg image={deliverprsn4}/>
</div>

</section>

<div className=' text-white  bg-slate-950 h-[200px]  flex flex-col items-center mt-3' >

<div className='mt-5 space-x-5'>
  <LinkedInIcon/>
  <GoogleIcon/>
  <FacebookIcon/>
  <InstagramIcon/>

</div>
<div className='flex flex-col items-center mt-5 space-y-5'>
  <p>© 2024 Dukaan Dost. All Rights Reserved.</p>
  <p className='  text-sm'>Terms and Conditions</p>
  <p className='  text-sm'>+923115385837</p>
  
</div>

</div>
   </div>

    </>
  )
}

export default HomePage