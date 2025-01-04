import React, { useState } from "react";
import { useForgetdeleteMutation } from "../reduxServices/Apis/UserAuthapi";
const OtpPopup = ({ isOpen, onClose, onVerify ,phoneNumber}) => {
  const [otp, setOtp] = useState("");
  const [deleteotp, { isLoading: deleteotploadin }] = useForgetdeleteMutation();

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Ensure only digits
    setOtp(value.slice(0, 4)); // Limit input to 4 digits
  };

  const handleVerify = () => {
    if (otp.length === 4) {
      onVerify(otp); // Pass OTP to the parent for verification
    } else {
      alert("Please enter a valid 4-digit OTP");
    }
  };

  if (!isOpen) return null; // Don't render if popup is not open
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
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6">
        <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
        <p className="mb-4 text-gray-600">Enter the 4-digit OTP sent to your number.</p>
        <input
          type="text"
          value={otp}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter OTP"
        />
        <div className="flex justify-between mt-4">
          <button
            onClick={handleOtpdelete}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleVerify}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpPopup;
