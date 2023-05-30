import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const URL = 'http://127.0.0.1:8000/';
// const URL = 'https://nhl-plays-tool.herokuapp.com/'
export const fetchGameData = async (gameId) => {
	const response = await fetch(URL + gameId + '/');
	const data = response.json();
	return data;
};

export const useQueryGameData = (gameId) => {
	return useQuery(['games', gameId], () => {
		return axios.get(`http://127.0.0.1:8000/games/` + gameId + '/', {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	});
};

export const useQueryGames = (gameId) => {
	return useQuery(['games', gameId], () => {
		return axios.get(`http://127.0.0.1:8000/games/` + gameId + '/', {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	});
};

// import { useQuery, useQueryClient } from 'react-query';

// const BASE_URL = 'https://nhl-plays-tool.herokuapp.com';

// // Helper function to make API requests
// const fetchApi = async (url) => {
// 	const response = await fetch(`${BASE_URL}${url}`);
// 	if (!response.ok) {
// 		throw new Error('API request failed');
// 	}
// 	return response.json();
// };

// // Hook for fetching data from the index endpoint
// const useIndexData = () => {
// 	return useQuery('index', () => fetchApi('/'), {
// 		staleTime: 300000, // 5 minutes
// 	});
// };

// // Hook for fetching data from the games endpoint
// const useGamesData = () => {
// 	return useQuery('games', () => fetchApi('/games'), {
// 		staleTime: 60000, // 1 minute
// 	});
// };

// // Hook for fetching data from a specific game endpoint
// const useGameData = (id) => {
// 	return useQuery(['game', id], () => fetchApi(`/games/${id}`), {
// 		staleTime: Infinity, // Do not automatically refetch
// 	});
// };

// export { useIndexData, useGamesData, useGameData };
