import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const ProductsApis = createApi({
    reducerPath: 'ProductsApis',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/store' }),
    
    endpoints: (builder) => ({
      productADD: builder.mutation({
        query:(user)=>{
          const formData = new FormData();
          formData.append('name', user.name);
          formData.append('price', user.price);
          formData.append('DiscountedPrice', user.DiscountedPrice);

          formData.append('quantity', user.quantity);
          formData.append('productImg', user.productImg);
          formData.append('category', user.category);
          formData.append('store', user.store);
          formData.append('value', user.value);

          formData.append('unit', user.unit);
          formData.append('subcategory', user.subcategory);


          formData.append('productImgUrl', user.productImgUrl);

          console.log(user)
          return {
              url:'productsadd/',
              method:'POST',
              body:formData,
              headers:{
                
              }
  
  
          }
  
        }
      }),
      ApplyDiscount: builder.mutation({
        query:({formData,accessToken})=>{
          console.log('appppppppppppppppp', formData)
          
          return {
              url:'apply-discount/',
              method:'POST',
              body:formData,
              headers:{
                'authorization':`Bearer ${accessToken}`
               
              }
  
  
          }
  
        }
      }),
      productByCSV: builder.mutation({
        query:({file,token})=>{
          const formData = new FormData();
          formData.append('file', file);
          
          console.log("ya ha fileee",file)
          return {
              url:'productsaddCSV/',
              method:'POST',
              body:formData,
              headers:{
                'authorization':`Bearer ${token}`

              
               
              }
  
  
          }
  
        }
      }),
    //   loginuser:builder.mutation({
    //     query:(user)=>{
    //       return {
    //           url:'login/',
    //           method:'POST',
    //           body:user,
    //           headers:{
    //               'Content-type':'application/json',
    //           }
  
  
    //       }
  
    //     }
    //   }),
      productShow:builder.query({
        query:(token)=>{
          return {
              url:'products/',
              method:'GET',
              headers:{
                  'authorization':`Bearer ${token}`
              }
  
  
          }
  
        }
      }),
      productDelete: builder.mutation({
        query:(id)=>{
           
          return {
              url:`productdelete/${id}`,
              method:'DELETE',
              headers:{
                // 'authorization': `Bearer ${token}`,
              }
  
  
          }
  
        }
      }),
      productUpdate: builder.mutation({
        query:({formData,id})=>{
          const formDataToSend = new FormData();
          for (const key in formData) {
            formDataToSend.append(key, formData[key]);
          }
         
          console.log("actual updatedata",formData)
          
                
          return {
              url:`productupdate/${id}/`,
              method:'PUT',
              body:formDataToSend,
              
  
  
          }
  
        }
      }),
      imageGet:builder.query({
        query:(category)=>{
          console.log("reduxxxxxxxxx",category)
          return {
              url:`productImages/${category}/`,
              method:'GET',
              
  
  
          }
  
        }
      }),


      voucheradd: builder.mutation({
        query:( {vouncherdata,accessToken})=>{
          
          return {
              url:'voucheradd/',
              method:'POST',
              body:vouncherdata,
              headers:{
                'authorization':`Bearer ${accessToken}`
               
              }
  
  
          }
  
        }
      }),
      voucherDelete: builder.mutation({
        query:(voucher)=>{
          console.log("voucheeerrrr",voucher)
           
          return {
              url:`voucher/delete/${voucher}/`,
              method:'DELETE',
              
  
  
          }
  
        }
      }),
vouchershowlist:builder.query({
  query:(accessToken)=>{
    return{
      url:'voucherList/',
      method:'GET', 
        headers:{
        'authorization':`Bearer ${accessToken}`
       
      }
    }
  }

}),
orderList:builder.query({
  query:({accessToken})=>{
    console.log('accessTokenoooooo',accessToken)
    return{
      url:'order/',
      method:'GET', 
        headers:{
        'authorization':`Bearer ${accessToken}`
       
      }
    }
  }

}),
order_statues: builder.mutation({
  query:({order_id,order_status,accessToken})=>{
    console.log("oder stauuuuuuuuuuues",order_id,order_status,accessToken)
     
    return {
        url:`orderstatus/${order_id}/`,
        method:'PATCH',
        body:{order_status},
        headers:{
          'Content-type':'application/json',
          'authorization':`Bearer ${accessToken}`
         
        }
        


    }

  }
}),

GenReport: builder.mutation({
  query:({start_date,end_date,dukaan_id})=>{
    // console.log("report form data ",{start_date,end_date,dukaan_id})
  //  const dukaanid= formdata.dukaan_id
     
    return {
        url:`api/generate-report/${dukaan_id}/`,
        method:'POST',
        body:{start_date,end_date},
        headers:{
          'Content-type':'application/json',
          // 'authorization':`Bearer ${accessToken}`
         
        }
        


    }

  }
}),




totalreport:builder.query({
  query:({start_date,end_date, dukaan_id})=>{
    console.log('{start_date,end_date, dukaan_id}',{start_date,end_date, dukaan_id})
    return{
      url:`api/product-report/${dukaan_id}/${start_date}/${end_date}/`,
      method:'GET', 
        headers:{
          'Content-type':'application/json',
       
       
      }
    }
  }

}),
avgsalesreport:builder.query({
  query:({start_date,end_date, dukaan_id})=>{
    console.log('{start_date,end_date, dukaan_id}',{start_date,end_date, dukaan_id})
    return{
      url:`api/averagesales/${dukaan_id}/${start_date}/${end_date}/`,
      method:'GET', 
        headers:{
          'Content-type':'application/json',
       
       
      }
    }
  }

}),
  

    }),
  })
  
  // Export hooks for usage in functional components, which are
  // auto-generated based on the defined endpoints
  export const { useProductShowQuery,useProductADDMutation,useVouchershowlistQuery,
    useProductDeleteMutation,useProductUpdateMutation,useProductByCSVMutation,useApplyDiscountMutation,
    useImageGetQuery,useVoucheraddMutation,useVoucherDeleteMutation,useOrderListQuery,
    useOrder_statuesMutation,useGenReportMutation,useTotalreportQuery,useAvgsalesreportQuery} = ProductsApis