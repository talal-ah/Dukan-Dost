import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useSelector   } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';

 import { useState } from 'react';
import { useUpdateUserMutation } from '../reduxServices/Apis/UserAuthapi';
import { GetToken } from '../services/storetoken';
function ProfileUpdate({onClose}) {
    
    const profile =  useSelector(state => state.profile);
    const id=profile.id
  

    const tokens = GetToken();
    const accessToken = tokens.access_token;
const[updateuser,{ isLoading }]=useUpdateUserMutation();
    const [formData, setFormData] = useState({});
    const handleInputChange = (event) => {
        const { name, value } = event.target;
      
          // For other input fields or if no file is selected, update the state as usual
          setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
   
    
        
        };
     


        function updateUser() {
            try { 
        console.log(formData,accessToken)
              
                const resp=updateuser({formData,accessToken,id})
                
                if (resp){
                    console.log(resp)
                    alert('Profile Updated ')
                    window.location.reload()
                
                  }
                  else
                  {
                    alert('Profile doesnot  Updated')
                    console.log(resp.error.data)
                
                  }
                
            } catch (error) {
                console.log(error)

            }
            
            
        }
      
  return (
    <>
      <div className=' border border-blue-700  flex flex-col  h-auto w-full md:w-1/2 p-2  z-50 absolute bg-white rounded-xl shadow-2xl   '>
      <div className=' justify-center ml-auto p-2   flex'>
                < CloseIcon className=' flex    bg-red-700 rounded-full   ' onClick={onClose} />
            </div>

<div className=' font-serif text-xl ml-6   h-[70px]  flex'>
    <p>Update Profile</p>
</div>
<div className='flex flex-col  ml-6 space-y-3   '>
<TextField  label="Name" variant="outlined" name='user_name'   onChange={handleInputChange}   />
<TextField label="Phone Number" variant="outlined" name='phone_number' onChange={handleInputChange}  />
<Button variant="contained" onClick={updateUser} className=' ml-[20%] mt-10 mx-auto  bg-[#7C41F5]  w-[60%]  h-9 p-3'  >Change profile data</Button>

</div>

</div>
    </>
  )
}

export default ProfileUpdate