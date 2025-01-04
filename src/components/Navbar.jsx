import React from 'react'
import Pic from "../assets/pic.jpg"
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate,useLocation  } from 'react-router-dom';
// import NAV from '../assets/navbrlogo.PNG'
 import { GetToken } from '../services/storetoken';
 import NavLogo from '../assets/Navlogo.png'

function Navbar({navbaritem,notify,userstatus,bgc,sectionId,handleClicksc}) {
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    

  
    const scrollToSection = () => {
        const section = document.getElementById('AboutUs');
        if (section) {
          const offset = 100; // Adjust this value to scroll down slightly more or less
          const yPosition = section.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({
            top: yPosition,
            behavior: 'smooth',
          });
        }
      };
      const scrollToServices = () => {
        const section = document.getElementById('services');
        if (section) {
          const offset = 100; // Adjust this value to scroll down slightly more or less
          const yPosition = section.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({
            top: yPosition,
            behavior: 'smooth',
          });
        }
      };
    
    function handleclick(params) {
        if (userstatus==='login') {
            navigate('/login')
            
            
            
        }
        else{
            navigate('/dashboard')
        }
       
        
        
    }
    function handleClick(params) {
        if( params=='About us')
        {
        alert(params)

        }
    }
    return (
        <div className=' bg-transparent mx-[9%]    rounded-full mt-3  ' >
            <div className="     flex flex-row justify-between items-center  h-[60px] px-5">
                <div className='  text-bold font-serif items-center  text-white flex'>
                    {/* <p className=' text-2xl text-[#F24535]'>D</p>
                    <p  className=' text-xl'>u</p>
                    <p  className='text-[#F24535] text-2xl'>K</p>

                    <p  className=' text-xl'>aan</p>

                    <p  className='text-2xl text-[#F24535] '>D</p>
                    <p  className=' text-xl'> ost</p> */}
                    <img  className='  h-[95px] mt-2     ' src={NavLogo} alt="" />




                </div>
                <div className='flex flex-row space-x-2   items-center' >
                <ul className='text-[20px] font-serif mb-1 space-x-2'>
      <li>
        <Link className='hover:text-[#F24535]  text-white ml-2' to='/'>
          Home
        </Link>
        {isHomePage  && (
          <>
            <Link className='hover:text-[#F24535]   text-white  ml-2 ' onClick={scrollToSection}>
              About Us
            </Link>
            <Link className='hover:text-[#F24535] text-white ml-2' onClick={scrollToServices}>
              Services
            </Link>
            <Link className='hover:text-[#F24535] text-white ml-2' to='/login'>
              Login
            </Link>
            <Link className='hover:text-[#F24535] text-white ml-2' to='/riderLogin'>
              {navbaritem}
            </Link>
          </>
        )}
      </li>
    </ul>
                <div>
                {notify}
                    </div>
                    <div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Navbar