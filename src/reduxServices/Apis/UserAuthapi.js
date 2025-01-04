import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const UserAuthapi = createApi({
    reducerPath: 'UserAuthapi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/auth/' }),
    endpoints: (builder) => ({
      registeruser: builder.mutation({
        query:(user)=>{
          return {
              url:'registration/',
              method:'POST',
              body:user,
              headers:{
                  'Content-type':'application/json',
              }
  
  
          }
  
        }
      }),
      otpVerify: builder.mutation({
        query:(user)=>{
          return {
              url:'otpVerify/',
              method:'POST',
              body:user,
              headers:{
                  'Content-type':'application/json',
              }
  
  
          }
  
        }
      }),
      forgetPassotp: builder.mutation({
        query:(user)=>{
          return {
              url:'forgetpasswordotp/',
              method:'POST',
              body:user,
              headers:{
                  'Content-type':'application/json',
              }
  
  
          }
  
        }
      }),
      forgetpassverifyotp: builder.mutation({
        query:(user)=>{
          // console.log("this frrr",{formData,accessToken,id})
          
          return {
              url:'forgetpasswordverifyotp/',
              method:'Post',
              body:user,
              headers:{
                  'Content-type':'application/json',
                
              }
  
  
          }
  
        }
      }),
      updateUser: builder.mutation({
        query:({formData,accessToken,id})=>{
          console.log("this frrr",{formData,accessToken,id})
          
          return {
              url:`registration/${id}/`,
              method:'PUT',
              body:formData,
              headers:{
                  'Content-type':'application/json',
                  'authorization':`Bearer ${accessToken}`
              }
  
  
          }
  
        }
      }),
      loginuser:builder.mutation({
        query:(user)=>{
          return {
              url:'login/',
              method:'POST',
              body:user,
              headers:{
                  'Content-type':'application/json',
              }
  
  
          }
  
        }
      }),
      LoggeduserProfile:builder.query({
        query:(token)=>{
          return {
              url:'profileview/',
              method:'GET',
              headers:{
                  'authorization':`Bearer ${token}`
              }
  
  
          }
  
        }
      }),
      passwordChange: builder.mutation({
        query:({formdata,token})=>{
          console.log('passworchatdada',formdata)
          return {
              url:'password-reset/',
              method:'POST',
              body:formdata,
              headers:{
                  
                  'authorization':`Bearer ${token}`

               

              }
  
  
          }
  
        }
      }),
      
      forgetdelete: builder.mutation({
        query:(user)=>{
          return {
              url:'forgetpasswordotp/',
              method:'DELETE',
              body:user,
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
  export const {useRegisteruserMutation,useOtpVerifyMutation,useLoginuserMutation,useLoggeduserProfileQuery ,usePasswordChangeMutation,useUpdateUserMutation,useForgetPassotpMutation,useForgetpassverifyotpMutation,useForgetdeleteMutation } = UserAuthapi