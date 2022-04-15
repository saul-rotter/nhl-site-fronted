import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://project.trumedianetworks.com/api/' }),
  endpoints: builder => ({
    getAPIToken: builder.query({
      query: () => ({
        url: 'token',
        headers: {
          "apiKey": process.env.REACT_APP_TRUMEDIA_API_KEY,
          "content-type":'application/json'
        }
      }),
      refetchOnMountOrArgChange: 86340, // 23 hours and 59 minutes
    })
  })
})


export const { useGetAPITokenQuery } = apiSlice

export function fetchAPIToken() {
  const {
    data,
    isSuccess,
  } = useGetAPITokenQuery();

  if (isSuccess) {
    return data['token'];
  }
  return null;
}