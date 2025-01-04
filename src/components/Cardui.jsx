import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { motion } from "framer-motion"

function Cardui({text,image}) {
  return (
  <motion.div
  initial={{y:-100}} whileInView={{y:0}} 
  transition={{ delay: 0.2, type: "spring", stiffness: 50 }}
  whileHover={{scale:"0.9"}}

  className='w-[250px] h-[280px] items-center flex flex-col  p-5    text-[#7C41F5] '>
    
    <Avatar className='h-[200px] w-[200px]' alt=" "src={image} />
<p className='font-serif    text-[15x] p-5'>{text}</p>
  </motion.div>
  )
}

export default Cardui