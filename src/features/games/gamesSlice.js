import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'

import { apiSlice } from '../api/apiSlice'

const gamesAdapter = createEntityAdapter()

const initialState = gamesAdapter.getInitialState()
const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlayerGames: builder.query({
      query: ({ token, playerId } ) => ({
        url: `nfl/player/${playerId}`,
        headers: {
          'content-type':'application/json',
          'tempToken': token
        }
      })
    }),
  }),
})

export const { useGetPlayerGamesQuery } = extendedApiSlice