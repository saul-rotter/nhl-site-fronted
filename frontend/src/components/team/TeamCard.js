import React from 'react';
import { Card } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TeamAvatar from './TeamAvatar';

const iconPath = process.env.PUBLIC_URL + '/images/team-logos/';

/* <Avatar alt='player face' src={`${iconPath}2.jpg`} />; */
// src =
// 	'https://cms.nhl.bamgrid.com/images/headshots/current/168x168/{playerId}.jpg';
export default function TeamCard({ teamData }) {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardContent>
				<TeamAvatar teamId={teamData['id']} />
			</CardContent>
			<CardContent>
				<Typography gutterBottom variant='h5' component='div'>
					Lizard
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					Lizards are a widespread group of squamate reptiles, with over 6,000
					species, ranging across all continents except Antarctica
				</Typography>
			</CardContent>
			<CardActions>
				<Button size='small'>Share</Button>
				<Button size='small'>Learn More</Button>
			</CardActions>
		</Card>
	);
}
