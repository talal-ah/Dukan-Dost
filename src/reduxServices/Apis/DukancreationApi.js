import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const DukancreationApi = createApi({
    reducerPath: 'DukancreationApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/store' }),
    endpoints: (builder) => ({
      dukanCreation: builder.mutation({
        query:(user)=>{

          const formDataToSend = new FormData();
          for (const key in user) {
            formDataToSend.append(key, user[key]);
          }
          console.log("ya formdata ha ",user)
          return {
              url:'dukanCreaction/',
              method:'POST',
              body:formDataToSend,
              headers:{
                  // 'Content-type':'application/json',
              }
  
  
          }
  
        }
      }),
      dukanUpdate: builder.mutation({
        query:({dukandata,accessToken})=>{

          const formDataToSend = new FormData();
          for (const key in dukandata) {
            formDataToSend.append(key, dukandata[key]);
          }
          console.log("ya formdata ha ",dukandata)
          return {
              url:'dukanCreaction/',
              method:'PUT',
              body:formDataToSend,
              headers:{
                'authorization':`Bearer ${accessToken}`
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
      dukanData:builder.query({
        query:(token)=>{
          return {
              url:'dukanCreaction/',
              method:'GET',
              headers:{
                  'authorization':`Bearer ${token}`
              }
  
  
          }
  
        }
      }),
    }),
  })
  
  // Export hooks for usage in functional components, which are
  // auto-generated based on the defined endpoints
  export const { useDukanCreationMutation,useDukanDataQuery,useDukanUpdateMutation} = DukancreationApi