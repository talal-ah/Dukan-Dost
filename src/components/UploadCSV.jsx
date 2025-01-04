import React from 'react'
import Button from '@mui/material/Button';
import { useState,useEffect} from 'react';
import { useProductByCSVMutation } from '../reduxServices/Apis/ProductsApis';
import { GetToken } from '../services/storetoken';
function UploadCSV({onfectch}) {
  const [token, setToken] = useState({})

  const [uploadCSV,isLoading]=useProductByCSVMutation()
// acess token.......................
useEffect(() => {
    
  const token = GetToken()
  if (token) {

    setToken({
      'access': token.access_token,
      'refresh': token.Refresh_token

    })



  }






}, []);
const [file,setFilecsv]=useState(null)
 function handlefile(data) {
  alert('change')
  setFilecsv(data.target.files[0])
  console.log(file)
  
 }

async function upload() {
  try {
    const resp= await uploadCSV({file,'token':token.access})
    if (resp.data) {
      console.log(resp.data)
      
    }
    else if(resp.error){
      console.log(resp.error)
    }
    console.log(resp)    
    onfectch()
  } catch (error) {
    console.log(error )    

    
  }
  
 }
//  console.log(file)


 // acess token.......................
    useEffect(() => {
    
        const token = GetToken()
        if (token) {
  
          setToken({
            'access': token.access_token,
            'refresh': token.Refresh_token
  
          })
  
  
  
        }
    
  
  
    
     
  
    }, []);

  return (
    <form  encType="multipart/form-data" className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4  items-center' >
    <h3>Upload excel sheet File</h3>
            <input className='    shadow-lg focus:outline-none focus:border-blue-500  rounded-lg text-black w-full mb-4  mr-auto h-12 p-3' type="file" accept="*"
            onChange={handlefile}
            />
            <Button onClick={upload} variant="contained" className=' bg-[#1C4E80] ml-auto mr-auto h-9 p-3'>Add Product</Button>
        
        </form>
  )
}

export default UploadCSV