import axios from "axios";

const instance = axios.create({
  baseURL: "https://project.trumedianetworks.com/api/",
  headers: {
    "content-type": "application/json",
  },
});

export default {
  getAPIToken: async () =>
    instance({
      method: "GET",
      url: "/token/",
      headers: {
        "content-type": "application/json",
        apiKey: process.env.TRUMEDIA_API_KEY,
      },
    }),
  getPlayers: (token) =>
    instance({
      method: "GET",
      url: "/nfl/",
      headers: {
        "content-type": "application/json",
        token: token,
      },
    }),
  getPlayerGames: (token, player_id) =>
    instance({
      method: "GET",
      url: `/nfl/${player_id}`,
      headers: {
        "content-type": "application/json",
        token: token,
      },
    }),
};

export const fetchAPIToken = async () => {
  try {
    let response = await fetch(
      `https://project.trumedianetworks.com/api/token`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apiKey: `${process.env.TRUMEDIA_API_KEY}`,
        },
      }
    );
    if (response.ok) {
      return await response.json();
    } else {
      throw response.status;
    }
  } catch (e) {
    console.log("API Fetch returned an error: ", e);
  }
};

async function genFetchWithToken(path, token) {
  let response = await fetch(
    `https://project.trumedianetworks.com/api/nfl/${path}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", tempToken: token },
    }
  );
  if (response.ok) {
    return await response.json();
  } else {
    throw response.status;
  }
}

export async function genFetchPlayers(token) {
  try {
    return await genFetchWithToken("players", token);
  } catch (e) {
    console.log("API Fetch returned an error: ", e);
  }
}

export async function genFetchPlayerData(token, player_id) {
  try {
    return await genFetchWithToken(`player/${player_id}`, token);
  } catch (e) {
    console.log("API Fetch returned an error: ", e);
  }
}
