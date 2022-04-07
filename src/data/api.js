export async function genAPIToken() {
  try {
    let response = await fetch(`https://project.trumedianetworks.com/api/token`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'apiKey': '199b9b1a-1973-4aa9-9f7c-f22b9a9b4cbe'}
    });
    if (response.ok) {
      return await response.json();
    }
    else {
      throw(response.status)
    }
  }
  catch(e) {
    console.log("API Fetch returned an error: ", e);
  }
}

async function genFetchWithToken(path, token) {
  let response = await fetch(`https://project.trumedianetworks.com/api/nfl/${path}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'tempToken': token}
  });
  if (response.ok) {
    return await response.json();
  }
  else {
    throw(response.status)
  }
}

export async function genFetchPlayers(token) {
  try {
    return await genFetchWithToken('players',token);
  }
  catch(e) {
    console.log("API Fetch returned an error: ", e);
  }
}

export async function genFetchPlayerData(token, player_id) {
  try {
    return await genFetchWithToken(`player/${player_id}`,token);
  }
  catch(e) {
    console.log("API Fetch returned an error: ", e);
  }
}

