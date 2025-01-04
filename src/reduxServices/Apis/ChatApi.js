import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const ChatApi = createApi({
    reducerPath: 'ChatApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/chat/' }),
    endpoints: (builder) => ({
    
    //   DeliveryPersonRegister: builder.mutation({
    //     query:(formdata)=>{
    //       console.log('deliveryPersonAdd',formdata)
    //       return {
    //           url:'deliveryPersonAdd/',
    //           method:'POST',
    //           body:formdata,
    //           headers:{
                  
    //             'Content-type':'application/json',

               

    //           }
  
  
    //       }
  
    //     }
    //   }),
     groupList: builder.query({
        query:(id)=>{
          console.log('deliveryPersonid',id)
          return {
              url:`create-chat-group/${id}/`,
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
  export const {useGroupListQuery} = ChatApi