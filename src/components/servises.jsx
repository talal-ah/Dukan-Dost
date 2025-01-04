import React from 'react'
import { motion  } from "framer-motion"

function servises({text,about}) {
  return (
 
 <>
 {
  about=="aboutus" ?
  <motion.div
  
  initial={{opacity:0 ,scale:0}} whileInView={{opacity:1 ,scale:1}} animate={{ x: 0 }}
   transition={{ delay: 0., type: "spring", stiffness: 50 }}
  //  whileHover={{scale:"0.9"}}
   className='mt-7    p-2    bg-white  rounded-2xl shadow-2xl  h-[80%] col-span-1 flex flex-col items-center justify-center'>
  <p className=' p-6     text-justify align-middlep-5 font-serif leading-6 text-lg '>{text}</p>

  </motion.div>
  :
  <motion.div
  
  initial={{opacity:0 ,scale:0}} whileInView={{opacity:1 ,scale:1}} animate={{ x: 0 }}
   transition={{ delay: 0., type: "spring", stiffness: 50 }}
  //  whileHover={{scale:"0.9"}}
   className='mt-7    p-2    bg-white  rounded-2xl shadow-2xl  h-[80%] col-span-1 flex flex-col items-center justify-center'>
  <p className=' p-6    w-[340px] text-justify align-middlep-5 font-serif leading-6 text-lg '>{text}</p>

  </motion.div>

 }
 
 </>
 
 
  )
}

export default servises