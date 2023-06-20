import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// const URL = 'http://127.0.0.1:8000/';
const URL = 'https://saulrotter.pythonanywhere.com/games/';
export const fetchGameData = async (gameId) => {
	const response = await fetch(URL + gameId + '/');
	const data = response.json();
	return data;
};

export const useQueryGameData = (gameId) => {
	return useQuery(['games', gameId], () => {
		return axios.get(URL + gameId + '/', {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	});
};

export const useQueryGames = (gameId) => {
	return useQuery(['games', gameId], () => {
		return axios.get(URL + gameId + '/', {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	});
};
