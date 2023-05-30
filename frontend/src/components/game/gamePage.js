import React, { useState, useEffect } from 'react';
import { Box, Stack, Grid, Paper } from '@mui/material';
import { GameCard } from './gameCard';
import EventTable from '../eventsTable';
import { useQueryGameData } from '../../api/nhl';
import { useParams } from 'react-router-dom';

export const GamePageInstance = () => {
	const [gameData, setGameData] = useState();
	const { gameId } = useParams();
	const { data: apiResponse, isLoading } = useQueryGameData(gameId);
	useEffect(() => {
		setGameData(apiResponse);
	}, [apiResponse]);
	if (isLoading || !gameData) {
		return null;
	}
	return <GamePage gameData={gameData} />;
};

const GamePage = ({ gameData }) => {
	return (
		<Paper sx={{ padding: '32px' }} elevation={2}>
			<GameCard gameData={gameData.data.game} />
			<EventTable eventTableData={gameData.data.events} />
		</Paper>
	);
};
