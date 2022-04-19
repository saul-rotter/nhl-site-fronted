import { apiSlice } from "../api/apiSlice";

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlayerGames: builder.query({
      query: ({ token, playerId }) => ({
        url: `nfl/player/${playerId}`,
        headers: {
          "content-type": "application/json",
          tempToken: token,
        },
      }),
      transformResponse: (response) => {
        let new_response = response;
        let TotYds = 0;
        let TotTDs = 0;
        let TotCmp = 0;
        let TotAtt = 0;
        let TotInt = 0;
        new_response = new_response.map((game) => {
          game["Yd/Att"] = (game["PsYds"] / game["Att"]).toFixed(3);
          game["Cmp%"] = (game["Cmp"] / game["Att"]).toFixed(3);
          TotTDs += game["PsTD"];
          TotYds += game["PsYds"];
          TotCmp += game["Cmp"];
          TotAtt += game["Att"];
          TotInt += game["Int"];
          return game;
        });
        new_response["YdsPerGame"] = (TotYds / new_response.length).toFixed(3);
        new_response["TotTDs"] = TotTDs;
        new_response["TotCmpPer"] = (TotCmp / TotAtt).toFixed(3);
        new_response["TotInt"] = TotInt;
        return new_response;
      },
    }),
  }),
});

export const { useGetPlayerGamesQuery } = extendedApiSlice;
