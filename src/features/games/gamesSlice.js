import { apiSlice, fetchAPIToken } from '../api/apiSlice'

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlayerGames: builder.query({
      query: ({ token, playerId } ) => ({
        url: `nfl/player/${playerId}`,
        headers: {
          'content-type':'application/json',
          'tempToken': token
        }
      }),
      transformResponse: (response) => {
        let new_response = response;
        new_response = new_response.map((game) => {
          game['Yd/Att'] = (game['PsYds'] / game['Att']).toFixed(3);
          game['Cmp%'] = (game['Cmp'] / game['Att']).toFixed(3);
          return game;
        });
        return new_response;
      }
    }),
  }),
})

export const { useGetPlayerGamesQuery } = extendedApiSlice