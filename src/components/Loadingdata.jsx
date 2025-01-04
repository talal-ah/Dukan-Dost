import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

function Loadingdata() {
  return (
    <>
    <div className='   items-center justify-center  mt-[20%] w-[100px]  h-[100px]  rounded-xl fixed z-50  flex '>
        <CircularProgress size={40} />

    </div>
    
    </>
  )
}

export default Loadingdata