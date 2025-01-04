import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState ,useEffect} from 'react';
import { usePasswordChangeMutation } from '../reduxServices/Apis/UserAuthapi';
import { GetToken } from '../services/storetoken';
import CloseIcon from '@mui/icons-material/Close';

function Settings({onClose}) {
  

  
  const [passwordchnage,isLoading]=usePasswordChangeMutation()
const[password,setPassword]=useState('')
const[password2,setPassword2]=useState('')
const [token, setToken] = useState({})
  
useEffect(() => {
    
  const token = GetToken()
  if (token) {

    setToken({
      'access': token.access_token,
      'refresh': token.Refresh_token

    })



  }






}, []);

async function passwordChang() {
  
try {


  if (password != password2) {
    alert('Password Doesnot match')

}
else{
  const formdata={password,password2}
  const resp=passwordchnage({formdata,"token":token.access})


  if (resp){
    console.log(resp)
    alert('Passward Chnage ')

  }
  else 
  {
    console.log(resp)

    alert('Passward Doesn`t Chnage ')

  }
}

} catch (error) {
  console.log(error)

  
}
  
 }

  return (
    <>
    
        <div className=' border border-blue-700  flex flex-col  h-auto w-full md:w-1/2 p-2  z-50 absolute bg-white rounded-xl shadow-2xl '>
        <div className=' justify-center ml-auto p-2   flex'>
                < CloseIcon className=' flex    bg-red-700 rounded-full   ' onClick={onClose} />
            </div>

        <div className=' font-serif text-xl ml-6   h-[70px]  flex'>
            <p>Change Password</p>
        </div>
        <div className='flex flex-col  ml-6 space-y-3   '>
        <TextField type='password'   label="New Password" variant="outlined"  value={password} onChange={(e)=>{setPassword(e.target.value)}}  />
        <TextField type='password'   label="New Password Again" variant="outlined" value={password2} onChange={(e)=>{setPassword2(e.target.value)}} />
        <Button variant="contained" className=' ml-[20%] mt-10 mx-auto  bg-[#7C41F5]  w-[60%]  h-9 p-3' onClick={passwordChang} >Change Password</Button>

        </div>

        </div>
 
    </>
  )
}

export default Settings