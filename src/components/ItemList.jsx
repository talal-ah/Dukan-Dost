import React from 'react'
import 'tailwindcss/tailwind.css'
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import '../index.css'
import pic from '../assets/vrg.JPG'
import { GetToken } from '../services/storetoken';
import { useProductDeleteMutation } from '../reduxServices/Apis/ProductsApis';
import AddItems from './AddItems';
function ItemList({ product, edit, onfectch, onDel, getdelid,searchItem }) {

  console.log(searchItem)
  // const [token, setToken] = useState({})
  // const [res,isLoading]=useProductDeleteMutation()
  // console.log(product)
  // function EditItem(params) {
  //   return(
  //     <>

  //     <div className='w-[300px] h-[300px] fixed bg-slate-500  border-2 '></div>
  //     </>
  //   )


  // }
  // console.log(product)product,index

  // async function deleteItem(params) {
  //   let id=params.replace(/'/g, "");
  //   const token = GetToken()
  //     if (token) {

  //       setToken({
  //         'access': token.access_token,
  //         'refresh': token.Refresh_token

  //       })
  //       try {
  //         const deleteres= await res(params)
  //         console.log(deleteres)
  //         onfectch()
  //         // window.location.reload();

  //       } catch (error) {
  //         console.log(error)
  //       }


  //       console.log(id)
  //       console.log(params)



  // }
  // }


  return (
    <div className='w-full'>

      {/* table............... */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
            <th className=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
               Sr.
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product ID
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weight
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Disc%
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Discounted Price
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
               Sub Category
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sold
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {
searchItem.map((product,index)=>(
 
  <tr key={product.productID}>
  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{index}</td>

  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{product.productID}</td>
  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
  <td className="px-2 py-4 whitespace-nowrap">
    {
      product.productImgUrl ?
        <img className='h-10 w-10 rounded-full  ' src={product.productImgUrl.replace('//media/productImage', '/media/productImage')} alt={product.name} />
        :
        <img className='h-10 w-10 rounded-full  ' src={`http://127.0.0.1:8000/${product.productImg} `} alt={product.name} />

    }
  </td>
  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{product.price}</td>
  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{product.value} {product.unit}</td>

  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{product.discount}%</td>

  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{product.DiscountedPrice}</td>
  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{product.subcategory}</td>

  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{product.sold}</td>
  <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
    <button
      onClick={() => { edit(product) }}
      className="text-indigo-600 hover:text-indigo-900 mr-2"
    >
      Edit
    </button>
    <button
      onClick={() => { onDel(); getdelid(product.productID) }}
      className="text-red-600 hover:text-red-900"
    >
      Delete
    </button>
  </td>
</tr>



))
            }

        

          </tbody>
        </table>
      </div>

      {/* tableend........... */}

     
    </div>
  )

}
export default ItemList