import React, { useState, useEffect } from 'react';
import { Box, Stack, Grid, Paper } from '@mui/material';
import { GameCard } from './gameCard';
import EventTable from '../eventsTable';
import { useQueryGameData } from '../../api/nhl';
import { useParams } from 'react-router-dom';
import PageLayout from '../pageLayout';

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
	const topCard = <GameCard gameData={gameData.data.game} />;
	const eventsTable = <EventTable eventTableData={gameData.data.events} />;
	return (
		<PageLayout topCard={topCard} center={eventsTable} footer={'No content'} />
	);
};
