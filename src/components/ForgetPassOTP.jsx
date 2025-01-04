import React, { useState } from "react";
import { StoreToken } from '../services/storetoken';
import CloseIcon from '@mui/icons-material/Close';
import { useForgetPassotpMutation,useForgetpassverifyotpMutation,useForgetdeleteMutation } from "../reduxServices/Apis/UserAuthapi";
const ForgetPassOTP = ({onClose}) => {
  const [step, setStep] = useState(1); // Step 1: Enter number, Step 2: Enter OTP
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [deleteotp, { isLoading: deleteotploadin }] = useForgetdeleteMutation();
  
  const [submitnumber,{isLoading}]=useForgetPassotpMutation()
  const [submitotp,{isLoading:otpLoading}]=useForgetpassverifyotpMutation()

  const handleOtpdelete = async () => {
    
    const formdata = { phoneNumber };
    try {
      const resp = await deleteotp(formdata);
      if (resp.data) {
        
        onClose();
         
      } 
    } catch (error) {
      console.error(error);
    }
   
};
  const handlePhoneSubmit = async() => {
    if (phoneNumber.length === 13) {
        const formdata={phoneNumber}
        try {
            const resp=await submitnumber(formdata)
            if (resp.data) {
                console.log(resp)
                alert("OTP sent to: " + phoneNumber);
                setStep(2);
                
            }
            else{
                alert('your number is incorrect')
            }

            
        } catch (error) {
            console.log(error)
            
        }
      // Simulate sending OTP
      
      
    } else {
      alert("Enter a valid phone number!");
    }
  };

  const handleOtpSubmit = async() => {

    if (otp.length === 4) {
        const formdata={phoneNumber,otp}
        try {
            const resp=await submitotp(formdata)
            if (resp.data) {
                console.log(resp)
                StoreToken(resp.data.token)
                onClose()
                window.location.reload();
                navigate('/dashboard')
                
                
                
            }
            else{
                alert('your number is incorrect')
            }

            
        } catch (error) {
            console.log(error)
            
        }
        


      alert("OTP Verified: " + otp);
      // Further logic after OTP verification
    } else {
      alert("Enter a valid 4-digit OTP!");
    }
  };
  const handleButtonClick = () => {
    if (step==2) {
      handleOtpdelete();
      
      
      
  }
  else{
      
    alert("closed")
      onClose();
  }
 
    
   

};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
         
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
      <div className=" flex">
     < CloseIcon className=' ml-auto flex   text-white bg-red-700 rounded-full  mb-1 '  onClick={handleButtonClick} />
     </div>
     
        {step === 1 && (
          <div>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Enter Phone Number
            </h2>
            <input
              type="text"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handlePhoneSubmit}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Send OTP
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Enter OTP
            </h2>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleOtpSubmit}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassOTP;
