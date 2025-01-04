import React from 'react'
import Button from '@mui/material/Button';
import { useState,useEffect  } from 'react';
import { GetToken } from '../services/storetoken';
import { useProductDeleteMutation } from '../reduxServices/Apis/ProductsApis';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import CloseIcon from '@mui/icons-material/Close';

function DilogBox({onDel,onfectch,delID}) {
    const [token, setToken] = useState({})
    const [res,isLoading]=useProductDeleteMutation()
    




    async function deleteItem(params) {
        let id=params.replace(/'/g, "");
        const token = GetToken()
          if (token) {
    
            setToken({
              'access': token.access_token,
              'refresh': token.Refresh_token
    
            })
            try {
              const deleteres= await res(params)
              console.log(deleteres)
              onfectch()
              // window.location.reload();
              
            } catch (error) {
              console.log(error)
            }
    
    
            console.log(id)
            console.log(params)
    
    
        
      }
      }
    
  return (
    <>
    
    <div className='         flex-col  bg-slate-50 border-2 border-sky-100 shadow-md  w-[300px]  h-[200px]  rounded-xl fixed z-50  flex'>
    <div>  
   <CloseIcon className=' flex   ml-auto  m-2  ' onClick={onDel}   />

   </div>
   <div className='  flex justify-center font-bold mb-8'> <p >Are you sure? <DeleteForeverRoundedIcon style={{color:'red'}} /></p></div>
       
        <div className=' justify-between flex '>
            <Button onClick={onDel} variant="contained" className='  bg-[#1C4E80] ml-auto mr-auto h-9 p-3'>cancel</Button>
            <Button onClick={()=>{deleteItem(delID);onDel()}} variant="contained" className='  bg-red-600 ml-auto mr-auto h-9 p-3'>Delete</Button>

            

        </div>
    </div>
    
    </>
  )
}

export default DilogBox