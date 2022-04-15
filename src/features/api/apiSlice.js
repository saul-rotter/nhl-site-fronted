import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://project.trumedianetworks.com/api/' }),
  tagTypes: ['Token'],
  endpoints: builder => ({
    getAPIToken: builder.query({
      query: () => ({
        url: 'token',
        headers: {
          "apiKey": process.env.REACT_APP_TRUMEDIA_API_KEY,
          "content-type":'application/json'
        }
      }), 
      providesTags: ['Token'],
    })
  })
})


export const { useGetAPITokenQuery, useGetPlayerGamesQuery, useGetPlayersQuery } = apiSlice