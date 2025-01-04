import React,{useEffect} from 'react'
import dukanimg from '../assets/dukanimg.jpeg'
import 'tailwindcss/tailwind.css'
import Button from '@mui/material/Button';
import InputField from './InputField';
import { useState as UseState } from 'react';
import { useLoginuserMutation as UseLoginuserMutation } from '../reduxServices/Apis/UserAuthapi';
import { StoreToken } from '../services/storetoken';
import { useNavigate  } from 'react-router-dom';
import BGlogin from "../assets/loginbg.jpg"
import { Link } from 'react-router-dom';
import ForgetPassOTP from './ForgetPassOTP';
import Loadingdata from './Loadingdata';
import Img from "../assets/lg3.png"
import CloseIcon from '@mui/icons-material/Close';

import Navbar from './Navbar';
import { useState } from 'react';

function Login() {
  const[viewOtp,setViewOtp]=useState(false)
  const navigate = useNavigate();
  const [loding,setLoding]= UseState(false)
  const [loginuser,{isLoading}] = UseLoginuserMutation()
  if (loding) {
    console.log('loding..............')
    console.log(loding)

    
}
  const [phone_number, setPhone_number] = UseState('+92')
  const [password, setPassword] = UseState('')

  const handlePhoneNumberChange = (text) => {
    // Ensure that the phone number always starts with "+92"
    if (text.target.value === '' || text.target.value === '+92' || text.target.value === '+9' || text.target.value === '+') {
      setPhone_number('+92');
    } else {
      setPhone_number(text.target.value);
    }
  };
  const handleChange = (event) => {
    setPassword(event.target.value);
  };
  // Apis function 
  const logedin = async () => {

    const formdata = { phone_number, password }
    if (phone_number && password) {
      try {
        

        const response = await loginuser(formdata)
        setLoding(true)

        console.log(response)

        


        if (response.data) {

          console.log(response.data.token)
          StoreToken(response.data.token)
          window.location.reload();
  navigate('/dashboard')
          

        }
        else if (response.error) {
          // Error response from server
          console.log(response.error);
          alert(`Error: ${response.error.data.message || 'Failed to Login'}`);
        }



      }
      catch (error) {
        console.log(response.error)
      }

    }
    else {
      console.log(response.error)
    }
  }

  useEffect(() => {
    // Disable scroll when the component mounts
    document.body.style.overflow = 'hidden';

    // Enable scroll when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  function onClose() {
    setViewOtp(false)
    
  }
  return (
    <div className='bg-gradient-to-r from-emerald-900 to-green-700'>
<Navbar/>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-900 to-green-700  ">
      {isLoading ? <Loadingdata/> : null  }
      <div className="flex items-center justify-center h-[700px] w-full max-w-6xl p-6">
        {/* Left Side Image Section */}
        <div className="hidden  h-[550px] rounded-l-2xl  bg-green-400  lg:block w-1/2">
          <img 
            src={Img} // Replace with your actual vector URL
            alt="Grocery Illustration"
            className="w-full h-auto object-contain   "
          />
        
        </div>

        {/* Right Side Form Section */}
        <div className="w-full h-[550px] lg:w-1/2  bg-white p-8  rounded-r-2xl shadow-lg">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>

          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Login Your Dukaan</h2>
          <form >
            <div className="mb-4">
            <InputField placeholder='Phone Number' type='text' value={phone_number} onchangeText={handlePhoneNumberChange} />
            </div>

            <div className="mb-6">
            <InputField placeholder='Password' type='password' value={password} onchangeText={handleChange} />
            </div>

            <Button variant="contained" className=' ml-[20%] mt-10 mx-auto  bg-green-400 w-[60%]  h-9 p-3'onClick={logedin} >Login</Button>
          </form>

          <div className="mt-4 text-center">
            <p onClick={()=>{setViewOtp(true)}}  className="text-sm hover:text-blue-600 cursor-pointer text-gray-600">
             {viewOtp?<ForgetPassOTP  onClose={onClose}/>:null}
              ForgetPassword?
              <p  className="text-green-600 hover:text-green-800"><Link to={'/registration'} >Sign up</Link></p>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login