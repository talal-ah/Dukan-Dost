import React from 'react'
import {  useImageGetQuery } from '../reduxServices/Apis/ProductsApis';


async function productPicsByCategory(category) {
const { data, isSuccess, refetch } = await useImageGetQuery(category)

return(data)

 

    
    }
export default productPicsByCategory
