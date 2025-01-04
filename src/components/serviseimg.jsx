import React from 'react'
import { motion  } from "framer-motion"

function serviseimg({image}) {
  return (
    <motion.div

    initial={{x:100}} whileInView={{x:0}} 
    transition={{ delay: 0.2, type: "spring", stiffness: 50 }}
    whileHover={{scale:"0.9"}}
    
    className='    h-[100%] col-span-1     flex '  >
<img  className='  h-[350px]     ' src={image} alt="" />

  </motion.div>
  )
}

export default serviseimg