import React from 'react'

function DashBoardHearder({gr,sales,text,saleprc,onClick}) {   
    
  return (
    <>
    <div className={`w-[90%]  h-[110px] border-2 flex items-center justify-center rounded-2xl ${gr}`}  
    onClick={onClick}
    >
        <div className=' text-white   font-serif space-y-3 flex flex-col items-start justify-start w-full h-full'> 
        <h1 className='mt-3 ml-6' >{text}</h1>
       <div className='ml-6' >
       <h1 >{sales}</h1>
    
       </div>



        
        
        </div>
    </div>
    
    
    </>
  )
}

export default DashBoardHearder