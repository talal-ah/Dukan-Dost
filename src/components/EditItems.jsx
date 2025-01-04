import React from 'react'
import Button from '@mui/material/Button';
import { useState,useEffect } from 'react';
import { useProductUpdateMutation,useImageGetQuery } from '../reduxServices/Apis/ProductsApis';
import Loadingdata from './Loadingdata';
 

 
function EditItems({edit, placeholders,onClick,onfectch, clickfun, name}) {
  const [selectedItem, setSelectedItem] = useState(null)
const [picCatalog,setPicCatalog]=useState(false)

  // catagores...........

  const categories = {
    'Fruits': ['Apple', 'Banana', 'Grapes', 'Mangoes','Oranges'],
    'Vegetables': ['Carrot', 'Onions', 'Potatoes', 'Tomatoes','Spinach'],
    'Dairy & Eggs': ['Milk', 'Cheese', 'Yogurt', 'Eggs','Butter'],
    'Bakery & Bread': ['Breads','Buns', 'NAans', 'Rusks'],
    'Meat & Seafood': ['Beef','Chicken','Fish','Minced Meat','Mutton' ],   
    'Rice & Grains': ['Basmati Rice', 'Chickpeas', 'Lentils', 'Semolina','Wheat Flour'],
    'Snacks & Chips': ['Chips', 'Biscuits', 'Frozen Samosas', 'Nimco','Noodels'],
    'Spices & Condiments':['Black Pepper Powder','Coriander Powder','Cumin  Powder','Red Chili Powder','Turmeric powder'],
    'Tea & Coffee':['Black Tea','Coffee','Green Tea','Herbal Teas'],
    'Oils & Ghee': ['cooking oil', 'Desi Ghee', 'Olive Oil', 'Sunflower Oil'],
    
  
};

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
const units = ["k", "ml", "g", "kg", "cm", "m", "L", "mL", "km", "mm"];
const [productsPic, setProductsPic] = useState([]);
const [formData, setFormData] = useState({});
const { data: imageData, isLoading: imageLoading } = useImageGetQuery(formData.category, {
  skip: !formData.category, // Skip query if category is not selected
});

// Update local state when fetched images are available
useEffect(() => {
  if (imageData) {
    setProductsPic(imageData);
  }
}, [imageData]);


// useEffect(() => {
//   if (formData.category) {

//     fetchData();
//     console.log('produces edit images',productsPic) // Immediately call fetchData within useEffect
//   }
// }, [formData.category]);

//  const { data} = formData.category &&  useImageGetQuery(formData.category)
// console.log(data)
// useEffect(() => {
// setProductsPic(data)
// }, [formData.category,data]);

    const [editItems,{isLoading}]=useProductUpdateMutation()
    // const [productsPic, setProductsPic] = useState([]);
    // const { data} =  useImageGetQuery(formData.category)
    // console.log(data)
    // useEffect(() => {
    // setProductsPic(data)
    // }, [formData.category,data]);
    



const id=placeholders.placeholders.productID
// function onchane



    const handleInputChange = (event) => {
      const { name, value, files } = event.target;
  
      setFormData(prevFormData => {
          // Create a copy of the previous state
          const newFormData = { ...prevFormData };
  
          if (files) {
              // If files are provided, update the state with the file object
              newFormData[name] = files[0];
          } else if (value !== '') {
              // If value is provided and not empty, update the state with the value
              newFormData[name] = value;
          } else {
              // If the value is empty, remove the key from the state
              delete newFormData[name];
          }
  
          return newFormData;
      });
  };
  
    // Update iems data ....

  async function updateItemsData() {
   
    console.log(formData);

    try {
        const resp= await editItems({ formData,id})
        if (resp.data) {

            console.log(resp)
            alert('Product Updated')
            onClick()
            onfectch()
        }
        else if (response.error) {
          // Error response from server
          console.log(response.error);
          alert(`Error: ${response.error.data.message || 'Failed to Update Product'}`);
        }
        
    } catch (error) {
        console.log(error)
        
    }
    
  }

  return (
    <div className='rounded-xl p-5 shadow-xl' >
      <div className='  z-50  flex   items-center justify-center'>
      {isLoading ? <Loadingdata/> : null   }
      </div>
    <form    encType="multipart/form-data" className='  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4  items-center '>
<div>
  
<label htmlFor="">Product name</label>
      <input className='  border-gray-100 border-2 shadow-lg focus:outline-none focus:border-blue-500 rounded-lg text-black w-full  mb-4  mr-auto h-12 p-3' type="text" name="name" placeholder={placeholders.placeholders.name} onChange={handleInputChange}  />
</div>      
      
 <div>
 <label htmlFor="">Category</label>
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


  </div>  
  {/* ................... */}
<div  className=" ">
 <label htmlFor="">Product Image</label>

<div>
<Button onClick={()=>{setPicCatalog(!picCatalog)}}
   variant="outlined"  className={`dropdown-button bg-white   border-gray-100 border-2 shadow-lg focus:outline-none focus:border-blue-500 rounded-lg text-black w-full        mb-4  mr-auto h-12 p-3   ${!formData.productImg ? 'border-gray-100 text-black' : 'border-red-500 bg-gray-200 cursor-not-allowed'}`}
  disabled={formData.productImg} >
{
  selectedItem  ?  (
    <div className='flex items-center'>

<img className=' rounded-lg  w-[40px] h-[40px] ' src={`http://127.0.0.1:8000/${selectedItem.productImg}`} alt={selectedItem.name} />


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
<img className='lg:w-[100px] lg:h-[100px] w-[40px] h-[40px] ' src={`http://127.0.0.1:8000/${items.productImg}`} alt={items.name} />
 
  
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

</div>



{/* ...........end */}
  
<div> 
<label htmlFor="">Quantity</label>
      <input className=' border-gray-100 border-2 shadow-lg focus:outline-none focus:border-blue-500  rounded-lg text-black  w-full mb-4  mr-auto h-12 p-3' type="number" name="quantity" placeholder={placeholders.placeholders.quantity}  onChange={handleInputChange}  />

  </div>  
  <div> 
<label htmlFor="">Value</label>
      <input className=' border-gray-100 border-2 shadow-lg focus:outline-none focus:border-blue-500  rounded-lg text-black  w-full mb-4  mr-auto h-12 p-3' type="number" name="value" placeholder={placeholders.placeholders.value}  onChange={handleInputChange}  />

  </div>  
  <div> 
<label htmlFor="">Unit</label>
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
  </div> 
  
      
<div>
<label htmlFor="">Actual Price</label>
      <input className=' border-gray-100 border-2 shadow-lg focus:outline-none focus:border-blue-500  rounded-lg text-black w-full mb-4  mr-auto h-12 p-3' type="number" name="price" placeholder={placeholders.placeholders.price} onChange={handleInputChange}  />
</div>      
<div>
<label htmlFor="">Discounted price</label>
      <input className=' border-gray-100 border-2 shadow-lg focus:outline-none focus:border-blue-500  rounded-lg text-black w-full mb-4  mr-auto h-12 p-3' type="number" name="DiscountedPrice" placeholder={placeholders.placeholders.DiscountedPrice} onChange={handleInputChange}  />

</div>
      <div>
      <label htmlFor="">Image</label>
      <input className={` bg-white border-gray-100 border-2 shadow-lg focus:outline-none focus:border-blue-500  rounded-lg text-black w-full mb-4  mr-auto h-12 p-3 
    ${!formData.productImgUrl ? 'border-gray-100 text-black' : 'border-red-500 bg-gray-200 cursor-not-allowed'}`}
    disabled={formData.productImgUrl}
        type='file'  accept="image/*" name="productImg" onChange={handleInputChange}
      />
      </div>
     
       {/* {edit == true ?<Button variant="contained" className=' bg-[#7C41F5] ml-auto mr-auto h-9 p-3'  ></Button>
      : 
             } */}
    </form>
{/*     
    {edit == true?null:<BorderOr/> }
    {edit == true?null:<UploadCSV/> } */}

<Button variant="contained" className=' bg-[#7C41F5] flex ml-auto h-9  p-3' onClick={updateItemsData}  >Edit Product</Button>

   

  

  </div>

  )
}

export default EditItems