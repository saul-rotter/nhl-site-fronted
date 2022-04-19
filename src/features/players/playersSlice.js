import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlayers: builder.query({
      query: (token) => ({
        url: "nfl/players",
        headers: {
          "content-type": "application/json",
          tempToken: token,
        },
      }),
    }),
  }),
});

export const { useGetPlayersQuery } = extendedApiSlice;
