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
    }),
    getPlayers: builder.query({
      query: (token) => ({
        url: 'nfl/players',
        headers: {
          'content-type':'application/json',
          'tempToken': token
        }
      }),
    }),
    getPlayerGames: builder.query({
      query: (token, player_id) => ({
        url: `nfl/player/${player_id}`,
        headers: {
          'content-type':'application/json',
          'tempToken': token
        }
      })
    })
  })
})


export const { useGetAPITokenQuery, useGetPlayerGamesQuery, useGetPlayersQuery } = apiSlice