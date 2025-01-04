import React from 'react'
import 'tailwindcss/tailwind.css'
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import EditItems from './EditItems';
import '../index.css'
import AddItems from './AddItems';
import ItemList from './ItemList';
import { useEffect, useState, useReducer } from 'react'
import { GetToken } from '../services/storetoken'
import { useProductShowQuery, useImageGetQuery } from '../reduxServices/Apis/ProductsApis';

import { useProductUpdateMutation } from '../reduxServices/Apis/ProductsApis';
import DilogBox from './DilogBox';
import { ArrowDropDown } from '@mui/icons-material';
import categories from './catagorysheet';
import ShowCatagory from './ShowCatagory';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setfetchStatus } from '../reduxServices/slicers/fetch';

function AddInventery() {
  // const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  // states.......
  const [search, setSearch] = useState('')
  const [ondelete, setOndelelte] = useState(false)
  const [products, setProducts] = useState([]);
  const [updateProductmutation, isLoading] = useProductUpdateMutation();
  const [fet, setFet] = useState(1)
  const [token, setToken] = useState({})
  const [add, setadd] = useState(false)
  const [catagoryselect, setCatagoryselect] = useState('All Products')
  const [catatoggl, setCatatoggl] = useState(false)
  const dispatch = useDispatch();
  // states end...........

  const searchItem = products.filter((items) => {
    if (search === '' && catagoryselect === 'All Products') {
      return items;
    } else if (search !== '' && catagoryselect === 'All Products') {
      return items.name.toLowerCase().includes(search.toLowerCase());
    } else if (search === '' && catagoryselect !== 'All Products') {
      return items.category === catagoryselect;
    } else {
      return items.name.toLowerCase().includes(search.toLowerCase()) && items.category === catagoryselect;
    }
  })




  // acess token.......................
  useEffect(() => {

    const token = GetToken()
    if (token) {

      setToken({
        'access': token.access_token,
        'refresh': token.Refresh_token

      })



    }






  }, []);

  // acess token End.......................
  // fetch Productsss...........
  const { data, isSuccess, refetch } = useProductShowQuery(token.access)

  // const [dataFromChild, setDataFromChild] = useState(null);

  // const handleDataFromChild = (data) => {
  //   setDataFromChild(data);
  // };
  // console.log(data)
  // console.log(refetch())
  // setProducts(data)



  // function for showcatagory



  // .................

  function againfetch() {

    refetch()
    console.log('fetch ho giyaaa')

  }





  useEffect(() => {

    if (data) {

      setProducts(data)

      // console.log(data)







    }


  }, [data, isSuccess])
  // useEffect(() => {
  //   if (dataFromChild) {
  //     refetch();
  //   }
  // }, [ refetch]);

  // fetch Productsss end...........

  // Update Product...............
  const [editproduct, setEditproduct] = useState(false)

  async function updateProductApi() {
    try {
      const resp = await updateProductmutation(updateProduct)
      console.log(resp)
      console.log('update')


    } catch (error) {
      console.log(error)


    }

  }


  function EditItem(placeholders) {
    return (
      <>

        <div className='w-auto rounded-xl fixed z-50  justify-center  border  border-blue-500  bg-slate-50   backdrop-blur-md   mx-[20%]    self-center'>
          <CloseIcon className=' flex   ml-auto  m-2  ' onClick={() => { setEditproduct(false) }} />

          <EditItems edit={editproduct} onfectch={againfetch} placeholders={placeholders} clickfun={updateProductApi} onClick={() => { setEditproduct(false) }} name="Edit Product" />
          {/* <AddItems edit={editproduct} placeholders={placeholders} clickfun={updateProductApi}   name="Edit Product"/> */}
        </div>

      </>
    )


  }


  const [updateProduct, setUpdateProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    DiscountedPrice: '',
    unit: '',
    value: '',

    category: '',
    productID: '',



  });

  // function......
  function edited(params) {
    setEditproduct(true);
    setUpdateProduct({
      name: params.name,
      price: params.price,
      quantity: params.quantity,
      DiscountedPrice: params.DiscountedPrice,
      unit: params.unit,
      value: params.value,

      category: params.category,
      productID: params.productID
    })






  }


  // Update Product End...............
  // console.log(updateProduct)
  console.log(token.access)

  function setFunction({ func }) {
    func()



  }
  const [delid, setDelId] = useState(null)

  function getdelid(id) {
    setDelId(id)

  }
  const fetchstatus = useSelector(state => state.fetchStatus)
  console.log('deforesssssffff---', fetchstatus)

  useEffect(() => {
    if (fetchstatus) {
      refetch()
      console.log('sssss---', fetchstatus);

      dispatch(setfetchStatus(false));
      console.log('afterdis---', fetchstatus);
    }
  }, [fetchstatus, dispatch, data]);


  // if (fetchstatus == true) {
  //   againfetch();
  //   console.log('sssss---',fetchstatus)

  //   dispatch(setfetchStatus(false))
  //   console.log('afterdis---',fetchstatus)
  // }
  // console.log('afterdis---',fetchstatus)


  return (
    <>
      {editproduct && <EditItem placeholders={updateProduct} />}

      <div className=" bg-white  shadow-xl w-full h-full  overflow-x-auto   mt-1 rounded-xl  p-3     flex-col">

        <div className=' h-[50]  flex self-end '>
          <Button variant="contained" className=' bg-[#f89a5c] ml-auto'
            onClick={() => setadd(!add)}
          >Add Inventory
          </Button>
        </div>
        {add ? <AddItems name="Add Product" onfectch={againfetch} funct={() => { setFet(fet + 1) }} /> : null}
        {
          !add ?
            <div className=' flex w-full   '>
              <h1 className=' p-3 lg:text-4xl text-base md:text-base  w-full font-bold   '>Products</h1>

              <input className='   text-black bg-slate-300 rounded-3xl p-3   w-full h-6  md:h-10 my-auto ml-auto mr-2' type="text" placeholder='Search...'
                onChange={(event) => { setSearch(event.target.value) }}
              />
              <div className='my-auto   w-full'>
                <input value={catagoryselect} placeholder='Categories' type="text" className='    w-full h-6  md:h-10  text-black bg-slate-300 rounded-3xl p-3     mr-2' onClick={() => { setCatatoggl(!catatoggl) }} />

                {
                  catatoggl ? <div className=' fixed  z-50 mr-10     md:ml-10  w-[200px]  rounded-xl shadow-lg  bg-white items-center justify-center'>
                    <ul className='w-full text-sm  mt-1  md:text-md'>


                      {categories.map((items, index) => (
                        <li onClick={() => { setCatagoryselect(items); setCatatoggl(!catatoggl) }} className='p-1 w-full  cursor-pointer  shadow-md  overflow-auto hover:bg-blue-100' key={index}>{items}</li>

                      ))}

                    </ul>


                  </div>
                    : null
                }

              </div>



            </div>
            : null
        }


        <div className=' h-[450px] overflow-auto '>
          <div className='flex items-center justify-center'>
            {ondelete == true ? <DilogBox onfectch={againfetch} delID={delid} onDel={() => { setOndelelte(!ondelete) }} /> : null}

          </div>
          {/* ()=>{deleteItem(product.productID)} */}
          {

          }

          {

            !add ?



              (


                <ItemList searchItem={searchItem} getdelid={getdelid} onDel={() => { setOndelelte(!ondelete) }} onfectch={againfetch} edit={(e) => { edited(e) }} />




              )


              : null


          }


        </div>


      </div>
    </>
  )
}

export default AddInventery