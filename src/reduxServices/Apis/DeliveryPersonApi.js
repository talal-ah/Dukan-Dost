import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const DeliveryPersonApi = createApi({
    reducerPath: 'DeliveryPersonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/delivery/' }),
    endpoints: (builder) => ({
    
      DeliveryPersonRegister: builder.mutation({
        query:(formdata)=>{
          console.log('deliveryPersonAdd',formdata)
          return {
              url:'deliveryPersonAdd/',
              method:'POST',
              body:formdata,
              headers:{
                  
                'Content-type':'application/json',

               

              }
  
  
          }
  
        }
      }),
      DeliveryPersonDelete: builder.mutation({
        query:(id)=>{
         
          return {
              url:`delivery-persons/${id}/`,
              method:'DELETE',
              headers:{
                  
                'Content-type':'application/json',

               

              }
  
  
          }
  
        }
      }),
      DeliveryPersonEdit: builder.mutation({
        query:(updatedData)=>{
          const pk=updatedData.pk
          console.log('updatedData',pk)
         
          return {
              url:`delivery-persons/${pk}/`,
              method:'PATCH',
              body:updatedData,
              headers:{
                  
                'Content-type':'application/json',

               

              }
  
  
          }
  
        }
      }),
      DeliveryPersonList: builder.query({
        query:(id)=>{
          console.log('deliveryPersonid',id)
          return {
              url:`deliveryPersonAdd/${id}/`,
              method:'GET',
              headers:{
                  
                'Content-type':'application/json',

               

              }
  
  
          }
  
        }
      }),
     AllocateDelivery: builder.mutation({
        query:(formdata)=>{
          console.log('orderAllocation api is ok',formdata)
          return {
              url:'orderAllocation/',
              method:'POST',
              body:formdata,
              headers:{
                  
                'Content-type':'application/json',

               

              }
  
  
          }
  
        }
      }),
      AlloctedorderList: builder.query({
        query:(id)=>{
          console.log('AlloctedorderList',id)
          return {
              url:`orderAllocation/${id}/`,
              method:'GET',
              headers:{
                  
                'Content-type':'application/json',

               

              }
  
  
          }
  
        }
      }),
      updateOrderStatus: builder.mutation({
        query: ({ orderId }) => ({
          url: `/delivery/orderAllocation/${orderId}/`,
          method: 'PATCH',
          body: { order_status: 'DELIVERED' },
        })
     
      }),
      loginDeliveryPerson: builder.mutation({
        query: ({phone_number,  password}) => ({
          url: 'riderorders/',
          method: 'POST',
          body: {phone_number,  password}, // Send phone_number and password
        }),
      }),
      riderOrdersList: builder.query({
        query:({id})=>{
          // console.log('riderOrdersList',id)
          return {
              url:`orderforriders/${id}/`,
              method:'GET',
              headers:{
                  
                'Content-type':'application/json',

               

              }
  
  
          }
  
        }
      }),
        updateorderstatusbyrider: builder.mutation({
          query:(id)=>{
            console.log('didididid ok',id)
            return {
              url: `orderAllocationstatus/${id}/`,
              method: 'PATCH',
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
  export const {useUpdateorderstatusbyriderMutation,useDeliveryPersonRegisterMutation,useDeliveryPersonListQuery,useDeliveryPersonDeleteMutation,useDeliveryPersonEditMutation,useAllocateDeliveryMutation ,useAlloctedorderListQuery,useUpdateOrderStatusMutation,useLoginDeliveryPersonMutation,useRiderOrdersListQuery} = DeliveryPersonApi