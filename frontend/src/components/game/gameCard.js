import React from 'react';
import {
	Box,
	Card,
	CardContent,
	CardActions,
	Typography,
	Button,
	CardMedia,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
	ListItemIcon,
	Divider,
	ListItemAvatar,
	Avatar
} from '@mui/material';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import TeamCard from '../team/TeamCard';
const Styles = styled.div`
	.team-card {
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		transition: background-color 0.3s ease;
	}

	.team-1 {
		color: #fff;
	}

	.team-2 {
		color: #fff;
	}
`;
export const GameCard = ({ gameData }) => {
	return (
		<Styles>
			<Card>
				<CardContent>
					<Typography variant="h5" component="h2">
						{gameData['startTime']}
					</Typography>
					<Grid container spacing={2} justifyContent="center">
						<Grid item xs={12} sm={6}>
							<TeamCard className="team-card team-1" teamData={gameData['awayTeam']} />
						</Grid>
						<Grid item xs={12} sm={6}>
							<TeamCard className="team-card team-2" teamData={gameData['homeTeam']} />
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Styles>
	);
};
