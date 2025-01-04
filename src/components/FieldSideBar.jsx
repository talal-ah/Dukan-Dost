import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useSelector   } from 'react-redux';

import {setComponentName} from '../reduxServices/slicers/sidebarstateslicer'
function FieldSideBar(props) {
  const dispatch =useDispatch()
  const navigate=useNavigate()
  
  return (
    <div  className={`p-4 flex items-center space-x-2 rounded-lg ${
      props.isActive ? ' bg-gradient-to-r from-sky-600 to-sky-900 text-white' : 'bg-[#1C4E80] text-gray-300'
    }`}
       onClick={()=>{dispatch(setComponentName(props.componentname));props.onClick()}}        >
        <div className=' flex items-center w-[90%]     h-full mr-auto space-x-2 '>
        <props.icon className='flex ml-5  text-white '/>
     <h4 className=' text-xl hover:text-2xl text-white     ' onClick={props.onclick} >{props.name}</h4>
        </div>
   </div>
  )
}

export default FieldSideBar