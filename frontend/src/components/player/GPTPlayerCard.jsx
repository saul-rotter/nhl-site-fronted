import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import { teamColors } from '../../utilities/teamColors';
import PlayerAvatar from './PlayerAvatar';

const StyledCard = styled(Card)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	width: 300,
	height: 400,
	borderRadius: theme.spacing(1),
	boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
	overflow: 'hidden',
}));

const StyledImage = styled(CardMedia)({
	width: '100%',
	height: 250,
	objectFit: 'cover',
});

const StyledCardContent = styled(CardContent)(({ theme }) => ({
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	padding: theme.spacing(2),
	backgroundColor: '#FFFFFF',
}));

const GPTPlayerCard = ({ player }) => {
	const { id, name, position, teamId, handedness } = player;
	console.log(player);

	// Assuming teamColors is an object with teamId as keys and color values
	const backgroundColor = teamColors[teamId] || '#FFFFFF';

	return (
		<StyledCard sx={{ backgroundColor }}>
			<StyledImage
				image={`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${id}.jpg`}
				title={name}
			/>
			<StyledCardContent>
				<Typography
					variant='h6'
					sx={{ fontSize: 18, fontWeight: 'bold', mb: 1 }}>
					{name}
				</Typography>
				<Typography variant='body1' sx={{ mb: 1 }}>
					Number: {player.number}
				</Typography>
				<Typography variant='body1' sx={{ mb: 1 }}>
					Position: {position}
				</Typography>
				<Typography variant='body1' sx={{ mb: 1 }}>
					Handedness: {handedness}
				</Typography>
			</StyledCardContent>
		</StyledCard>
	);
};

export default GPTPlayerCard;
