import React from 'react'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
function ProgressChart({name,value,item,percentage,color}) {

  return (
<>
<div>
    <div className='w-[300px]  p-2  flex  '>
        <div className='w-[100px] h-[100px]  '>

<CircularProgressbar value={percentage} text={`${percentage}%`}

styles={{
     path: {
      // Path color
      stroke: `${color}`,
    
    },

    trail: {
        // Trail color
        stroke: '#d6d6',
        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
        strokeLinecap: 'butt',
        // Rotate the trail
        transform: 'rotate(0.25turn)',
        transformOrigin: 'center center',
      },
      background: {
        fill: '#000',
      },
      text: {
        // Text color
        fill: '#f88',
        // Text size
        fontSize: '16px',
      },
}}

/>

        </div>
<div className='flex flex-col ml-3 justify-center'>
<h1 className='text-sm    font-bold'>{value}.Rs</h1>
<h1 className='text-sm    font-bold'>{item}.items</h1>

<h1 className='text-sm    '>{name}</h1>
</div>


    </div>



</div>



</>  )
}

export default ProgressChart