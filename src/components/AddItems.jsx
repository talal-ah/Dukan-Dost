import React from 'react'
import 'tailwindcss/tailwind.css'
import Button from '@mui/material/Button';
import { useState, useEffect,useReducer } from 'react';
import '../index.css'
import { useSelector } from 'react-redux';
import { useProductADDMutation,useImageGetQuery } from '../reduxServices/Apis/ProductsApis';
import { GetToken } from '../services/storetoken'
import BorderOr from './BorderOr';
import UploadCSV from './UploadCSV';
import { ArrowDropDown } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import Loadingdata from './Loadingdata';
import AddInventery from './AddInventery';
import ItemList from './ItemList';
import { useProductShowQuery } from '../reduxServices/Apis/ProductsApis';
import productPicsByCategory from '../services/productPicsByCategory';
function AddItems({ edit, name, placeholders, clickfun,onfectch  }) {

//States........................
const units = ["k", "ml", "g", "kg", "cm", "m", "L",'Dozen', "mL", "km", "mm","Small","Medium","Larg"];

  const[fet,setFet]=useState(1)
  const [catatoggl, setCatatoggl] = useState(false)
  const [token, setToken] = useState({})
  const dukandata = useSelector(state => state.dukandata);
  const [additem, { isLoading,isSuccess  }] = useProductADDMutation()


  const [formData, setFormData] = useState({
    name: '',
    price: '',
    DiscountedPrice:'',
    quantity: '',
    productImg: '',
    productImgUrl:'',
    category: '',
    value:'',
    unit:'',
    subcategory:"",

    store: dukandata.dukaanId

  });
// ................................

  useEffect(() => {
    const token = GetToken()
    if (token) {

      setToken({
        'access': token.access_token,
        'refresh': token.Refresh_token

      })



    }






  }, []);



  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      ['category']: category
    }));
    setSelectedCategory(category);
    setSubCategories(categories[category] || []); // Set subcategories based on selected category
    setSelectedSubCategory(''); // Reset the subcategory when category changes
};
const handleSubCategoryChange = (event) => {
  const subcategory=event.target.value
  setFormData(prevFormData => ({
    ...prevFormData,
    ['subcategory']: subcategory
  }));
  setSelectedSubCategory(subcategory);
};
  // catagores...........
 const categories = {
    'Fruits': ['Apple', 'Banana', 'Grapes', 'Mangoes','Oranges'],
    'Vegetables': ['Carrot', 'Onions', 'Potatoes', 'Tomatoes','Spinach'],
    'Dairy & Eggs': ['Milk', 'cheese', 'Yogurt', 'Eggs','Butter'],
    'Bakery & Bread': ['Breads','Buns', 'NAans', 'Rusks'],
    'Meat & Seafood': ['Beef','Chicken','Fish','Minced Meat','Mutton' ],   
    'Rice & Grains': ['Basmati Rice', 'Chickpeas', 'Lentils', 'Semolina','Wheat Flour'],
    'Snacks & Chips': ['Chips', 'Biscuits', 'Frozen Samosas', 'Nimco','Noodels'],
    'Spices & Condiments':['Black Pepper Powder','Coriander Powder','Cumin  Powder','Red Chili Powder','Turmeric powder'],
    'Tea & Coffee':['Black Tea','Coffee','Green Tea','Herbal Teas'],
    'Oils & Ghee': ['cooking oil', 'Desi Ghee', 'Olive Oil', 'Sunflower Oil'],
    
  
};


  // const [products, setProducts] = useState([]);
  
  // HandleInputs for AddItems ..................................
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'productImg' && event.target.files) {
      // When a file is selected, update the state with the file object
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: event.target.files[0]
      }));
    } else {
      // For other input fields or if no file is selected, update the state as usual
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }

if (name=="category") {
  setSubCategories(categories[category] || []);
  
}

    // For other input fields, update the state as usual


    // Update all properties in formData except for 'store'
    // const  { data, isSuccess } =   useProductShowQuery(token.access) 

  };

  // Send ADD items form data to APIs..............................................................APIS

  const addProduct = async () => {



    try {
      console.log("formData is here:",formData)
      const response = await additem(formData)
      if (response.data) {
        console.log(response)
        alert('Product Uploaded')
       setFormData({
        name: '',
    price: '',
    quantity: '',
    productImg: '',
    productImgUrl:'',
    category: '',
    DiscountedPrice:'',
    value:'',
    subcategory:"",

    store: dukandata.dukaanId
       })
       setSelectedCategory('')
       setSubCategories([])
       setSelectedItem(null)
       onfectch()
     
       

      // {()=>{ AddInventery()}}
      // window.location.reload()

      


      }
      else if (response.error) {
        // Error response from server
        console.log(response.error);
        alert(`Error: ${response.error.data.message || 'Failed to Upload Product'}`);
      
      }

    } catch (error) {
      console.log(error);

    }




  };
  // ....................................

  // const removeProduct = (index) => {
  //   const updatedProducts = [...products];
  //   updatedProducts.splice(index, 1);
  //   setProducts(updatedProducts);
  // };

  // console.log(formData)


  // apeend 



  // const [editformData, setEditformData]=useState({

  //   price: placeholders.price,
  //   quantity: placeholders.quantity,
  //   productImg:placeholders.productImg,
  //   category:placeholders.category,

  // })
  // console.log(editformData)
  // console.log(placeholders.placeholders)
  console.log(formData)

// SHOW pics of product in Catalog.............

const [selectedItem, setSelectedItem] = useState(null)
const [picCatalog,setPicCatalog]=useState(false)

const [productsPic, setProductsPic] = useState([]);
const { data} =  useImageGetQuery(formData.category)
console.log(data)
useEffect(() => {
setProductsPic(data)
}, [formData.category,data]);



// // ......................................


// const ans=productPicsByCategory( formData.category).then(setProductsPic)
// console.log(productsPic)
  return (
    <div className='   bg-white rounded-xl  p-5 shadow-xl' >
<div className='    flex   items-center justify-center'>
      {isLoading ? <Loadingdata/> : null  }
      </div>
      <form encType="multipart/form-data" className='  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4  items-center '>
        
        <input className='  border-gray-100 border-2 shadow-lg focus:outline-none focus:border-blue-500 rounded-lg text-black w-full  mb-4  mr-auto h-12 p-3' type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder={edit == true ? `${placeholders.placeholders.name}` : "Product Name"} />
      {/* select categoriesss  */}

      <div className='flex flex-row space-x-1'>
        {/* Category Select */}
        <select 
            onChange={handleCategoryChange} 
            value={selectedCategory} 
            className="border-gray-100 border-2 shadow-lg focus:outline-none focus:border-blue-500 dropdown-button rounded-lg w-full mb-4 h-13 p-3"
        >
            <option value="">Select category</option>
            {Object.keys(categories).map((category, index) => (
                <option key={index} value={category}>
                    {category}
                </option>
            ))}
        </select>

        {/* Subcategory Select */}
        {subCategories.length > 0 && (
            <select 
                onChange={handleSubCategoryChange} 
                value={selectedSubCategory} 
                className="border-gray-100 border-2 shadow-lg focus:outline-none focus:border-blue-500 dropdown-button rounded-lg w-full mb-4 h-13 p-3"
            >
                <option value="">Select subcategory</option>
                {subCategories.map((subCategory, index) => (
                    <option key={index} value={subCategory}>
                        {subCategory}
                    </option>
                ))}
            </select>
        )}
    </div>



      {/* select category end  */}



{/* ................... */}
<div  className="">
  <Button onClick={()=>{setPicCatalog(!picCatalog)}}
   variant="outlined"  className={`dropdown-button border-2 focus:border-blue-500  shadow-lg focus:outline-none rounded-lg w-full mb-4 h-12 p-3 
    ${!formData.productImg ? 'border-gray-100 text-black' : 'border-red-500 bg-gray-200 cursor-not-allowed'}`}
  disabled={formData.productImg} >
{
  selectedItem  ?  (
    <div className='flex items-center'>

<img className=' rounded-lg  w-[40px] h-[40px] ' src={`http://127.0.0.1:8000${selectedItem.productImg}`} alt={selectedItem.name} />


 <label className='p-3' htmlFor="">
      {selectedItem.name}
    </label>
    </div>
  
 
     
     
    )
     :'Select Image here'
}
</Button>


{
 productsPic?( picCatalog && formData.category ?(
    <div className=' fixed z-50 p-2    w-auto  ml-9 overflow-scroll h-[400px]   rounded-xl shadow-lg  bg-white items-center justify-center  '>

<ul className='w-full  text-md'>
<li className='border-b-2 flex items-center p-2  '
     onClick={()=>{setFormData(prevFormData => ({
      ...prevFormData,
      productImgUrl: ""
    }));
    
    setSelectedItem(null)
    setPicCatalog(!picCatalog)}} >
     <label className='   p-2 sm:text-lg lg:text-xl text-center'>None Of These</label>

     </li>

  {
    productsPic.map((items,index)=>(
     <>
     
      
<li
onClick={()=>{setFormData(prevFormData => ({
  ...prevFormData,
  productImgUrl: `http://127.0.0.1:8000/${items.productImg}`
}));

setSelectedItem(items)
setPicCatalog(!picCatalog)}}




className='border-b-2 flex items-center p-2  ' 

>
<img className='lg:w-[100px] lg:h-[100px] w-[40px] h-[40px] ' src={`http://127.0.0.1:8000${items.productImg}`} alt={items.name} />
 
  
  <label className='   p-2 sm:text-lg lg:text-xl text-center'>{items.name}</label>
  
  </li>


  </> ))
  }
  

</ul>
</div>
  )

  :null

)
:
null
}


</div>



{/* ...........end */}

        

        <input className=' border-gray-100 border-2 shadow-lg focus:outline-none focus:border-blue-500  rounded-lg text-black  w-full mb-4  mr-auto h-12 p-3' type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} placeholder={edit == true ? `${placeholders.placeholders.quantity}` : "Quantity"} />

        <input className=' border-gray-100 border-2 shadow-lg focus:outline-none focus:border-blue-500  rounded-lg text-black w-full mb-4  mr-auto h-12 p-3' type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder={edit == true ? `${placeholders.placeholders.price}` : "selling Price"} />
        <input className=' border-gray-100 border-2 shadow-lg focus:outline-none focus:border-blue-500  rounded-lg text-black w-full mb-4  mr-auto h-12 p-3' type="number" name="DiscountedPrice" value={formData.DiscountedPrice} onChange={handleInputChange} placeholder={edit == true ? `${placeholders.placeholders.DiscountedPrice}` : "Discounted Price"} />
        
        {/* <input className=' border-gray-100 border-2 shadow-lg focus:outline-none focus:border-blue-500  rounded-lg text-black w-full mb-4  mr-auto h-12 p-3' type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder={edit == true ? `${placeholders.placeholders.price}` : "selling Price"} /> */}
        <input className=' border-gray-100 border-2 shadow-lg focus:outline-none focus:border-blue-500  rounded-lg text-black w-full mb-4  mr-auto h-12 p-3' type="number" name="value" value={formData.value} onChange={handleInputChange} placeholder={edit == true ? `${placeholders.placeholders.value}` : "value"} />
        <select  onChange={handleInputChange}  name='unit'  className="  border-gray-100 border-2 shadow-lg focus:outline-none focus:border-blue-500   dropdown-button rounded-lg w-full mb-4 h-13 p-3 ">
        <option   >
         Select Unit
        </option>
      {units.map((unit) => (
        <option key={unit} value={unit} >
          {unit}
        </option>
      ))}
    </select>
        <input className={` dropdown-button border-2 shadow-lg focus:outline-none rounded-lg w-full mb-4 h-12 p-3 
    ${!formData.productImgUrl ? 'border-gray-100 text-black' : 'border-red-500 bg-gray-200 cursor-not-allowed'}`}
  disabled={formData.productImgUrl}
        type='file' accept="image/*" name="productImg"
        onChange={handleInputChange} />
        
       
      
      {/* <Button variant="contained" className='bg-[#1C4E80] ml-auto mr-auto h-9 p-3' onClick={addProduct}>{isLoading ? <CircularProgress size={24} /> : name}</Button> */}
      
     
      </form>


      {edit == true ? <Button variant="contained" className=' bg-[#1C4E80] ml-auto mr-auto h-9 p-3' onClick={clickfun} >{name}</Button>
          :
          <Button variant="contained" className=' bg-[#1C4E80] flex ml-auto   h-9 p-3' onClick={addProduct}  >{name}</Button>}

 





      <ul>
        {/* {products.map((product, index) => (
        <li key={index}>
          <div>{product.productName}</div>
          <div>{product.price}</div>
          <div>{product.quantity}</div>
          <div>{product.salePrice}</div>
          <div>{product.image}</div>
          <button onClick={() => removeProduct(index)}>Remove</button>
        </li>
      ))} */}
      </ul>
    </div>
  )
}

export default AddItems