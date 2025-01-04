import React from 'react'
import { useState, useEffect, useReducer } from 'react';
import { useVoucherDeleteMutation } from '../reduxServices/Apis/ProductsApis';
import { useVouchershowlistQuery } from '../reduxServices/Apis/ProductsApis';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Button from '@mui/material/Button';
import { GetToken } from '../services/storetoken'


const VouchersTable = ({ voucheradd }) => {
  const tokens = GetToken();
  const accessToken = tokens.access_token;

  const { data: voucherList, error, refetch } = useVouchershowlistQuery(accessToken);
  const [voucherdelete, { isLoadinggg }] = useVoucherDeleteMutation();
  const [showVoucher, setShowVoucher] = useState(false)
  const [sureDelete, setSureDelete] = useState(false)
  const [vouchercode, setVouchercode] = useState(null)





  useEffect(() => {
    if (voucherList) {

      console.log('vrtaaablee', voucherList);
      refetch()
    } else {
      console.error('Error fetching voucher list:');
    }
  }, [voucherList, voucheradd]);


  async function deletevoucher(vouchercode) {
    try {
      const resp = await voucherdelete(vouchercode);
      console.log('Voucher deleted:', resp);
      // Optionally, update state or redirect
      setSureDelete(!sureDelete);
      setVouchercode(null);
      refetch()

    } catch (error) {
      console.error('Error deleting voucher:', error);
    }




  }


  return (
    <div className='   flex flex-col  w-full p-3  items-center '>
      <div onClick={() => { setShowVoucher(!showVoucher) }}
        className=' rounded-lg flex mt-4  mx-2  cursor-pointer items-center justify-center w-[50%] from-blue-400 bg-[#1C4E80] '>
        <h1 className='  md:text-xl font-serif   cursor-pointer   py-3 px-7 text-white font-bold  '>Show Vouchers </h1>



      </div>

      {
        showVoucher ?
          (
            <div className="container mx-auto py-8 justify-center  flex  flex-col items-center ">
              <h2 className="text-2xl font-bold mb-4 flex     ">Voucher List</h2>
              {voucherList && voucherList.length > 0 ? (
                <div className="overflow-x-auto w-full">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr.</th>

                        <th className="py-3 text-left text-xs  font-bold text-gray-500 uppercase tracking-wider">Code</th>
                        <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Minimum Spend</th>
                        <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                        <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
  {voucherList.map((voucher, index) => {
    // Convert expiry_date to a Date object
    const expiryDate = new Date(voucher.expiry_date);
    const currentDate = new Date();

    // Check if the voucher is expired
    const isExpired = expiryDate < currentDate;

    return (
      <tr key={index} className={`hover:bg-gray-100 ${isExpired ? 'bg-red-100' : ''}`}>
        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{index}</td>
        <td className="px-2 py-4 font-bold whitespace-nowrap text-sm text-gray-500">{voucher.code}</td>
        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{voucher.mini_spend}</td>
        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{voucher.discount}</td>
        <td className={`px-2 py-4 whitespace-nowrap text-sm ${isExpired ? 'text-red-600' : 'text-gray-500'}`}>
          {/* Show "Expired" if expired, otherwise show the expiry date */}
          {isExpired ? 'Expired' : voucher.expiry_date}
        </td>
        <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button
            onClick={() => { setSureDelete(!sureDelete); setVouchercode(voucher.code) }}
            className="text-red-600 hover:text-red-900"
              // Disable delete button if voucher is expired
          >
            Delete
          </button>
        </td>
      </tr>
    );
  })}
</tbody>

                  </table>
                </div>
              ) : (
                <div>No vouchers available</div>
              )}
            </div>

          ) : null
      }
      {
        sureDelete ? (
          <div className='         flex-col  bg-slate-50 border-2 border-sky-100 shadow-md  w-[300px]  h-[200px]  rounded-xl fixed z-50  flex'>
            <div>
              <CloseIcon className=' flex   ml-auto  m-2  ' onClick={() => { setSureDelete(!sureDelete) }} />

            </div>
            <div className='  flex justify-center font-bold mb-8'> <p >Are you sure? <DeleteForeverRoundedIcon style={{ color: 'red' }} /></p></div>

            <div className=' justify-between flex '>
              <Button onClick={() => { setSureDelete(!sureDelete) }} variant="contained" className='  bg-[#1C4E80] ml-auto mr-auto h-9 p-3'>cancel</Button>
              <Button onClick={() => { deletevoucher(vouchercode) }} variant="contained" className='  bg-red-600 ml-auto mr-auto h-9 p-3'>Delete</Button>



            </div>
          </div>)
          : null
      }
    </div>
  )
}

export default VouchersTable