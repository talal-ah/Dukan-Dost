import React from 'react'

function InputField(props) {
  return (
    <input type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onchangeText}
    className=' mt-5  w-full border-gray-100 border-2 shadow-lg focus:outline-none focus:border-blue-500 rounded-lg text-black  h-12  p-5 ' />
  )
}

export default InputField
