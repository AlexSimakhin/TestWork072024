import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import root from './config'

const token = 'VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn';

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Contacts', 'Contact'],
  baseQuery: fetchBaseQuery({
    baseUrl: root,
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer ${token}`)  
        return headers
    },
  }),
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => `/contacts?sort=created:desc`,
      providesTags: () => [{type: 'Contacts'}]
    }),
    getContact: builder.query({
      query: (id) => `/contact/${id}`,
      providesTags: () => [{type: 'Contacts'}]
    }),
    createContact: builder.mutation({
      query: (contact) => ({
        body: contact,
        url: '/contact',
        method: 'POST'
      }),
      invalidatesTags: () => [{type: 'Contacts'}]
    }),
    updateContact: builder.mutation({
      query: (contact) => ({
        body: contact,
        url: '/contact',
        method: 'PUT'
      }),
      invalidatesTags: () => [{type: 'Contacts'}]
    }),
    removeContact: builder.mutation({
      query: (id) => ({
        url: `/contact/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: () => [{type: 'Contacts'}]
    })
  })
})

export const { useGetContactsQuery, useGetContactQuery, useCreateContactMutation, useUpdateContactMutation, useRemoveContactMutation } = api;