import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/accounts/' }),  // Adjust base URL as needed
  endpoints: (builder) => ({
    getAccounts: builder.query({
      query: (id) => `account-detail/${id}`,
    }),
    addAccount: builder.mutation({
      query: (newAccount) => ({
        url: 'accounts/',
        method: 'POST',
        body: newAccount,
      }),
    }),
    updateAccount: builder.mutation({
      query: ({ id, ...updatedAccount }) => ({
        url: `accounts/${id}/`,
        method: 'PUT',
        body: updatedAccount,
      }),
    }),
  }),
});

export const { useGetAccountsQuery, useAddAccountMutation, useUpdateAccountMutation } = accountApi;
