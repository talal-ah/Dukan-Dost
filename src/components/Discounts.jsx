import React from 'react'
import { GetToken } from '../services/storetoken'
import { useProductShowQuery } from '../reduxServices/Apis/ProductsApis';
import { useApplyDiscountMutation } from '../reduxServices/Apis/ProductsApis';
import { useSelector } from 'react-redux';
import { useState, useEffect, useReducer } from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { setfetchStatus } from '../reduxServices/slicers/fetch';
import { useImageGetQuery } from '../reduxServices/Apis/ProductsApis';
import { useVoucheraddMutation } from '../reduxServices/Apis/ProductsApis';
import VouchersTable from './VouchersTable';

function Discounts() {
  const [productsPic, setProductsPic] = useState([]);
  const [discount_type, setdiscount_type] = useState('Select');
  const [discount_value, setdiscount_value] = useState(0);
  const [product_name, setProductName] = useState('Select');
  const [inventry, setInventry] = useState('product_name');
  const [category, setCategory] = useState('')
  const tokens = GetToken();
  const accessToken = tokens.access_token;
  const [products, setProducts] = useState([])
  const [response, setResponse] = useState(null);

  const dispatch = useDispatch();
  const { data, isSuccess, refetch } = useProductShowQuery(accessToken)

  const [applydis, { isLoading }] = useApplyDiscountMutation();
  const [voucheradd, { isLoadingg }] = useVoucheraddMutation();
  

  const [applydiscount, setApplydiscount] = useState(false)
  const [addVouchers, setAddVouchers] = useState(false)

  // console.log('ye ha vonchhhhh',voucherList)
  
  // useEffect(() => {
  //   if (voucherList) {
  //     console.log(voucherList);
  //   } else  {
  //     console.error('Error fetching voucher list:');
  //   }
  // }, [voucherList]);
  // fff
  const filteredProducts = category
    ? products.filter(product => product.category === category)
    : products;





  // ffff

  // const token = useSelector(state => state.auth.token);
  console.log(discount_type, discount_value, product_name, inventry, category)

  const categories = [
    'Fruits',
    'Vegetables',
    'Dairy & Eggs',
    'Bakery & Bread',
    'Meat & Seafood',
    'Rice & Grains',
    'Snacks & Chips',
    'Spices & Condiments',
    'Tea & Coffee',
    'Oils & Ghee',
 
    
  ];
  const handlediscount_valueChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && !value.includes('-'))) {
      setdiscount_value(value);
    }
  };
  useEffect(() => {
    if (isSuccess && data) {
      setProducts(data)

    }

  }, [isSuccess, data])
  console.log('daaaaaaaaaayyaa', data)


  // apply discounts
  async function discountapply() {
    if (discount_value <= 0.01) {
      alert('Discount Value Must be Greater than 0.01')

    }
    else if (category == undefined && product_name == undefined) {
      alert('Either category or product name must be provided')

    }
    else if (category === 'Select' && product_name === 'Select') {
      alert('Either category or product name must be provided')

    }

    else {
      const formData =
      {

        discount_value: Number(discount_value),
        category: inventry === 'category' ? category : undefined,
        product_name: inventry === 'product_name' ? product_name : undefined,
      };

      // 

      const response = await applydis({ formData, accessToken })
      try {
        if (response.data) {
          console.log(response)
          alert('Discount Successfull')
          dispatch(setfetchStatus(true))

        }
        else {
          alert('Discount Not Successfull')

        }

      } catch (error) {
        console.log(error)

      }
    }


  }
  // disssssssssssssssssssssssssss


  const [code, setCode] = useState('');
  const [mini_spend, setMini_spend] = useState();

  const [discount, setDiscount] = useState();
  const [expiry_date, setExpiry_date] = useState();
  // const dispatch = useDispatch();


  const validate = () => {
    if (!code) {
      alert('Code is required');

    }

    else if (!mini_spend) {
      alert('Minimum spend is required');

    } else if (isNaN(mini_spend) || mini_spend <= 0) {
      alert('Minimum spend must be a positive number');

    }

    else if (!discount) {
      alert('Discount is required');

    } else if (isNaN(discount) || discount <= 0) {
      alert('Discount must be a positive number');

    }

    else if (!expiry_date) {
      alert('Expiry date is required');

    } else {
      const datePattern = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
      if (!datePattern.test(expiry_date)) {
        alert('Expiry date must be in YYYY-MM-DD format');

      }
    }

  };


  // handlesubmit

  const handleSubmit = async (e) => {
    validate()
    e.preventDefault();
    const vouncherdata = {
      code,
      mini_spend,
      discount,
      expiry_date

    }
    console.log(code,
      mini_spend,
      discount,
      expiry_date)
    try {
      const response = await voucheradd({vouncherdata,accessToken});
      if (response.data) {
        setResponse(response)
        alert('Voucher ADD');


      }
      else {
        alert('Voucher Not ADD');

      }
    } catch (error) {
      console.error('Error adding voucher:', error);
      alert('Voucher Not ADD');

    }




  };




 

  return (
    <>








      <div className=' overflow-y-auto flex flex-col  w-full p-3  items-center  h-[600px]  '>
        <div onClick={() => { setApplydiscount(!applydiscount) }} className='cursor-pointer  rounded-lg flex  mx-2   w-[50%]   bg-[#1C4E80] text-white font-bold  justify-center'>
          <h1 className='  md:text-xl font-serif font-bold   py-3 px-7   cursor-pointer '>Apply Discounts </h1>

        </div>
        {
          applydiscount ? (<div className=' mx-auto mt-4 verflow-y-auto  bg-white shadow-xl p-3  rounded-xl   flex  '>
            <form onSubmit={handleSubmit} action="" className=' space-y-4'>



              <div className=' w-auto space-x-4  p-3  '>
                <label className=' md:text-xl rounded-lg p-3  text-white bg-blue-500'>
                  Select Inventry Type</label>

                <select className='md:text-lg rounded-lg p-3  hover:border-blue-500   border border-gray-200 ml-5' value={inventry} onChange={(e) => setInventry(e.target.value)}>

                  <option value="product_name">Product name</option>
                  <option value="category">Category</option>
                </select>

                {
                  inventry == 'category' ?
                    <select className='md:text-lg rounded-lg p-3  hover:border-blue-500   border border-gray-200 ml-5' value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option value='Select'>Select</option>

                      {

                        categories.map((index, key) => (
                          <option value={index}>{index}</option>

                        ))
                      }

                    </select>
                    :
                    <>
                      <select className='md:text-lg rounded-lg p-3  hover:border-blue-500   border border-gray-200 ml-5' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value='Select'>Select</option>

                        {

                          categories.map((index, key) => (
                            <option value={index}>{index}</option>

                          ))
                        }

                      </select>
                      <select className='md:text-lg rounded-lg p-3  hover:border-blue-500   border border-gray-200 ml-5' value={product_name} onChange={(e) => setProductName(e.target.value)}>
                        <option value='Select'>Select</option>

                        {
                          filteredProducts.map((index, key) => (
                            <option value={index.name}>{index.name}</option>

                          ))
                        }

                      </select>

                    </>

                }




              </div>
              <div className=' w-auto space-x-4   p-3     '>
                <label className=' md:text-xl rounded-lg p-3 text-white  bg-blue-500'>Discount Upto %:</label>
                <input
                  className='rounded-lg p-3  hover:border-blue-500 md:text-lg border border-gray-200 ml-5'
                  type="number"
                  value={discount_value}
                  onChange={handlediscount_valueChange}
                />
              </div>

              <Button variant="contained" className=' ml-[20%] mt-10 mx-auto  mb-10 bg-blue-500  w-[50%]  h-9 p-3' onClick={discountapply}>Apply</Button>


            </form>



          </div>
          )
            : null
        }
        <div onClick={() => { setAddVouchers(!addVouchers) }}
          className=' rounded-lg flex mt-4  mx-2  cursor-pointer  w-[50%] from-blue-400 bg-[#1C4E80] justify-center'>
          <h1 className='  md:text-xl font-serif   cursor-pointer   py-3 px-7 text-white font-bold  '>Add Voucher </h1>

        </div>
        {/* Voucher..................... */}
        {
          addVouchers ? (<form className="space-y-4 mt-4 bg-white p-3 shadow-xl flex flex-col  ">
            <div>
              <label className="     text-white       md:text-xl rounded-lg p-3  bg-blue-500">
                Voucher Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="rounded-lg p-3  hover:border-blue-500 md:text-lg border border-gray-200 ml-5"
                required
              />
            </div>

            <div>
              <label className="     text-white       md:text-xl rounded-lg p-3  bg-blue-500">
                Minimum Spend</label>
              <input
                type="number"
                value={mini_spend}
                onChange={(e) => setMini_spend(e.target.value)}
                className="rounded-lg p-3  hover:border-blue-500 md:text-lg border border-gray-200 ml-5"
                required
              />
            </div>

            <div>
              <label className=" md:text-xl rounded-lg p-3 text-white  bg-blue-500">Discount (%)</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="rounded-lg p-3  hover:border-blue-500 md:text-lg border border-gray-200 ml-5"
                required
              />
            </div>
            <div>
              <label className=" md:text-xl rounded-lg p-3 mr-auto text-white  bg-blue-500">Expiry Date</label>
              <input
                type="date"
                value={expiry_date}
                onChange={(e) => setExpiry_date(e.target.value)}
                className="rounded-lg p-3  hover:border-blue-500 md:text-lg border border-gray-200 ml-5"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleSubmit}
            >
              Add Voucher

            </button>
          </form>
          ) : null
        }
       
        <VouchersTable voucheradd={response}/>

      </div>






    </>
  )
}

export default Discounts