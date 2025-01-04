import React,{useEffect, useState} from 'react'
import 'tailwindcss/tailwind.css'
import Button from '@mui/material/Button';
import InputField from './InputField';
import { useState as UseState } from 'react';
import { useRegisteruserMutation as UseRegisteruserMutation,useOtpVerifyMutation } from '../reduxServices/Apis/UserAuthapi';
import { StoreToken } from '../services/storetoken';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loadingdata from './Loadingdata';
import Img from "../assets/lg3.png"
import Navbar from './Navbar';
import OtpPopup from './OtpPopup';

function Registraion() {
    const [otppop,setOtppop]=useState(false)
    // const[otp,setOtp]=useState('')
    const regex = /^[A-Za-z\s]*$/;
    const phone_regex = /^\+?\d*$/;
    const navigate = useNavigate();
    const [registeruser, { isLoading }] = UseRegisteruserMutation()
    const [otpverify, { isLoading:otpisLoading }] = useOtpVerifyMutation()

    const [user_name, setUser_name] = UseState('')
    const [phone_number, setPhone_number] = UseState('+92')
    const [password, setPassword] = UseState('')
    const [password2, setPassword2] = UseState('')
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


    const onclickfunc = () => {

        console.log(user_name)
        console.log(phone_number)
        console.log(password)
        console.log(password2)
    }
    const [user_Type, setUser_Type] = UseState('seller')

    // api function
    const register = async (otp) => {
        if (!regex.test(user_name)) {
            alert('Name Must be character')

        }
        else if (!phone_regex.test(phone_number)) {
            alert('phone Number Must be digit')

        }
        else if (phone_number.length < 4) {
            alert('phone Number is not correct')

        }
        else if (password != password2) {
            alert('Password Doesnot match')

        }

        else {
            const formdata = { user_name, phone_number, password, password2, user_Type,otp }
            console.log(user_name, phone_number, password, password2, user_Type,otp)
            try {
                const response = await otpverify(formdata)
                if (response.data) {

                    // await storeToken(response.data.token)
                    console.log(response.data.token)
                    StoreToken(response.data.token)
                    window.location.reload();
                    setOtppop(false)
                    navigate('/dashboard')
                }

                else if (response.error) {
                    // Error response from server
                    console.log(response.error);
                    const errorMessages = Object.values(response.error.data).flat();
                    alert(errorMessages.join('\n'));
                    // /alert(`Error: ${response.error.data[1] || 'Failed to Register'}`);
                }
            } catch (response) {
                if (response.error) {
                    // The request was made and the server responded with a status code
                    console.log('Server responded with status:', error.response.status);
                    console.log('Response data:', error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log('No response received from server');
                    console.log('Request:', error.request);
                } else {
                    // Something else happened while setting up the request
                    console.log('Error setting up the request:', error.message);
                }
            }
        }
    }

   async function otpgenerate(){
        if (!regex.test(user_name)) {
            alert('Name Must be character')

        }
        else if (!phone_regex.test(phone_number)) {
            alert('phone Number Must be digit')

        }
        else if (phone_number.length < 4) {
            alert('phone Number is not correct')

        }
        else if (password != password2) {
            alert('Password Doesnot match')

        }

        else {
            const formdata = { user_name, phone_number, password, password2, user_Type }
            console.log(user_name, phone_number, password, password2, user_Type)
            try {
                const response = await registeruser(formdata)
                if (response.data) {

                    // await storeToken(response.data.token)
                    setOtppop(true)
                    console.log(response)
                    // StoreToken(response.data.token)
                    // window.location.reload();
                    // navigate('/dashboard')
                }

                else if (response.error) {
                    // Error response from server
                    console.log(response.error.data.phone_number);
                    const errorMessages = Object.values(response.error.data).flat();
                    
                    
                    response.error.data.phone_number && alert(`Error: ${response.error.data.phone_number || 'Failed to Register'}`);
                }
            } catch (response) {
                if (response.error) {
                    // The request was made and the server responded with a status code
                    console.log('Server responded with status:', error.response.status);
                    console.log('Response data:', error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log('No response received from server');
                    console.log('Request:', error.request);
                } else {
                    // Something else happened while setting up the request
                    console.log('Error setting up the request:', error.message);
                }
            }
        }
    }
  
    return (
        <div className='bg-gradient-to-r from-emerald-900 to-green-700    overflow-hidden'>
            <Navbar/>

<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-900 to-green-700   overflow-y-hidden ">
    {
        otppop && <OtpPopup onVerify={register} isOpen={true} onClose={()=>{setOtppop(false)}} phoneNumber={phone_number}/>
    }


        {isLoading ? <Loadingdata/> : null  }
        <div className="flex items-center justify-center h-[700px] w-full max-w-6xl p-6">
          {/* Left Side Image Section */}
          <div className="hidden  h-[550px] rounded-l-2xl  bg-green-400  lg:block w-1/2">
            <img 
              src={Img} // Replace with your actual vector URL
              alt="Grocery Illustration"
              className="w-full h-[500px] object-contain   "
            />
          
          </div>
  
          {/* Right Side Form Section */}
          <div className="w-full h-[550px] lg:w-1/2  bg-white p-8  rounded-r-2xl shadow-lg">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Register Your Dukaan</h2>
            <form >
              <div className="mb-1">
              <InputField placeholder='Name' type='text' value={user_name} onchangeText={(text) => setUser_name(text.target.value)} />

              </div>
              <div className="mb-1">
              <InputField placeholder='Phone Number' type='text' value={phone_number} onchangeText={handlePhoneNumberChange} />
              
              </div>
              <div className="mb-1">
              <InputField placeholder='Password' type='password' value={password} onchangeText={handleChange} />
              
              </div>
  
              <div className="mb-2">
              <InputField placeholder='Confirm Password' type='password' value={password2} onchangeText={(text) => setPassword2(text.target.value)} />

              </div>
  
              <Button variant="contained" className=' ml-[20%] mt-10 mx-auto  mb-2 bg-green-400 w-[60%]  h-9 p-3' onClick={otpgenerate}>Signup</Button>
            </form>
  
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Do you have an account?{" "}
                <p  className="text-green-600 hover:text-green-800"><Link to={'/login'} >Login</Link></p>
              </p>
            </div>
          </div>
        </div>
      </div>
        </div>
    )
}

export default Registraion