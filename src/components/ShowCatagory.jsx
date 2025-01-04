import React from 'react'
import categories from './catagorysheet';
function ShowCatagory() {
    console.log(categories)
    return(
        <>
        <ul>
          {
            categories.map((items,key)=>{
              <li>{items}</li>
              
    
            })
          }
        </ul>
        
        </>
      )
}

export default ShowCatagory